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

  focus() {
    this.focusCalls += 1;
  }

  addEventListener(type: "click", listener: () => void) {
    this.listeners.set(type, listener);
  }

  setAttribute(name: string, value: string) {
    this.attributes.set(name, value);
  }

  click() {
    this.listeners.get("click")?.();
  }
}

const createFixture = () => {
  const banner = new FakeElement();
  const acceptButton = new FakeElement();
  const rejectButton = new FakeElement();
  const settingsButton = new FakeElement();
  const storage = new Map<string, string>();
  const scripts: { src: string; dataset: { usevoAnalytics?: string }; async: boolean }[] = [];
  const runtime = {
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

  it("accepts, closes, persists, and loads GA4 only once", () => {
    const { banner, acceptButton, settingsButton, storage, scripts, controller } = createFixture();

    controller.initialize();
    acceptButton.click();
    acceptButton.click();

    expect(banner.hidden).toBe(true);
    expect(settingsButton.hidden).toBe(false);
    expect(storage.get(ANALYTICS_CONSENT_STORAGE_KEY)).toBe("granted");
    expect(scripts).toHaveLength(1);
    expect(scripts[0]?.src).toBe(`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`);
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
