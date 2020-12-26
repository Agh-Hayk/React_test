import React, { Component } from 'react'

class Description extends Component{
    render(){
        return(
            <div>
                <p style={{color:'darkgreen'}}><b>Description</b></p>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default Description