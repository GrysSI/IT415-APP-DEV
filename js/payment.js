/**
 * Converts a peso string into integer centavos without accepting ambiguous input.
 */
export function parseCashAmount(rawAmount) {
  const value = String(rawAmount ?? "").trim();

  if (value === "") {
    return Object.freeze({ ok: false, code: "blank" });
  }

  if (value.startsWith("-")) {
    return Object.freeze({ ok: false, code: "negative" });
  }

  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
    return Object.freeze({ ok: false, code: "invalid" });
  }

  const pesoAmount = Number(value);
  const amountInCentavos = Math.round(pesoAmount * 100);

  if (!Number.isFinite(pesoAmount) || !Number.isSafeInteger(amountInCentavos)) {
    return Object.freeze({ ok: false, code: "invalid" });
  }

  return Object.freeze({ ok: true, amountInCentavos });
}

/**
 * Validates cash against the order total and returns the exact change in centavos.
 */
export function validateCashPayment(rawAmount, totalInCentavos) {
  if (!Number.isSafeInteger(totalInCentavos) || totalInCentavos <= 0) {
    return Object.freeze({ ok: false, code: "invalid-total" });
  }

  const parsed = parseCashAmount(rawAmount);
  if (!parsed.ok) {
    return parsed;
  }

  if (parsed.amountInCentavos < totalInCentavos) {
    return Object.freeze({
      ok: false,
      code: "insufficient",
      amountInCentavos: parsed.amountInCentavos,
      shortfallInCentavos: totalInCentavos - parsed.amountInCentavos,
    });
  }

  return Object.freeze({
    ok: true,
    amountInCentavos: parsed.amountInCentavos,
    changeInCentavos: parsed.amountInCentavos - totalInCentavos,
  });
}

/** Creates a readable in-memory transaction reference. */
export function createTransactionReference(completedAt = new Date(), sequence = 1) {
  const pad = (value, length = 2) => String(value).padStart(length, "0");
  const date = [
    completedAt.getFullYear(),
    pad(completedAt.getMonth() + 1),
    pad(completedAt.getDate()),
  ].join("");
  const time = [
    pad(completedAt.getHours()),
    pad(completedAt.getMinutes()),
    pad(completedAt.getSeconds()),
  ].join("");

  return `CC-${date}-${time}-${pad(sequence, 3)}`;
}
