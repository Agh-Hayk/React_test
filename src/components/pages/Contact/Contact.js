import React,{useState} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import style from "./Contact.module.css"

const requiredErrorMessage = "Field is required"

export default function Contact() {

    const [values, setValues] = useState({
        name:"",
        email:"",
        message:""
    })

    const [errors, setErrors] = useState({
        name:null,
        email:null,
        message:null
    })

    const handleChange = ({target:{name, value}})=>{
        
        if(!value){
            setErrors({
                ...errors,
                [name]:requiredErrorMessage
            })
        }else{
            setErrors({
                ...errors,
                [name]:null
            })
        }

        if(name==='email' && value){
             const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
             if(!emailReg.test(value)){
                setErrors({
                    ...errors,
                    email:"Invalid email"
                })
             }
        }

        setValues({
            ...values,
            [name]:value
        })
    }

    const handleSubmit = ()=>{
        const errorsArr = Object.values(errors)
        const errorsExist = !errorsArr.every(el=>el===null)

        const valuesArr = Object.values(values)
        const valuesExist = !valuesArr.some(el=>el==="")
        
        if(valuesExist && !errorsExist){

            fetch('http://localhost:3001/form', {
                method:'POST',
                body:JSON.stringify(values),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(async (response)=>{
        
                const res = await response.json()
    
                
                if(response.status>=400 && response.status<600){
                    if(res.error){
                        throw res.error;
                    }else{
                        throw new Error('Something went wrong!')
                    }
                }
    
                
            })
            .catch((error)=>{
                console.log(error)
            })


            setValues({
                name:"",
                email:"",
                message:""
            })

            return
        }

        if(!valuesExist && !errorsExist){
            setErrors({
                name:requiredErrorMessage,
                email:requiredErrorMessage,
                message:requiredErrorMessage
            })
        }
       
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={10} md={7}> 
                    <h2 className="mt-5 text-center">Contact us</h2>
                    <Form className="mt-5">

                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your name"
                                onChange = {handleChange}
                                name="name"
                                value={values.name}
                                className={errors.name?style.invalid:""}
                             />
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange = {handleChange}
                                name="email"
                                value={values.email}
                                className={errors.email?style.invalid:""}
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control 
                                as="textarea"
                                placeholder="Enter your message"
                                rows={5}
                                name="message"
                                onChange = {handleChange}
                                value={values.message}
                                className={errors.message?style.invalid:""}
                            />
                            
                            <Form.Text className="text-danger">
                                {errors.message}
                        </Form.Text>
                        </Form.Group>

                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}