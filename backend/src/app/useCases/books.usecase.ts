
import { generateEmbaddings } from "../../infra/services/openai/generateEmbeddings";
import { searchOpenAI } from "../../infra/services/openai/search";
import { BookDto } from "../dto/bookDto";
import { BooksRepository } from "../repository/books.repository";


export type GptResponse = {
    title: string;
    authors: string;
    categories: string;
    longDescription: string;
}

class BooksUseCase {
    private booksRepository: BooksRepository;

    constructor(booksRepository: BooksRepository){
        this.booksRepository = booksRepository;
    }

    async createBook(dto: BookDto){
        const dataEmbadding = {
            title: dto.title,
            categories: dto.categories,
            authors: dto.authors,
            longDescription: dto.longDescription,
            
        }
        const generateEmbadding = await generateEmbaddings(JSON.stringify(dataEmbadding));
        return this.booksRepository.create({
            ...dto, 
            embeddings: generateEmbadding
        });
    }
    async searchBooks(search: string){
        const generateEmbadding = await generateEmbaddings(search);
        const searchResponse: GptResponse = await searchOpenAI(search)
    
        
        const mathcedBooks = this.matchedBooks(searchResponse)

        return this.booksRepository.find(search, generateEmbadding, mathcedBooks)



    }
    async updateBook(dto: BookDto, id: string){
        const dataEmbadding = {
            title: dto.title,
            categories: dto.categories,
            authors: dto.authors,
            longDescription: dto.longDescription,
            
        }
        const generateEmbadding = await generateEmbaddings(JSON.stringify(dataEmbadding));
        return this.booksRepository.update({
            ...dto, 
            embeddings: generateEmbadding, 
            
        }, id);
       
    }
    private matchedBooks(search: GptResponse): Record<string, any> {
        const matchedBooks = { $match: {}}

        if (search.title){
            matchedBooks.$match =  {
                title: search.title,
            }
        }
        if (search.authors){
            matchedBooks.$match =  {
                authors: search.authors,
            }
        }
        if (search.categories){
            matchedBooks.$match =  {
                categories: search.categories,
            }
        }
        if (search.longDescription){
            matchedBooks.$match =  {
                longDescription: search.longDescription,
            }
        }
        return matchedBooks;
        }
}


export {BooksUseCase}