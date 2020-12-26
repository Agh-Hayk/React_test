import React,{Component} from 'react'
import style from './ToDo.module.css'

class ToDo extends Component{

    state = {
        arr:[],
        inpVal:''
    };
   

    addLi = () => {
        const inpVal = this.state.inpVal
        const arr = [...this.state.arr]
        arr.push(inpVal)
        this.setState({
            arr,
            inpVal:''
        })
    } 
    handleInp = (e)=>{
        this.setState({ 
            inpVal:e.target.value
        })
    }
    deleteLi = (e) => {
        const arr = [...this.state.arr]
        arr.map((item,index)=>{
            if(e.target.dataset.name === index.toString()){
                arr.splice(index,1)
            }
            return arr
        })
        this.setState({
            arr
        })
    }
    
    render(){   
        const {arr} = this.state
        return(
            <div className={style.ToDo}>
                <input onChange={this.handleInp} type="text" placeholder="text" value={this.state.inpVal}/>
                <button onClick={this.addLi}>ok</button>
                <ol>
                    {arr.map((item,index)=>{
                        return (
                        <li key={index}>
                            {item}
                            <span className={style.spanRed} data-name={index} onClick={this.deleteLi}>x</span>
                        </li>
                        )
                    })}
                </ol>
            </div>
        )
    }
}

export default ToDo

