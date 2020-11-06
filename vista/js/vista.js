/**
 *  PROYECTO: control de inventarios
 * 	MODULO: VISTA
 *	PROGRAMA: vista.js
 *	ver: 1.0
 */

 /**
  * contiene funciones generales para la vista del proyecto.
  */
 class Vista {
	constructor() {
    }

    /**
     * Carga FORM en DESTINO. confirma que la plantilla exista
     * @param {string} form: id de la plantilla a cargar 
     * @param {string} destino: id del elemento donde se cargará 
     */ 
    mostrarPlantilla(form, destino){
        //limpia contenido 
        let dest=  document.getElementById(destino)
        dest.innerHTML = '';
        let template = document.getElementById(form);
        if (template){	//si la plantilla existe...
            let clon = template.content.cloneNode(true);
            dest.appendChild(clon); //inserta
        }
    }

    /**
     * Limpia el contenido de los Inputs de un formulario
     * @param {*} idForm: identificador del formulario 
     */
    limpiarFormulario(idForm){
		let form = document.getElementById(idForm).elements;
		for (let i = 0; i < form.length; i++) {
            if(document.getElementById(form[i].id).tagName  === 'SELECT'){
                document.getElementById(form[i].id).value = '0';
            }else{
                document.getElementById(form[i].id).value = '';
            }
		}
    }

	/**
	 * Lee valores de los inputs de un formulario
	 * los devuelve en arreglo, cada item con el 
	 * nombre de la columna extraido del id del input
	 * Los inputs tienen su id formado por:
	 * 	nombreTabla + '_' + nombreColumna
	 */
	getDatosForm(idForm) {
		let nArray = {};
		let form = document.getElementById(idForm).elements;
		for (let i = 0; i < form.length; i++) {
			if (form[i].type != 'file') {
				//recuperar nombre de la columna
				let nCol = form[i].id;
				let k = nCol.indexOf('_') + 1;
				nCol = nCol.substring(k);
				nArray[nCol] = form[i].value;
			}

		}
		return nArray;
    }
    
    /** 
	 *	Valida que todos los inputs de un formulario contengan
	 *	datos, segun tipo de input
	 *	devuelte texto con 'ok' o mensaje de error
	 */
	validarDatosForm(form) {
		let elements = document.getElementById(form).elements;
		let msj = 'ok';
		for (let i = 0; i < elements.length; i++) {
			let field_type = elements[i].type.toLowerCase();
			switch (field_type) {
				case "text":
				case "textarea":  //Valida los datos tipo texto.
					//case "hidden":
					if (elements[i].value.length == 0)
						msj = 'Los campos deben contener texto';
					break;

				case "password":  //Valida los password.
					if (elements[i].value.length < 5)
						msj = 'El password debe tener al menos cinco caracteres';
					break;
				case "email":   //Valida los email.
					if (!this.isEmail(elements[i].value))
						msj = 'No es un correo electronico valido';
					break;

				case "select-one":  
				case "select-multi":   //Valida los datos tipo input.
					if (elements[i].value < 0)
						msj = 'Debe seleccionar una opción';
					break;

				case "number":    //Valida los datos tipo numerico.
					if (!elements[i].hidden) {
						if (elements[i].value < 1)
							msj = 'Debe digitar un numero positivo, mayor a cero';
					}
					break;

				case "date":    //Valida los datos tipo fecha.
					if (!this.validarFecha(elements[i])) {
						msj = 'Debe ingresar una fecha válida';
					}
					break;
				case "week":    //Valida los datos tipo fecha, especificando semana.
					if (!this.validarFecha(elements[i])) {
						msj = 'Debe ingresar una fecha.';
					}
					break;
				default:
					break;
			}
		}
		return msj;
    }
    
    /**
     * Verifica una cadena como correo valido
     * @param {string} email 
     */
	isEmail(email) {
		let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

	/**
	 * Desplieg una ventana modal con titulo y mensaje
	 * @param {string} titulo: título de la ventana modal 
	 * @param {string} msj: contenido del cuerpo de la ventana modal 
	 */
	mostrarModal(titulo,msj){
		document.getElementById('modal-titulo').innerHTML = titulo;
		document.getElementById('modal-cuerpo').innerHTML = msj;
		$("#myModal").modal(); //Muestra l aventana  modal
	}

    /**
     * Despliega una lista en un select
     * @param {string} select: id del select en el html 
     * @param {array} lista: array de datos a desplegar en el select 
     * @param {string} key: nombre del campo de valor 
     * @param {string} txtMostrar: nombre del campo a visualizar 
     */
	cargarSelect(select, lista, key, txtMostrar) {
		$('#' + select + ' option').remove();
		$('#' + select).append('<option value= 0>Seleccione una opción...</option>');
		for (let j = 0; j < lista.length; j++) {
			this.cargarOption(lista[j], key, txtMostrar, select)
		}
	}

    /**
     * Metodo auxiliar de cargarSelect
     * @param {array} reg: registro con datos a insertar en un option del select
     * @param {string} key: nombre del campo a cargar en value del option
     * @param {string} txtMostrar: nombre del campo a mostrar en el option
     * @param {string} select: id del select en el html
     */
	cargarOption(reg, key, txtMostrar, select) {
		$('#' + select).append('<option value= '
			+ reg[key] + ' >'
			+ reg[txtMostrar]
			+ '</option>'
		);
	}

	/**
	 * Toma el valor de los atributos del objeto (modelo)
	 * y las muestra en los inputs presentes en pantalla 
	 * que tengan el mismo ID del nombre de cada atributo del objeto
	 * @param modelo: array asociativo del registro a mostrar
	 */
	setDatosForm(modelo) {
		for (let key in modelo) {
			let x =  key; // id del input
			let y = modelo[key]; //Valor
			let caja = document.getElementById(x);
			if (caja) {   //Si existe el elemento
				if (caja.type === 'datetime-local') {
					caja.value = y.substring(0, 10) + 'T' + y.substring(11);
				} else if (caja.type === 'password') {
					caja.value = '';
				} else {
					caja.value = y; 
				}
			}
		}
	}
	
	/**
	 * Desplieg una ventana modal con titulo y mensaje
	 * @param {string} titulo: título de la ventana modal 
	 * @param {string} msj: contenido del cuerpo de la ventana modal 
	 */
	mostrarModal(titulo,msj){
		document.getElementById('modal-titulo').innerHTML = titulo;
		document.getElementById('modal-cuerpo').innerHTML = msj;
		$("#myModal").modal(); //Muestra la ventana  modal
	}


}