import React, {Fragment, Component} from 'react'
import {
  Link
} from 'react-router-dom'

export class Galery extends Component{
  constructor(props){
    super(props)
    this.state={
      memes: [],
      limit: 8,
      loadMore: (<button  className='load-more-btn'type='button' onClick={this.loadMore}>Load more...</button>)
    }
  }
  componentDidMount(){
    fetch('https://api.imgflip.com/get_memes')
      .then((response)=>{
        return response.json()
      })
      .then((list)=>{
        this.setState({
          memes: list.data.memes
        })
      })
  }
  loadMore=()=>{
    if(this.state.limit < this.state.memes.length){
      this.setState({
        limit: this.state.limit + 8
      })
    }else{
      this.setState({
        loadMore: (<p className='load-more-btn'>This is all here!!</p>)
      })
    }
  }
  render(){
    if(this.state.memes <= 0){
      return(
        <div id='loading'>Loading... Wait a ding dang diddly time</div>
      )
    }else {
      return(
        <Fragment>
          <main id='galery'>
            {this.state.memes.slice(0, this.state.limit).map((memes)=>{
              return(
                <article className='galery-item'key={memes.id}>
                  <h2>{memes.name}</h2>
                  <img src={memes.url} alt={memes.name}></img>
                  <a download={memes.id+".jpg"} href={memes.url} target='_blank' >Download</a>
                </article>
              )
            })}
          </main>
          {this.state.loadMore}
        </Fragment>
      )

    }
  }
}

export class Random extends Component{
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
