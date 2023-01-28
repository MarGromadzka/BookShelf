import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {Alert, TouchableOpacity, View, StyleSheet, TextInput} from "react-native";
import {CATEGORIES} from "../../data/categories";
import {useNavigation, useRoute, RouteProp} from "@react-navigation/native";
import {BooksStackParamList, CategoriesNavigationProps, CategoriesStackParamList} from "../../App";
import BooksList from "../../Components/BooksList";
import Category from "../../models/category";
import {BooksContext} from "../../store/context/books-context";
import {FontAwesome} from "@expo/vector-icons";
import {Book} from "../../models/book";

function CategoryOverviewScreen() {
  const navigation = useNavigation<CategoriesNavigationProps>();
  const route = useRoute<RouteProp<CategoriesStackParamList, "CategoryOverview"> | RouteProp<BooksStackParamList, "AllBooks">>();

  const books = useContext(BooksContext).books;

  const categoryId = route.params?.categoryId;
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  // const displayedBooks = ;
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    setDisplayedBooks(!!categoryId ?
      books.filter((bookItem) => {
        return bookItem.categoryIds.findIndex((bookCategoryId) => bookCategoryId === categoryId) >= 0;
      }) : books)
  }, [books]);

  useLayoutEffect(() => {
    let category: Category | undefined = CATEGORIES.find(category => category.id == categoryId);
    if (route.params?.categoryId !== undefined && category === undefined) {
      navigation.goBack();
      Alert.alert("Unrecognized category", "This category was not recognized, therefore you can't see its details.");
      return
    }
    const categoryTitle: string = category?.title || "All books";
    navigation.setOptions({headerTitle: categoryTitle})
  }, [categoryId, navigation])

  function searchButtonPressed() {
    navigation.setOptions({headerTitle: searchString})
    setDisplayedBooks(books.filter((book) => {
      return book.author.toLowerCase().includes(searchString.toLowerCase()) || book.title.toLowerCase().includes(searchString.toLowerCase());
    }));
  }

  return (
<View style={{flex: 1}}>
  <View style={styles.searchBar}>
    <TextInput
      style={styles.searchBarInput}
      placeholder="Wyszukaj książkę..."
      value={searchString}
      onChangeText={setSearchString}
    />
    <TouchableOpacity
      style={styles.searchBarButton}
      onPress={searchButtonPressed}
    >
      <FontAwesome name="search" size={26} color={'white'} />
    </TouchableOpacity>
  </View>
  <BooksList books={displayedBooks} />
</View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#c7b88b',
    overflow: 'hidden',
  },
  searchBarButton: {
    height: 40,
    width: 40,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#ab9552',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
})

export default CategoryOverviewScreen;