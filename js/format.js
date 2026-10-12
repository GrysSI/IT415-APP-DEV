const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});

/** Formats an integer centavo amount as Philippine peso currency. */
export function formatPeso(priceInCentavos) {
  return pesoFormatter.format(priceInCentavos / 100);
}

/** Formats a completed transaction timestamp for the digital receipt. */
export function formatTransactionDate(completedAt) {
  return completedAt.toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Returns the singular or plural label used by cart and review counters. */
export function itemCountLabel(itemCount) {
  return `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
}
