import { describe, expect, it } from "vitest";
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  ANALYTICS_MEASUREMENT_ID,
  createAnalyticsConsentController,
} from "./analytics-consent";

class FakeElement {
  hidden = true;
  focusCalls = 0;
  attributes = new Map<string, string>();
  listeners = new Map<string, () => void>();
  listenerRegistrations = new Map<string, number>();

  focus() {
    this.focusCalls += 1;
  }

  addEventListener(type: "click", listener: () => void) {
    this.listeners.set(type, listener);
    this.listenerRegistrations.set(type, (this.listenerRegistrations.get(type) ?? 0) + 1);
  }

  setAttribute(name: string, value: string) {
    this.attributes.set(name, value);
  }

  click() {
    this.listeners.get("click")?.();
  }
}

const createFixture = (initialConsent?: "granted" | "denied") => {
  const banner = new FakeElement();
  const acceptButton = new FakeElement();
  const rejectButton = new FakeElement();
  const settingsButton = new FakeElement();
  const storage = new Map<string, string>(
    initialConsent ? [[ANALYTICS_CONSENT_STORAGE_KEY, initialConsent]] : [],
  );
  const scripts: { src: string; dataset: { usevoAnalytics?: string }; async: boolean }[] = [];
  const runtime: {
    localStorage: {
      getItem: (key: string) => string | null;
      setItem: (key: string, value: string) => void;
    };
    dataLayer?: IArguments[];
    __usevoAnalyticsInitialized?: boolean;
    [key: string]: unknown;
  } = {
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
  };
  const documentRef = {
    createElement: () => ({ src: "", dataset: {}, async: false }),
    querySelector: (selector: string) => scripts.find((script) => selector.includes(script.dataset.usevoAnalytics ?? "")) ?? null,
    head: { append: (tag: { src: string; dataset: { usevoAnalytics?: string }; async: boolean }) => scripts.push(tag) },
  };
  const controller = createAnalyticsConsentController(
    { banner, acceptButton, rejectButton, settingsButton },
    documentRef as never,
    runtime,
  );

  return { banner, acceptButton, rejectButton, settingsButton, storage, scripts, runtime, controller };
};

describe("analytics consent", () => {
  it("opens the banner until a choice is made", () => {
    const { banner, settingsButton, controller } = createFixture();

    controller.initialize();

    expect(banner.hidden).toBe(false);
    expect(settingsButton.hidden).toBe(true);
  });

  it("accepts for the first time, persists, and queues a valid GA4 page view", () => {
    const { banner, acceptButton, settingsButton, storage, scripts, runtime, controller } = createFixture();

    controller.initialize();
    acceptButton.click();

    expect(banner.hidden).toBe(true);
    expect(settingsButton.hidden).toBe(false);
    expect(storage.get(ANALYTICS_CONSENT_STORAGE_KEY)).toBe("granted");
    expect(scripts).toHaveLength(1);
    expect(scripts[0]?.src).toBe(`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`);
    expect(runtime.dataLayer).toHaveLength(4);
    expect(Object.prototype.toString.call(runtime.dataLayer?.[0])).toBe("[object Arguments]");
    expect(Array.from(runtime.dataLayer?.[0] ?? [])).toEqual([
      "consent",
      "default",
      { analytics_storage: "denied" },
    ]);
    expect(Array.from(runtime.dataLayer?.[1] ?? [])).toEqual([
      "consent",
      "update",
      { analytics_storage: "granted" },
    ]);
    expect(Array.from(runtime.dataLayer?.[3] ?? [])).toEqual([
      "config",
      ANALYTICS_MEASUREMENT_ID,
      { allow_google_signals: false, anonymize_ip: true },
    ]);
  });

  it("does not duplicate GA4 setup or listeners when Accept is clicked twice", () => {
    const { acceptButton, rejectButton, settingsButton, scripts, runtime, controller } = createFixture();

    controller.initialize();
    acceptButton.click();
    acceptButton.click();

    expect(scripts).toHaveLength(1);
    expect(runtime.__usevoAnalyticsInitialized).toBe(true);
    expect(
      runtime.dataLayer
        ?.map((command) => Array.from(command))
        .filter(([command]) => command === "config"),
    ).toHaveLength(1);
    expect(acceptButton.listenerRegistrations.get("click")).toBe(1);
    expect(rejectButton.listenerRegistrations.get("click")).toBe(1);
    expect(settingsButton.listenerRegistrations.get("click")).toBe(1);
  });

  it("declines, closes, and never loads Google Analytics", () => {
    const { banner, rejectButton, settingsButton, storage, scripts, controller } = createFixture();

    controller.initialize();
    rejectButton.click();

    expect(banner.hidden).toBe(true);
    expect(settingsButton.hidden).toBe(false);
    expect(storage.get(ANALYTICS_CONSENT_STORAGE_KEY)).toBe("denied");
    expect(scripts).toHaveLength(0);
  });

  it("loads Analytics after a persisted acceptance without duplicating configuration", () => {
    const { banner, settingsButton, scripts, runtime, controller } = createFixture("granted");

    controller.initialize();
    controller.initialize();

    expect(banner.hidden).toBe(true);
    expect(settingsButton.hidden).toBe(false);
    expect(scripts).toHaveLength(1);
    expect(
      runtime.dataLayer
        ?.map((command) => Array.from(command))
        .filter(([command]) => command === "config"),
    ).toHaveLength(1);
  });

  it("reopens preferences with focus on Accept", () => {
    const { banner, acceptButton, settingsButton, controller } = createFixture();

    controller.initialize();
    controller.reject();
    settingsButton.click();

    expect(banner.hidden).toBe(false);
    expect(settingsButton.hidden).toBe(true);
    expect(acceptButton.focusCalls).toBe(1);
  });
});
