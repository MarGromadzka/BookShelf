import {Text, View, StyleSheet} from "react-native";
import BooksList from "../Components/BooksList";
import {useContext} from "react";
import {FavouritesContext} from "../store/context/favourites-context";
import {BooksContext} from "../store/context/books-context";

function FavouritesScreen() {
  const favBooksContext = useContext(FavouritesContext);
  const books = useContext(BooksContext).books;
  const favouriteBooks = books.filter(book => favBooksContext.books_ids.includes(book.id));

  if (favouriteBooks.length === 0)
    return (
      <View style={styles.noBooksContainer}>
        <Text style={styles.noBooksText}>It seems like you haven't added any books to your favourites yet.</Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <BooksList books={favouriteBooks} />
    </View>
  )
}

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5DC",
    flex: 1,
  },
  noBooksContainer: {
    backgroundColor: "#F5F5DC",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBooksText: {
    width: '70%',
    textAlign: 'center',
  },
})