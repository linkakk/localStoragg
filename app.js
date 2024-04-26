
//declaracion de variables*/
let nombrePro = document.querySelector(".nombre-producto")
let presentacionPro = document.querySelector(".presentacion-producto")
let precioPro = document.querySelector(".precio-producto")
let imagenPro = document.querySelector(".imagen-producto")
let btnGuardarPro = document.querySelector(".btn-guardar")
let tabla = document.querySelector(".table > tbody")
let btnBuscar = document.querySelector(".btn-buscar")





//creamos un evento para el btn guardar
btnGuardarPro.addEventListener("click",()=>{
    //alert(nombrePro.value  )
    //console.log(ObtenerDatos())
    let datos = ObtenerDatos();
    GuardarDatos( datos );
    BorrarTabla()
    MostrarDatos();
    
})

//cremaos una funcion para recoger los datos del formulario
function ObtenerDatos(){
    let producto
//validar campos del formulario
    if(nombrePro.value == "" || presentacionPro.value == "" ||
    precioPro.value == "" || imagenPro.value == ""){
    alert("todos lo campos son obligatorios")

    }else{
        producto ={
        nombre : nombrePro.value,
        presentacion : presentacionPro.value,
        precio : precioPro.value,
        imagen : imagenPro.value
    }
    //limpiamos los campos del formulario
    nombrePro.value  = "";
    presentacionPro.value = "";
    precioPro.value = "";
    imagenPro.value = "";

    return producto;
    

    }
}
//esta variable se crea para que se asocie con la palabra clave productos
const listaProductos ="productos";

function GuardarDatos ( datos ){
    //creamos un array para almacenar la informacion que se ira agregando en el local storage
    let listado = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listaProductos))
    //validar los datos guardados en local storage

    //se busca que la informacion no se null ya que en el local storage no se puede almacenar ese
    //tipo de datos
    if( pedidosPrevios != null){
        listado = pedidosPrevios;
    }

    listado.push(datos);
    //se crea para almacenar la informacion en local storage
    //usamos JSON.stringify para convertitr un objeto en texto por lo que la informacion se puede mostrar
    localStorage.setItem(listaProductos,JSON.stringify(listado));
    //validar que los datos se guarden
    alert("Datos guardados con exito")

}



//esta funcion mostrara la informacion dentro del formulario
function  MostrarDatos (){
    let listado = [];
    //extraer datos guardados anteriormente en local Storage

    pedidosPrevios = JSON.parse(localStorage.getItem(listaProductos));
    //validar los datos guardados previamente en localStorage

    if (pedidosPrevios != null){
        listado = pedidosPrevios;
    }
    console.log(listado)
    //mostrar los datos en la tabla

    listado.forEach((i,j)=> {
        let fila = document.createElement("tr");
        fila.innerHTML= 
        `
        <td> ${j+1} </td>
        <td> ${i.nombre} </td>
        <td> ${i.presentacion}</td>
        <td> ${i.precio}</td>
        <td>  <img src = "${i.imagen}" width = "50%"</td>
        <td>
            <span class = "btn-editar btn btn-warning">🖋️</span>
        </td>
        <td>
            <span  onclick = "EliminarProducto(${j})" class = "btn-elimar btn btn-danger">✖️</span>
        </td>

        `

        tabla.appendChild(fila)
    });
}



//funcuin para elinar un producto de la tabla
function EliminarProducto(pos){
        //creamos un array para almacenar la informacion que se ira agregando en el local storage
        let listado = [];
        let pedidosPrevios = JSON.parse(localStorage.getItem(listaProductos))
        //validar los datos guardados en local storage
    
        //se busca que la informacion no se null ya que en el local storage no se puede almacenar ese
        //tipo de datos
        if( pedidosPrevios != null){
            listado.push(pedidosPrevios);
        }
        //confirma producto a eliminar
        let confirmar = confirm("¿Desea eliminar el producto?  " )

        if (confirmar){
            //alert("lo eliminastes")
            let p = listado.splice(pos,1)
            alert("producto eliminado con exito")
            //guardar los datos que quedaron en el localStorage
            localStorage.setItem(listaProductos, JSON.stringify(listado))
            BorrarTabla();
            MostrarDatos();
        }
}


//quitar los datos de la tabla
function BorrarTabla(){
    let filas = document.querySelectorAll(".table tbody tr")
    //console.log(filas)
    filas.forEach((f)=>{
        f.remove()
    });
}
//mostrar los datos de el localStorage al recargar la pagina
document.addEventListener("DOMContentLoaded",function(){
    MostrarDatos();
    BorrarTabla();
})
MostrarDatos()



btnBuscar.addEventListener("click",()=>{
    //alert("funciona")
    BuscarProducto()

})
function BuscarProducto() {
    let textoBusqueda = document.querySelector(".buscar").value.toLowerCase(); // Obtener texto de búsqueda y convertirlo a minúsculas
    // console.log("Este es el contenido de la búsqueda: " + textoBusqueda);
    let listaProductos = JSON.parse(localStorage.getItem("productos")) || []; // Obtener lista de productos

    // Filtrar productos que coincidan con el texto de búsqueda
    let productosFiltrados = listaProductos.filter(producto => {
        return (producto.nombre && producto.nombre.toLowerCase().includes(textoBusqueda)) ||
               (producto.presentacion && producto.presentacion.toLowerCase().includes(textoBusqueda)) ||
               (producto.precio && producto.precio.toString().includes(textoBusqueda)); // Verificar si producto.precio está definido antes de llamar a toLowerCase()
    });

    // Limpiar tabla antes de mostrar resultados
    BorrarTabla();

    // Mostrar productos filtrados en la tabla
    productosFiltrados.forEach((producto, indice) => {
        let fila = document.createElement("tr");
        fila.innerHTML =
            `<td>${indice + 1}</td>
             <td>${producto.nombre}</td>
             <td>${producto.presentacion}</td>
             <td>${producto.precio}</td>
             <td><img src="${producto.imagen}" width="50%"></td>
             <td><span class="btn-editar btn btn-warning">🖋️</span></td>
             <td><span onclick="EliminarProducto(${indice})" class="btn-eliminar btn btn-danger">✖️</span></td>`;
        tabla.appendChild(fila);
    });
}

