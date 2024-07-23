import { useRouter } from 'next/router'
import React, {useEffect,useState} from 'react'
import { Mascota } from '@/Interfaces/imascota' 
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import {actualizarMascota,ObtenerMascota } from '@/Firebase/promesas'

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

const validarTelefono = (telefono: string)=> {
    const regex = /^\d{9,15}$/; 
    return regex.test(telefono);
}

const validarEdad = (edad: number)=> {
    return edad > 0 && edad < 40;
}




export const Editar2 = () => {
    const router = useRouter()
    const [mascota, setMascota] = useState<Mascota>(initialState)
    const [errores, setErrores] = useState<{ [key: string]: string }>({});
    const handlemascota = (name:string,value:string)=>{
        let nuevoError = '';
        if (name === 'telefono' && !validarTelefono(value)) {
            nuevoError = 'Teléfono no válido';
        } else if (name === 'edad' && !validarEdad(Number(value))) {
            nuevoError = 'Edad no válida';
        }
        
        setErrores({
            ...errores,
            [name]: nuevoError
        });
        
        setMascota({
            ...mascota,
            [name]: value
        });
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

        const {telefono, edad } = mascota;
        if (!validarTelefono(telefono) || !validarEdad(edad)) {
            alert("Por favor, corrija los errores antes de modificar.");
            return;
        }
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
            <Form.Text className="text-danger">{errores.edad}</Form.Text>
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
            <Form.Label>Tipo</Form.Label>
            <Form.Control as="select" name="tipo" onChange={(e) => handlemascota(e.currentTarget.name, e.currentTarget.value)}>
                <option value="">{mascota.tipo}</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="hamster">Hamster</option>
            </Form.Control>
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Nombre del dueño</Form.Label>
            <Form.Control type="text" placeholder='Ingrese el nombre del dueño'
            name='n_duenio'
            value={mascota.n_duenio}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Rut dueño</Form.Label>
            <Form.Control type="text" placeholder='Ingrese el rut del dueño'
            name='duenio'
            value={mascota.duenio}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" placeholder='Ingrese la direccion del propietario'
            name='direccion'
            value={mascota.direccion}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Telefono de contacto</Form.Label>
            <Form.Control type="text" placeholder='Ingrese el numero de telefono del propietario'
            name='telefono'
            value={mascota.telefono}
            onChange={(e)=>{handlemascota(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text className="text-danger">{errores.telefono}</Form.Text>
        </Form.Group>


        <Button type='button' variant='success' onClick={modificar}>Modificar</Button>
        <Button type='button' variant='danger' href="./Visualizar">Volver</Button>
            
    </Form>
    </>
  )
}

export default Editar2