"use strict";
/**
 * Modulo principal CAPA CONTROLADOR
 */

/**++ VARIABLES GLOBALES ++++++++++++++++++++++++++++++++++++++++++++ */
var vista = new Vista();    //objeto de la clase Vista
var listaProveedores = [];
var proveedor = new Proveedor();
/**
 * Asigna manejadores de eventos a los botones del menu principal
 * Se ejecuta al cargar la pagina
 */ 
window.onload = function() {
    document.getElementById("btnProveedor").addEventListener("click", mostrarFormCrearProv);
    document.getElementById("btnCliente").addEventListener("click", mostrarFormCrearClie);
    document.getElementById("btnCrearProd").addEventListener("click", mostrarFormCrear);
    document.getElementById("btnIngresarProd").addEventListener("click", mostrarFormIngreso);
    document.getElementById("btnVenderProd").addEventListener("click", mostrarFormVenta);
    document.getElementById("btnConsultar").addEventListener("click", mostrarTablaVentas);
    document.getElementById("btnTendencia").addEventListener("click", mostrarTendenciaVentas);
    document.getElementById("btnRentabilidad").addEventListener("click", mostrarRentabilidad);
    
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * Funcion para mostar formulario CRUD de Proveedores
 */
function mostrarFormCrearProv(){
    vista.mostrarPlantilla('formProveedor', 'areaTrabajo');
    document.getElementById("btnProveedorLimpiar").addEventListener("click", limpiarFormCrearProv);
    document.getElementById("btnProveedorModificar").addEventListener("click", modificarProveedor);
    document.getElementById("btnProveedorCrear").addEventListener("click", crearProveedor);
    document.getElementById("idProveedor").addEventListener("change", mostrarDatosProveedor);
    proveedor.consultarProveedores(consultarProveedoresRetorno);    //cargar el select de proveedores
}


/**
 * Carga los datos del proveedor seleccionado en el formulario
 */
function mostrarDatosProveedor() {
    //tomar el idProveedor desde el value del select
    let idProvedor = document.getElementById("idProveedor").value;
    //buscar el proveedor en la lista
    for (let i = 0; i < listaProveedores.length; i++) {
        let dato = listaProveedores[i].getData();
        if(dato['idProveedor'] === parseInt(idProvedor)){
            //desplegar los datos en el formulario
            vista.setDatosForm(dato);
            break;
        }
    }
}



function consultarProveedoresRetorno(datos) {
    listaProveedores = []; //limpia la lista
    for (let i = 0; i < datos['data'].length; i++) {
        let proveedor = new Proveedor(datos['data'][i]);
        listaProveedores.push(proveedor); 
    } 
    //Insertar en el select del formulario
    vista.cargarSelect('idProveedor', datos['data'], 'idProveedor', 'nombreProveedor');
}

function limpiarFormCrearProv() {
    vista.limpiarFormulario('formularioProveedor');
}


/**
 * Modifica un registro en la tabla Proveedor
 */
function modificarProveedor() {
    let resultado = vista.validarDatosForm('formularioProveedor');
    if (resultado === 'ok') {
        let datos = vista.getDatosForm('formularioProveedor');
        proveedor.modificarProveedor(datos, modificarProveedorRetorno);
    } else {
        vista.mostrarModal('MODIFICAR PROVEEDOR', 'Datos no Validos: '+ resultado);
    }
}

function modificarProveedorRetorno(resp) {
    if(resp['ok'] === 1){
        vista.mostrarModal('MODIFICAR PROVEEDOR', 'Registro modificado correctamente');
        proveedor.consultarProveedores(consultarProveedoresRetorno);
    }else{
        vista.mostrarModal('MODIFICAR PROVEEDOR', 'No se pudo modificar el registro');
    }
}

function crearProveedor() {
    let ok = vista.validarDatosForm('formularioProveedor');
    if(ok === 'ok'){
        let datos = vista.getDatosForm('formularioProveedor');
        let proveedor = new Proveedor(datos);
        listaProveedores.push(proveedor);
        //guardar proveedor en la BD
        //refrescar el select
    } else{
        alert(ok);
    }

}



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mostrarFormCrearClie(){
    vista.mostrarPlantilla('formCliente', 'areaTrabajo');
    document.getElementById("btnClienteLimpiar").addEventListener("click", limpiarFormCrearClie);

}

function limpiarFormCrearClie() {
    vista.limpiarFormulario('formularioCliente');
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**Crear Productos */
function mostrarFormCrear() {
    vista.mostrarPlantilla('formCrearArticulo', 'areaTrabajo');
    document.getElementById("btnArticuloLimpiar").addEventListener("click", limpiarFormCrearArticulo);
    
}

function limpiarFormCrearArticulo() {
    vista.limpiarFormulario('formularioCrearArticulo');
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mostrarFormIngreso() {
    vista.mostrarPlantilla('formIngresoArticulo', 'areaTrabajo');
    document.getElementById("btnIngresoArticuloLimpiar").addEventListener("click", limpiarFormIngresoArticulo);
    
}

function limpiarFormIngresoArticulo() {
    vista.limpiarFormulario('formularioIngresoArticulo');
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mostrarFormVenta() {
    vista.mostrarPlantilla('formVentaArticulo', 'areaTrabajo');
    document.getElementById("btnVenderArticulolimpiar").addEventListener("click", limpiarFormVentaArticulo);
    
}

function limpiarFormVentaArticulo() {
    vista.limpiarFormulario('formularioVenderArticulo');    
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mostrarTablaVentas() {
    vista.mostrarPlantilla('mostrarVentas', 'areaTrabajo');
    
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mostrarTendenciaVentas() {
    vista.mostrarPlantilla('tendenciaVentas', 'areaTrabajo');
    
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function mostrarRentabilidad() {
    vista.mostrarPlantilla('rentabilidad', 'areaTrabajo');
    
}