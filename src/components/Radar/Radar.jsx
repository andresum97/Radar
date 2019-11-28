import React, { Component } from "react";
import './design.scss';

class Radar extends Component {
    constructor (props) {
      super(props)
      this.state = { }
    }
    render(){
      return(
      <div> 
        <div className='Radarform' id='radar'>
          <div className="position"></div>
          <div className='loading'></div>
        </div>
      </div>
      )
    }
  }

  export default Radar;