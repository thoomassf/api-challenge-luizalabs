export class FavoritesListAlreadyExistsForThisUser extends Error {
  constructor() {
    super("A favorites list already exists for this user.");
  }
}
