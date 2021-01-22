import React, {useEffect, useState} from 'react';

function FirstTry(){
  //direccion de la api
  const url = 'https://jsonplaceholder.typicode.com/todos'
  //funcion de peticion
  const fetchApi = async () => {
    //llama a url
    const response = await fetch(url) //await = esperar la promesa
    //interpretar response como json
    const responseJSON = await response.json()
    setTodos(responseJSON)
  }
  const [todos, setTodos] = useState()
  //funcion o hook de react, se ejecuta en conjunto con el ciclo de vida del componente
  useEffect(()=>{
    fetchApi()
  }, [])
  //devolucion del componente
  return (
    <div className="App">
      <header>
        <h1>Hola Mundo</h1>
      </header>
      <ul>
        {
          !todos ?
            'Loading...'
          :
          todos.map( (todo,index)=>{
            return <li key={index}>{todo.title}</li>
          })
        }
      </ul>
    </div>
  );
}
export default FirstTry;
