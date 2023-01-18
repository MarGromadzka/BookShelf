import { Text, View, Pressable, Image, StyleSheet, Platform } from "react-native";
import Book from "../models/book";
import {CATEGORIES} from "../data/dummy-data";

function BookItem({book, onPress}: {book: Book, onPress: () => void}) {
  return (
    <View style={styles.bookCard}>
      <Pressable
        android_ripple={{color: 'gray'}}
        style={({pressed}: {pressed: boolean}) => pressed ? styles.buttonPressed : null}
        onPress={onPress}
      >
        <Image style={styles.image} source={{uri: book.coverUrl}} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <View style={styles.properties}>
          <Text>{book.shelfId}</Text>
          <Text>{book.categoryIds.map((categoryId: string) => CATEGORIES.find(category => category.id === categoryId)?.title).toString()}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default BookItem;

const styles = StyleSheet.create({
  bookCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: Platform.select({android: 'hidden', ios: 'visible'}),
    elevation: 8,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 5,
  },
  author: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  properties: {
    margin: 10,
    marginTop: 0,
    alignItems: 'center'
  },
  buttonPressed: {
    opacity: 0.9,
  },
});