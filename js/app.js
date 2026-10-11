import { PRODUCTS } from "./products.js";

const productGrid = document.querySelector("#product-grid");
const productCount = document.querySelector("#product-count");

/**
 * Formats an integer centavo amount as Philippine peso currency.
 * Keeping monetary values as integers will support exact calculations in Stage 2.
 */
function formatPeso(priceInCentavos) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(priceInCentavos / 100);
}

function createProductCard(product) {
  const button = document.createElement("button");
  button.className = "product-card";
  button.type = "button";
  button.disabled = true;
  button.dataset.productId = product.id;
  button.setAttribute("aria-describedby", "stage-status");
  button.setAttribute("aria-label", `${product.name}, ${formatPeso(product.priceInCentavos)}`);

  const icon = document.createElement("span");
  icon.className = "product-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = product.icon;

  const name = document.createElement("span");
  name.className = "product-name";
  name.textContent = product.name;

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = formatPeso(product.priceInCentavos);

  button.append(icon, name, price);
  return button;
}

function renderProductCatalog() {
  const cards = PRODUCTS.map(createProductCard);
  productGrid.replaceChildren(...cards);
  productCount.textContent = `${PRODUCTS.length} products`;
}

renderProductCatalog();
