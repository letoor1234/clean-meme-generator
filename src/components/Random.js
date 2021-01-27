import React, {Component} from 'react'

export default class Random extends Component{
  constructor(props){
    super(props)
    this.state={
      memes: [],
      random: 0,
      getRandom: false
    }
  }
  componentDidMount(){
    fetch('https://api.imgflip.com/get_memes')
    .then((response)=>{
      return response.json()
    })
    .then((list)=>{
      this.setState({memes: list.data.memes})
    })
  }
  getRandom=()=>{
    let random = Math.floor(Math.random() * (this.state.memes.length - 0)) + 0
    this.setState({
      getRandom: true,
      random: random
    })
  }
  render(){
    if(this.state.getRandom === false){
      return(
        <main id='random'>
          <button onClick={this.getRandom}>Get your lucky meme!</button>
        </main>
      )
    }else{
      return(
        <main id='random'>
          <article className='random-item'key={this.state.memes[this.state.random].id}>
            <h2>{this.state.memes[this.state.random].name}</h2>
            <img src={this.state.memes[this.state.random].url} alt={this.state.memes[this.state.random].name}></img>
            <a download={this.state.memes[this.state.random].id+".jpg"} href={this.state.memes[this.state.random].url} target='_blank' >Download</a>
          </article>
          <button onClick={this.getRandom}>Don't want this?? Try again!</button>
        </main>
      )
    }
  }
}
