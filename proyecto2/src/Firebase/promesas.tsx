import {addDoc, collection,getDocs, updateDoc} from "firebase/firestore";
import{db} from "./Firebase"
import { Persona } from "@/Interfaces/ipersona";
import {Mascota} from "@/Interfaces/imascota"
import { doc, getDoc,deleteDoc } from "firebase/firestore";

export const registrarPersona = async(persona:Persona)=>{
    const DocRef = await addDoc(collection(db,"personas"), persona)

}

export const registrarMascota = async(mascota:Mascota)=>{
    const DocRef = await addDoc(collection(db,"mascotas"), mascota)

}

export const obtenerMascotas = async()=>{
    let mascotas:Mascota[] = []
    const querySnapshot=await getDocs(collection(db,"mascotas"))
    querySnapshot.forEach((doc)=>{
        let mascota:Mascota = {
            nombre:doc.data().nombre,
            edad:doc.data().edad,
            raza:doc.data().raza,
            tipo:doc.data().tipo,
            duenio:doc.data().duenio,
            key:doc.id

        }
        mascotas.push(mascota)
    })
    return mascotas 
}

export const obtenerPersonas = async()=>{
    let personas:Persona[] = []
    const querySnapshot=await getDocs(collection(db,"personas"))
    querySnapshot.forEach((doc)=>{
        let persona:Persona = {
            nombre:doc.data().nombre,
            apellido:doc.data().apellido,
            correo:doc.data().correo,
            edad:doc.data().edad,
            rut:doc.data().rut,
            key:doc.id

        }
        personas.push(persona)
    })
    return personas 
}

export const ObtenerPersona = async(key:string)=>{
    const docRef = doc(db, "personas", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let persona:Persona = {
            nombre:docSnap.data().nombre,
            apellido:docSnap.data().apellido,
            correo:docSnap.data().correo,
            edad:docSnap.data().edad,
            rut:docSnap.data().rut,
            key:docSnap.id

        }
        return persona
    } else {
        return undefined
    }
}

export const actualizarPersona = async(p:Persona)=>{
    const ref = doc(db,"personas",p.key!)
    await updateDoc(ref,{...p})
}



export const actualizarMascota = async(p:Mascota)=>{
    const ref = doc(db,"mascotas",p.key!)
    await updateDoc(ref,{...p})
}



export const ObtenerMascota = async(key:string)=>{
    const docRef = doc(db, "mascotas", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let mascota:Mascota = {
            nombre:docSnap.data().nombre,
            edad:docSnap.data().edad,
            raza:docSnap.data().raza,
            tipo:docSnap.data().tipo,
            duenio:docSnap.data().duenio,
            key:docSnap.id

        }
        return mascota
    } else {
        return undefined
    }
}

export const Eliminar_d = async(p:Mascota)=>{
    const ref = doc(db,"mascotas",p.key!);
    await deleteDoc(ref);
}
