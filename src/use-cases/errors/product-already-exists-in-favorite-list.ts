export class ProductAlreadyExistsInFavoriteList extends Error {
  constructor() {
    super("Product already exists in favorite list.");
  }
}
