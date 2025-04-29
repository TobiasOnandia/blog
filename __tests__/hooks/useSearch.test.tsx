import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";

// Mockeamos next/navigation como antes
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

// No necesitamos mockear use-debounce, queremos que su lógica de debounce funcione
// para poder testearla.

// Importamos las funciones mockeadas y el hook
import { useSearchParams, useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch"; // Ajusta la ruta de importación si es necesario

describe("useSearch", () => {
  // @ts-expect-error: Namespace 'vi' not found.
  let mockUseSearchParams: vi.Mock;
  // @ts-expect-error: Namespace 'vi' not found.
  let mockUseRouter: vi.Mock;
  // @ts-expect-error: Namespace 'vi' not found.
  let mockReplace: vi.Mock;

  // 1. Habilitar timers falsos
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks(); // Resetear mocks antes de cada test

    // @ts-expect-error: Namespace 'vi' not found.
    mockUseSearchParams = useSearchParams as vi.Mock;
    // @ts-expect-error: Namespace 'vi' not found.
    mockUseRouter = useRouter as vi.Mock;

    // Creamos el mock para replace
    mockReplace = vi.fn();
    mockUseRouter.mockReturnValue({ replace: mockReplace });

    // Mock por defecto para useSearchParams: empieza sin parámetros
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => ""),
    });
  });

  // 2. Restaurar timers reales después de cada test
  afterEach(() => {
    vi.useRealTimers();
  });

  it("debería devolver una función debounced", () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current).toBeInstanceOf(Function);
    // No hay una forma simple de afirmar si una función *es* debounced directamente,
    // lo probamos por su comportamiento en los siguientes tests.
  });

  it("debería actualizar el parámetro search después del delay cuando se escribe un término", () => {
    const { result } = renderHook(() => useSearch());
    const handleSearch = result.current;

    // Llamamos a la función
    handleSearch("hello");

    // La función REPLACE no debería haberse llamado inmediatamente
    expect(mockReplace).not.toHaveBeenCalled();

    // Avanzamos el tiempo por el delay (300ms)
    vi.advanceTimersByTime(300);

    // Ahora sí debería haberse llamado REPLACE
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("?search=hello");
  });

  it("debería limpiar el parámetro search después del delay cuando el término está vacío", () => {
    // Mockeamos parámetros iniciales con un search existente
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => "search=old-query&other=param"),
    });

    const { result } = renderHook(() => useSearch());
    const handleSearch = result.current;

    // Llamamos con término vacío
    handleSearch("");

    // REPLACE no debería llamarse inmediatamente
    expect(mockReplace).not.toHaveBeenCalled();

    // Avanzamos el tiempo
    vi.advanceTimersByTime(300);

    // REPLACE debería haber sido llamada para eliminar el parámetro search
    expect(mockReplace).toHaveBeenCalledTimes(1);
    // URLSearchParams ordena alfabéticamente, por eso esperamos '?other=param'
    expect(mockReplace).toHaveBeenCalledWith("?other=param");
  });

  it('debería llamar a replace con "?" cuando se limpia el search y no hay otros parámetros', () => {
    // Mockeamos parámetros iniciales solo con search
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => "search=old-query"),
    });

    const { result } = renderHook(() => useSearch());
    const handleSearch = result.current;

    handleSearch("");

    expect(mockReplace).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // Basado en el aprendizaje del hook anterior, esperamos '?' para params vacíos
    expect(mockReplace).toHaveBeenCalledWith("?");
  });

  it("debería aplicar debounce: solo la última llamada debería ejecutar después del delay", () => {
    const { result } = renderHook(() => useSearch());
    const handleSearch = result.current;

    // Llamada 1
    handleSearch("first");
    expect(mockReplace).not.toHaveBeenCalled();

    // Avanzamos tiempo, menos que el delay completo
    vi.advanceTimersByTime(100);
    expect(mockReplace).not.toHaveBeenCalled();

    // Llamada 2 (reinicia el timer de debounce)
    handleSearch("second");
    expect(mockReplace).not.toHaveBeenCalled();

    // Avanzamos tiempo, aún menos que el delay completo desde la última llamada
    vi.advanceTimersByTime(150); // Total 250ms desde la última llamada
    expect(mockReplace).not.toHaveBeenCalled();

    // Avanzamos tiempo, suficiente para el delay desde la última llamada (150ms restantes)
    vi.advanceTimersByTime(150); // Total 300ms desde la última llamada ('second')

    // Ahora sí debería haberse llamado, pero solo una vez
    expect(mockReplace).toHaveBeenCalledTimes(1);
    // Y debería usar el término de la ÚLTIMA llamada
    expect(mockReplace).toHaveBeenCalledWith("?search=second");
  });

  it("debería ejecutar múltiples llamadas si están separadas por más del delay", () => {
    const { result } = renderHook(() => useSearch());
    const handleSearch = result.current;

    // Llamada 1
    handleSearch("first");
    // Avanzamos el delay completo
    vi.advanceTimersByTime(300);
    // La primera llamada debería haberse ejecutado
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("?search=first");

    // Limpiamos el historial de llamadas para mayor claridad en esta prueba
    mockReplace.mockClear();

    // Llamada 2 (después de que la primera ya se ejecutó)
    handleSearch("second");
    // No debería llamarse inmediatamente
    expect(mockReplace).not.toHaveBeenCalled();

    // Avanzamos el delay completo de nuevo
    vi.advanceTimersByTime(300);
    // La segunda llamada debería ejecutarse ahora
    expect(mockReplace).toHaveBeenCalledTimes(1); // Llamada 1 desde el mockClear()
    expect(mockReplace).toHaveBeenCalledWith("?search=second");
  });

  it("debería manejar correctamente los parámetros existentes al añadir search", () => {
    // Mockeamos parámetros iniciales existentes
    mockUseSearchParams.mockReturnValue({
      toString: vi.fn(() => "category=Technology&page=1"),
    });

    const { result } = renderHook(() => useSearch());
    const handleSearch = result.current;

    handleSearch("new query");

    expect(mockReplace).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(mockReplace).toHaveBeenCalledTimes(1);
    // Debería añadir search y mantener los otros (orden alfabético)
    expect(mockReplace).toHaveBeenCalledWith(
      "?category=Technology&page=1&search=new+query"
    ); // Espacios se codifican como +
  });
});
