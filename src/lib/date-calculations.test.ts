import { describe, expect, it } from "vitest";
import {
  addPeriod,
  calculateAge,
  getDateDifference,
  parseCivilDate,
} from "./date-calculations";

const date = (value: string) => {
  const parsed = parseCivilDate(value);
  if (!parsed) throw new Error(`Invalid fixture date: ${value}`);
  return parsed;
};

describe("date calculations", () => {
  it("handles equal dates and optional inclusion of the final day", () => {
    expect(getDateDifference(date("2026-03-12"), date("2026-03-12"))).toMatchObject({ totalDays: 0, years: 0, months: 0, days: 0 });
    expect(getDateDifference(date("2026-03-12"), date("2026-03-12"), true)).toMatchObject({ totalDays: 1, days: 1 });
  });

  it("calculates intervals across months and years and rejects reversed dates", () => {
    expect(getDateDifference(date("2024-12-31"), date("2025-02-01"))).toMatchObject({ months: 1, days: 1, totalDays: 32, weeks: 4, remainingDays: 4 });
    expect(getDateDifference(date("2025-02-01"), date("2024-12-31"))).toBeNull();
  });

  it("accounts for leap years and February 29", () => {
    expect(getDateDifference(date("2024-02-28"), date("2024-03-01"))).toMatchObject({ totalDays: 2, days: 2 });
    expect(addPeriod(date("2024-02-29"), { years: 1 })).toEqual(date("2025-02-28"));
    expect(calculateAge(date("2024-02-29"), date("2025-02-28"))).toMatchObject({ years: 1, months: 0, days: 0 });
  });

  it("adds and subtracts periods while clamping month ends", () => {
    expect(addPeriod(date("2024-01-31"), { months: 1 })).toEqual(date("2024-02-29"));
    expect(addPeriod(date("2025-03-31"), { months: -1 })).toEqual(date("2025-02-28"));
    expect(addPeriod(date("2025-01-15"), { years: 1, months: 2, weeks: 1, days: 3 })).toEqual(date("2026-03-25"));
    expect(addPeriod(date("2025-03-10"), { years: -1, months: -1, weeks: -1, days: -3 })).toEqual(date("2024-01-31"));
  });

  it("calculates age for a specific reference date and rejects a future birth date", () => {
    expect(calculateAge(date("2000-05-20"), date("2026-05-19"))).toMatchObject({ years: 25, months: 11, days: 29, daysUntilNextBirthday: 1 });
    expect(calculateAge(date("2000-05-20"), date("2026-05-20"))).toMatchObject({ years: 26, months: 0, days: 0, daysUntilNextBirthday: 0 });
    expect(calculateAge(date("2000-05-20"), date("2026-05-21"))).toMatchObject({ nextBirthday: date("2027-05-20"), daysUntilNextBirthday: 364 });
    expect(calculateAge(date("2026-05-21"), date("2026-05-20"))).toBeNull();
  });
});
