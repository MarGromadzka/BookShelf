import {Alert, ScrollView, View, StyleSheet, TouchableOpacity, Text, FlatList} from "react-native";
import {useContext, useLayoutEffect, useRef, useState} from "react";
import Input from "../../Components/Input";
import {BooksStackParamList, BooksNavigationProps} from "../../App";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {BookTemplate} from "../../models/book";
import {BooksContext} from "../../store/context/books-context";
import {Modalize} from "react-native-modalize";
import {CATEGORIES} from "../../data/dummy-data";


export type ValidValuePair = {
  value: string
  isInvalid: boolean
}

type inputValuesType = {
  title: ValidValuePair,
  author: ValidValuePair,
  coverUrl: ValidValuePair,
  categoryIds: string[],
}

export default function CreateModifyBook() {
  const navigation = useNavigation<BooksNavigationProps>();
  const route = useRoute<RouteProp<BooksStackParamList, "CreateModifyBook">>();
  const booksContext = useContext(BooksContext);

  const book = route.params?.book;
  const categoriesModalizeRef = useRef<Modalize>(null);

  const cancelColor = 'red';



  const [inputs, setInputs]: [inputValuesType, Function] = useState(
    {
      title: {
        value: !!book ? book.title : "",
        isInvalid: false,
      },
      author: {
        value: !!book ? book.author : "",
        isInvalid: false,
      },
      coverUrl: {
        value: !!book ? book.coverUrl : "",
        isInvalid: false,
      },
      categoryIds: !!book ? book.categoryIds : [],
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!book ? "Modify book" : "Add book"
    });
  }, [navigation, !!book])

  async function submitPressed() {
    const titleIsValid: boolean = inputs.title.value.trim().length > 0 && inputs.title.value.trim().length < 100;
    const authorIsValid: boolean = inputs.author.value.trim().length > 0 && inputs.author.value.trim().length < 100;
    const coverUrlIsValid: boolean = inputs.coverUrl.value.trim().length > 0 && inputs.coverUrl.value.trim().length < 400;

    setInputs((currentInputs: inputValuesType) => {
      return {
        ...currentInputs,
        title: {
          value: currentInputs.title.value,
          isInvalid: !titleIsValid,
        },
        author: {
          value: currentInputs.author.value,
          isInvalid: !authorIsValid,
        },
        coverUrl: {
          value: currentInputs.coverUrl.value,
          isInvalid: !coverUrlIsValid,
        },
      } as typeof inputs
    });

    if (!titleIsValid || !authorIsValid || !coverUrlIsValid) {
      const wrongDataArray: string[] = []
      if (!titleIsValid)
        wrongDataArray.push("username")
      if (!authorIsValid)
        wrongDataArray.push("name")
      if  (!coverUrlIsValid)
        wrongDataArray.push("cover url")

      Alert.alert("Invalid values", `Some data seems incorrect. Please check ${wrongDataArray.toString()} and try again.`);
      return;
    }

    const bookTemplate: BookTemplate = {
      title: inputs.title.value,
      author: inputs.author.value,
      shelfId: "ABC",
      coverUrl: inputs.coverUrl.value, // "https://i.insider.com/551ee79eecad04c13bd01304"
      categoryIds: inputs.categoryIds,
    }
    if (!!book) {
      booksContext.modifyBook(book.id, bookTemplate);
    } else {
      booksContext.addBook(bookTemplate);
    }
    navigation.goBack();
  }

  function inputChangedHandler<InputParam extends keyof typeof inputs>(inputIdentifier: InputParam, enteredValue: string) {
    setInputs((currentInputValues: typeof inputs) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: {value: enteredValue, isInvalid: false},
      }
    })
  }

  function CategoriesModal() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{flexGrow: 1,}}
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Text
              style={{fontSize: 24, padding: 20, textAlign: 'center',}}
            >Choose categories</Text>
          }
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.bottomDrawerButton, inputs.categoryIds.findIndex(categoryId => categoryId === item.id) >= 0 && {backgroundColor: '#C2B280'}]}
              onPress={() => {
                setInputs((currentInputs: inputValuesType) => {
                  const isAlreadyChosen = currentInputs.categoryIds.findIndex((categoryId) => categoryId === item.id) >= 0;
                  const newCategoryIds = isAlreadyChosen ?
                    currentInputs.categoryIds.filter(categoryId => categoryId !== item.id)
                    :
                    [...currentInputs.categoryIds, item.id];
                  return {
                    ...currentInputs,
                    categoryIds: newCategoryIds,
                  }})
              }}
            >
              <Text style={{fontSize: 18}}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={<TouchableOpacity
            style={styles.bottomDrawerConfirmButton}
            onPress={() => categoriesModalizeRef.current?.close()}
          >
            <Text style={{fontSize: 20,}}>Confirm</Text>
          </TouchableOpacity>}
        />
      </View>
    )
  }

  // ACTUAL FORM FIELDS

  const titleComponent = <Input
    key="title"
    label="Title"
    isInvalid={inputs.title.isInvalid}
    textInputProps={{
      placeholder: "book's title",
      maxLength: 40,
      onChangeText: inputChangedHandler.bind(null, "title"),
      value: inputs.title.value,
    }}
  />

  const authorComponent = <Input
    key="author"
    label="Author"
    isInvalid={inputs.author.isInvalid}
    textInputProps={{
      placeholder: "book's author",
      maxLength: 40,
      onChangeText: inputChangedHandler.bind(null, "author"),
      value: inputs.author.value,
    }}
  />

  const categoriesComponent = <View style={styles.propertyContainer}>
    <Text style={styles.propertyLabel}>Categories</Text>
    <TouchableOpacity
      style={styles.categoriesButton}
      onPress={() => categoriesModalizeRef.current?.open()}
    >
      <View style={{flexDirection: 'row', paddingVertical: 4,}}>
        {inputs.categoryIds.length > 0 ?
          <Text style={{fontSize: 16, flex: 1}} numberOfLines={1}>{inputs.categoryIds.map((categoryId) => (
            CATEGORIES.find(category => category.id === categoryId)?.title)).toString()}
          </Text>
        :
          <Text style={{fontSize: 16, fontStyle: 'italic', flex: 1,}}>choose categories</Text>
        }
        <Text style={{fontSize: 16}}>{'  >  '}</Text>
      </View>
    </TouchableOpacity>
  </View>

  const coverUrlComponent = <Input
    key="coverUrl"
    label="Cover URL"
    isInvalid={inputs.coverUrl.isInvalid}
    textInputProps={{
      placeholder: "cover URL",
      maxLength: 400,
      onChangeText: inputChangedHandler.bind(null, "coverUrl"),
      value: inputs.coverUrl.value,
    }}
  />

  const buttonsComponent = <View key="buttons" style={styles.buttons}>
    <TouchableOpacity style={[styles.button, {backgroundColor: cancelColor}]} onPress={navigation.goBack}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, {backgroundColor: '#C2B280'}]} onPress={submitPressed}>
      <Text style={styles.buttonText}>{!!book ? "Modify" : "Add"}</Text>
    </TouchableOpacity>
  </View>

  const listElements = [
    titleComponent,
    authorComponent,
    categoriesComponent,
    coverUrlComponent,
  ]



  return <>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}
    >
      {listElements}
      {buttonsComponent}
    </ScrollView>
    <Modalize
      ref={categoriesModalizeRef}
      modalStyle={styles.modalStyle}
      customRenderer={CategoriesModal()}
    />
  </>


}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
    flexGrow: 1,
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
  bottomDrawerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  bottomDrawerConfirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#C2B280',
  },
  propertyLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  propertyContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  categoriesButton: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 18,
    elevation: 5,
    backgroundColor: 'white',
  },
});