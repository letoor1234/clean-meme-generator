import React, {Component} from 'react'
import {
  Link
} from 'react-router-dom'

export class Galery extends Component{
  constructor(props){
    super(props)
    this.state={
      memes: [],
      limit: 8,
      loadMore: (<button type='button' onClick={this.loadMore}>More..</button>)
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
  loadMore=()=>{
    if(this.state.limit < this.state.memes.length){
      this.setState({
        limit: this.state.limit + 8
      })
    }else{
      this.setState({
        loadMore: (<p>This is all here!!</p>)
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
        <main id='galery'>
          {this.state.memes.slice(0, this.state.limit).map((memes)=>{
            return(
              <article className='galery-item'key={memes.id}>
                <h2>{memes.name}</h2>
                <img src={memes.url} alt={memes.name}></img>
                <Link to={memes.url} target="_blank" download={memes.name}>Download</Link>
              </article>
            )
          })}
          {this.state.loadMore}
        </main>
      )

    }
  }
}
