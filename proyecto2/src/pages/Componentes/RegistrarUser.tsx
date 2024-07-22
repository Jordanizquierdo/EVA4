import { registrarPersona } from '@/Firebase/promesas'
import { Persona } from '@/Interfaces/ipersona'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

const initialState:Persona ={
    apellido:"",
    correo:"",
    edad:0,
    nombre:"",
    rut:""
}


export const RegistrarUser = () => {
    const [persona, setPersona] = useState<Persona>(initialState)
    // gestiona cambios en la persona
    const handlepersona = (name:string,value:string)=>{
        setPersona({...persona,[name]:value})
    }
    const registrar = ()=>{
        registrarPersona(persona).then(()=>{
            alert("Se registro con exito")
        }).catch((e)=>{
            console.log(e)
            alert("Ocurrio un error")
        })
    }

  return (
    <>
    <Form>
        <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder='Ingrese su Nombre'
            name='nombre'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder='Ingrese su Apellido'            
            name='apellido'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" placeholder='Ingrese Correo'
            name='correo'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Rut</Form.Label>
            <Form.Control type="text" placeholder='Ingrese Rut'             
            name='rut'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}}/>
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>edad</Form.Label>
            <Form.Control type="number" placeholder='Ingrese su Edad'            
            name='edad'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Button type='button' variant='success' onClick={registrar}>Registrar</Button>
        <Button type='button' variant='danger' href="./Menu">Volver</Button>
            
    </Form>
    
    </>
  )
}
export default RegistrarUser