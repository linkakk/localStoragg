 //Declaracion de variables

//  let datos = [{
//     nombre: "Juan Cifuentes",
//     profesion: "Medico",
//     salario: 6000000
// },
// {
//     nombre: "Andres Alvarez",
//     profesion: "Programador",
//     salario: 5000000
// },
// {
//     nombre: "Ana Mercado",
//     profesion: "Psicologa",
//     salario: 4500000
// }]

// // //guardar informacion en local Storage
// // // // //usamos JSON para pasar el onjeto datos a texto
// localStorage.setItem("info",JSON.stringify(datos))
// alert("Datos guardados con exito")


//extraer informacio 
//getItem como se guardaron 
let informacion =JSON.parse(localStorage.getItem("info"))
let info = [];
if (informacion != null){
    info = informacion;
}
info.forEach((d, i) =>{
    document.write(
        `
        Id:${i}
        Nombre: ${d.nombre}<br>
        Profesion:${d.profesion}<br>
        Salario:${d.salario}<hr>
        `)

});



// //Eliminar informacion
// //removeItem este elimina la informacion que de la parte seleccionada
// localStorage.removeItem("info")