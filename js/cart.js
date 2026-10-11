/**
 * Returns a new cart with one additional unit of the selected product.
 * Cart keys are product IDs and values are positive integer quantities.
 */
export function addCartItem(cart, productId) {
  const nextCart = new Map(cart);
  nextCart.set(productId, (nextCart.get(productId) ?? 0) + 1);
  return nextCart;
}

/**
 * Returns a new cart with one fewer unit. A quantity of zero removes the item.
 */
export function decreaseCartItem(cart, productId) {
  const currentQuantity = cart.get(productId) ?? 0;
  const nextCart = new Map(cart);

  if (currentQuantity <= 1) {
    nextCart.delete(productId);
  } else {
    nextCart.set(productId, currentQuantity - 1);
  }

  return nextCart;
}

/** Returns a new cart without the selected product. */
export function removeCartItem(cart, productId) {
  const nextCart = new Map(cart);
  nextCart.delete(productId);
  return nextCart;
}

/**
 * Produces the single calculation result used by the cart and review screens.
 * Invalid cart entries or unknown product IDs are ignored defensively.
 */
export function summarizeCart(cart, productsById) {
  const lines = [];
  let itemCount = 0;
  let totalInCentavos = 0;

  for (const [productId, quantity] of cart) {
    const product = productsById.get(productId);

    if (!product || !Number.isInteger(quantity) || quantity <= 0) {
      continue;
    }

    const subtotalInCentavos = product.priceInCentavos * quantity;
    lines.push(Object.freeze({ product, quantity, subtotalInCentavos }));
    itemCount += quantity;
    totalInCentavos += subtotalInCentavos;
  }

  return Object.freeze({
    lines: Object.freeze(lines),
    itemCount,
    totalInCentavos,
  });
}
