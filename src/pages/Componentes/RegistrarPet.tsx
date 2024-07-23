import { registrarMascota } from '@/Firebase/promesas'
import { Mascota } from '@/Interfaces/imascota'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState: Mascota = {
    nombre: "",
    edad: 0,
    raza: "",
    tipo: "",
    duenio: "",
    direccion: "",
    telefono: "",
    n_duenio: ""
}

const validarTelefono = (telefono: string) => {
    const regex = /^\d{9,15}$/; 
    return regex.test(telefono);
}

const validarEdad = (edad: number) => {
    return edad > 0 && edad < 40;
}

export const RegistrarUser = () => {
    const [mascota, setMascota] = useState<Mascota>(initialState)
    const [errores, setErrores] = useState<{ [key: string]: string }>({});

    const handlemascota = (name: string, value: string) => {
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

    const registrar = () => {
        const { telefono, edad } = mascota;
        if (!validarTelefono(telefono) || !validarEdad(edad)) {
            alert("Por favor, corrija los errores antes de registrar.");
            return;
        }

        registrarMascota(mascota).then(() => {
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
                    <Form.Control type="text" placeholder='Ingrese el Nombre de la mascota'
                        name='nombre'
                        onChange={(e) => { handlemascota(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese edad de la mascota'
                        name='edad'
                        onChange={(e) => { handlemascota(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text className="text-danger">{errores.edad}</Form.Text>
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
                        onChange={(e) => { handlemascota(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nombre del dueño</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese el nombre del dueño'
                        name='n_duenio'
                        onChange={(e) => { handlemascota(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rut dueño</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese el rut del dueño'
                        name='duenio'
                        onChange={(e) => { handlemascota(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese la dirección del propietario'
                        name='direccion'
                        onChange={(e) => { handlemascota(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono de contacto</Form.Label>
                    <Form.Control type="text" placeholder='Ingrese el número de teléfono del propietario'
                        name='telefono'
                        onChange={(e) => { handlemascota(e.currentTarget.name, e.currentTarget.value) }} />
                    <Form.Text className="text-danger">{errores.telefono}</Form.Text>
                </Form.Group>

                <Button type='button' variant='success' onClick={registrar}>Registrar</Button>
                <Button type='button' variant='danger' href="./Menu">Volver</Button>
            </Form>
        </>
    )
}

export default RegistrarUser
