import userEvent from "@testing-library/user-event";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "@/components/common/Search"; // Ajusta la ruta
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
// Mockeamos los módulos necesarios
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@/hooks/useSearch", () => ({
  useSearch: vi.fn(),
}));

describe("Search Component", () => {
  const mockUseSearchParams = useSearchParams as vi.Mock;
  const mockUseSearch = useSearch as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock por defecto de useSearchParams (sin parámetros)
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => null,
    });
    // Mock por defecto de useSearch (función vacía)
    mockUseSearch.mockReturnValue(vi.fn());
  });

  it("debería renderizar el input vacío si no hay parámetro 'search' en la URL", () => {
    // El mock por defecto en beforeEach ya maneja esto
    render(<Search />);
    const input = screen.getByTestId("search");
    expect(input).toHaveValue("");
  });

  it("debería renderizar el input con los atributos correctos", () => {
    render(<Search />);

    const input = screen.getByTestId("search");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "search");
    expect(input).toHaveAttribute("name", "search");
    expect(input).toHaveAttribute("placeholder", "Buscar en el archivo...");
    expect(input).toHaveClass(
      "flex-1 w-full md:w-auto px-6 py-3 border border-black/20 focus:border-black/60"
    );
    expect(input).toHaveAttribute("data-testid", "search");
  });

  it("debería establecer el defaultValue desde el parámetro search de la URL", async () => {
    const mockSearchValue = "mi-búsqueda";
    // Mockeamos que existe el parámetro search
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => (key === "search" ? mockSearchValue : null),
    });

    render(<Search />);

    const input = screen.getByTestId("search") as HTMLElement;

    await expect(input).toHaveValue(mockSearchValue);
  });

  it("debería llamar a handleSearch con el nuevo valor al modificar el input", async () => {
    const user = userEvent.setup();
    const mockHandleSearch = vi.fn();
    mockUseSearch.mockReturnValue(mockHandleSearch);

    render(<Search />);

    const input = screen.getByTestId("search");
    const testValue = "nueva búsqueda";

    await user.type(input, testValue);

    // Verificamos que se llamó por cada tecla (puedes ajustar esto según necesidades)
    expect(mockHandleSearch).toHaveBeenCalledTimes(testValue.length);
    // Verificamos que el último llamado fue con el valor completo
    expect(mockHandleSearch).toHaveBeenLastCalledWith(testValue);
  });

  it("debería manejar un cambio directo en el input", () => {
    const mockHandleSearch = vi.fn();
    mockUseSearch.mockReturnValue(mockHandleSearch);

    render(<Search />);

    const input = screen.getByTestId("search");
    const testValue = "texto de prueba";

    fireEvent.change(input, { target: { value: testValue } });

    expect(mockHandleSearch).toHaveBeenCalledWith(testValue);
  });
});
