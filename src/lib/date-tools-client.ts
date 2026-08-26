import { addPeriod, calculateAge, getDateDifference, getWeekday, parseCivilDate } from "./date-calculations";

type ElementLookup = Pick<Document, "getElementById">;

export type DateCalculatorCopy = {
  years: string;
  months: string;
  weeks: string;
  days: string;
  required: string;
  reversed: string;
  invalidNumbers: string;
  weekdays: string[];
  dateLocale: string;
};

export type AgeCalculatorCopy = {
  required: string;
  futureBirth: string;
  weekdays: string[];
  ageUnits: string[];
  dateLocale: string;
};

const getElement = <T extends HTMLElement>(documentRef: ElementLookup, id: string) => {
  const element = documentRef.getElementById(id);
  if (!element) throw new Error(`Missing date calculator element: ${id}`);
  return element as T;
};

const localDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatCivilDate = (date: { year: number; month: number; day: number }, locale: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(date.year, date.month - 1, date.day, 12));

export const initializeDateCalculator = (documentRef: ElementLookup, copy: DateCalculatorCopy) => {
  const differenceForm = getElement<HTMLFormElement>(documentRef, "differenceForm");
  const periodForm = getElement<HTMLFormElement>(documentRef, "periodForm");
  if (differenceForm.dataset.dateCalculatorBound === "true") return;
  differenceForm.dataset.dateCalculatorBound = "true";
  periodForm.dataset.dateCalculatorBound = "true";

  const differenceStart = getElement<HTMLInputElement>(documentRef, "differenceStart");
  const differenceEnd = getElement<HTMLInputElement>(documentRef, "differenceEnd");
  const includeEnd = getElement<HTMLInputElement>(documentRef, "includeEnd");
  const differenceError = getElement<HTMLElement>(documentRef, "differenceError");
  const differenceResult = getElement<HTMLElement>(documentRef, "differenceResult");
  const differenceExact = getElement<HTMLElement>(documentRef, "differenceExact");
  const differenceDays = getElement<HTMLElement>(documentRef, "differenceDays");
  const differenceWeeks = getElement<HTMLElement>(documentRef, "differenceWeeks");
  const differenceStartWeekday = getElement<HTMLElement>(documentRef, "differenceStartWeekday");
  const differenceEndWeekday = getElement<HTMLElement>(documentRef, "differenceEndWeekday");
  const periodStart = getElement<HTMLInputElement>(documentRef, "periodStart");
  const operation = getElement<HTMLSelectElement>(documentRef, "operation");
  const periodYears = getElement<HTMLInputElement>(documentRef, "periodYears");
  const periodMonths = getElement<HTMLInputElement>(documentRef, "periodMonths");
  const periodWeeks = getElement<HTMLInputElement>(documentRef, "periodWeeks");
  const periodDays = getElement<HTMLInputElement>(documentRef, "periodDays");
  const periodError = getElement<HTMLElement>(documentRef, "periodError");
  const periodResult = getElement<HTMLElement>(documentRef, "periodResult");
  const periodDate = getElement<HTMLElement>(documentRef, "periodDate");
  const periodWeekday = getElement<HTMLElement>(documentRef, "periodWeekday");
  const setError = (element: HTMLElement, message: string) => { element.textContent = message; element.hidden = !message; };

  differenceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const start = parseCivilDate(differenceStart.value);
    const end = parseCivilDate(differenceEnd.value);
    if (!start || !end) { setError(differenceError, copy.required); differenceResult.hidden = true; return; }
    const difference = getDateDifference(start, end, includeEnd.checked);
    if (!difference) { setError(differenceError, copy.reversed); differenceResult.hidden = true; return; }
    setError(differenceError, "");
    differenceExact.textContent = `${difference.years} ${copy.years.toLowerCase()}, ${difference.months} ${copy.months.toLowerCase()}, ${difference.days} ${copy.days.toLowerCase()}`;
    differenceDays.textContent = String(difference.totalDays);
    differenceWeeks.textContent = `${difference.weeks} ${copy.weeks.toLowerCase()} + ${difference.remainingDays} ${copy.days.toLowerCase()}`;
    differenceStartWeekday.textContent = copy.weekdays[getWeekday(start)] ?? "";
    differenceEndWeekday.textContent = copy.weekdays[getWeekday(end)] ?? "";
    differenceResult.hidden = false;
  });

  periodForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const start = parseCivilDate(periodStart.value);
    const values = [periodYears, periodMonths, periodWeeks, periodDays].map((input) => Number(input.value));
    if (!start) { setError(periodError, copy.required); periodResult.hidden = true; return; }
    if (values.some((value) => !Number.isInteger(value) || value < 0)) { setError(periodError, copy.invalidNumbers); periodResult.hidden = true; return; }
    const direction = operation.value === "subtract" ? -1 : 1;
    const end = addPeriod(start, { years: values[0] * direction, months: values[1] * direction, weeks: values[2] * direction, days: values[3] * direction });
    setError(periodError, "");
    periodDate.textContent = formatCivilDate(end, copy.dateLocale);
    periodWeekday.textContent = copy.weekdays[getWeekday(end)] ?? "";
    periodResult.hidden = false;
  });
};

