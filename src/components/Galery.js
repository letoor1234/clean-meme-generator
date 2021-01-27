import React, {Fragment, Component} from 'react'

export default class Galery extends Component{
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
