import React, {Component} from 'react'

export default class Searcher extends Component{
  constructor(props){
    super(props)
    this.state={
      memes: [],
      text: "",
      buscado: []
    }
  }
  //The same require of the API Rest
  componentDidMount(){
    fetch('https://api.imgflip.com/get_memes')
    .then((response)=>{
      return response.json()
    })
    .then((list)=>{
      this.setState({memes: list.data.memes})
    })
  }
 //filter function (to filter the items inside an array)
  filter(event){
    //text received from input
    const text = event.target.value
    //array with the api request
    const array = this.state.memes
    //the new array with the filtered items
    const newArray = array.filter((item)=>{
      //item.name converted to a upper case
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      //i don't know what it is
      return itemData.indexOf(textData) > -1
    })
    //changing the state
    this.setState({
      //input
      text: text,
      //array filtered
      buscado: newArray
    })
    console.log(this.state.buscado)
  }
  render(){
    return(
      <main id='random'>
        <input type='text' id='search-input' value={this.state.text}
        onChange={(text)=>this.filter(text)} />
        {
            this.state.buscado.map((memes)=>{
              if(memes){
                return(
                  <article className='random-item'key={memes.id}>
                    <h2>{memes.name}</h2>
                    <img src={memes.url} alt={memes.name}></img>
                    <a download={memes.id+".jpg"} href={memes.url} target='_blank' rel='noreferrer'>Download</a>
                  </article>
                )
              } else if (!memes){
                return(
                  <h2>Nothing found</h2>
                )
              }
            })
          }

      </main>
    )
  }
}
