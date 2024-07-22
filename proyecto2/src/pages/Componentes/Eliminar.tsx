
import { ObtenerPersona } from '@/Firebase/promesas'
import { useRouter } from 'next/router'
import React, {useEffect,useState} from 'react'
import { Persona } from '@/Interfaces/ipersona'
import 'bootstrap/dist/css/bootstrap.min.css';




const Modal = ({ show, handleClose, handleSave }) => {
    const modalClass = show ? "modal display-block" : "modal display-none";


}
export const Eliminar = () => {
    const router = useRouter()
    

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

    
  return (
    <>
      <div className={modalClass} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>  
    </>
  )
}

export default Eliminar