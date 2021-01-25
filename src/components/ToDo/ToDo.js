import React,{Component} from 'react'
import style from './ToDo.module.css'
import idGenerator from '../../helpers/idGenerator'
import {Container,Row,Col,Button} from 'react-bootstrap'

class ToDo extends Component{

    state = {
        task:[],
        inpVal:'',
        checkArr:new Set()
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
            inpVal:'',
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
    item_checked = (taskId) => {
        const newArr = new Set(this.state.checkArr) 
        if(newArr.has(taskId)){
            newArr.delete(taskId)
        }else{
            newArr.add(taskId)
        }
        this.setState({
            checkArr:newArr
        })
    }
    
    removeSelected = () =>{
        const {checkArr} = this.state
        const task = [...this.state.task]
        const newTasks = task.filter((task)=>{
            if(checkArr.has(task._id)){
                return false
            }   
            return true
        }) 

        this.setState({
            task:newTasks,
            checkArr:new Set()
        })
    }

    handleKeyEnter = (e)=>{
        if(e.key === "Enter"){
            this.addLi()
        }
    }

    render(){   
        const {task,checkArr} = this.state;
        const item = task.map((item,index)=>{
            return (
                <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <div className={style.new_item}>
                        <input type="checkbox" className={style.item_checkbox} onChange={()=>this.item_checked(item._id)}/>
                        <h3>{item.title}</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, porro?</p>
                        <button className={style.spanRed} disabled={!!checkArr.size} data-name={index} onClick={()=>this.deleteTask(item._id)}>x</button>
                    </div>
                </Col>
            )
        })
        return(
            <div className={style.ToDo}>
                  <Container>
                    <Row className="justify-content-center mb-3">
                      <Col xs={12} lg={6} xl={6}>
                          <div className={style.searchItem}>
                            <input 
                                onChange={this.handleInp} 
                                onKeyDown={this.handleKeyEnter}
                                disabled={!!checkArr.size} 
                                type="text" 
                                placeholder="text" 
                                value={this.state.inpVal}
                            />
                            <button className={style.search_btn} onClick={this.addLi} disabled={!!checkArr.size}>ok</button>
                          </div>
                      </Col>
                    </Row>
                    <Row>
                        {item}
                    </Row>
                    <Row>
                    <Button variant="danger" onClick={this.removeSelected} disabled={!checkArr.size}>Delete selected</Button>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ToDo