export const initializeAgeCalculator = (documentRef: ElementLookup, copy: AgeCalculatorCopy, today = new Date()) => {
  const form = getElement<HTMLFormElement>(documentRef, "ageForm");
  const birthDate = getElement<HTMLInputElement>(documentRef, "birthDate");
  const referenceDate = getElement<HTMLInputElement>(documentRef, "referenceDate");
  const error = getElement<HTMLElement>(documentRef, "ageError");
  const resultElement = getElement<HTMLElement>(documentRef, "ageResult");
  const exactAge = getElement<HTMLElement>(documentRef, "exactAge");
  const approximateMonths = getElement<HTMLElement>(documentRef, "approximateMonths");
  const approximateWeeks = getElement<HTMLElement>(documentRef, "approximateWeeks");
  const totalDays = getElement<HTMLElement>(documentRef, "totalDays");
  const birthWeekday = getElement<HTMLElement>(documentRef, "birthWeekday");
  const nextBirthday = getElement<HTMLElement>(documentRef, "nextBirthday");
  const daysUntilBirthday = getElement<HTMLElement>(documentRef, "daysUntilBirthday");

  if (form.dataset.ageCalculatorInitialized !== "true") {
    if (!referenceDate.value) referenceDate.value = localDateValue(today);
    form.dataset.ageCalculatorInitialized = "true";
  }
  if (form.dataset.ageCalculatorBound === "true") return;
  form.dataset.ageCalculatorBound = "true";
  const setError = (message: string) => { error.textContent = message; error.hidden = !message; };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const birth = parseCivilDate(birthDate.value);
    const reference = parseCivilDate(referenceDate.value);
    if (!birth || !reference) { setError(copy.required); resultElement.hidden = true; return; }
    const result = calculateAge(birth, reference);
    if (!result) { setError(copy.futureBirth); resultElement.hidden = true; return; }
    setError("");
    exactAge.textContent = `${result.years} ${copy.ageUnits[0]}, ${result.months} ${copy.ageUnits[1]}, ${result.days} ${copy.ageUnits[2]}`;
    approximateMonths.textContent = String(result.approximateMonths);
    approximateWeeks.textContent = String(result.approximateWeeks);
    totalDays.textContent = String(result.totalDays);
    birthWeekday.textContent = copy.weekdays[getWeekday(birth)] ?? "";
    nextBirthday.textContent = formatCivilDate(result.nextBirthday, copy.dateLocale);
    daysUntilBirthday.textContent = String(result.daysUntilNextBirthday);
    resultElement.hidden = false;
  });
};
