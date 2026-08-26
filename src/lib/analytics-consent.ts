export const ANALYTICS_MEASUREMENT_ID = "G-MWYREH2FFV";
export const ANALYTICS_CONSENT_STORAGE_KEY = "usevo.analytics-consent";

type ConsentValue = "granted" | "denied";

type ConsentElement = {
  hidden: boolean;
  focus: () => void;
  addEventListener: (type: "click", listener: () => void) => void;
  setAttribute: (name: string, value: string) => void;
};

type AnalyticsRuntime = {
  localStorage?: Pick<Storage, "getItem" | "setItem">;
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
  __usevoAnalyticsInitialized?: boolean;
  [key: string]: unknown;
};

type AnalyticsDocument = Pick<Document, "createElement" | "querySelector"> & {
  head: Pick<HTMLElement, "append">;
};

type ConsentElements = {
  banner: ConsentElement;
  acceptButton: ConsentElement;
  rejectButton: ConsentElement;
  settingsButton: ConsentElement;
};

const getStoredConsent = (runtime: AnalyticsRuntime) => {
  try {
    const value = runtime.localStorage?.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

const storeConsent = (runtime: AnalyticsRuntime, value: ConsentValue) => {
  try {
    runtime.localStorage?.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  } catch {
    // Consent remains active for the current page if local storage is unavailable.
  }
};

export const createAnalyticsConsentController = (
  elements: ConsentElements,
  documentRef: AnalyticsDocument,
  runtime: AnalyticsRuntime,
) => {
  const showBanner = (moveFocus = false) => {
    elements.banner.hidden = false;
    elements.banner.setAttribute("aria-hidden", "false");
    elements.settingsButton.hidden = true;

    if (moveFocus) {
      elements.acceptButton.focus();
    }
  };

  const hideBanner = () => {
    elements.banner.hidden = true;
    elements.banner.setAttribute("aria-hidden", "true");
    elements.settingsButton.hidden = false;
  };

  const disableAnalytics = () => {
    runtime[`ga-disable-${ANALYTICS_MEASUREMENT_ID}`] = true;
    runtime.gtag?.("consent", "update", { analytics_storage: "denied" });
  };

  const enableAnalytics = () => {
    runtime[`ga-disable-${ANALYTICS_MEASUREMENT_ID}`] = false;

    if (runtime.__usevoAnalyticsInitialized) {
      runtime.gtag?.("consent", "update", { analytics_storage: "granted" });
      return;
    }

    runtime.dataLayer = runtime.dataLayer ?? [];
    runtime.gtag = runtime.gtag ?? function () {
      runtime.dataLayer?.push(arguments);
    };

    runtime.__usevoAnalyticsInitialized = true;
    runtime.gtag("consent", "default", { analytics_storage: "denied" });
    runtime.gtag("consent", "update", { analytics_storage: "granted" });
    runtime.gtag("js", new Date());
    runtime.gtag("config", ANALYTICS_MEASUREMENT_ID, {
      allow_google_signals: false,
      anonymize_ip: true,
    });

    if (documentRef.querySelector(`script[data-usevo-analytics="${ANALYTICS_MEASUREMENT_ID}"]`)) {
      return;
    }

    const tag = documentRef.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`;
    tag.dataset.usevoAnalytics = ANALYTICS_MEASUREMENT_ID;
    documentRef.head.append(tag);
  };

  const applyConsent = (value: ConsentValue) => {
    storeConsent(runtime, value);
    hideBanner();

    if (value === "granted") {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  };

  elements.acceptButton.addEventListener("click", () => applyConsent("granted"));
  elements.rejectButton.addEventListener("click", () => applyConsent("denied"));
  elements.settingsButton.addEventListener("click", () => showBanner(true));

  return {
    initialize: () => {
      const consent = getStoredConsent(runtime);

      if (consent === "granted") {
        hideBanner();
        enableAnalytics();
      } else if (consent === "denied") {
        hideBanner();
        disableAnalytics();
      } else {
        showBanner();
      }
    },
    accept: () => applyConsent("granted"),
    reject: () => applyConsent("denied"),
    openSettings: () => showBanner(true),
  };
};

export const mountAnalyticsConsent = (documentRef: Document, runtime: Window) => {
  const banner = documentRef.getElementById("analyticsConsent");
  const acceptButton = documentRef.getElementById("analyticsAccept");
  const rejectButton = documentRef.getElementById("analyticsReject");
  const settingsButton = documentRef.getElementById("analyticsSettings");

  if (!banner || !acceptButton || !rejectButton || !settingsButton) {
    return;
  }

  const controller = createAnalyticsConsentController(
    { banner, acceptButton, rejectButton, settingsButton },
    documentRef,
    runtime,
  );
  controller.initialize();
};
