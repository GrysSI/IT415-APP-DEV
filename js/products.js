// Product data is intentionally hard-coded for the practical examination.
// Prices use centavos to avoid floating-point rounding errors in later stages.
export const PRODUCTS = Object.freeze([
  Object.freeze({ id: "rice", name: "Rice (Plain)", priceInCentavos: 1500, icon: "🍚" }),
  Object.freeze({
    id: "fried-chicken",
    name: "Fried Chicken (1 pc)",
    priceInCentavos: 6500,
    icon: "🍗",
  }),
  Object.freeze({ id: "pork-adobo", name: "Pork Adobo", priceInCentavos: 6000, icon: "🍲" }),
  Object.freeze({
    id: "vegetable-side-dish",
    name: "Vegetable Side Dish",
    priceInCentavos: 3500,
    icon: "🥗",
  }),
  Object.freeze({ id: "iced-tea", name: "Iced Tea (cup)", priceInCentavos: 2000, icon: "🥤" }),
  Object.freeze({
    id: "bottled-water",
    name: "Bottled Water",
    priceInCentavos: 2000,
    icon: "💧",
  }),
]);
