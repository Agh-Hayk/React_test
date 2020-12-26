import React,{Component} from 'react'

class Price extends Component{
    constructor(props){
        super(props)
        this.state = {
          price:props.price,
          bool:true
        }
    }
    changePrice = () => {
        let priceDram = parseFloat(this.state.price)*500 + '֏'
        let priceDollar = parseFloat(this.state.price)/500 + '$'
        let bool = this.state.bool
        let newPrice
        bool?newPrice = priceDram:newPrice = priceDollar
        this.setState({
           price:newPrice,
           bool:!bool
           
        })
    }
    render(){
        return(
            <div style={{display:'flex',alignItems:'center'}}>
                <p><b style={{color:'darkgreen'}}>Price</b> - {this.state.price}</p>
                <button onClick={this.changePrice} style={{
                    marginLeft:'10px',
                    background:'green',
                    color:'white',
                    border:'none',
                    outline:'none',
                    padding:'5px'
                }}>Change the currency</button>
            </div>
        )
    }
}

export default Price