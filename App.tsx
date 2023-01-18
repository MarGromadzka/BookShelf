import { StatusBar } from 'expo-status-bar';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons";
import CategoriesScreen from "./screens/Categories/CategoriesScreen";
import CategoryOverviewScreen from "./screens/Categories/CategoryOverviewScreen";
import BookDetailsScreen from "./screens/Books/BookDetailsScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import FavouritesContextProvider from "./store/context/favourites-context";
import {Book} from "./models/book";
import CreateModifyBookScreen from "./screens/Books/CreateModifyBook";
import {Pressable} from "react-native";
import BooksContextProvider from "./store/context/books-context";

// temporarily here
const colors = {
  main: '#c2b280',
  light: '#f5e4b0',
  dark: '#918353',
}

export type CategoriesStackParamList = {
  "MainCategories": undefined
  "CategoryOverview": { categoryId: string }
  "BookDetails": { bookId: string }
  "CreateModifyBook": {book: Book}

};

export type CategoriesNavigationProps = NativeStackNavigationProp<CategoriesStackParamList>;

export type BooksStackParamList = {
    "AllBooks": undefined
    "BookDetails": { bookId: string }
    "CreateModifyBook": {book: Book} | undefined
};

export type BooksNavigationProps = NativeStackNavigationProp<CategoriesStackParamList>;

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function CategoriesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainCategories"
      screenOptions={{
        headerStyle: {backgroundColor: '#C2B280', },
        headerTitleStyle: {fontWeight: 'bold'},
        headerTintColor: 'black',
        headerTitleAlign: 'center',
        contentStyle: {backgroundColor: "#F5F5DC"},
      }}
    >
      <Stack.Screen
        name={"MainCategories"}
        component={CategoriesScreen}
        options={{title: 'Categories'}}
      />
      <Stack.Screen
        name={"CategoryOverview"}
        component={CategoryOverviewScreen}
      />
      <Stack.Screen
        name={"BookDetails"}
        component={BookDetailsScreen}
      />
      <Stack.Screen
        name={"CreateModifyBook"}
        component={CreateModifyBookScreen}
      />
    </Stack.Navigator>
  );
}

function BooksStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="AllBooks"
            screenOptions={{
                headerStyle: {backgroundColor: '#C2B280', },
                headerTitleStyle: {fontWeight: 'bold'},
                headerTintColor: 'black',
                headerTitleAlign: 'center',
                contentStyle: {backgroundColor: "#F5F5DC"},
            }}
        >
            <Stack.Screen
                name={"AllBooks"}
                component={CategoryOverviewScreen}
                options={({navigation}) => ({
                    title: 'All books',
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate("CreateModifyBook")} style={ ({pressed}) => pressed && {opacity: 0.7} }>
                            <Ionicons name="add" size={30} color="black" />
                        </Pressable>
                    )
                })}
            />
            <Stack.Screen
                name={"BookDetails"}
                component={BookDetailsScreen}
            />
            <Stack.Screen
                name={"CreateModifyBook"}
                component={CreateModifyBookScreen}
            />
        </Stack.Navigator>
    );
}

function FavouritesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Favourites"
      screenOptions={{
        headerStyle: {backgroundColor: '#C2B280', },
        headerTitleStyle: {fontWeight: 'bold'},
        headerTintColor: 'black',
        headerTitleAlign: 'center',
        contentStyle: {backgroundColor: "#F5F5DC"},
      }}
    >
      <Tabs.Screen
        name={"Favourites"}
        component={FavouritesScreen}
      />
      <Stack.Screen
        name={"BookDetails"}
        component={BookDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <FavouritesContextProvider>
        <BooksContextProvider>
          <NavigationContainer>
            <Tabs.Navigator
              initialRouteName={"BooksStackNavigator"}
              screenOptions={{
                headerStyle: {backgroundColor: colors.main},
                headerTitleStyle: {fontWeight: 'bold'},
                headerTintColor: 'black',
                headerTitleAlign: 'center',
                tabBarInactiveTintColor: colors.dark,
                tabBarActiveTintColor: colors.dark,
                tabBarActiveBackgroundColor: colors.light,
                tabBarStyle: {backgroundColor: colors.main},
              }}
            >
              <Tabs.Screen
                name={"BooksStackNavigator"}
                component={BooksStackNavigator}
                options={{
                  headerShown: false,
                  title: "All books",
                  tabBarIcon: ({color, size}) => <Ionicons name="book" color={color} size={size} />
                }}
              />
              <Tabs.Screen
                name={"CategoriesStackNavigator"}
                component={CategoriesStackNavigator}
                options={{
                  headerShown: false,
                  title: "Categories",
                  tabBarIcon: ({color, size}) => <Ionicons name="apps-outline" color={color} size={size} />
                }}
              />
              <Tabs.Screen
                name={"FavouritesStackNavigator"}
                component={FavouritesStackNavigator}
                options={{
                  headerShown: false,
                  title: "Favourites",
                  tabBarIcon: ({color, size}) => <Ionicons name="heart-outline" color={color} size={size} />
                }}
              />
            </Tabs.Navigator>
          </NavigationContainer>
        </BooksContextProvider>
      </FavouritesContextProvider>
    </>
  );
};
