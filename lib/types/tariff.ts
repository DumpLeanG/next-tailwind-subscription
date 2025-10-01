export interface Tariff {
  id: string;
  period: "1 неделя" | "1 месяц" | "3 месяца" | "Навсегда";
  price: number;
  full_price: number;
  is_best: boolean;
  text: string;
}