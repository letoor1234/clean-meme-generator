import React, {Fragment, Component} from 'react'

export default class Main extends Component{
  constructor(props){
    super(props)
    this.state={
      memes: []
    }
  }
  componentWillMount(){
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
        this.state.memes.map((memes)=>{
          return(
            <article key={memes.id}>
              <h2>{memes.name}</h2>
              <div style={{
                backgroundImage: 'url("'+memes.url+'")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
                height: '90vh',
                margin: 'auto'
              }}></div>
            </article>
          )
        })
      )

    }
  }
}
