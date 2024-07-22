import { registrarMascota } from '@/Firebase/promesas'
import { Mascota } from '@/Interfaces/imascota'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
const initialState:Mascota ={
    nombre:"",
    edad:0,
    raza:"",
    tipo:"",
    duenio:""
}


export const RegistrarUser = () => {
    const [mascota, setMascota] = useState<Mascota>(initialState)
    // gestiona cambios en la mascota
    const handlemascota = (name:string,value:string)=>{
        setMascota({...mascota,[name]:value})
    }
    const registrar = ()=>{
        registrarMascota(mascota).then(()=>{
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
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Edad</Form.Label>
            <Form.Control type="text" placeholder='Ingrese su edad'            
            name='edad'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Raza</Form.Label>
            <Form.Control type="email" placeholder='Ingrese la raza'
            name='raza'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>tipo</Form.Label>
            <Form.Control type="email" placeholder='Ingrese el tipo de mascota'
            name='tipo'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Rut dueño</Form.Label>
            <Form.Control type="email" placeholder='Ingrese el rut del dueño'
            name='duenio'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>


        <Button type='button' variant='success' onClick={registrar}>Registrar</Button>
        <Button type='button' variant='danger' href="./Menu">Volver</Button>
            
    </Form>
    
    </>
  )
}
export default RegistrarUser