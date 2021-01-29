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
      loadMore: (<button  className='load-more-btn'type='button' onClick={this.loadMore}>Load more...</button>),
      //text state for the search input value(line 82 and 90)
      text: "",
      //another empty array for display items when you write in the input
      buscado: []
    }
  }
  //when the component has been rendered, this function will call to API
  //CONNECTION WITH API FUNCTION!!
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
          memes: list.data.memes,
          buscado: list.data.memes
        })
      })
  }
  //SEARCHER function
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
    this.loadMore()
    //changing the state
    this.setState({
      //input
      text: text,
      //array filtered
      buscado: newArray,
      //setting limit again to 8
      limit: 8
    })

  }
  //LOAD MORE FUNCTION
  loadMore=()=>{
    this.setState({
      limit: this.state.limit +8
    })
    if(this.state.limit+8 > this.state.buscado.length){
      this.setState({
        loadMore: (<button  className='load-more-btn'type='button' onClick={this.loadMore}>Load more...</button>),
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
    if(this.state.buscado <= 0){
      return(
        <Fragment>
        <input type='text' id='search-input' value={this.state.text}
        onChange={(text)=>this.filter(text)} />
        <div id='loading'>Nothing to do here</div>
        </Fragment>
      )
    }else {//when the response is avaible, return the "galery" component
      return(
        <Fragment>
          <input type='text' id='search-input' value={this.state.text}
          onChange={(text)=>this.filter(text)} />
          <main id='galery'>
            {/*an iterator to show the items from state array "memes"*/}
            {this.state.buscado.slice(0, this.state.limit).map((memes)=>{
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
