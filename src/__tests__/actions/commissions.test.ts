import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

const { mockAuth, mockPrisma } = vi.hoisted(() => {
  const mockPrisma = {
    commission: {
      update: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      aggregate: vi.fn(),
    },
  };
  return { mockAuth: vi.fn(), mockPrisma };
});

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import {
  markCommissionAsInvoiced,
  markCommissionAsPaid,
  waiveCommission,
  getCommissions,
  getCommissionSummary,
} from "@/actions/commissions";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

const financeSession: Session = {
  user: { id: "admin-2", email: "fin@test.com", role: "ADMIN", permissions: ["FINANCE"] } as any,
  expires: "2099-01-01",
};

const noFinanceSession: Session = {
  user: { id: "admin-3", email: "no@test.com", role: "ADMIN", permissions: ["MANAGED"] } as any,
  expires: "2099-01-01",
};

describe("markCommissionAsInvoiced", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.commission.update.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await markCommissionAsInvoiced("comm-1", "NF-001");
    expect(result.success).toBe(false);
  });

  it("fails without FINANCE permission", async () => {
    mockAuth.mockResolvedValue(noFinanceSession);
    const result = await markCommissionAsInvoiced("comm-1", "NF-001");
    expect(result.success).toBe(false);
  });

  it("marks commission as INVOICED (master admin)", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await markCommissionAsInvoiced("comm-1", "NF-001");
    expect(result.success).toBe(true);
    expect(mockPrisma.commission.update).toHaveBeenCalledWith({
      where: { id: "comm-1" },
      data: { status: "INVOICED", invoiceNumber: "NF-001" },
    });
  });

  it("marks commission as INVOICED (with FINANCE permission)", async () => {
    mockAuth.mockResolvedValue(financeSession);
    const result = await markCommissionAsInvoiced("comm-1", "NF-002");
    expect(result.success).toBe(true);
  });
});

describe("markCommissionAsPaid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.commission.update.mockResolvedValue({});
  });

  it("fails without FINANCE permission", async () => {
    mockAuth.mockResolvedValue(noFinanceSession);
    const result = await markCommissionAsPaid("comm-1");
    expect(result.success).toBe(false);
  });

  it("marks commission as PAID and sets paidAt", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const before = new Date();
    const result = await markCommissionAsPaid("comm-1");
    expect(result.success).toBe(true);

    const updateArgs = mockPrisma.commission.update.mock.calls[0][0];
    expect(updateArgs.data.status).toBe("PAID");
    expect(updateArgs.data.paidAt).toBeInstanceOf(Date);
    expect(updateArgs.data.paidAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
  });
});

describe("waiveCommission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.commission.update.mockResolvedValue({});
  });

  it("fails without FINANCE permission", async () => {
    mockAuth.mockResolvedValue(noFinanceSession);
    const result = await waiveCommission("comm-1");
    expect(result.success).toBe(false);
  });

  it("marks commission as WAIVED", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await waiveCommission("comm-1");
    expect(result.success).toBe(true);
    expect(mockPrisma.commission.update).toHaveBeenCalledWith({
      where: { id: "comm-1" },
      data: { status: "WAIVED" },
    });
  });
});

describe("getCommissions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.commission.findMany.mockResolvedValue([]);
  });

  it("returns empty array when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await getCommissions();
    expect(result).toEqual([]);
  });

  it("returns empty array for ADMIN without FINANCE permission", async () => {
    mockAuth.mockResolvedValue(noFinanceSession);
    const result = await getCommissions();
    expect(result).toEqual([]);
  });

  it("returns commissions for ADMIN with FINANCE permission", async () => {
    mockAuth.mockResolvedValue(financeSession);
    mockPrisma.commission.findMany.mockResolvedValue([{ id: "c1" }]);
    const result = await getCommissions();
    expect(result).toHaveLength(1);
  });

  it("filters by status when provided", async () => {
    mockAuth.mockResolvedValue(adminSession);
    await getCommissions({ status: "PENDING" as any });
    expect(mockPrisma.commission.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ status: "PENDING" }) })
    );
  });

  it("restricts EMPLOYER to their own company", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "emp-1", role: "EMPLOYER", companyId: "company-99" },
      expires: "2099-01-01",
    } as Session);
    await getCommissions();
    expect(mockPrisma.commission.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ companyId: "company-99" }) })
    );
  });
});

describe("getCommissionSummary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.commission.count.mockResolvedValue(0);
    mockPrisma.commission.aggregate.mockResolvedValue({ _sum: { amount: 0 } });
  });

  it("returns null when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await getCommissionSummary();
    expect(result).toBeNull();
  });

  it("returns summary with counts and totals", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.commission.count
      .mockResolvedValueOnce(3)  // PENDING
      .mockResolvedValueOnce(1)  // INVOICED
      .mockResolvedValueOnce(5)  // PAID
      .mockResolvedValueOnce(0); // WAIVED
    mockPrisma.commission.aggregate
      .mockResolvedValueOnce({ _sum: { amount: 50000 } }) // pending+invoiced
      .mockResolvedValueOnce({ _sum: { amount: 150000 } }); // paid

    const result = await getCommissionSummary();
    expect(result).not.toBeNull();
    expect(result!.counts.pending).toBe(3);
    expect(result!.counts.paid).toBe(5);
    expect(result!.totals.pending).toBe(50000);
    expect(result!.totals.paid).toBe(150000);
  });
});
