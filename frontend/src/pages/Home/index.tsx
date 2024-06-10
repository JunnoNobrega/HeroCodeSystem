import { useCallback, useContext, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import { Header } from "../../components/Header/Header";
import { Title } from "../../components/Title/Title";
import { Card } from "../../components/Card/Card";
import { Input } from "../../components/Input/Input";
import axios from "axios";
import { searchBooks } from "../../services/books";
import { BooksContext } from "../../contexts/booksContext";


const genderBooks = [
    'Ação',
    'Aventura',
    'Biografia',
    'Comédia',
    'Drama',
    'Ficção',
  ]

export function Home (){
    const [selectedGender, setSelectedGender] = useState<string[]> ([]); 
    const  {books, handleSetBooks} = useContext(BooksContext)

    const handleSelect = useCallback((title: string) => {
      console.log(" Selecionado: " , title)
      if(selectedGender.includes(title)){
          const removeGender = selectedGender.filter(item => item !== title);
          setSelectedGender(removeGender)
      }else {
          setSelectedGender([...selectedGender, title])
      }
      
    },[selectedGender])


    const handleSubmit= useCallback(
      async (value: string) => {
  
      const response =  await searchBooks(value)
    console.log('response: ',response)
    handleSetBooks(response)
    },[handleSetBooks]);

    return (
        <div className="mb-6"> 
        <Header/>
        <Container>
          <Title title="O que você quer ler hoje?"/>
          <div className="gap-8 grid md:grid-cols-8 grid-cols-4">
            {genderBooks.map((book , index)=> (
                <Button 
                key={index}
                title={book} 
                variant={selectedGender.includes(book)? 'dark' : 'light'} 
                onClick={() => handleSelect(book)}/>
            ))}
          </div>
          <div className="py-7" >
            <p className=" text-evergreen font-semibold text-2xl ">Sobre o que você gostaria de receber uma recomendação de livro?</p>
            <Input placeholder="Eu gostaria de ler ..." onKeyDown={(e: any) => {
                if(e.key === 'Enter'){
                  handleSubmit(e.target?.value);
                }
            }
            }/>
          </div>
          <Title title="Livros recomendados" className="my-5"/>

          <div className="grid md:grid-cols-3 gap-">
            {books.map (book => {
              return (
                <Card  id={book._id} book = {book}/>
              )
            })}

          </div>
        </Container>
  
      </div>
    )
}