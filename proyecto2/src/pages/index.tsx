import Form  from 'react-bootstrap/Form'
import { useState } from 'react';
import { Button,Alert  } from 'react-bootstrap';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { obtenerPersonas } from '@/Firebase/promesas';
import { Persona } from '@/Interfaces/ipersona'
export default function Home() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();



  const [personas,setPersonas] = useState<Persona[]>([])
  obtenerPersonas().then((personas)=>{
    //Meter el listado dentro del estado
    setPersonas(personas)
  })
  let lista = [];
  lista.push(...personas);




  const handleLogin = () => {
    for (let elemento of lista) {
      if (user === elemento.correo && password === elemento.contrasena) {
        alert('Inicio de sesión exitoso');
        setError('');
        router.push("./Componentes/Menu"); 
      } else {
        setError('Usuario o contraseña incorrectos');
        }
    };
  }



  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label >Usuario:</Form.Label>
          <Form.Control
            type="text"
            placeholder='Ingrese el usuario o correo'
            name='user'
            value={user}
            onChange={(e)=>setUser(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder='Ingrese la contraseña'
            name='password'
            value={password}
            onChange={(e)=>setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Button variant='primary' type='button' onClick={handleLogin}>Iniciar Sesión</Button>
      </Form>
    </>
  );
}

