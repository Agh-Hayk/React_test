import React, { Component } from 'react'

class Name extends Component{
    render(){
        return(
            <div>
                <p><b style={{color:'darkgreen'}}>Name</b> - {this.props.name}</p>
            </div>
        )
    }
}

export default Name