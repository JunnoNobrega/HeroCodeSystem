import OpenAI from "openai";
import { HttpException } from "../../../types/httpExceptions";
import { GptResponse } from "../../../app/useCases/books.usecase";

export async function searchOpenAI (input : string): Promise<GptResponse>{
    const openAi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    try {
        const response = await openAi.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `
                        - Não é para buscar nada fora dos dados fornecidos.
                        - Preciso da resposta no formato de JSON
                        - Lista de categorias : ['Ficção', 'Não-ficção', 'Romance', 'Terror', 'AVentura', 'Fantasia' , 'Biografia', 'História', 'Autoajuda', 'Tecnico', 'Infantil', 'Didático' ]
                        - Identificar se a mensagem do usuário corresponde a alguma categoria da lista de categorias em portugues ou ingles. Caso não seja, retorne a categoria do livro encontrado.
                        - Realizar uma busca por title, authors, categories elongDescription
                        - Retornar sempre o primeiro autor da lista de authors
                        - Instruções de formato de saita para JSON: 
                        { "title": "String","authors": "String", "categories": "String" , "longDescription": "String" }
                        - retornar todas as informações em ingles.

                    `
                }, 
                {
                    role: 'user',
                    content: input,
                }
            ],
            response_format: {
                type: 'json_object',
            },
            model: 'gpt-3.5-turbo'
        });
        console.log ("searchOpenAI Called:" , response);
        const output = JSON.parse(response.choices[0].message.content!)
        return output

    } catch (error: any) {
   
        throw new HttpException(500, error.message)
    }


}
