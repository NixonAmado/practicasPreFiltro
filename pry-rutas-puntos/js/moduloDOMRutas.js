import{administrarPeticiones} from"../index/index.js"
import{Ruta} from "./Peticiones.js"
export {llenarModalRutas,listarRutas,eliminarFilaRutas}    


// añade los checkbox de las rutas disponibles en el modal


let checkRutas= document.getElementById('check-rutas');
let añadirCheckBox = document.getElementById('añadir-rutas-btn').
addEventListener('click',async ()=>{
    checkRutas.innerHTML='';
    let puntos=await administrarPeticiones.obtenerDatos("puntos");
    for (let index = 0; index < puntos.length; index++) {
          checkRutas.innerHTML+=
          `
          <div class="col" class"cBox-container">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" name="check-puntos" id="inlineCheckbox${index}" value="${puntos[index].id}" />
            <label class="form-check-label" for="inlineCheckbox${index}">${puntos[index].nombre}</label>
          </div>
          </div>
          
        `
      };
    })


            // reseteo el array a cada entrada
async function llenarModalRutas(e){
    let tr = e.target.closest("tr"); 
    let idTr = tr.id;

     const ruta = await(await fetch(`http://localhost:3000/rutas/${idTr}`)).json()   
     let contenedorModal = document.getElementById('div-modal-editar-rutas');
     console.log(checkRutas.innerHTML);
     contenedorModal.innerHTML = 
     `
  <!-- Modal -->
  <div class="modal" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <!-- modal para editar ruta -->
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
              <p class="text-center">Editar ruta</p>
               <span class="input-group-text rounded-0">URL</span>
               <input type="text" id="ipt-imagen-ruta-edit" aria-label="First name" value="${ruta.imagen}" class="form-control rounded-0" />
           </div>
           <div class="modal-body">
                   <div class="mb-3">
                     <label for="ipt-nombre-ruta-edit" class="form-label">NOMBRE DE LA RUTA</label>
                     <input type="text" class="form-control" value="${ruta.nombre}" id="ipt-nombre-ruta-edit">
                   </div>
                   <div class="mb-3">
                       <label for="ipt-descrip-ruta-edit" class="form-label">DESCRIPCION</label>
                       <input type="text" value="${ruta.descripcion}" class="form-control" id="ipt-desc-ruta-edit">
                     </div>

                   <label for="ipt-duracion-ruta-edit" class="form-label">DURACION</label>
                   <div class="mb-3">
                       <input type="text" class="form-control" value="${ruta.duracion}" id="ipt-duracion-ruta-edit">
                     </div>

                   <div class="mb-3">

                     <div class="input-group text-center">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="">ATRACTIVO TURISTICO</span>
                      </div>
                      <input type="text" class="form-control ipt-atractivo-ruta-edit" value="${ruta.atractivo[0]}">
                      <input type="text" class="form-control ipt-atractivo-ruta-edit" value="${ruta.atractivo[1]}">
                    </div>
                   </div>

                   <p class="d-block">PUNTOS DE LA RUTA:</p>        
                 <div class="mb-3 row row-cols-1 row-cols-sm-2 row-cols-xxl-3 g-3" id="check-ruta-edit">
                 </div>  


                 <div class="mb-3">
                <label for="ipt-precio-ruta-edit"
                class="form-label">PRECIO</label>
                <input type="text" class="form-control" id="ipt-precio-ruta-edit" value="${ruta.precio}" placeholder="dolares">
              </div>
               </div>
               
                  <div class="mb-3 ">
                     <button type="button" class="btn btn-secondary"  data-mdb-dismiss="modal">Close</button>
                   <button type="submit" class="btn btn-primary" id="form-ruta-edit-btn">Guardar Cambios</button>
           </div>         
         </div>
       </div>
    </div>
     `

     let checkRutaEdit = document.getElementById('check-ruta-edit');
     let puntos=await administrarPeticiones.obtenerDatos("puntos");
     checkRutaEdit.innerHTML="";
     for (let index = 0; index < puntos.length; index++) {
           checkRutaEdit.innerHTML+=
           `
           <div class="col" class"cBox-container">
           <div class="form-check form-check-inline">
             <input class="form-check-input" type="checkbox" name="check-puntos" id="inlineCheckboxEdit${index}" value="${puntos[index].id}" />
             <label class="form-check-label" for="inlineCheckboxEdit${index}">${puntos[index].nombre}</label>
           </div>
           </div>
           
         `
       };

            var modal = new mdb.Modal(document.getElementById("exampleModal2"));
            // Llamar a la función show() para abrir el modal
            modal.show();
            
            //añadiar addEvent al boton de editar ya que solo existe cuando se muestra este modal
            
            let formRutaEditBtn = document.getElementById('form-ruta-edit-btn').
            addEventListener("click",()=>{
              let imagenRutaEditar= document.getElementById('ipt-imagen-ruta-edit').value;
              let nombreRutaEditar= document.getElementById('ipt-nombre-ruta-edit').value;
              let descripcionRutaEditar= document.getElementById('ipt-desc-ruta-edit').value;
              let duracionRutaEditar= document.getElementById("ipt-duracion-ruta-edit").value;
              let atractivoRutaEditar= document.getElementsByClassName("ipt-atractivo-ruta-edit");
              let valAtractivoRutaEditar=[];
              [...atractivoRutaEditar].forEach((elemento)=> valAtractivoRutaEditar.push(elemento.value))
              let precioRutaEditar= document.getElementById("ipt-precio-ruta-edit").value;
              const checkboxes = document.querySelectorAll('input[name="check-puntos"]:checked');
              const boxesSeleccionados = Array.from(checkboxes).map(checkbox => checkbox.value);
            
             //lee los valores introducidos en el modal y genera un objeto con esos valores
              let rutaEditar= new Ruta(nombreRutaEditar,descripcionRutaEditar,duracionRutaEditar,valAtractivoRutaEditar,precioRutaEditar,boxesSeleccionados,imagenRutaEditar);
              alert("se ha editado satisfactoriamente")
              administrarPeticiones.actualizarDatos(rutaEditar,"rutas",idTr)
            }) 

            }


        


