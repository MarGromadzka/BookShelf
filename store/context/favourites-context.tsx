import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Book} from "../../models/book";

const storeData = async (value: String[]) => {
  console.warn('storeData');
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("favourites", jsonValue);
  } catch (e) {
    console.error("books storeData error!");
  }
}

const getData = async () => {
  try {
    const jsonValue: string | null = await AsyncStorage.getItem("favourites");
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("books getData error!");
  }
}


export const FavouritesContext = createContext({
  books_ids: [] as string[],
  addFavourite: (id: string) => {},
  removeFavourite: (id: string) => {},
});

function FavouritesContextProvider({children} : {children: any}) {
  const [favouriteBooksIds, setFavouriteBooksIds] = useState([] as string[]);

  useEffect(() => {
    async function loadAll() {
      const data: string[] = await getData();
      if (data)
        setFavouriteBooksIds(data);
    }
    loadAll();
  }, []);

  useEffect(() => {
    storeData(favouriteBooksIds);
  }, [favouriteBooksIds]);

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