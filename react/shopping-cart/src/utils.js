export function formatPrice(price) {
  return "$" + price.toFixed(2);
}

export function getDiscountedPrice(price, discount) {
  const newPrice = (price * (100 - discount)) / 100;
  return formatPrice(newPrice);
}
