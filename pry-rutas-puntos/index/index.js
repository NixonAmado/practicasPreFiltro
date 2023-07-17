import {Ruta,Punto,PeticionesManagement} from "../js/Peticiones.js"
import {llenarModalRutas,listarRutas,eliminarFilaRutas} from "../js/moduloDOMRutas.js"
import {listarPuntos,llenarModalPuntos} from "../js/moduloDomPuntos.js";
let administrarPeticiones= new PeticionesManagement();


let searchRutasBtn = document.getElementById('search-rutas-btn').
addEventListener("click", ()=>{
    let trContenedor=document.getElementById("seccion-rutas");
    buscar("search_table_1",trContenedor)
})

let searchPuntosBtn = document.getElementById('search-puntos-btn').
addEventListener("click", ()=>{
  let trContenedor=document.getElementById("seccion-puntos");
  buscar("search_table_2",trContenedor)
})

function buscar(iptBuscar,contenedor) {
    const buscado = document.getElementById(iptBuscar).value.toLowerCase();
    const rows = contenedor.querySelector("tbody").getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].children;
        let found = false;
        for (let j = 0; j < columns.length; j++) {
            const columnValue = columns[j].textContent.toLowerCase();
            if (columnValue.indexOf(buscado) == 0) {
                found = true;
                break;
            }
        }
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}



//añade la ruta a la tabla
let AñadirRutasBtn = document.getElementById('form-ruta-btn').
addEventListener("click",async ()=>{
    let nombreRuta= document.getElementById('ipt-nombre-ruta').value;
    let descripcionRuta= document.getElementById('ipt-desc-ruta').value;
    let duracionRuta = document.getElementById("ipt-duracion-ruta").value;
    let atractivoRuta = document.getElementsByClassName("ipt-atractivo-ruta");
    let imagenRuta = document.getElementById('ipt-imagen-ruta').value;
    let valAtractivoRuta=[];
    [...atractivoRuta].forEach((elemento)=> valAtractivoRuta.push(elemento.value))
    let precioRuta = document.getElementById("ipt-precio-ruta").value;
    const checkboxes = document.querySelectorAll('input[name="check-puntos"]:checked');
    const boxesSeleccionados = Array.from(checkboxes).map(checkbox => checkbox.value);
   
   //lee los valores introducidos en el modal y genera un objeto con esos valores
    let ruta= new Ruta(nombreRuta,descripcionRuta,duracionRuta,valAtractivoRuta,precioRuta,boxesSeleccionados,imagenRuta);
    alert("se ha añadido satisfactoriamente")
    administrarPeticiones.postDatos(ruta,"rutas")
})


//añade la puntos a la tabla
let AñadirPuntosBtn = document.getElementById('form-puntos-btn').
addEventListener("click",async ()=>{
    let imagenPunto = document.getElementById('ipt-imagen-punto').value;
    let nombrePunto= document.getElementById('ipt-nombre-punto').value;
    let atractivoPunto = document.getElementsByClassName("ipt-atractivo-punto");
    let valAtractivoPunto=[...atractivoPunto].map((elemento)=> elemento.value)
    let latitudPunto = document.getElementById("ipt-lat-punto").value;
    let longitudPunto = document.getElementById("ipt-long-punto").value;
    let comidaPunto = document.getElementsByClassName("ipt-comida-punto");
    let valComidaPunto=[...comidaPunto].map((elemento)=> elemento.value);
   //lee los valores introducidos en el modal y genera un objeto con esos valores
    let punto= new Punto(nombrePunto,latitudPunto,longitudPunto,valAtractivoPunto,valComidaPunto,imagenPunto);
    alert("se ha añadido satisfactoriamente")
    administrarPeticiones.postDatos(punto,"puntos")
})   



  window.addEventListener('load', async () => {
    let trContenedorRutas = document.getElementById("seccion-rutas");
    await listarRutas(trContenedorRutas);
    
    let botonesEditarRutas = document.getElementsByClassName("btn-editar-rutas");
    [...botonesEditarRutas].forEach((btn) => {
        btn.addEventListener("click", async function(e) {
            await llenarModalRutas(e);
        })});

    let botonesEliminarRutas= document.getElementsByClassName("btn-eliminar-rutas");
    [...botonesEliminarRutas].forEach((btn)=> {
            btn.addEventListener("click", async function(e) {
                await eliminarFilaRutas(e);
            })});        


    let trContenedorPuntos = document.getElementById("seccion-puntos");
    await listarPuntos(trContenedorPuntos);
    
     let botonesEditarPuntos = document.getElementsByClassName("btn-edit-puntos");
    [...botonesEditarPuntos].forEach((btn) => {
        btn.addEventListener("click", async function(e) {
         await llenarModalPuntos(e);
        })});

    let botonesEliminarPuntos= document.getElementsByClassName("btn-eliminar-puntos");
    [...botonesEliminarPuntos].forEach((btn)=> {
            btn.addEventListener("click", async function(e) {
         //await eliminarFilaPuntos(e);
            })});        
    



  })


  export{administrarPeticiones}