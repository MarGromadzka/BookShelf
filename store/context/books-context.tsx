import {createContext, useState} from "react";
import {Book, BookTemplate} from "../../models/book";
import {BOOKS} from "../../data/dummy-data";

export const BooksContext = createContext({
    books: BOOKS as Book[],
    addBook: (book: BookTemplate) => {},
    modifyBook: (id: string, book: BookTemplate) => {},
    removeBook: (id: string) => {},
});

function BooksContextProvider({children} : {children: any}) {
    const [books, setBooks] = useState(BOOKS as Book[]);

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