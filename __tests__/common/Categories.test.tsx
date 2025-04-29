// En categories.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Categories } from "@/components/common/Categories"; // Ajusta la ruta
import { useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { categories } from "@/config";

// Mockeamos los módulos
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@/hooks/useCategories", () => ({
  useCategories: vi.fn(),
}));

vi.mock("@/config", () => ({
  categories: ["Todas", "Categoria1", "Categoria2"], // Mock mínimo
}));

describe("Categories Component", () => {
  // @ts-expect-error: Namespace 'vi' not found.
  const mockUseSearchParams = useSearchParams as vi.Mock;
  // @ts-expect-error: Namespace 'vi' not found.
  const mockUseCategories = useCategories as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock por defecto: categoría no seleccionada
    mockUseSearchParams.mockReturnValue({
      get: () => null,
    });
    // Mock por defecto del hook
    mockUseCategories.mockReturnValue(vi.fn());
  });

  it("debería renderizar todas las categorías", () => {
    render(<Categories />);

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('debería mostrar la categoría "Todas" como seleccionada por defecto', () => {
    render(<Categories />);

    const todasButton = screen.getByText("Todas");
    expect(todasButton).toHaveClass("bg-black", "text-white");
  });

  it("debería aplicar estilos de categoría seleccionada según el parámetro URL", () => {
    const mockCategory = "Categoria1";
    mockUseSearchParams.mockReturnValue({
      get: () => mockCategory,
    });

    render(<Categories />);

    const selectedButton = screen.getByText(mockCategory);
    const unselectedButton = screen.getByText("Categoria2");

    expect(selectedButton).toHaveClass("bg-black", "text-white");
    expect(unselectedButton).toHaveClass("border", "border-black/20");
  });

  it("debería llamar a handleCategoryChange al hacer clic en una categoría", async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    mockUseCategories.mockReturnValue(mockHandler);

    render(<Categories />);

    const targetCategory = "Categoria2";
    await user.click(screen.getByText(targetCategory));

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith(targetCategory);
  });

  it('debería manejar correctamente la categoría "Todas"', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    mockUseCategories.mockReturnValue(mockHandler);

    const { rerender } = render(<Categories />);

    mockUseSearchParams.mockReturnValue({
      get: () => "Categoria1",
    });

    rerender(<Categories />);

    await user.click(screen.getByText("Todas"));
    expect(mockHandler).toHaveBeenCalledWith("Todas");
  });
});
