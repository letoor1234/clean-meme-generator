import React,{Component} from 'react'
import {
  Link
} from 'react-router-dom'

export default class Nav extends Component{

  render(){
    var buttons=[]
    for(var i = 0; i < this.props.buttons.length; i++){
      buttons.push(
        <Link to={this.props.paths[i]} key={i}>{this.props.buttons[i]}</Link>
      )
    }
    return(
      <nav>
        {buttons}
      </nav>
    )
  }
}
