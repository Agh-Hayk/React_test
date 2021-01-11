import React,{Component} from 'react'
import style from './ToDo.module.css'
import idGenerator from '../../helpers/idGenerator'
import {Container,Row,Col} from 'react-bootstrap'

class ToDo extends Component{

    state = {
        task:[],
        inpVal:''
    };
   

    addLi = () => {
        const inpVal = this.state.inpVal.trim()
        if(!inpVal){return}
        const newTask = {
            _id:idGenerator(),
            title:inpVal
        } 
        const task = [...this.state.task, newTask]
        this.setState({
            task,
            inpVal:''
        })
    } 
    handleInp = (e)=>{
        this.setState({ 
            inpVal:e.target.value
        })
    }
    deleteTask = (taskId) => {
        const newTask = this.state.task.filter((task)=> taskId !== task._id)
        this.setState({
            task:newTask
        })
    }
    
    render(){   
        const {task} = this.state;
        const item = task.map((item,index)=>{
            return (
                <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <div className={style.new_item}>
                        <h3>{item.title}</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, porro?</p>
                        <button className={style.spanRed} data-name={index} onClick={()=>this.deleteTask(item._id)}>x</button>
                    </div>
                </Col>
            )
        })
        return(
            <div className={style.ToDo}>
                  <Container>
                    <Row className="justify-content-center mb-3">
                      <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                          <div className={style.searchItem}>
                            <input onChange={this.handleInp} type="text" placeholder="text" value={this.state.inpVal}/>
                            <button onClick={this.addLi}>ok</button>
                          </div>
                      </Col>
                    </Row>
                    <Row>
                        {item}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ToDo

