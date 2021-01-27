import React, {Component} from 'react'

export default class Random extends Component{
  //Initial states are defined into constructor
  constructor(props){
    super(props)
    this.state={
      //empty array that will be the json list from the API call
      memes: [],
      //a integer that used to take the item's id from the array
      random: 0,
      //a initial boolean that set if the item is rendered or not
      getRandom: false
    }
  }
  //calling to the API
  componentDidMount(){
    fetch('https://api.imgflip.com/get_memes')
    .then((response)=>{
      return response.json()
    })
    .then((list)=>{
      this.setState({memes: list.data.memes})
    })
  }
  //getting a random integer
  getRandom=()=>{
    let random = Math.floor(Math.random() * (this.state.memes.length - 0)) + 0
    //the boolean is seting to true and the random state is seted to random local variable
    this.setState({
      getRandom: true,
      random: random
    })
  }
  render(){
    //if the getRandom function isn´t called yet, just show a simple button that calls it for first time
    if(this.state.getRandom === false){
      return(
        <main id='random'>
          <button onClick={this.getRandom}>Get your lucky meme!</button>
        </main>
      )
    }else{//else if the function has been called (so getRAndom state is true now) return the item that it id matches with the "random" integer into states
      return(
        <main id='random'>
          <article className='random-item'key={this.state.memes[this.state.random].id}>
            <h2>{this.state.memes[this.state.random].name}</h2>
            <img src={this.state.memes[this.state.random].url} alt={this.state.memes[this.state.random].name}></img>
            <a download={this.state.memes[this.state.random].id+".jpg"} href={this.state.memes[this.state.random].url} target='_blank' rel='noreferrer'>Download</a>
          </article>
          {/*Calling again to get a new item*/ }
          <button onClick={this.getRandom}>Don't want this?? Try again!</button>
        </main>
      )
    }
  }
}
