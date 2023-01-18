import {useContext, useLayoutEffect} from "react";
import {Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {
  BooksNavigationProps,
  BooksStackParamList,
  CategoriesNavigationProps,
  CategoriesStackParamList
} from "../../App";
import { HeartButton } from "../../Components/FillableButton";
import {CATEGORIES} from "../../data/dummy-data";
import {FavouritesContext} from "../../store/context/favourites-context";
import {BooksContext} from "../../store/context/books-context";
import {Book} from "../../models/book";
import Detail from "../../Components/Detail";

const complexityEmoteMap = {
  'simple': "\u{1F604}",
  'challenging': "\u{1F914}",
  'hard': '\u{1F613}',
}
const affordabilityEmoteMap = {
  'affordable': '\u0024',
  'pricey': '\u0024\u0024',
  'luxurious': '\u0024\u0024\u0024',
}

function BookDetailsScreen() {
  const navigation = useNavigation<CategoriesNavigationProps | BooksNavigationProps>();
  const route = useRoute<RouteProp<CategoriesStackParamList, "BookDetails"> | RouteProp<BooksStackParamList, "BookDetails">>();
  const favBooksContext = useContext(FavouritesContext);

  const books = useContext(BooksContext).books;

  const bookId: string = route.params.bookId;
  let book: Book | undefined = useContext(BooksContext).books.find(book => book.id === bookId);
  if (book === undefined) {
    navigation.goBack();
    Alert.alert("Unrecognized book", "This book was not recognized, therefore you can't see its details.");
    return <View />  // doesn't really matter since we do navigation.goBack(), it only needs to be a React component
  }
  const isBookFavourite: boolean = favBooksContext.books_ids.includes(bookId);

  useLayoutEffect(() => {
    book = books.find(book => book.id === bookId);
    if (book === undefined) {
      navigation.goBack();
      Alert.alert("Unrecognized book", "This book was not recognized, therefore you can't see its details.");
      return
    }
    navigation.setOptions({headerTitle: book.title})
  }, [bookId, navigation])

  function changeFavouriteStatus() {
    if (isBookFavourite) {
      favBooksContext.removeFavourite(bookId);
    } else {
      favBooksContext.addFavourite(bookId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <HeartButton isActive={isBookFavourite} onPress={changeFavouriteStatus} />
      }
    })
  }, [navigation, changeFavouriteStatus])

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Image style={styles.image} source={{uri: book.coverUrl}} />
      <View style={styles.detailsContainer}>
        <Detail name="Title">
          <Text style={styles.bookParam}>{book.title}</Text>
        </Detail>
        <Detail name="Author">
          <Text style={styles.bookParam}>{book.author} &#128338;</Text>
        </Detail>
        <Detail name="Categories">
          {
            book.categoryIds.length > 0 ?
              book.categoryIds.map((categoryId) => {
                const category = CATEGORIES.find((category) => category.id === categoryId);
                return !!category ?
                  <Text key={category.id} style={styles.bookParam}>{category.title}</Text>
                  :
                  undefined;
              })
            :
            <Text style={[styles.bookParam, {fontStyle: 'italic'}]}>No categories associated with this book.</Text>
          }
        </Detail>
        <Detail name="Shelf ID">
          <Text style={styles.bookParam}>{book.shelfId}</Text>
        </Detail>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#C2B280'}]} onPress={() => navigation.navigate("CreateModifyBook", {book: book as Book})}>
          <Text style={styles.buttonText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default BookDetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  detailsCard: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
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
    aspectRatio: 1,
  },
  bookParam: {
    fontSize: 15,
  },
  bookListParam: {
    fontSize: 14,
    paddingLeft: 10,
  },
  bookParamListTitle: {
    paddingBottom: 5,
    fontSize: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
  },
});