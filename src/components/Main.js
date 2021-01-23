import React, {Fragment, Component} from 'react'
import {
  Link
} from 'react-router-dom'
export class Galery extends Component{
  constructor(props){
    super(props)
    this.state={
      memes: []
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
        console.log(this.state.memes)
      })
  }
  render(){
    if(this.state.memes <= 0){
      return(
        <div id='loading'>Loading... Wait a ding dang diddly time</div>
      )
    }else {
      return(
        <main>
          {this.state.memes.map((memes)=>{
            return(
              <article key={memes.id}>
                <h2>{memes.name}</h2>
                <img src={memes.url}></img>
                <Link to={memes.url} target="_blank" download={memes.name}>Download</Link>
              </article>
            )
          })}
        </main>
      )

    }
  }
}
