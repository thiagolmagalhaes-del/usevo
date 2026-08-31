import { describe, expect, it } from "vitest";
import { addWinnerToHistory, chooseWinnerIndex, createWinnerSnapshot, HISTORY_LIMIT, isWinnerSnapshotCurrent, normalizeParticipants, removeOccurrence, secureRandomInt, shuffleParticipants, winnerRotation } from "./wheel-of-names";

const source = (...values: number[]) => ({ getRandomValues: (array: Uint32Array) => { array[0] = values.shift() ?? 0; return array; } });

describe("wheel of names logic", () => {
  it("normalizes lines without removing duplicates or internal spaces", () => {
    expect(normalizeParticipants("  Ana  \n\n Bia  Silva \nAna\n🙂 ")).toEqual({ participants: ["Ana", "Bia  Silva", "Ana", "🙂"], overLimit: false, count: 4 });
    expect(normalizeParticipants(Array.from({ length: 101 }, (_, i) => `Name ${i}`).join("\n")).overLimit).toBe(true);
  });
  it("uses rejection sampling and returns an in-range index", () => {
    expect(secureRandomInt(3, source(0xffffffff, 7))).toBe(1);
    expect(chooseWinnerIndex(["a", "b", "c"], source(2))).toBe(2);
    expect(() => chooseWinnerIndex(["only"])).toThrow();
  });
  it("shuffles while preserving every occurrence and removes one occurrence", () => {
    expect(shuffleParticipants(["a", "b", "a"], source(0, 0))).toEqual(["b", "a", "a"]);
    expect(removeOccurrence(["a", "b", "a"], 0)).toEqual(["b", "a"]);
  });
  it("aligns the chosen slice and limits history", () => {
    for (const count of [2, 3, 4, 6, 7, 10, 100]) {
      for (const index of [0, Math.floor(count / 2), count - 1]) {
        const rotation = winnerRotation(index, count, 0, 5);
        const slice = 360 / count;
        const centerAfterRotation = ((index + 0.5) * slice + rotation) % 360;
        expect(centerAfterRotation).toBeCloseTo(0, 8);
      }
    }
    expect(winnerRotation(1, 2, winnerRotation(0, 2, 0, 5), 5)).toBeGreaterThan(winnerRotation(0, 2, 0, 5));
    const history = Array.from({ length: HISTORY_LIMIT + 2 }, (_, i) => `n${i}`).reduce<string[]>((list, name) => addWinnerToHistory(list, name), []);
    expect(history).toHaveLength(HISTORY_LIMIT);
    expect(history[0]).toBe("n11");
  });
  it("invalidates a winner snapshot when the participant list changes", () => {
    const snapshot = createWinnerSnapshot(["Ana", "Ana", "Bia"], 0);
    expect(isWinnerSnapshotCurrent(snapshot, ["Ana", "Ana", "Bia"])).toBe(true);
    expect(isWinnerSnapshotCurrent(snapshot, ["Bia", "Ana", "Ana"])).toBe(false);
    expect(isWinnerSnapshotCurrent(snapshot, ["Ana", "Bia"])).toBe(false);
  });
  it("fails explicitly without a secure random source and leaves the list untouched", () => {
    const original = ["A", "B", "C"];
    expect(() => shuffleParticipants(original, { getRandomValues: undefined } as never)).toThrow("Secure randomness is unavailable");
    expect(original).toEqual(["A", "B", "C"]);
  });
});
