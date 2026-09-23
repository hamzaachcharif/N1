export const CURRENCY = "DA";

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-DZ")} ${CURRENCY}`;
}

export function formatPhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
