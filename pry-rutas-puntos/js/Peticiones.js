export {Ruta,Punto,PeticionesManagement} 
// import {verRegistro} from "./tablasDeRegistro.js"

const URL = "http://localhost:3000"
const headers = new Headers ({'Content-Type': 'application/json'});

class Ruta{
    constructor(nombre,descripcion,duracion,atractivo,precio,puntos,imagen="https://elturismoencolombia.com/wp-content/uploads/2021/12/bandera-colombia-turismo.jpg"){
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.duracion= duracion,
        this.atractivo = atractivo,
        this.precio = precio,
        this.puntosId =puntos,
        this.imagen = imagen
    }
}


class Punto{
    constructor(nombre,latitud,longitud,atractivo,comida,imagen="https://elturismoencolombia.com/wp-content/uploads/2021/12/bandera-colombia-turismo.jpg"){
        this.nombre = nombre,
        this.latitud = latitud,
        this.longitud= longitud,
        this.atractivo = atractivo,
        this.comidaTipica = comida,
        this.imagen = imagen
    }
}

function configurarAccion(accion,data=""){

    let config ={
        method:`${accion}`,
        headers: headers,
        body: JSON.stringify(data)
    }
    return config  
}
class PeticionesManagement{
    async obtenerDatos(direccion){
        let data = await (await fetch(`${URL}/${direccion}`)).json();
        return data
        //listar(data);
    }
    async postDatos(data,direccion){
        await fetch(`${URL}/${direccion}`,configurarAccion("POST",data));
    }
    async actualizarDatos(data,direccion,id){
        try {
        await fetch(`${URL}/${direccion}/${id}`,configurarAccion("PUT",data))
            
        } catch (error) {
            console.log("error" + error)
        }
    }
    async eliminarDatos(id,direccion){
        try {
            await fetch(`${URL}/${direccion}/${id}`, {
                method: "DELETE",
                headers: headers,
              });                
        } catch (error) {
            console.error("errorrrrr",error);
        }
    }        
}

