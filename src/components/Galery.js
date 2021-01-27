import React, {Fragment, Component} from 'react'

export default class Galery extends Component{
  //Initial states are defined into constructor
  constructor(props){
    super(props)
    this.state={
      //empty array that will be the json list from the API call
      memes: [],
      //a integer that sets how many items from the array will be rendered
      limit: 8,
      //the button that load more items from the array, with the function call for these
      loadMore: (<button  className='load-more-btn'type='button' onClick={this.loadMore}>Load more...</button>)
    }
  }
  //when the component has been rendered, this function will call to API
  componentDidMount(){
    //API's link
    fetch('https://api.imgflip.com/get_memes')
      //Promise, when the response is received, is converted to a .json
      .then((response)=>{
        return response.json()
      })
      //Promise, the response (list) is seted into the "memes" state
      .then((list)=>{
        this.setState({
          memes: list.data.memes
        })
      })
  }
  //Function that load more items from the array
  loadMore=()=>{
    if(this.state.limit < this.state.memes.length){
      this.setState({
        //the limit state is increased by 8
        limit: this.state.limit + 8
      })
    }else{
      this.setState({
        //if there is no more items to show, the "loadMore" state is changed to a paragraph
        loadMore: (<p className='load-more-btn'>This is all here!!</p>)
      })
    }
  }
  render(){
    //If the response isn't set yet, retur a simple text box
    if(this.state.memes <= 0){
      return(
        <div id='loading'>Loading... Wait a ding dang diddly time</div>
      )
    }else {//when the response is avaible, return the "galery" component
      return(
        <Fragment>
          <main id='galery'>
            {/*an iterator to show the items from state array "memes"*/}
            {this.state.memes.slice(0, this.state.limit).map((memes)=>{
              return(
                <article className='galery-item'key={memes.id}>
                  <h2>{memes.name}</h2>
                  <img src={memes.url} alt={memes.name}></img>
                  <a download={memes.id+".jpg"} href={memes.url} target='_blank' rel='noreferrer'>Download</a>
                </article>
              )
            })}
          </main>
          {/*this is the button that load more items*/}
          {this.state.loadMore}
        </Fragment>
      )

    }
  }
}
