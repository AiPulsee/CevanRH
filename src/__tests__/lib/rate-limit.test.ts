import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows the first request", () => {
    expect(checkRateLimit("test-key-1", 5, 60_000)).toBe(true);
  });

  it("allows requests up to the limit", () => {
    const key = "test-key-2";
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(key, 5, 60_000)).toBe(true);
    }
  });

  it("blocks requests exceeding the limit", () => {
    const key = "test-key-3";
    for (let i = 0; i < 5; i++) checkRateLimit(key, 5, 60_000);
    expect(checkRateLimit(key, 5, 60_000)).toBe(false);
  });

  it("blocks multiple times once limit is hit", () => {
    const key = "test-key-4";
    for (let i = 0; i < 3; i++) checkRateLimit(key, 3, 60_000);
    expect(checkRateLimit(key, 3, 60_000)).toBe(false);
    expect(checkRateLimit(key, 3, 60_000)).toBe(false);
  });

  it("resets after the window expires", () => {
    const key = "test-key-5";
    for (let i = 0; i < 3; i++) checkRateLimit(key, 3, 60_000);
    expect(checkRateLimit(key, 3, 60_000)).toBe(false);

    vi.advanceTimersByTime(60_001);
    expect(checkRateLimit(key, 3, 60_000)).toBe(true);
  });

  it("different keys are independent", () => {
    const keyA = "test-key-6a";
    const keyB = "test-key-6b";
    for (let i = 0; i < 2; i++) checkRateLimit(keyA, 2, 60_000);
    expect(checkRateLimit(keyA, 2, 60_000)).toBe(false);
    expect(checkRateLimit(keyB, 2, 60_000)).toBe(true);
  });

  it("limit=1 blocks the second request", () => {
    const key = "test-key-7";
    expect(checkRateLimit(key, 1, 60_000)).toBe(true);
    expect(checkRateLimit(key, 1, 60_000)).toBe(false);
  });
});
