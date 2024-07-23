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
    duenio:"",
    direccion:"",
    telefono:"",
    n_duenio:""

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
            <Form.Label>Tipo</Form.Label>
            <Form.Control as="select" name="tipo" onChange={(e) => handlemascota(e.currentTarget.name, e.currentTarget.value)}>
                <option value="">Seleccione el tipo de mascota</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="hamster">Hamster</option>
            </Form.Control>
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Raza</Form.Label>
            <Form.Control type="text" placeholder='Ingrese la raza'
            name='raza'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Nombre del dueño</Form.Label>
            <Form.Control type="text" placeholder='Ingrese el nombre del dueño'
            name='n_duenio'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Rut dueño</Form.Label>
            <Form.Control type="text" placeholder='Ingrese el rut del dueño'
            name='duenio'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" placeholder='Ingrese la direccion del propietario'
            name='direccion'
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Telefono de contacto</Form.Label>
            <Form.Control type="text" placeholder='Ingrese el numero de telefono del propietario'
            name='telefono'
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