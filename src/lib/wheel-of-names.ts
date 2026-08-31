export type RandomSource = { getRandomValues: (array: Uint32Array) => Uint32Array };

export const MAX_PARTICIPANTS = 100;
export const HISTORY_LIMIT = 10;

const cryptoSource = (): RandomSource | undefined => {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis && globalThis.crypto?.getRandomValues) return globalThis.crypto;
  return undefined;
};

export const normalizeParticipants = (raw: string, max = MAX_PARTICIPANTS) => {
  const participants = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return { participants, overLimit: participants.length > max, count: participants.length };
};

export const secureRandomInt = (max: number, source: RandomSource = cryptoSource() as RandomSource): number => {
  if (!Number.isInteger(max) || max <= 0) throw new RangeError("max must be a positive integer");
  if (!source?.getRandomValues) throw new Error("Secure randomness is unavailable");
  const limit = Math.floor(0x100000000 / max) * max;
  const value = new Uint32Array(1);
  do source.getRandomValues(value); while (value[0] >= limit);
  return value[0] % max;
};

export const chooseWinnerIndex = (participants: readonly string[], source?: RandomSource) => {
  if (participants.length < 2) throw new RangeError("At least two participants are required");
  return secureRandomInt(participants.length, source);
};

export const shuffleParticipants = (participants: readonly string[], source?: RandomSource) => {
  const shuffled = [...participants];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = secureRandomInt(index + 1, source);
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
};

export const removeOccurrence = (participants: readonly string[], index: number) =>
  index >= 0 && index < participants.length ? [...participants.slice(0, index), ...participants.slice(index + 1)] : [...participants];

export type WinnerSnapshot = { participants: readonly string[]; index: number; winner: string };

export const createWinnerSnapshot = (participants: readonly string[], index: number): WinnerSnapshot => {
  if (index < 0 || index >= participants.length) throw new RangeError("Invalid winner index");
  return { participants: [...participants], index, winner: participants[index] };
};

export const isWinnerSnapshotCurrent = (snapshot: WinnerSnapshot | null, participants: readonly string[]) =>
  Boolean(snapshot) && snapshot!.participants.length === participants.length && snapshot!.participants.every((value, index) => value === participants[index]);

export const winnerRotation = (index: number, count: number, currentRotation = 0, turns = 5) => {
  if (!Number.isInteger(index) || !Number.isInteger(count) || count < 1 || index < 0 || index >= count) throw new RangeError("Invalid wheel index");
  const slice = 360 / count;
  const alignment = (360 - ((index + 0.5) * slice + currentRotation) % 360) % 360;
  return currentRotation + turns * 360 + alignment;
};

export const addWinnerToHistory = (history: readonly string[], winner: string) => [winner, ...history].slice(0, HISTORY_LIMIT);
