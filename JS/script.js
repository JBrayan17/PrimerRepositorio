
var ListaDeTareas = [];
MostrarLasTareas();
document.getElementById('id_formulario').addEventListener('submit', Guardar);

function Guardar(e) {

    //Si la lista contiene datos
    if (localStorage.getItem("Tareas") !== null) {
        //agregarlos a la lista
        ListaDeTareas = JSON.parse(localStorage.getItem("Tareas"));
    }
    //extraer dato del input
    const tarea = document.getElementById("txtTarea").value;

    //si el campo contiene dato
    if (Validar(tarea) == false) {
        if (tarea.length > 0) {
            //ingresar el nuevo dato a la lista
            ListaDeTareas.push(tarea);
            //guardar la lista en el localStorage
            localStorage.setItem("Tareas", JSON.stringify(ListaDeTareas));

            document.getElementById("txtTarea").value = "";
        } else {
            alertify.error("Debe ingresar una tarea");
        }

    }

    /* for (let i = 0; i < listaDeTareas.length; i++) {
         console.log(listaDeTareas[i]);
 
     }*/
    MostrarLasTareas();
    event.preventDefault();
}


function ObtenerTareas() {

    var lista = localStorage.getItem("Tareas");
    if (lista == null) {
        ListaDeTareas = [];
    } else {
        ListaDeTareas = JSON.parse(lista);
    }

    return ListaDeTareas;
}

function MostrarLasTareas() {

    //se obtiene la lista de tareas
    var listaDeTareas = ObtenerTareas();
    //acceder al ul del html
    const lista = document.querySelector("#lista");
    lista.innerHTML = "";

    var cantidadDeTareas = listaDeTareas.length;

    //recorrer la lista de tareas
    for (let posicion = 0; posicion < cantidadDeTareas; posicion++) {
        //se crea un <li> 
        const fila = document.createElement("li");
        fila.className = "select";
        // se crea un boton edit y sus propiedades
        var botonEditar = document.createElement("input");
        botonEditar.type = "button";
        botonEditar.value = "Editar";
        botonEditar.id = "btn-editar";
        botonEditar.className = "btn btn-primary btn-sm";
        botonEditar.setAttribute("onclick", "EditarTarea(" + posicion + ")");

        //se crea un boton delete y sus propiedades
        var botonEliminar = document.createElement("input");
        botonEliminar.type = "button";
        botonEliminar.value = "Eliminar";
        botonEliminar.id = "btn-eliminar";
        botonEliminar.className = "btn btn-primary btn-sm";
        botonEliminar.setAttribute("onclick", "EliminarTarea(" + posicion + ")");

        //se crea un nodo de texto que tendra la tarea
        var nodoDeTexto = document.createTextNode(listaDeTareas[posicion]);
        //se agrega el nodo de texto al <li>
        fila.appendChild(nodoDeTexto);

        //se agrega el <li> al <ul> con los botones
        lista.appendChild(fila).append(botonEliminar, botonEditar);

    }

}


//Funcion Eliminar datos y Limpiar campos
function EliminarTarea(id) {
    //Se obtiene la lista de tareas
    var lista = JSON.parse(localStorage.getItem("Tareas"));
    //se elimina con el metodo splice recibiendo por parametro la posicion
    lista.splice(id, 1);
    //se atualiza la lista
    localStorage.setItem("Tareas", JSON.stringify(lista));

    MostrarLasTareas();
};

function EditarTarea(id) {

    var lista = ObtenerTareas();
    var tarea = event.path[1].firstChild.data;
    var input = event.path[1];
    input.innerHTML = '';
    input.innerHTML += '<div> <input type="text" id="txtNuevaTarea" value="' + tarea + '" /> <a class="btn btn-outline-info btn-sm" id="Cancelar" onclick="Cancelar()"> Cancelar</a> <a class="btn btn-outline-info btn-sm" id="Actualizar" onclick="Actualizar(' + (id) + ')"> Guardar</a> </div>';
}

function Actualizar(id) {


    var listaDeTareas = ObtenerTareas();
    var nuevaTarea = document.getElementById("txtNuevaTarea").value;

    if (Validar(nuevaTarea) == false) {
        listaDeTareas.splice(id, 1, nuevaTarea);

        localStorage.setItem("Tareas", JSON.stringify(listaDeTareas));

        console.log(listaDeTareas);

        MostrarLasTareas();
    }


}

function Cancelar() {
    MostrarLasTareas();
}
function Validar(tarea) {
    var validado = false;
    listaDeTareas = ObtenerTareas();
    tarea = tarea.toLowerCase();
    for (let i = 0; i < listaDeTareas.length; i++) {
        if (listaDeTareas[i] == tarea) {
            alertify.alert("Ya existe una tarea igual");
            validado = true;
            document.getElementById("txtTarea").value = "";
        }
    }
    return validado;
}

