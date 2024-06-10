import { HttpRequest , HttpResponse } from "../../infra/http/httpAdapter";
import { BookDto } from "../dto/bookDto";
import { BooksUseCase } from "../useCases/books.usecase";

class BooksController{
    constructor(private  readonly booksUseCase: BooksUseCase){
        
     }


    async create (httprequest :HttpRequest): Promise<HttpResponse>{
        const body: BookDto = httprequest.body;

        try {
            const response = await  this.booksUseCase.createBook(body);
            
            return {
                status:201,
                message: 'Book created',
                data: response,
            };
        }catch (error: any) {
            return {
                status: 400,
                message: error.message, 

            }
        }
    }
    async find (httprequest :HttpRequest): Promise<HttpResponse>{
        const search: string = httprequest.query.search;

        try {
            const response = await  this.booksUseCase.searchBooks(search);
            
            return {
                status:200,
                message: 'Book found',
                data: response,
            };
        }catch (error: any) {
            return {
                status: 400,
                message: error.message, 

            }
        }
    }
    async update (httprequest :HttpRequest): Promise<HttpResponse>{
        const dto: BookDto = httprequest.body;
        const id: string = httprequest.params.id

        try {
            const response = await  this.booksUseCase.updateBook(dto, id);
            
            return {
                status:201,
                message: 'Book updated',
                data: response,
            };
        }catch (error: any) {
            return {
                status: 400,
                message: error.message, 

            }
        }
    }
}

export {BooksController}
