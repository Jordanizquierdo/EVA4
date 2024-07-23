import { registrarPersona } from '@/Firebase/promesas'
import { Persona } from '@/Interfaces/ipersona'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
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

const validarCorreo = (correo: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

const validarTelefono = (telefono: string) => {
    const regex = /^\d{9,15}$/; 
    return regex.test(telefono);
}

const validarEdad = (edad: number) => {
    return edad > 0 && edad < 120;
}

export const RegistrarUser = () => {
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

    const registrar = () => {
        const { correo, telefono, edad } = persona;
        if (!validarCorreo(correo) || !validarTelefono(telefono) || !validarEdad(edad)) {
            alert("Por favor, corrija los errores antes de registrar.");
            return;
        }

        registrarPersona(persona).then(() => {
            alert("Se registró con éxito")
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
                        name='nombre'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese su Apellido'
                        name='apellido'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder='Ingrese Correo'
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
                        name='rut'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" placeholder='Ingrese su Edad'
                        name='edad'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text className="text-danger">{errores.edad}</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese su dirección'
                        name='direccion'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese su teléfono'
                        name='telefono'
                        onChange={(e) => { handlepersona(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text className="text-danger">{errores.telefono}</Form.Text>
                </Form.Group>

                <Button type='button' variant='success' onClick={registrar}>Registrar</Button>
                <Button type='button' variant='danger' href="./Menu">Volver</Button>
            </Form>
        </>
    )
}

export default RegistrarUser
