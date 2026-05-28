import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

const { mockAuth, mockPrisma, mockGetSettings } = vi.hoisted(() => {
  const mockPrisma = {
    application: { findUnique: vi.fn(), update: vi.fn(), create: vi.fn() },
    placement: { create: vi.fn(), update: vi.fn(), findUnique: vi.fn(), findMany: vi.fn() },
    job: { update: vi.fn(), findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    commission: { create: vi.fn(), findFirst: vi.fn(), update: vi.fn() },
    $transaction: vi.fn(),
  };
  return { mockAuth: vi.fn(), mockPrisma, mockGetSettings: vi.fn() };
});

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/actions/settings", () => ({ getSettings: mockGetSettings }));

import {
  createPlacement,
  confirmEffective,
  terminatePlacement,
  hireAndPlace,
} from "@/actions/placements";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

const defaultFeeSettings = {
  "managed.fee_type": "percentage",
  "managed.fee_percentage": "50",
  "managed.fee_fixed": "",
};

describe("createPlacement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.placement.create.mockResolvedValue({ id: "p-1" });
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await createPlacement({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
  });

  it("fails without PLACEMENTS permission", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "u1", role: "ADMIN", permissions: ["MANAGED"] },
      expires: "2099-01-01",
    } as Session);
    const result = await createPlacement({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
  });

  it("fails when application is not found", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue(null);
    const result = await createPlacement({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/candidatura/i);
  });

  it("fails when application is not HIRED", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue({
      id: "app-1", status: "APPLIED", placement: null, job: {}
    });
    const result = await createPlacement({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/HIRED/);
  });

  it("fails when application already has a placement", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue({
      id: "app-1", status: "HIRED", placement: { id: "existing" }, job: {}
    });
    const result = await createPlacement({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/alocação/i);
  });

  it("creates placement with 90-day trial period", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue({
      id: "app-1", status: "HIRED", placement: null, job: {}
    });

    const result = await createPlacement({
      applicationId: "app-1",
      monthlySalary: 5000,
      startDate: "2026-01-01",
    });

    expect(result.success).toBe(true);
    const createArgs = mockPrisma.placement.create.mock.calls[0][0];
    const start = new Date("2026-01-01");
    const expectedTrialEnd = new Date("2026-01-01");
    expectedTrialEnd.setDate(expectedTrialEnd.getDate() + 90);
    expect(createArgs.data.trialEndDate).toEqual(expectedTrialEnd);
    expect(createArgs.data.status).toBe("TRIAL");
  });
});

describe("confirmEffective", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.placement.update.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await confirmEffective("p-1");
    expect(result.success).toBe(false);
  });

  it("fails when placement is not in TRIAL status", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.placement.findUnique.mockResolvedValue({
      id: "p-1",
      status: "EFFECTIVE",
      application: { job: { companyId: "c-1" } },
    });
    const result = await confirmEffective("p-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/experiência/i);
  });

  it("fails when placement is not found", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.placement.findUnique.mockResolvedValue(null);
    const result = await confirmEffective("p-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/alocação/i);
  });

  it("confirms placement as EFFECTIVE", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.placement.findUnique.mockResolvedValue({
      id: "p-1",
      status: "TRIAL",
      application: { job: { companyId: "c-1" } },
    });
    const result = await confirmEffective("p-1");
    expect(result.success).toBe(true);
    expect(mockPrisma.placement.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "p-1" },
        data: expect.objectContaining({ status: "EFFECTIVE" }),
      })
    );
  });
});

describe("terminatePlacement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.placement.update.mockResolvedValue({});
    mockPrisma.job.update.mockResolvedValue({});
  });

  it("fails when placement is not found", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.placement.findUnique.mockResolvedValue(null);
    const result = await terminatePlacement("p-1");
    expect(result.success).toBe(false);
  });

  it("fails when placement is not in TRIAL status", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.placement.findUnique.mockResolvedValue({
      id: "p-1",
      status: "EFFECTIVE",
      application: { job: { id: "job-1", companyId: "c-1" } },
    });
    const result = await terminatePlacement("p-1");
    expect(result.success).toBe(false);
  });

  it("terminates placement and reopens the job", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.placement.findUnique.mockResolvedValue({
      id: "p-1",
      status: "TRIAL",
      application: { job: { id: "job-1", companyId: "c-1" } },
    });
    const result = await terminatePlacement("p-1", "Não houve fit cultural.");
    expect(result.success).toBe(true);
    expect(mockPrisma.placement.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "TERMINATED",
          terminationReason: "Não houve fit cultural.",
        }),
      })
    );
    expect(mockPrisma.job.update).toHaveBeenCalledWith({
      where: { id: "job-1" },
      data: { status: "ACTIVE" },
    });
  });
});

