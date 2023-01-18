import {FlatList, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {CATEGORIES} from "../../data/dummy-data";
import React from "react";
import CategoryGridTile from "../../Components/CategoryGridTile";
import { CategoriesNavigationProps } from "../../App";
import Category from "../../models/category";

function CategoriesScreen() {
  const navigation = useNavigation<CategoriesNavigationProps>();

  function pressHandler(item: Category) {
    navigation.navigate("CategoryOverview", {
      categoryId: item.id
    });
  }

  return <FlatList
    contentContainerStyle={styles.list}
    data={CATEGORIES}
    keyExtractor={item => item.id}
    renderItem={({item}) => <CategoryGridTile title={item.title} color={item.color} onPress={() => pressHandler(item)} />}
    numColumns={2}
  />
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingBottom: 40,
  },
})