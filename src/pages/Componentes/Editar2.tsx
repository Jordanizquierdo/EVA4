import { useRouter } from 'next/router'
import React, {useEffect,useState} from 'react'
import { Mascota } from '@/Interfaces/imascota' 
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ObtenerPersona, actualizarMascota, actualizarPersona,ObtenerMascota } from '@/Firebase/promesas'

const initialState:Mascota ={
    nombre:"",
    edad:0,
    raza:"",
    tipo:"",
    duenio:""
}

export const Editar2 = () => {
    const router = useRouter()
    const [mascota, setMascota] = useState<Mascota>(initialState)
    
    const handlemascota = (name:string,value:string)=>{
        setMascota({...mascota,[name]:value})
    }
    useEffect(() => {
        const key = router.query.key;
        console.log(key)
        if(key!=undefined && typeof(key)==="string"){
            ObtenerMascota(key).then((p)=>{
                if(p!=undefined){
                    setMascota(p)
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
        actualizarMascota(mascota).then(()=>{
            alert("Se actualizo con exito")
        })
    }
    
  return (
    <>
    <Form>
        <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder='Ingrese su Nombre'
            name='nombre'
            value={mascota.nombre}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Edad</Form.Label>
            <Form.Control type="text" placeholder='Ingrese su edad'            
            name='edad'
            value={mascota.edad}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Raza</Form.Label>
            <Form.Control type="email" placeholder='Ingrese la raza'
            name='raza'
            value={mascota.raza}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>tipo</Form.Label>
            <Form.Control type="email" placeholder='Ingrese el tipo de mascota'
            name='tipo'
            value={mascota.tipo}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Rut dueño</Form.Label>
            <Form.Control type="email" placeholder='Ingrese el rut del dueño'
            name='duenio'
            value={mascota.duenio}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>


        <Button type='button' variant='success' onClick={modificar}>Modificar</Button>
        <Button type='button' variant='danger' href="./Visualizar">Volver</Button>
            
    </Form>
    </>
  )
}

export default Editar2