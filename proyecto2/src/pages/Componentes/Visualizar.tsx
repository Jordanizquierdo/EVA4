import react, { useEffect, useState } from 'react'
import { Persona } from '@/Interfaces/ipersona'
import { Mascota } from '@/Interfaces/imascota'
import { obtenerPersonas,obtenerMascotas } from '@/Firebase/promesas'
import { Button, Table } from 'react-bootstrap'
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export const visualizar = ()=>{
    const [personas,setPersonas] = useState<Persona[]>([])
        useEffect(()=>{
            //Traer listado de personas desde las promesas
            obtenerPersonas().then((personas)=>{
                //Meter el listado dentro del estado
                setPersonas(personas)
            }).catch((e)=>{
                console.log(e)
                alert("Ocurrio un error")
            })
        },[])
    
    const [mascotas,setMascotas] = useState<Mascota[]>([])
    useEffect(()=>{
        //Traer listado de mascotas desde las promesas
        obtenerMascotas().then((mascotas)=>{
            //Meter el listado dentro del estado
            setMascotas(mascotas)
        }).catch((e)=>{
            console.log(e)
            alert("Ocurrio un error")
        })
    },[])
    
    return (
        <>
            <h1>Clientes</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Rut</th>
                        <th>Correo</th>
                        <th>Edad</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personas.map((p)=>{
                            return(
                            <tr>
                                <td>{p.nombre}</td>
                                <td>{p.apellido}</td>
                                <td>{p.rut}</td>
                                <td>{p.correo}</td>
                                <td>{p.edad}</td>
                                <td>
                                    <Link href={{pathname:"Editar",query:{key:p.key}}}>
                                    <Button variant='warning'>Editar</Button>
                                    </Link>
                                    <Button variant='danger'>Eliminar</Button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <h1>Mascotas</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Raza</th>
                        <th>Tipo</th>
                        <th>Rut Dueño</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mascotas.map((p)=>{
                            return(
                            <tr>
                                <td>{p.nombre}</td>
                                <td>{p.edad}</td>
                                <td>{p.raza}</td>
                                <td>{p.tipo}</td>
                                <td>{p.duenio}</td>
                                <td>
                                    <Link href={{pathname:"Editar2",query:{key:p.key}}}>
                                    <Button variant='warning'>Editar</Button>
                                    </Link>
                                    <Link href={{pathname:"Eliminar",query:{key:p.key}}}>
                                    <Button variant='danger'>Eliminar</Button></Link>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Button type='button' variant='danger' href="./Menu">Volver</Button>
        </>
    )
    
}   
export default visualizar