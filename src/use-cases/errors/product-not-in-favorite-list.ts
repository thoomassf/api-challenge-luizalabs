export class ProductNotInFavoriteList extends Error {
  constructor() {
    super("Product not in favorite list");
  }
}
