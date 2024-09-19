import PropTypes from "prop-types";

export function formatPrice(price) {
  return "$" + price.toFixed(2);
}

export function getDiscountAmount(price, discount) {
  return (price * discount) / 100;
}

export function getDiscountedPrice(price, discount) {
  return price - getDiscountAmount(price, discount);
}

export function getCartCount(cart) {
  return cart.reduce((count, product) => count + product.amount, 0);
}

export function capitalizeFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const Product = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  discount: PropTypes.number,
  popular: PropTypes.bool,
  onSale: PropTypes.bool,
};

export const DISCOUNT_CODES = [
  { code: "DISC15", discount: 15 },
  { code: "DISC10", discount: 10 },
  { code: "DISC20", discount: 20 },
];

export const PAGE_SIZE = 20;

export const CATEGORIES = [
  ["tv", "TV"],
  ["audio", "Audio"],
  ["laptop", "Laptop"],
  ["mobile", "Mobile"],
  ["gaming", "Gaming"],
  ["appliances", "Appliances"],
];