describe("hireAndPlace", () => {
  function makeMockTx() {
    return {
      application: { findUnique: vi.fn(), update: vi.fn(), create: vi.fn() },
      job: { findUnique: vi.fn(), update: vi.fn() },
      placement: { findUnique: vi.fn(), create: vi.fn() },
      commission: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
    };
  }

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetSettings.mockResolvedValue(defaultFeeSettings);
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await hireAndPlace({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
  });

  it("fails when application is not found in transaction", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const tx = makeMockTx();
    tx.application.findUnique.mockResolvedValue(null);
    mockPrisma.$transaction.mockImplementation(async (fn: any) => fn(tx));
    const result = await hireAndPlace({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/candidatura/i);
  });

  it("fails when placement already exists", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const tx = makeMockTx();
    tx.application.findUnique.mockResolvedValue({ jobId: "j-1", job: { companyId: "c-1" } });
    tx.placement.findUnique.mockResolvedValue({ id: "existing-placement" });
    mockPrisma.$transaction.mockImplementation(async (fn: any) => fn(tx));
    const result = await hireAndPlace({ applicationId: "app-1", monthlySalary: 5000, startDate: "2026-01-01" });
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/alocação/i);
  });

  it("calculates commission at 50% of salary (percentage mode)", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const tx = makeMockTx();
    tx.application.findUnique.mockResolvedValue({ jobId: "j-1", job: { companyId: "c-1" } });
    tx.placement.findUnique.mockResolvedValue(null);
    tx.application.update.mockResolvedValue({});
    tx.job.update.mockResolvedValue({});
    tx.placement.create.mockResolvedValue({ id: "p-new" });
    tx.commission.findFirst.mockResolvedValue(null);
    tx.commission.create.mockResolvedValue({});
    mockPrisma.$transaction.mockImplementation(async (fn: any) => fn(tx));

    const result = await hireAndPlace({ applicationId: "app-1", monthlySalary: 6000, startDate: "2026-01-01" });
    expect(result.success).toBe(true);
    expect(tx.commission.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ amount: 3000, percentage: 50 }),
      })
    );
  });

  it("calculates commission in fixed mode", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockGetSettings.mockResolvedValue({
      "managed.fee_type": "fixed",
      "managed.fee_percentage": "50",
      "managed.fee_fixed": "2500.00",
    });
    const tx = makeMockTx();
    tx.application.findUnique.mockResolvedValue({ jobId: "j-1", job: { companyId: "c-1" } });
    tx.placement.findUnique.mockResolvedValue(null);
    tx.application.update.mockResolvedValue({});
    tx.job.update.mockResolvedValue({});
    tx.placement.create.mockResolvedValue({ id: "p-new" });
    tx.commission.findFirst.mockResolvedValue(null);
    tx.commission.create.mockResolvedValue({});
    mockPrisma.$transaction.mockImplementation(async (fn: any) => fn(tx));

    const result = await hireAndPlace({ applicationId: "app-1", monthlySalary: 6000, startDate: "2026-01-01" });
    expect(result.success).toBe(true);
    // fixed: Math.round(2500.00 * 100) = 250000
    expect(tx.commission.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ amount: 250000, percentage: 0 }),
      })
    );
  });

  it("relinks existing commission instead of creating a new one", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const tx = makeMockTx();
    tx.application.findUnique.mockResolvedValue({ jobId: "j-1", job: { companyId: "c-1" } });
    tx.placement.findUnique.mockResolvedValue(null);
    tx.application.update.mockResolvedValue({});
    tx.job.update.mockResolvedValue({});
    tx.placement.create.mockResolvedValue({ id: "p-new" });
    tx.commission.findFirst.mockResolvedValue({ id: "old-comm" });
    tx.commission.update.mockResolvedValue({});
    mockPrisma.$transaction.mockImplementation(async (fn: any) => fn(tx));

    await hireAndPlace({ applicationId: "app-1", monthlySalary: 6000, startDate: "2026-01-01" });
    expect(tx.commission.create).not.toHaveBeenCalled();
    expect(tx.commission.update).toHaveBeenCalledWith({
      where: { id: "old-comm" },
      data: { placementId: "p-new" },
    });
  });

  it("closes the job after hiring", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const tx = makeMockTx();
    tx.application.findUnique.mockResolvedValue({ jobId: "j-1", job: { companyId: "c-1" } });
    tx.placement.findUnique.mockResolvedValue(null);
    tx.application.update.mockResolvedValue({});
    tx.job.update.mockResolvedValue({});
    tx.placement.create.mockResolvedValue({ id: "p-new" });
    tx.commission.findFirst.mockResolvedValue(null);
    tx.commission.create.mockResolvedValue({});
    mockPrisma.$transaction.mockImplementation(async (fn: any) => fn(tx));

    await hireAndPlace({ applicationId: "app-1", monthlySalary: 6000, startDate: "2026-01-01" });
    expect(tx.job.update).toHaveBeenCalledWith({
      where: { id: "j-1" },
      data: { status: "CLOSED" },
    });
  });
});
