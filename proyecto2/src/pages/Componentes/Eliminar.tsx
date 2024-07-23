
import { Eliminar_d, ObtenerPersona } from '@/Firebase/promesas'
import { useRouter } from 'next/router'
import React, {useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mascota } from '@/Interfaces/imascota';



const initialState:Mascota ={
  nombre:"",
  edad:0,
  raza:"",
  tipo:"",
  duenio:""
}

export const Eliminar = () => {
    const router = useRouter()
    const [mascota] = useState<Mascota>(initialState)
    useEffect(() => {
        const key = router.query.key;
        console.log(key)
        if(key!=undefined && typeof(key)==="string"){
            ObtenerPersona(key).then((p)=>{
                if(p!=undefined){
                    
                }
                else{
                    //volver a la tabla
                }
            })
        }
        else{
            
        }
        
    },[])
    if(confirm("Desea eliminar los registros de: \n"+mascota.nombre)){
      Eliminar_d(mascota)
      alert("Se elimino con exito")
    }
    else{
        //si no damos a confirmar muestra un mensaje en la consola
        console.log("Cancelaste la eliminacion")
  }  

    
  return (
    <>
      
    </>
  )
}

export default Eliminar