
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
                  console.log(p)  
                }
                else{
                    //volver a la tabla
                }
            })
        }
        else{
            
        }
        
    },[])

    
  return (
    <>
      
    </>
  )
}

export default Eliminar