import React, { Component } from 'react'
import Description from './Description/Description'
import Name from './Name/Name'
import Price from './Price/Price'

class Product extends Component{
    render(){
        return(
            <div style={{
                width:'400px',
                margin:'0 auto',
                border: '1px solid gray',
                borderRadius: '7px',
                padding:'20px',
                boxSizing:'border-box'
                }}>
                <Name name = {this.props.name}/>
                <Price price = {this.props.price}/>
                <Description description = {this.props.description}/>
            </div>
        )
    }
}

export default Product