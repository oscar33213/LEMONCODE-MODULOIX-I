// main.ts

export type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}


export function obtenerPorcentajeIva(tipoIva: TipoIva): number {
  switch (tipoIva) {
    case "general":
      return 0.21;
    case "reducido":
      return 0.10;
    case "superreducidoA":
      return 0.05;
    case "superreducidoB":
      return 0.04;
    case "superreducidoC":
    case "sinIva":
      return 0.00;
    default:
        throw new Error(`Tipo de IVA desconocido: ${tipoIva}`);
  }
}

// Función para calcular el ticket
export function calcularTicket(lineas: LineaTicket[]) {
  let subtotal = 0;
  let totalIva = 0;

  lineas.forEach((linea) => {
    const { producto, cantidad } = linea;
    const precioTotalLinea = producto.precio * cantidad;
    const ivaLinea = precioTotalLinea * obtenerPorcentajeIva(producto.tipoIva);

    subtotal += precioTotalLinea;
    totalIva += ivaLinea;
  });

  const total = subtotal + totalIva;

  return { subtotal, totalIva, total };
}

