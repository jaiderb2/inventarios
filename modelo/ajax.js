/**
 * Clase ABSTRACTA para conectar al servidor
 */

class ConexionAjax{
    constructor(){

    }

    /**
     * @param {array} datos //datos de la consulta.
     * @param {función} funcionRetorno  //función que ejecuta al finalizar validación. 
     */
    ejecutarAjax(datos, funcionRetorno) { //Parámetros requeridos para ejecutar.
        $.ajax({
            url: 'servidor/despachador.php', //Conecta al archivo que almacena las consultas.
            data: datos,   //Consulta y parámetros.
            type: 'post',
            success: function (response) {
                let resp = JSON.parse(response); //Validar JSON.
                if (typeof resp == 'object') {
                    funcionRetorno(resp); //Ejecuta la función de retorno.
                } else {
                    console.log("Error en los datos de respuesta.");  //Mensaje si la función no es válida.
                }
            }
        });
    }
}
