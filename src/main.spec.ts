// main.spec.ts
import { calcularTicket, obtenerPorcentajeIva, LineaTicket } from "./main";

describe("Funciones del ticket", () => {
    it("obtenerPorcentajeIva devuelve el porcentaje correcto", () => {
    expect(obtenerPorcentajeIva("general")).toBe(0.21);
    expect(obtenerPorcentajeIva("reducido")).toBe(0.10);
    expect(obtenerPorcentajeIva("superreducidoA")).toBe(0.05);
    expect(obtenerPorcentajeIva("superreducidoB")).toBe(0.04);
    expect(obtenerPorcentajeIva("superreducidoC")).toBe(0.00);
    expect(obtenerPorcentajeIva("sinIva")).toBe(0.00);
  });

  it("calcularTicket calcula correctamente el subtotal, IVA y total", () => {
    const lineas: LineaTicket[] = [
    {
        producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" },
        cantidad: 2,
    },
    {
        producto: { nombre: "Perfume", precio: 20, tipoIva: "general" },
        cantidad: 3,
    },
    {
        producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" },
        cantidad: 6,
    },
    {
        producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" },
        cantidad: 1,
    },
    ];

    const resultado = calcularTicket(lineas);

    expect(resultado.subtotal).toBeCloseTo(75); 
    expect(resultado.totalIva).toBeCloseTo(13.09); 
    expect(resultado.total).toBeCloseTo(81.09); 
  });

  it("calcularTicket maneja entradas vacías", () => {
    const lineas: LineaTicket[] = [];
    const resultado = calcularTicket(lineas);

    expect(resultado.subtotal).toBe(0);
    expect(resultado.totalIva).toBe(0);
    expect(resultado.total).toBe(0);
  });
});
