import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Persona } from '@/Interfaces/ipersona'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ObtenerPersona, actualizarPersona } from '@/Firebase/promesas'
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState: Persona = {
    apellido: "",
    correo: "",
    edad: 0,
    nombre: "",
    rut: "",
    contrasena: "",
    direccion: "",
    telefono: ""
}

const validarCorreo = (correo: string)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

const validarTelefono = (telefono: string) => {
    const regex = /^\d{9,15}$/; 
    return regex.test(telefono);
}

const validarEdad = (edad: number)=> {
    return edad > 0 && edad < 120;
}

export const Editar = () => {
    const router = useRouter()
    const [persona, setPersona] = useState<Persona>(initialState)
    const [errores, setErrores] = useState<{ [key: string]: string }>({});

    const handlepersona = (name: string, value: string) => {
        let nuevoError = '';
        if (name === 'correo' && !validarCorreo(value)) {
            nuevoError = 'Correo no válido';
        } else if (name === 'telefono' && !validarTelefono(value)) {
            nuevoError = 'Teléfono no válido';
        } else if (name === 'edad' && !validarEdad(Number(value))) {
            nuevoError = 'Edad no válida';
        }

        setErrores({
            ...errores,
            [name]: nuevoError
        });

        setPersona({
            ...persona,
            [name]: value
        });
    }

    useEffect(() => {
        const key = router.query.key;
        console.log(key)
        if (key != undefined && typeof (key) === "string") {
            ObtenerPersona(key).then((p) => {
                if (p != undefined) {
                    setPersona(p)
                }
                else {
                    //volver a la tabla
                }
            })
        }
        else {

        }

    }, [])

    const modificar = () => {
        const { correo, telefono, edad } = persona;
        if (!validarCorreo(correo) || !validarTelefono(telefono) || !validarEdad(edad)) {
            alert("Por favor, corrija los errores antes de modificar.");
            return;
        }

        actualizarPersona(persona).then(() => {
            alert("Se actualizó con éxito")
        }).catch((e) => {
            console.log(e)
            alert("Ocurrió un error")
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
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese su Apellido'
                        value={persona.apellido}
                        name='apellido'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder='Ingrese Correo'
                        value={persona.correo}
                        name='correo'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text className="text-danger">{errores.correo}</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese una contraseña'
                        name='contrasena'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rut</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese Rut'
                        value={persona.rut}
                        name='rut'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" placeholder='Ingrese su Edad'
                        value={persona.edad}
                        name='edad'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text className="text-danger">{errores.edad}</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese su dirección'
                        name='direccion'
                        value={persona.direccion}
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese su teléfono'
                        name='telefono'
                        value={persona.telefono}
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text className="text-danger">{errores.telefono}</Form.Text>
                </Form.Group>

                <Button type='button' variant='success' onClick={modificar}>Modificar</Button>
                <Button type='button' variant='danger' href="./Visualizar">Volver</Button>
            </Form>
        </>
    )
}

export default Editar
