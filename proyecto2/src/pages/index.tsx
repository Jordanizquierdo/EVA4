import Form  from 'react-bootstrap/Form'
import { useState } from 'react';
import { Button,Alert  } from 'react-bootstrap';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (user === "admin" && password === "admin") {
      alert('Inicio de sesión exitoso');
      setError('');
      router.push("./Componentes/Menu"); 
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label >Usuario:</Form.Label>
          <Form.Control
            type="text"
            placeholder='Ingrese el usuario'
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

