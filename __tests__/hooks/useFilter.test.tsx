import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFilter } from "@/hooks/useFilter"; // Adjust the import path if needed

// Mocking Next.js navigation hooks
// We need to mock the module itself
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(), // Mock useSearchParams as a spy
}));

// Mocking tRPC hook
// Assuming 'trpc' is imported from somewhere like '@/utils/trpc'
// We need to mock the specific hook path used in your code
vi.mock("@/utils/trpc", () => ({
  trpc: {
    post: {
      list: {
        useQuery: vi.fn(), // Mock useQuery as a spy
      },
    },
  },
}));

// Import the mocked modules for type safety and access to mocks
import { useSearchParams } from "next/navigation";
import { trpc } from "@/utils/trpc";

// Sample data to use in tests
const mockPosts = [
  { id: "1", title: "First Post About Tech", category: "Technology" },
  { id: "2", title: "Second Post About Food", category: "Food" },
  { id: "3", title: "Third Tech Post", category: "Technology" },
  { id: "4", title: "Another Food Recipe", category: "Food" },
];

describe("useFilter", () => {
  // @ts-expect-error: Namespace 'vi' not found.
  let mockUseSearchParams: vi.Mock;
  // @ts-expect-error: Namespace 'vi' not found.
  let mockUseQuery: vi.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Get the mocked functions
    // @ts-expect-error: Namespace 'vi' not found.
    mockUseSearchParams = useSearchParams as vi.Mock;
    // @ts-expect-error: Namespace 'vi' not found.
    mockUseQuery = trpc.post.list.useQuery as vi.Mock;

    // Default mock for useSearchParams: no search or category
    mockUseSearchParams.mockReturnValue({
      get: vi.fn((param: string) => {
        if (param === "search") return "";
        if (param === "category") return "";
        return null;
      }),
    });

    // Default mock for tRPC useQuery: returns mockPosts
    mockUseQuery.mockReturnValue({
      data: {
        posts: mockPosts,
      },
      // You might want to mock other properties like isLoading if your hook used them
      isLoading: false,
    });
  });

  it("should return all posts when no search query or category is provided", () => {
    // No specific overrides needed for default mocks

    const { result } = renderHook(() => useFilter());

    expect(result.current).toEqual(mockPosts);
    expect(result.current.length).toBe(4);
  });

  it("should filter posts by search query (case-insensitive)", () => {
    // Override useSearchParams mock for this test
    mockUseSearchParams.mockReturnValue({
      get: vi.fn((param: string) => {
        if (param === "search") return "tech"; // Use lowercase 'tech'
        if (param === "category") return "";
        return null;
      }),
    });

    const { result } = renderHook(() => useFilter());

    const expectedPosts = [
      mockPosts[0], // "First Post About Tech"
      mockPosts[2], // "Third Tech Post"
    ];

    expect(result.current).toEqual(expectedPosts);
    expect(result.current.length).toBe(2);
  });

  it("should filter posts by category", () => {
    // Override useSearchParams mock for this test
    mockUseSearchParams.mockReturnValue({
      get: vi.fn((param: string) => {
        if (param === "search") return "";
        if (param === "category") return "Food";
        return null;
      }),
    });

    const { result } = renderHook(() => useFilter());

    const expectedPosts = [
      mockPosts[1], // "Second Post About Food"
      mockPosts[3], // "Another Food Recipe"
    ];

    expect(result.current).toEqual(expectedPosts);
    expect(result.current.length).toBe(2);
  });

  it("should filter posts by both search query and category", () => {
    // Override useSearchParams mock for this test
    mockUseSearchParams.mockReturnValue({
      get: vi.fn((param: string) => {
        if (param === "search") return "post";
        if (param === "category") return "Technology";
        return null;
      }),
    });

    const { result } = renderHook(() => useFilter());

    const expectedPosts = [
      mockPosts[0], // "First Post About Tech" (includes "Post" and is "Technology")
      mockPosts[2], // "Third Tech Post" (includes "Post" and is "Technology")
    ];

    expect(result.current).toEqual(expectedPosts);
    expect(result.current.length).toBe(2);
  });

  it("should return an empty array if tRPC data is undefined", () => {
    // Override useQuery mock for this test
    mockUseQuery.mockReturnValue({
      data: undefined, // Simulate initial loading state or error
      isLoading: true,
    });

    const { result } = renderHook(() => useFilter());

    expect(result.current).toEqual([]);
    expect(result.current.length).toBe(0);
  });

  it("should return an empty array if tRPC data.posts is undefined", () => {
    // Override useQuery mock for this test
    mockUseQuery.mockReturnValue({
      data: {}, // Simulate a data structure without the posts array
      isLoading: false,
    });

    const { result } = renderHook(() => useFilter());

    expect(result.current).toEqual([]);
    expect(result.current.length).toBe(0);
  });

  it("should return an empty array if tRPC data.posts is an empty array", () => {
    // Override useQuery mock for this test
    mockUseQuery.mockReturnValue({
      data: {
        posts: [], // Simulate an empty list from the API
      },
      isLoading: false,
    });

    // Set some filter parameters to ensure they don't cause errors
    mockUseSearchParams.mockReturnValue({
      get: vi.fn((param: string) => {
        if (param === "search") return "anything";
        if (param === "category") return "any";
        return null;
      }),
    });

    const { result } = renderHook(() => useFilter());

    expect(result.current).toEqual([]);
    expect(result.current.length).toBe(0);
  });

  it("should handle search query and category that match nothing", () => {
    mockUseSearchParams.mockReturnValue({
      get: vi.fn((param: string) => {
        if (param === "search") return "nonexistent";
        if (param === "category") return "none";
        return null;
      }),
    });

    const { result } = renderHook(() => useFilter());

    expect(result.current).toEqual([]);
    expect(result.current.length).toBe(0);
  });
});
