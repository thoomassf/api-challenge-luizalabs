export class FavoriteProductsNotFound extends Error {
  constructor() {
    super("Favorite products not found.");
  }
}
