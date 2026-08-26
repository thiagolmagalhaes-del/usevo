export type CivilDate = {
  year: number;
  month: number;
  day: number;
};

export type DateDifference = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  weeks: number;
  remainingDays: number;
};

export type AgeResult = DateDifference & {
  approximateMonths: number;
  approximateWeeks: number;
  birthdayWeekday: number;
  nextBirthday: CivilDate;
  daysUntilNextBirthday: number;
};

const DAYS_PER_WEEK = 7;

export const isLeapYear = (year: number) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

export const daysInMonth = (year: number, month: number) => {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

export const parseCivilDate = (value: string): CivilDate | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) return null;
  return { year, month, day };
};

export const formatCivilDateValue = ({ year, month, day }: CivilDate) =>
  `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

// Converts a Gregorian civil date to a day number without constructing a UTC Date.
export const civilDateToDayNumber = ({ year, month, day }: CivilDate) => {
  const adjustedYear = year - (month <= 2 ? 1 : 0);
  const era = Math.floor(adjustedYear / 400);
  const yearOfEra = adjustedYear - era * 400;
  const monthFromMarch = month + (month > 2 ? -3 : 9);
  const dayOfYear = Math.floor((153 * monthFromMarch + 2) / 5) + day - 1;
  const dayOfEra = yearOfEra * 365 + Math.floor(yearOfEra / 4) - Math.floor(yearOfEra / 100) + dayOfYear;
  return era * 146097 + dayOfEra - 719468;
};

export const dayNumberToCivilDate = (dayNumber: number): CivilDate => {
  const z = dayNumber + 719468;
  const era = Math.floor(z / 146097);
  const dayOfEra = z - era * 146097;
  const yearOfEra = Math.floor((dayOfEra - Math.floor(dayOfEra / 1460) + Math.floor(dayOfEra / 36524) - Math.floor(dayOfEra / 146096)) / 365);
  let year = yearOfEra + era * 400;
  const dayOfYear = dayOfEra - (yearOfEra * 365 + Math.floor(yearOfEra / 4) - Math.floor(yearOfEra / 100));
  const monthFromMarch = Math.floor((5 * dayOfYear + 2) / 153);
  const day = dayOfYear - Math.floor((153 * monthFromMarch + 2) / 5) + 1;
  const month = monthFromMarch + (monthFromMarch < 10 ? 3 : -9);
  year += month <= 2 ? 1 : 0;
  return { year, month, day };
};

export const compareCivilDates = (left: CivilDate, right: CivilDate) =>
  civilDateToDayNumber(left) - civilDateToDayNumber(right);

export const addDays = (date: CivilDate, days: number) => dayNumberToCivilDate(civilDateToDayNumber(date) + days);

export const addMonths = (date: CivilDate, months: number): CivilDate => {
  const monthIndex = date.year * 12 + (date.month - 1) + months;
  const year = Math.floor(monthIndex / 12);
  const month = ((monthIndex % 12) + 12) % 12 + 1;
  return { year, month, day: Math.min(date.day, daysInMonth(year, month)) };
};

export const addYears = (date: CivilDate, years: number): CivilDate => {
  const year = date.year + years;
  return { year, month: date.month, day: Math.min(date.day, daysInMonth(year, date.month)) };
};

export const addPeriod = (
  date: CivilDate,
  period: { years?: number; months?: number; weeks?: number; days?: number },
): CivilDate => {
  const withYears = addYears(date, period.years ?? 0);
  const withMonths = addMonths(withYears, period.months ?? 0);
  return addDays(withMonths, (period.weeks ?? 0) * DAYS_PER_WEEK + (period.days ?? 0));
};

export const getWeekday = (date: CivilDate) => {
  const weekday = (civilDateToDayNumber(date) + 4) % DAYS_PER_WEEK;
  return weekday < 0 ? weekday + DAYS_PER_WEEK : weekday;
};

export const getDateDifference = (start: CivilDate, end: CivilDate, includeEndDay = false): DateDifference | null => {
  if (compareCivilDates(end, start) < 0) return null;

  const effectiveEnd = includeEndDay ? addDays(end, 1) : end;
  let years = effectiveEnd.year - start.year;
  let cursor = addYears(start, years);
  if (compareCivilDates(cursor, effectiveEnd) > 0) {
    years -= 1;
    cursor = addYears(start, years);
  }

  let months = (effectiveEnd.year - cursor.year) * 12 + effectiveEnd.month - cursor.month;
  const monthCursor = addMonths(cursor, months);
  if (compareCivilDates(monthCursor, effectiveEnd) > 0) months -= 1;
  cursor = addMonths(cursor, months);

  const days = civilDateToDayNumber(effectiveEnd) - civilDateToDayNumber(cursor);
  const totalDays = civilDateToDayNumber(effectiveEnd) - civilDateToDayNumber(start);
  return {
    years,
    months,
    days,
    totalDays,
    weeks: Math.floor(totalDays / DAYS_PER_WEEK),
    remainingDays: totalDays % DAYS_PER_WEEK,
  };
};

const birthdayInYear = (birthDate: CivilDate, year: number): CivilDate => ({
  year,
  month: birthDate.month,
  day: Math.min(birthDate.day, daysInMonth(year, birthDate.month)),
});

export const calculateAge = (birthDate: CivilDate, referenceDate: CivilDate): AgeResult | null => {
  if (compareCivilDates(birthDate, referenceDate) > 0) return null;
  const difference = getDateDifference(birthDate, referenceDate);
  if (!difference) return null;

  let nextBirthday = birthdayInYear(birthDate, referenceDate.year);
  if (compareCivilDates(nextBirthday, referenceDate) < 0) nextBirthday = birthdayInYear(birthDate, referenceDate.year + 1);

  return {
    ...difference,
    approximateMonths: Math.floor(difference.totalDays / 30.4375),
    approximateWeeks: Math.floor(difference.totalDays / DAYS_PER_WEEK),
    birthdayWeekday: getWeekday(birthDate),
    nextBirthday,
    daysUntilNextBirthday: civilDateToDayNumber(nextBirthday) - civilDateToDayNumber(referenceDate),
  };
};
