import {FlatList, StyleSheet, View, Text} from "react-native";
import BookItem from "./BookItem";
import {Book} from "../models/book";
import {useNavigation} from "@react-navigation/native";
import {CategoriesNavigationProps} from "../App";

function BooksList({books}: {books: Book[]}) {
  const navigation = useNavigation<CategoriesNavigationProps>();

  function pressHandler (book: Book) {
    navigation.navigate("BookDetails", {
      bookId: book.id
    });
  }

  return (
      <FlatList
        contentContainerStyle={styles.list}
        data={books}
        keyExtractor={item => item.id}
        renderItem={item => <BookItem book={item.item} onPress={() => pressHandler(item.item)} />}
        ListEmptyComponent={(
          <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.emptyListTitle}>No books to show</Text>
              <Text>This category doesn't have any books assigned to it.</Text>
              <Text>Yet.</Text>
          </View>
        )}
      />
  )
}

export default BooksList;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingBottom: 30,
    flexGrow: 1,
  },
  emptyListTitle: {
    fontSize: 24,
    marginBottom: 30,
  }
});