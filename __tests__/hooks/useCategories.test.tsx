import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

// Solo necesitamos mockear next/navigation una vez para todos los hooks
// en este archivo si comparten dependencias de este módulo
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(), // Mockeamos useSearchParams como un spy
  useRouter: vi.fn(), // También mockeamos useRouter
}));

// Importamos las funciones mockeadas para un acceso fácil y para tipado
import { useSearchParams, useRouter } from "next/navigation";

// Importamos el hook que queremos probar
import { useCategories } from "@/hooks/useCategories"; // Ajusta la ruta de importación si es necesario

describe("useCategories", () => {
  // @ts-expect-error: Namespace 'vi' not found.
  let mockUseSearchParams: vi.Mock;
  // @ts-expect-error: Namespace 'vi' not found.
  let mockUseRouter: vi.Mock;
  // @ts-expect-error: Namespace 'vi' not found.
  let mockReplace: vi.Mock; // Para guardar la función replace mockeada

  beforeEach(() => {
    // Reseteamos todos los mocks antes de cada prueba
    vi.resetAllMocks();

    // Obtenemos las funciones mockeadas
    // @ts-expect-error: Namespace 'vi' not found.
    mockUseSearchParams = useSearchParams as vi.Mock;
    // @ts-expect-error: Namespace 'vi' not found.
    mockUseRouter = useRouter as vi.Mock;

    // Creamos un mock para la función replace del router
    mockReplace = vi.fn();

    // Mock por defecto para useRouter: devuelve un objeto con la función replace mockeada
    mockUseRouter.mockReturnValue({
      replace: mockReplace,
      // Añade otros métodos del router si tu hook los usara, por ejemplo, push, refresh, prefetch
    });

    // Mock por defecto para useSearchParams: empieza sin parámetros de búsqueda
    // Necesita un método toString() porque el hook usa `new URLSearchParams(searchParams.toString())`
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => ""), // Por defecto: parámetros vacíos
      // Puede que necesites mockear otros métodos como .get() si el hook leyera parámetros además de toString()
    });
  });

  it("debería devolver una función", () => {
    const { result } = renderHook(() => useCategories());
    expect(result.current).toBeInstanceOf(Function);
  });

  it("debería añadir el parámetro de búsqueda category cuando se selecciona una categoría y no hay parámetros existentes", () => {
    // Obtenemos la función handleCategoryChange devuelta por el hook
    const { result } = renderHook(() => useCategories());
    const handleCategoryChange = result.current;

    // Llamamos a la función con una categoría
    handleCategoryChange("Technology");

    // Aseguramos que router.replace fue llamada con la URL correcta
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("?category=Technology");
  });

  it("debería reemplazar el parámetro de búsqueda category cuando se selecciona una categoría diferente", () => {
    // Mockeamos useSearchParams para devolver parámetros existentes
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => "category=Food&sort=asc"),
    });

    const { result } = renderHook(() => useCategories());
    const handleCategoryChange = result.current;

    handleCategoryChange("Technology");

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // URLSearchParams ordena los parámetros alfabéticamente por defecto en toString()
    expect(mockReplace).toHaveBeenCalledWith("?category=Technology&sort=asc");
  });

  it('debería eliminar el parámetro de búsqueda category cuando se selecciona "Todas" y category existe', () => {
    // Mockeamos useSearchParams para devolver parámetros existentes incluyendo category
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => "search=test&category=Technology"),
    });

    const { result } = renderHook(() => useCategories());
    const handleCategoryChange = result.current;

    handleCategoryChange("Todas");

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // El parámetro category debería ser eliminado
    expect(mockReplace).toHaveBeenCalledWith("?search=test");
  });

  it('debería eliminar el parámetro category y dejar otros parámetros cuando se selecciona "Todas" y category existe con otros', () => {
    // Mockeamos useSearchParams para devolver parámetros existentes incluyendo category
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => "search=test&category=Technology&page=2"),
    });

    const { result } = renderHook(() => useCategories());
    const handleCategoryChange = result.current;

    handleCategoryChange("Todas");

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // URLSearchParams ordena los parámetros alfabéticamente por defecto en toString()
    expect(mockReplace).toHaveBeenCalledWith("?search=test&page=2");
  });

  it('no debería cambiar los parámetros si se selecciona "Todas" y no hay categoría existente', () => {
    // Mockeamos useSearchParams para devolver parámetros sin categoría, pero quizás otros
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => "search=test&page=1"),
    });

    const { result } = renderHook(() => useCategories());
    const handleCategoryChange = result.current;

    handleCategoryChange("Todas");

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // URLSearchParams ordena los parámetros alfabéticamente por defecto en toString()
    expect(mockReplace).toHaveBeenCalledWith("?search=test&page=1"); // No debería eliminar otros parámetros
  });

  it('debería manejar correctamente los parámetros de búsqueda iniciales vacíos cuando se selecciona "Todas"', () => {
    // Mockeamos useSearchParams para devolver parámetros vacíos
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => ""),
    });

    const { result } = renderHook(() => useCategories());
    const handleCategoryChange = result.current;

    handleCategoryChange("Todas");

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // Debería reemplazar con una cadena de query vacía
    expect(mockReplace).toHaveBeenCalledWith("?");
  });
});
