import {createContext, useState} from "react";

export const FavouritesContext = createContext({
  books_ids: [] as string[],
  addFavourite: (id: string) => {},
  removeFavourite: (id: string) => {},
});

function FavouritesContextProvider({children} : {children: any}) {
  const [favouriteBooksIds, setFavouriteBooksIds] = useState([] as string[]);

  function addFavourite(id: string) {
    setFavouriteBooksIds((currentFavIds: typeof favouriteBooksIds) => [...currentFavIds, id])
  }

  function removeFavourite(id: string) {
    setFavouriteBooksIds((currentFavIds: typeof favouriteBooksIds) =>
      currentFavIds.filter(bookId => bookId !== id))
  }

  const value = {
    books_ids: favouriteBooksIds,
    addFavourite: addFavourite,
    removeFavourite: removeFavourite,
  }

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export default FavouritesContextProvider;