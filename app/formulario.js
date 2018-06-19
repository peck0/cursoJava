;

function limpiarFormulario(inputs){
    inputs.forEach(function (v, i){
        document.getElementById(v).value ="";        
    });
}
var Storage = window.localStorage;
var estudiantes = [];

window.onload = function(){
var datosEstudiantes = Storage.getItem("estudiantes");

if (datosEstudiantes !== undefined){
    estudiantes = JSON.parse(datosEstudiantes);
    estudiantes.forEach(function (v,i) {

        agregarRow(v)});
    

    //console.log("Estudiantes :" +datosEstudiantes);
}else{
    console.log("Estudiantes no encontrado");
}

}

function agregarEstudiante(est){
    estudiantes.push(est);

    //agregar a la tabla html
    agregarRow(est);
    
    Storage.setItem("estudiantes", JSON.stringify(estudiantes));

    //TODO: guardar el localStorage
}

function buscarEstudiantePorMatricula(matricula){
    var estudiante = null;

    estudiantes.forEach((v,i) =>{
        if (v.matricula === matricula){
            estudiante = v;
        }
    });
        return estudiante;
    }

function editarEstudiante(botonEditar){
    var matricula = botonEditar.getAttribute("data-matricula");
    //alert(matricula);

    var estudiante = buscarEstudiantePorMatricula(matricula);
    if(estudiante == null){
        console.log("no encontrado...");
        return;
    }

    document.getElementById("nombre").value = estudiante.nombre;
    document.getElementById("matricula").value = estudiante.matricula;
    document.getElementById("identificacion").value = estudiante.identificacion;


}

function agregarRow(estudiante){

    var tablaEstudiante = document.getElementById("tabla_estudiante");

    var tdNombre = document.createElement("td");
    var tdMatricula = document.createElement("td");
    var tdIdentificacion = document.createElement("td");
    var tdOpcion = document.createElement("td")
    var botonEditar = document.createElement("button");
    var tr = document.createElement("tr");

    
    botonEditar.textContent = "Editar";

    tdNombre.textContent = estudiante.nombre;
    tdMatricula.textContent = estudiante.matricula;
    tdIdentificacion.textContent = estudiante.identificacion;
    tdOpcion.textContent = botonEditar;

    

    botonEditar.setAttribute("onclick", "editarEstudiante(this)");
    botonEditar.setAttribute("data-matricula", estudiante.matricula);
    
    tr.appendChild(tdNombre);
    tr.appendChild(tdMatricula);
    tr.appendChild(tdIdentificacion);
    tr.appendChild(tdOpcion.appendChild(botonEditar));
    //tr.appendChild(botonEditar);

    tablaEstudiante.appendChild(tr);
}

function leerEstudiante(){
    var nombre = document.getElementById("nombre").value;
    var matricula = document.getElementById("matricula").value;
    var identificacion = document.getElementById("identificacion").value;

    var estudiantes = new Estudiante();
    estudiantes.nombre = nombre;
    estudiantes.matricula = matricula;
    estudiantes.identificacion = identificacion;
    limpiarFormulario(["nombre","matricula", "identificacion"]);
    //console.log(estudiantes);
    agregarEstudiante(estudiantes);
}