async function listarRutas(contenedor) {

    let tableBody = contenedor.querySelector("tbody");
    let rutas = await administrarPeticiones.obtenerDatos("rutas");
    tableBody.innerHTML="";
    console.log(rutas);
    for (let index = 0; index < rutas.length; index++) {
      tableBody.innerHTML +=
        `
      <tr id="${rutas[index].id}">
        <td>${rutas[index].id}</td>
      <td>
      <div class="d-flex justify-content-center align-items-center">
        <img
            src="${rutas[index].imagen}"
            alt="${rutas[index].nombre}"
            style="width: 45px; height: 45px"
            class="rounded-circle"
            />
        <div class="ms-3">
          <p class="fw-bold mb-1">${rutas[index].nombre}</p>
          <p class="text-muted mb-0">P${rutas[index].puntosId.join(" P").trim()}</p>
        </div>
      </div>
    </td>
    <td style="max-width: 300px;">
      <p class="text-muted mb-0">${rutas[index].atractivo.join("-")}</p>
    </td>
    <td>
      <p class="text-muted mb-0">media de:${rutas[index].duracion}</p>
    </td>
    <td>
    <p class="fw-bold mb-1">${rutas[index].precio} USD</p>
    <p class="text-muted mb-0">${rutas[index].precio * 4000} COP</p>
    </td>
    <td >
      <button class="mr-2 btn btn-lg text-dark btn-editar-rutas"><i class="far fa-edit"></i></button>
      <button class="btn btn-lg text-dark btn-eliminar-rutas"><i class="far fa-trash-alt"></i></button>
  </td>
  </tr>
      </tr>
      `
    }
  }



  
  async function eliminarFilaRutas(e) {
    let tr = e.target.closest("tr");
    let idTr = tr.id;
    try {
      const ruta = await (await fetch(`http://localhost:3000/rutas/${idTr}`)).json();
      // Obtengo todas las rutas para eliminar la vinculación con algún punto que pertenezca a la ruta eliminada
      let rutas = await administrarPeticiones.obtenerDatos("rutas");
      console.log(rutas);
      for (let punto of ruta.puntosId) {
        console.log(punto);
        // Elimina los puntos vinculados a esa ruta
        await administrarPeticiones.eliminarDatos(punto, "puntos");
    //     // Recorre las rutas para encontrar aquellas que contienen el punto eliminado
    //     rutas.forEach((ruta) => {
    //       if (ruta.puntosId.includes(punto)) {
    //         // Elimina el punto del array de puntosId de la ruta
    //         ruta.puntosId = ruta.puntosId.filter((id) => id !== punto);
    //         // Ahora, realiza una solicitud PUT para actualizar las rutas en el JSON Server
    //         administrarPeticiones.actualizarDatos(ruta, "rutas", toString(ruta.id));
    //       }
    //     });
     }
     await administrarPeticiones.eliminarDatos(idTr,"rutas");
     } catch (error) {
      console.log("error: " + error);
    }
  }
  
