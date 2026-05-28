import { vi } from "vitest";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue(null),
  }),
}));

vi.mock("@/lib/audit", () => ({
  logAction: vi.fn().mockResolvedValue(undefined),
}));
