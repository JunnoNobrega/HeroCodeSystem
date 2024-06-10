import { ReactNode, createContext, useState } from "react";

export type Book = {
    authors: string [];
    categories: string[];
    longDescription: string;
    score: number;
    shortDescription: string;
    status: string;
    thumbnailUrl: string;
    title: string;
    _id: string;
}

type PropsContex = {
    books: Book[];
    handleSetBooks: (book: Book[]) => void;
}

export const BooksContext = createContext({} as PropsContex) 

export function BooksProvider ({children}: {children:ReactNode}){
    const [books, setBooks] = useState<Book[]>([])
    function handleSetBooks(book: Book[]) {
        setBooks(book);
    }
    return (
        <BooksContext.Provider value = {{
            books, 
            handleSetBooks,
        }}>
            {children}
        </BooksContext.Provider>
    )
}

 