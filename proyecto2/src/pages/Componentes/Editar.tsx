import { useRouter } from 'next/router'
import React, {useEffect,useState} from 'react'
import { Persona } from '@/Interfaces/ipersona'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ObtenerPersona, actualizarPersona } from '@/Firebase/promesas'
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState:Persona ={
    apellido:"",
    correo:"",
    edad:0,
    nombre:"",
    contrasena:"",
    rut:""
}


export const Editar = () => {
    const router = useRouter()
    const [persona, setPersona] = useState<Persona>(initialState)
    
    const handlepersona = (name:string,value:string)=>{
        setPersona({...persona,[name]:value})
    }
    useEffect(() => {
        const key = router.query.key;
        console.log(key)
        if(key!=undefined && typeof(key)==="string"){
            ObtenerPersona(key).then((p)=>{
                if(p!=undefined){
                    setPersona(p)
                }
                else{
                    //volver a la tabla
                }
            })
        }
        else{
            
        }
        
    },[])
    const modificar=()=>{
        actualizarPersona(persona).then(()=>{
            alert("Se actualizo con exito")
        })
    }
    
  return (
    <>
    <Form>
        <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder='Ingrese su Nombre'
            value={persona.nombre}
            name='nombre'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder='Ingrese su Apellido'   
            value={persona.apellido}         
            name='apellido'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" placeholder='Ingrese Correo'
            value={persona.correo}
            name='correo'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="email" placeholder='Ingrese una contraseña'
            name='contrasena'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Rut</Form.Label>
            <Form.Control type="text" placeholder='Ingrese Rut' 
            value={persona.rut}            
            name='rut'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}}/>
            <Form.Text></Form.Text>
        </Form.Group>


        <Form.Group>
            <Form.Label>edad</Form.Label>
            <Form.Control type="number" placeholder='Ingrese su Edad'     
            value={persona.edad}       
            name='edad'
            onChange={(e)=>{handlepersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Button type='button' variant='success' onClick={modificar}>Modificar</Button>
        <Button type='button' variant='danger' href="./Menu">Volver</Button>


    </Form>

    </>
  )
}

export default Editar








