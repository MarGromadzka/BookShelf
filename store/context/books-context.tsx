import {createContext, useEffect, useReducer, useState} from "react";
import {Book, BookTemplate} from "../../models/book";
// import {BOOKS} from "../../data/dummy-data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: Book[]) => {
    console.warn('storeData');
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("books", jsonValue);
    } catch (e) {
        console.error("books storeData error!");
    }
}

const getData = async () => {
    try {
        const jsonValue: string | null = await AsyncStorage.getItem("books");
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("books getData error!");
    }
}

export const BooksContext = createContext({
    books: [] as Book[],
    addBook: (book: BookTemplate) => {},
    modifyBook: (id: string, book: BookTemplate) => {},
    removeBook: (id: string) => {},
});

function BooksContextProvider({children} : {children: any}) {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function loadAll() {
            const data: Book[] = await getData();
            if (data)
                setBooks(data);
        }
        loadAll();
    }, []);

    useEffect(() => {
        storeData(books);
    }, [books]);

    function addBook(bookTemplate: BookTemplate) {
        setBooks((currentBooks: typeof books) => [...currentBooks, {...bookTemplate, id: Math.random().toString()}])
    }
    function removeBook(id: string) {
        setBooks((currentFavIds: typeof books) =>
            currentFavIds.filter(book => book.id !== id))
    }
    function modifyBook(id: string, bookTemplate: BookTemplate) {
        const oldBookIdx = books.findIndex((book) => book.id === id);
        if (oldBookIdx < 0)
            return;
        setBooks((currentBooks: typeof books) => [
            ...currentBooks.filter((book) => book.id !== id),
            {...bookTemplate, id: id}
        ])
    }

    const value = {
        books: books,
        addBook: addBook,
        modifyBook: modifyBook,
        removeBook: removeBook,
    }

    return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}

export default BooksContextProvider;