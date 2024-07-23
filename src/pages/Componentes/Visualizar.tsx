import React, { useEffect, useState } from 'react'
import { Persona } from '@/Interfaces/ipersona'
import { Mascota } from '@/Interfaces/imascota'
import { obtenerPersonas, obtenerMascotas, Eliminar_d, Eliminar_p } from '@/Firebase/promesas'
import { Button, Table, Modal } from 'react-bootstrap'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'

export const visualizar = () => {
    const [personas, setPersonas] = useState<Persona[]>([])
    const [mascotas, setMascotas] = useState<Mascota[]>([])
    const [showMascotaModal, setShowMascotaModal] = useState(false)
    const [showPersonaModal, setShowPersonaModal] = useState(false)
    const [selectedMascota, setSelectedMascota] = useState<Mascota>()
    const [selectedPersona, setSelectedPersona] = useState<Persona>()

    useEffect(() => {
        obtenerPersonas().then(setPersonas).catch((e) => {
            console.log(e)
            alert("Ocurrio un error")
        })
    }, [])

    useEffect(() => {
        obtenerMascotas().then(setMascotas).catch((e) => {
            console.log(e)
            alert("Ocurrio un error")
        })
    }, [])

    const handleDeleteMascota = () => {
        if (selectedMascota) {
            Eliminar_d(selectedMascota).then(() => {
                setMascotas(mascotas.filter(m => m !== selectedMascota))
                setShowMascotaModal(false)
                alert("Se eliminó con éxito")
            }).catch((e) => {
                console.log(e)
                alert("Ocurrió un error")
            })
        }
    }

    const handleDeletePersona = () => {
        if (selectedPersona) {
            Eliminar_p(selectedPersona).then(() => {
                setPersonas(personas.filter(p => p !== selectedPersona))
                setShowPersonaModal(false)
                alert("Se eliminó con éxito")
            }).catch((e) => {
                console.log(e)
                alert("Ocurrió un error")
            })
        }
    }

    const openMascotaModal = (mascota: Mascota) => {
        setSelectedMascota(mascota)
        setShowMascotaModal(true)
    }

    const openPersonaModal = (persona: Persona) => {
        setSelectedPersona(persona)
        setShowPersonaModal(true)
    }

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
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personas.map((p) => (
                            <tr key={p.key}>
                                <td>{p.nombre}</td>
                                <td>{p.apellido}</td>
                                <td>{p.rut}</td>
                                <td>{p.correo}</td>
                                <td>{p.edad}</td>
                                <td>{p.direccion}</td>
                                <td>{p.telefono}</td>
                                <td>
                                    <Link href={{ pathname: "Editar", query: { key: p.key } }}>
                                        <Button variant='warning'>Editar</Button>
                                    </Link>
                                    <Button variant='danger' onClick={() => openPersonaModal(p)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
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
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Nombre Dueño</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mascotas.map((m) => (
                            <tr key={m.key}>
                                <td>{m.nombre}</td>
                                <td>{m.edad}</td>
                                <td>{m.raza}</td>
                                <td>{m.tipo}</td>
                                <td>{m.duenio}</td>
                                <td>{m.direccion}</td>
                                <td>{m.telefono}</td>
                                <td>{m.n_duenio}</td>
                                <td>
                                    <Link href={{ pathname: "Editar2", query: { key: m.key } }}>
                                        <Button variant='warning'>Editar</Button>
                                    </Link>
                                    <Button variant='danger' onClick={() => openMascotaModal(m)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Button type='button' variant='danger' href="./Menu">Volver</Button>

            <Modal show={showMascotaModal} onHide={() => setShowMascotaModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMascota && (
                        <>
                            <p>¿Desea eliminar los registros de: {selectedMascota.nombre}?</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteMascota}>Eliminar</Button>
                    <Button variant="secondary" onClick={() => setShowMascotaModal(false)}>Cancelar</Button>
                    
                </Modal.Footer>
            </Modal>

            <Modal show={showPersonaModal} onHide={() => setShowPersonaModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPersona && (
                        <>
                            <p>¿Desea eliminar los registros de: {selectedPersona.nombre}?</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeletePersona}>Eliminar</Button>
                    <Button variant="secondary" onClick={() => setShowPersonaModal(false)}>Cancelar</Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default visualizar
