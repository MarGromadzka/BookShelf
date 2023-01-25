import {useContext, useLayoutEffect} from "react";
import {Alert} from "react-native";
import {CATEGORIES} from "../../data/categories";
import {useNavigation, useRoute, RouteProp} from "@react-navigation/native";
import {BooksStackParamList, CategoriesNavigationProps, CategoriesStackParamList} from "../../App";
import BooksList from "../../Components/BooksList";
import Category from "../../models/category";
import {BooksContext} from "../../store/context/books-context";

function CategoryOverviewScreen() {
  const navigation = useNavigation<CategoriesNavigationProps>();
  const route = useRoute<RouteProp<CategoriesStackParamList, "CategoryOverview"> | RouteProp<BooksStackParamList, "AllBooks">>();

  const books = useContext(BooksContext).books;

  const categoryId = route.params?.categoryId;
  const displayedBooks = !!categoryId ?
      books.filter((bookItem) => {
    return bookItem.categoryIds.findIndex((bookCategoryId) => bookCategoryId === categoryId) >= 0;
  }) : books;

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

  return <BooksList books={displayedBooks} />
}

export default CategoryOverviewScreen;