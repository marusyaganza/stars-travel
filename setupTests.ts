import "@testing-library/jest-dom/vitest";

import { vi } from "vitest";

// Mock Prisma client to prevent initialization errors during tests
vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
    },
    flight: {
      findFirst: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
    },
    planet: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    starship: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    $disconnect: vi.fn(),
  })),
  ROLE: {
    USER: "USER",
    ADMIN: "ADMIN",
  },
}));

// Mock the database module to prevent Prisma client initialization
vi.mock("@/lib/db", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
    },
    flight: {
      findFirst: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
    },
    planet: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    starship: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}));

// For next/navigation (App Router)
vi.mock("next/navigation", async () => {
  // Use the mock implementation from next-router-mock
  const actual = await vi.importActual("next-router-mock/navigation");
  return {
    ...actual,
    // Optionally, you can override or extend the mock here
    useRouter: actual.useRouter,
    usePathname: actual.usePathname,
    useSearchParams: actual.useSearchParams,
  };
});
