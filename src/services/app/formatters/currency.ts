const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const currencyFormatter = (value?: number) =>
  value ? formatter.format(value) : "-";
