import{administrarPeticiones} from"../index/index.js"
import{Punto} from"./Peticiones.js";
export {listarPuntos,llenarModalPuntos}

async function listarPuntos(contenedor) {

    let tableBody = contenedor.querySelector("tbody");
    let puntos = await administrarPeticiones.obtenerDatos("puntos");
    tableBody.innerHTML="";
    for (let index = 0; index < puntos.length; index++) {
      tableBody.innerHTML +=
        `
      <tr id="${puntos[index].id}">
        <td>${puntos[index].id}</td>
      <td>
      <div class="d-flex justify-content-center align-items-center">
        <img
            src="${puntos[index].imagen}"
            alt="${puntos[index].nombre}"
            style="width: 45px; height: 45px"
            class="rounded-circle"
            />
        <div class="ms-3">
          <p class="fw-bold mb-1">${puntos[index].nombre}</p>
          <p class="text-muted mb-0">${puntos[index].latitud||""}-${puntos[index].longitud||""}</p>
        </div>
      </div>
    </td>
    <td style="max-width: 300px;">
      <p class="fw-bold mb-1">${puntos[index].atractivo.join("-")||""}</p>
    </td>
    <td>
      <p class="fw-bold mb-1">${puntos[index].comidaTipica.join("-")}</p>
    </td>
    
    <td >
      <button class="mr-2 btn btn-lg text-dark btn-edit-puntos"><i class="far fa-edit"></i></button>
      <button class="btn btn-lg text-dark btn-eliminar-puntos"><i class="far fa-trash-alt"></i></button>
  </td>
  </tr>
      </tr>
      `
    }
  }



  async function llenarModalPuntos(e){
    let tr = e.target.closest("tr"); 
    let idTr = tr.id;

     const punto = await(await fetch(`http://localhost:3000/puntos/${idTr}`)).json()   
     let contenedorModal = document.getElementById('div-modal-editar-puntos');
     contenedorModal.innerHTML = 
     `
  
<div class="modal" id="modalEditPuntos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<!-- modal para añadir puntos -->
 <div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
         <span class="input-group-text rounded-0">URL</span>
         <input type="text" id="ipt-imagen-punto-edit" value="${punto.imagen}" aria-label="First name" placeholder="Preferiblemente en JPG" class="form-control rounded-0" />
     </div>
     <div class="modal-body">
             <div class="mb-3">
               <label for="ipt-nombre-punto-edit" class="form-label">NOMBRE DEl PUNTO</label>
               <input type="text" class="form-control" value="${punto.nombre}" id="ipt-nombre-punto-edit">
             </div>
             <div class="mb-3">
                 <label for="ipt-lat-punto-edit" class="form-label">LATITUD</label>
                 <input type="text"  class="form-control" value="${punto.latitud}" id="ipt-lat-punto-edit">
               </div>

             <label for="ipt-long-punto-edit" class="form-label">LONGITUD</label>
             <div class="mb-3">
                 <input type="text" class="form-control" value="${punto.longitud}" id="ipt-long-punto-edit">
               </div>

             <div class="mb-3">

               <div class="input-group text-center">
                <div class="input-group-prepend">
                  <span class="input-group-text" >ATRACTIVO TURISTICO</span>
                </div>
                <input type="text" class="form-control ipt-atractivo-punto-edit" value="${punto.atractivo[0]}"  placeholder="EJ: Sierra Nevada">
                <input type="text" class="form-control ipt-atractivo-punto-edit" value="${punto.atractivo[1]}"  placeholder="EJ: Tayrona">
              </div>
             </div>

             <div class="input-group text-center">
              <div class="input-group-prepend">
                <span class="input-group-text" >COMIDA TIPICA</span>
              </div>
              <input type="text" class="form-control ipt-comida-punto-edit" value="${punto.comidaTipica[0]}"  placeholder="EJ: Bollo de Yuca">
              <input type="text" class="form-control ipt-comida-punto-edit" value="${punto.comidaTipica[1]}"  placeholder="EJ: Cazuela de mariscos">
            </div>
           </div>

         
            <div class="mb-3 ">
               <button type="button" class="btn btn-secondary"  data-mdb-dismiss="modal">Close</button>
             <button type="submit" class="btn btn-primary" id="form-puntos-btn-edit">Guardar cambios</button>
     </div>         
   </div>
 </div>
</div>   `

            var modal = new mdb.Modal(document.getElementById("modalEditPuntos"));
            // Llamar a la función show() para abrir el modal
            modal.show();         
            //añadiar addEvent al boton de editar ya que solo existe cuando se muestra este modal    
            let formPuntoEditBtn = document.getElementById('form-puntos-btn-edit').
            addEventListener("click",()=>{
                let imagenPuntoEditar = document.getElementById('ipt-imagen-punto-edit').value;
                let nombrePuntoEditar = document.getElementById('ipt-nombre-punto-edit').value;
                let atractivoPuntoEditar = document.getElementsByClassName("ipt-atractivo-punto-edit");              
                let valAtractivoPuntoEditar =[];
                [...atractivoPuntoEditar].forEach((elemento)=> valAtractivoPuntoEditar.push(elemento.value));
                let latitudPuntoEditar = document.getElementById("ipt-lat-punto-edit").value;
                let longitudPuntoEditar = document.getElementById("ipt-long-punto-edit").value;
                let comidaPuntoEditar = document.getElementsByClassName("ipt-comida-punto-edit");
                let valComidaPuntoEditar =[];
                [...comidaPuntoEditar].forEach((elemento)=> valComidaPuntoEditar.push(elemento.value));  
                //lee los valores introducidos en el modal y genera un objeto con esos valores
            
             //lee los valores introducidos en el modal y genera un objeto con esos valores
              let puntoEditar= new Punto(nombrePuntoEditar,latitudPuntoEditar,longitudPuntoEditar,valAtractivoPuntoEditar,valComidaPuntoEditar,imagenPuntoEditar);
              alert("se ha editado satisfactoriamente")
              administrarPeticiones.actualizarDatos(puntoEditar,"puntos",idTr)
            }) 

            }
