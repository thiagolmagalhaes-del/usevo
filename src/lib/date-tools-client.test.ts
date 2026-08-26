import { describe, expect, it } from "vitest";
import { initializeAgeCalculator, initializeDateCalculator } from "./date-tools-client";

class FakeElement {
  value = "";
  checked = false;
  hidden = true;
  textContent = "";
  dataset: Record<string, string | undefined> = {};
  listeners = new Map<string, (event: { preventDefault: () => void }) => void>();

  addEventListener(type: string, listener: (event: { preventDefault: () => void }) => void) {
    this.listeners.set(type, listener);
  }

  submit() {
    this.listeners.get("submit")?.({ preventDefault: () => undefined });
  }
}

const fixture = (ids: string[]) => {
  const elements = new Map(ids.map((id) => [id, new FakeElement()]));
  return {
    elements,
    document: { getElementById: (id: string) => elements.get(id) ?? null },
    get: (id: string) => elements.get(id)!,
  };
};

const dateCopy = { years: "Years", months: "Months", weeks: "Weeks", days: "Days", required: "Required", reversed: "Reversed", invalidNumbers: "Invalid", weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dateLocale: "en-US" };
const ageCopy = { required: "Required", futureBirth: "Future", weekdays: dateCopy.weekdays, ageUnits: ["years", "months", "days"], dateLocale: "en-US" };

describe("date tool client integration", () => {
  it("calculates consecutive date differences and keeps cleared fields empty", () => {
    const view = fixture(["differenceForm", "periodForm", "differenceStart", "differenceEnd", "includeEnd", "differenceError", "differenceResult", "differenceExact", "differenceDays", "differenceWeeks", "differenceStartWeekday", "differenceEndWeekday", "periodStart", "operation", "periodYears", "periodMonths", "periodWeeks", "periodDays", "periodError", "periodResult", "periodDate", "periodWeekday"]);
    initializeDateCalculator(view.document as never, dateCopy);
    view.get("differenceStart").value = "2024-02-28";
    view.get("differenceEnd").value = "2024-03-01";
    view.get("differenceForm").submit();
    expect(view.get("differenceResult").hidden).toBe(false);
    expect(view.get("differenceDays").textContent).toBe("2");
    view.get("includeEnd").checked = true;
    view.get("differenceForm").submit();
    expect(view.get("differenceDays").textContent).toBe("3");
    view.get("differenceStart").value = "";
    view.get("differenceEnd").value = "";
    view.get("differenceForm").submit();
    expect(view.get("differenceStart").value).toBe("");
    expect(view.get("differenceEnd").value).toBe("");
    view.get("differenceStart").value = "2025-01-01";
    view.get("differenceEnd").value = "2025-01-02";
    view.get("includeEnd").checked = false;
    view.get("differenceForm").submit();
    expect(view.get("differenceDays").textContent).toBe("1");
  });

  it("initializes the age reference once and supports clearing and recalculating", () => {
    const view = fixture(["ageForm", "birthDate", "referenceDate", "ageError", "ageResult", "exactAge", "approximateMonths", "approximateWeeks", "totalDays", "birthWeekday", "nextBirthday", "daysUntilBirthday"]);
    initializeAgeCalculator(view.document as never, ageCopy, new Date(2026, 7, 26));
    expect(view.get("referenceDate").value).toBe("2026-08-26");
    view.get("birthDate").value = "2000-01-01";
    view.get("referenceDate").value = "2026-08-26";
    view.get("ageForm").submit();
    expect(view.get("exactAge").textContent).toBe("26 years, 7 months, 25 days");
    view.get("birthDate").value = "";
    view.get("referenceDate").value = "";
    initializeAgeCalculator(view.document as never, ageCopy, new Date(2030, 0, 1));
    expect(view.get("referenceDate").value).toBe("");
    view.get("ageForm").submit();
    expect(view.get("ageError").textContent).toBe("Required");
    view.get("birthDate").value = "2000-01-01";
    view.get("referenceDate").value = "2026-08-27";
    view.get("ageForm").submit();
    expect(view.get("exactAge").textContent).toBe("26 years, 7 months, 26 days");
  });
});
