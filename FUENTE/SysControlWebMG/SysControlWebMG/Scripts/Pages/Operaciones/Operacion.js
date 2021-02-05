var app_Operacion = (function (win, doc) {

	const data = {
		urlCargaInicial: '/Operacion/CargaInicial',
		urlGuardarOperacion: '/Operacion/GuardarOperacion',
		urlGuardarOperacionCalculadora: '/Operacion/GuardarOperacionCalculadora',
		urlEditarConfiguracionTipoCambio: '/Operacion/_EditarConfiguracionTipoCambio',
		urlObtenerConfCaja: '/Operacion/ObtenerConfCaja',
		valores: {
			Monedas: {
				IdSoles: "1",
				IdDolares: "2",
				IdEuros: "1"
            },
			TipoOperacionCompra: "1",
			TipoOperacionVenta: "2",
			TipoOperacionCV: {
				TipoOperacionCompraDolar: 1,
				TipoOperacionVentaDolar: 2,
				TipoOperacionCompraEuro: 3,
				TipoOperacionVentaEuro: 4,
				TipoOperacionDolAEuro: 5,
				TipoOperacionEuroADol: 6,
			},
			TipoOperacionOtras: {
				TipoOperacionIngreso: 5,
				TipoOperacionVentaEnvio: 6,
				TipoOperacionVentaPago: 7,
				TipoOperacionVentaGasto: 8
            },
			TblTipoOperacion: 1,
			TblMoneda: 2
		},
		flagValorTipoOperacion: 0
	}


	function init() {
		cargaInicial();
		obtenerConfCaja();
		changeTipoOperacion('inicio');
		document.getElementById("cboTipoOperacion").addEventListener("change", changeTipoOperacion);
		document.getElementById("txtMonto").addEventListener("blur", ForceDecimalOnly);
		document.getElementById("btnCompraDolar").addEventListener("click", click_CompraDolar);
		document.getElementById("btnVentaDolar").addEventListener("click", click_VentaDolar);
		document.getElementById("btnCompraEuro").addEventListener("click", click_CompraEuro);
		document.getElementById("btnVentaEuro").addEventListener("click", click_VentaEuro);
		document.getElementById("btnDolAEuro").addEventListener("click", click_DolAEuro);
		document.getElementById("btnEuroADol").addEventListener("click", click_EuroADol);
		document.getElementById("btnRegistrarOperacion").addEventListener("click", btnRegistrarOperacion_Click);
		document.getElementById("btnEditarTipoCambio").addEventListener("click", btnEditarTipoCambio_Click);
		document.getElementById("btn_g").addEventListener("click", btn_g_Click);			
	}

	function validarGuardarOperacionCalculadora() {
		var operacion = $("#opr").text();
		var resultado = $("#tResult").val();
		if (operacion == "") {
			toastr.error('Debe realizar una operación', 'Error');
			return false;
		}
		if (resultado == "") {
			toastr.error('Debe calcular la operación', 'Error');
			return false;
		}
		return true;
	};

	function btn_g_Click() {
		if (validarGuardarOperacionCalculadora()) {
			swal({
				title: "¿Desea registrar la operación?",
				type: "warning",
				showCancelButton: true,
				confirmButtonClass: "btn-danger",
				confirmButtonText: "Registrar",
				cancelButtonText: "Cancelar"
			},
				function (isConfirm) {
					if (isConfirm) {
						var ope = {
							idOperacion: 0,
							Operacion: $("#opr").text(),
							Resultado: $("#tResult").val(),
							Comentario: $("#txtComentarioCalc").val()
                        }
						$.ajax({
							type: "POST",
							url: data.urlGuardarOperacionCalculadora,
							data: '{ope: ' + JSON.stringify(ope) + '}',
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							success: function (d) {
								swal({ title: "Operación Registrada!", text: "Se guardó la operación con éxito.", type: "success" });
							},
							error: function (ex) {
								alert(ex.responseText);
							}
						});
					}
				}
			);
        }
	}

	function obtenerConfCaja() {
		$.ajax({
			type: "POST",
			url: data.urlObtenerConfCaja,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (d) {
				document.getElementById("txtTCCompraDolar").value = d.lstConfCaja.TCCompraDolar;
				document.getElementById("txtTCVentaDolar").value = d.lstConfCaja.TCVentaDolar;
				document.getElementById("txtTCCompraEuro").value = d.lstConfCaja.TCCompraEuro;
				document.getElementById("txtTCVentaEuro").value = d.lstConfCaja.TCVentaEuro;
				document.getElementById("txtCajaActualSoles").value = d.lstConfCaja.CajaActualSoles;
				document.getElementById("txtCajaActualDolares").value = d.lstConfCaja.CajaActualDolares;
				document.getElementById("txtCajaActualEuros").value = d.lstConfCaja.CajaActualEuros;	
			},
			error: function (ex) {
				alert(ex.responseText);
				//ocultarLoader();
			}
		});
    }

	function btnRegistrarOperacion_Click() {
		if (validarGuardarOperacion()) {
			swal({
				title: "¿Desea registrar la operación?",
				text: getTxtHtmlOtrasOpe(),
				html: true,
				type: "warning",
				showCancelButton: true,
				confirmButtonClass: "btn-danger",
				confirmButtonText: "Registrar",
				cancelButtonText: "Cancelar"
			},
				function (isConfirm) {
					if (isConfirm) {
						swal.close()
						mostrarLoader();
						guardarOperacion();
					}
				}
			);
		}
	}

	function getTxtHtmlOtrasOpe() {
		var TipoOperacion = "";
		var MontoIngreso = "";
		var Moneda = "";
		var TextoHtml = "";
		if (parseInt(document.getElementById("cboTipoOperacion").value) == 7) {
			TipoOperacion = "Ingreso"
			if (document.getElementById("cboMoneda").value == "1") {
				Moneda = "Sol"
				MontoIngreso = 'S/.' + document.getElementById("txtMonto").value;
			}
			if (document.getElementById("cboMoneda").value == "2") {
				Moneda = "Dólar"
				MontoIngreso = '$ ' + document.getElementById("txtMonto").value;

			}
			if (document.getElementById("cboMoneda").value == "3") {
				Moneda = "Euro"
				MontoIngreso = '€ ' + document.getElementById("txtMonto").value;
			}
		}
		if (parseInt(document.getElementById("cboTipoOperacion").value) == 8) {
			TipoOperacion = "Envío"
			if (document.getElementById("cboMoneda").value == "1") {
				Moneda = "Sol"
				MontoIngreso = 'S/.' + document.getElementById("txtMonto").value;
			}
			if (document.getElementById("cboMoneda").value == "2") {
				Moneda = "Dólar"
				MontoIngreso = '$ ' + document.getElementById("txtMonto").value;

			}
			if (document.getElementById("cboMoneda").value == "3") {
				Moneda = "Euro"
				MontoIngreso = '€ ' + document.getElementById("txtMonto").value;
			}
		}
		if (parseInt(document.getElementById("cboTipoOperacion").value) == 9) {
			TipoOperacion = "Pago"
			if (document.getElementById("cboMoneda").value == "1") {
				Moneda = "Sol"
				MontoIngreso = 'S/.' + document.getElementById("txtMonto").value;
			}
			if (document.getElementById("cboMoneda").value == "2") {
				Moneda = "Dólar"
				MontoIngreso = '$ ' + document.getElementById("txtMonto").value;

			}
			if (document.getElementById("cboMoneda").value == "3") {
				Moneda = "Euro"
				MontoIngreso = '€ ' + document.getElementById("txtMonto").value;
			}
		}
		if (parseInt(document.getElementById("cboTipoOperacion").value) == 10) {
			TipoOperacion = "Gasto"
			if (document.getElementById("cboMoneda").value == "1") {
				Moneda = "Sol"
				MontoIngreso = 'S/.' + document.getElementById("txtMonto").value;
			}
			if (document.getElementById("cboMoneda").value == "2") {
				Moneda = "Dólar"
				MontoIngreso = '$ ' + document.getElementById("txtMonto").value;

			}
			if (document.getElementById("cboMoneda").value == "3") {
				Moneda = "Euro"
				MontoIngreso = '€ ' + document.getElementById("txtMonto").value;
			}

		}
			TextoHtml = `<div class="form-group col-md-12">
							<div class="form-group col-md-12">
								<label>Tipo Operación: ${TipoOperacion}</label>
							</div>
							<div class="form-group col-md-12">
								<label>Moneda Ingresa: ${Moneda}</label>
							</div>
							<div class="form-group col-md-12">
								<label>Monto: ${MontoIngreso}</label>
							</div>
						</div>`;
		
		return TextoHtml;
	}


	function btnEditarTipoCambio_Click() {
		$('#modalEditarConfCaja').modal('show');
    }

	function click_CompraDolar() {
		document.getElementById("txtPagaCon").value = "";
		document.getElementById("txtVuelto").value = "";		
		data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionCompraDolar;
		guardarOperacionCV(data.valores.TipoOperacionCV.TipoOperacionCompraDolar);
	}
	function click_VentaDolar() {
		data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionVentaDolar;
		guardarOperacionCV(data.valores.TipoOperacionCV.TipoOperacionVentaDolar);
	}
	function click_CompraEuro() {
		document.getElementById("txtPagaCon").value = "";
		document.getElementById("txtVuelto").value = "";		
		data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionCompraEuro;
		guardarOperacionCV(data.valores.TipoOperacionCV.TipoOperacionCompraEuro);
	}
	function click_VentaEuro() {
		data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionVentaEuro;
		guardarOperacionCV(data.valores.TipoOperacionCV.TipoOperacionVentaEuro);
	}
	function click_DolAEuro() {
		data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionDolAEuro;
		guardarOperacionCV(data.valores.TipoOperacionCV.TipoOperacionDolAEuro);
	}
	function click_EuroADol() {
		data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionEuroADol;
		guardarOperacionCV(data.valores.TipoOperacionCV.TipoOperacionEuroADol);
	}

	function guardarOperacionCV(valor) {
		if (validarGuardarOperacion()) {
			calcularOperacion(valor);
				swal({
					title: "Datos de la Operación",
					text: getTxtHtml(),
					html: true,
					type: "warning",
					showCancelButton: true,
					confirmButtonClass: "btn-danger",
					confirmButtonText: "Aceptar",
					cancelButtonText: "Cancelar"
				},
					function (isConfirm) {
						if (isConfirm) {
							swal.close()
							guardarOperacion();
						}
					}
				);
		}
	}

	function calcularOperacion(valor) {
		var monto = parseFloat(document.getElementById("txtMonto").value);
		var TipoCambioCompraDolar = parseFloat(document.getElementById("txtTCCompraDolar").value);
		var TipoCambioVentaDolar = parseFloat(document.getElementById("txtTCVentaDolar").value);
		var TipoCambioCompraEuro = parseFloat(document.getElementById("txtTCCompraEuro").value);
		var TipoCambioVentaEuro = parseFloat(document.getElementById("txtTCVentaEuro").value);
		var Vuelto = ''

		// Dólares y Euros
		// Dólares a Euros
		if (valor == data.valores.TipoOperacionCV.TipoOperacionDolAEuro) {
			var resultadooperacion1 = parseFloat(monto * TipoCambioCompraDolar).toFixed(2);
			var resultadooperacion2 = parseFloat(resultadooperacion1 / TipoCambioVentaEuro).toFixed(2);
			document.getElementById("txtMontoEntrega").value = resultadooperacion2;
			document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (€):';
		}
		// Euros a Dólares
		if (valor == data.valores.TipoOperacionCV.TipoOperacionEuroADol) {
			var resultadooperacion1 = parseFloat(monto * TipoCambioCompraEuro).toFixed(2)
			var resultadooperacion2 = parseFloat(resultadooperacion1 / TipoCambioVentaDolar).toFixed(2);
			document.getElementById("txtMontoEntrega").value = resultadooperacion2;
			document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar ($):';
		}

		// Dólares 
		// Compra
		if (valor == data.valores.TipoOperacionCV.TipoOperacionCompraDolar) {
			document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraDolar).toFixed(2)
			document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (S/.):';
        }
		// Venta
		if (valor == data.valores.TipoOperacionCV.TipoOperacionVentaDolar) {
			document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioVentaDolar).toFixed(2)
			document.getElementById('lblMontoIngreso').innerHTML = 'Monto a pagar ($):';
			//document.getElementById("txtVuelto").value = Vuelto;
		}

		// Euros
		// Compra
		if (valor == data.valores.TipoOperacionCV.TipoOperacionCompraEuro) {
			document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraEuro).toFixed(2)
			document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (S/.):';
        }
		// Venta
		if (valor == data.valores.TipoOperacionCV.TipoOperacionVentaEuro) {
			document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioVentaEuro).toFixed(2)
			document.getElementById('lblMontoIngreso').innerHTML = 'Monto a pagar (€):';
			//document.getElementById("txtVuelto").value = Vuelto;
		}
		// Vuelto 
		if ($.isNumeric($("#txtMonto").val()) == true && $.isNumeric($("#txtPagaCon").val()))
			document.getElementById("txtVuelto").value = parseFloat(document.getElementById("txtPagaCon").value).toFixed(2) - parseFloat(document.getElementById("txtMontoEntrega").value).toFixed(2);

	}

	function validarGuardarOperacion() {
		var TipoOperacion = $("#cboTipoOperacion").val();
		var MontoIngreso = $("#txtMonto").val();
		var Moneda = $("#cboMoneda").val();

		if ($.isNumeric(MontoIngreso) == false) {
			toastr.error('Debe ingresar un monto válido', 'Error');
			limpiarFormulario();
			return false;
		}
		if (TipoOperacion != '0') {
			if (Moneda == '0') {
				toastr.error('Debe seleccionar moneda', 'Error');
				return false;
			}
		}
		return true;
	};

	function getTxtHtml() {
		var TipoOperacion = "";
		var TipoCambio = "";
		var MontoIngreso = "";
		var MontoEntrega = "";
		var Moneda = "";
		var TextoHtml = "";
		var Vuelto = "No se ingresó monto.";
		if ($.isNumeric($("#txtMonto").val()) == true && $.isNumeric($("#txtPagaCon").val()))
			Vuelto = parseFloat(document.getElementById("txtPagaCon").value).toFixed(2) - parseFloat(document.getElementById("txtMontoEntrega").value).toFixed(2);

		if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraDolar) {
			TipoOperacion = "Cambio Dólares ($)";
			TipoCambio = document.getElementById("txtTCCompraDolar").value;
			MontoIngreso = `<div class="form-group col-md-12"><label>Monto Ingresa ($): ${document.getElementById("txtMonto").value}</label></div>`;
			MontoEntrega = `<div class="form-group col-md-12"><label>Monto a Entregar (S/.): ${document.getElementById("txtMontoEntrega").value}</label></div>`;
		}
		if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaDolar) {
			TipoOperacion = "Venta Dólares ($)";
			TipoCambio = document.getElementById("txtTCVentaDolar").value;
			MontoIngreso = `<div class="form-group col-md-12"><label>Monto Desea ($): ${document.getElementById("txtMonto").value}</label></div>`;
			MontoEntrega = `<div class="form-group col-md-12"><label>Monto a pagar (S/.): ${document.getElementById("txtMontoEntrega").value}</label></div>` +
						   `<div class="form-group col-md-12"><label>Vuelto (S/.): ${Vuelto}</label></div>`;
		}
		if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraEuro) {
			TipoOperacion = "Cambio Euros (€)";
			TipoCambio = document.getElementById("txtTCCompraEuro").value;
			MontoIngreso = `<div class="form-group col-md-12"><label>Monto Ingresa ($): ${document.getElementById("txtMonto").value}</label></div>`;
			MontoEntrega = `<div class="form-group col-md-12"><label>Monto a Entregar (S/.): ${document.getElementById("txtMontoEntrega").value}</label></div>`;
		}
		if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaEuro) {
			TipoOperacion = "Venta Euros (€)";
			TipoCambio = document.getElementById("txtTCVentaEuro").value;
			MontoIngreso = `<div class="form-group col-md-12"><label>Monto Desea (€): ${document.getElementById("txtMonto").value}</label></div>`;
			MontoEntrega = `<div class="form-group col-md-12"><label>Monto a pagar (S/.) ${document.getElementById("txtMontoEntrega").value}</label></div>` +
						   `<div class="form-group col-md-12"><label>Vuelto (S/.): ${Vuelto}</label></div>`;
		}
		if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionDolAEuro) {
			TipoOperacion = "Cambio Dólar a Euro";
			TipoCambio = '';
			MontoIngreso = `<div class="form-group col-md-12"><label>Monto Ingresa ($): ${document.getElementById("txtMonto").value}</label></div>`;
			MontoEntrega = `<div class="form-group col-md-12"><label>Monto a Entregar (€): ${document.getElementById("txtMontoEntrega").value}</label></div>`;
		}
		if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionEuroADol) {
			TipoOperacion = "Cambio Euro a Dólar";
			TipoCambio = '';
			MontoIngreso = `<div class="form-group col-md-12"><label>Monto Ingresa (€): ${document.getElementById("txtMonto").value}</label></div>`;
			MontoEntrega = `<div class="form-group col-md-12"><label>Monto a Entregar ($): ${document.getElementById("txtMontoEntrega").value}</label></div>`;
		}
	
		if (parseInt(document.getElementById("cboTipoOperacion").value) == 0) {
			TextoHtml = `<div class="form-group col-md-12">
							<div class="form-group col-md-12">
								<label>Tipo Operación: ${TipoOperacion}</label>
							</div>
							<div class="form-group col-md-12">
								<label>Tipo Cambio: ${TipoCambio}</label>
							</div>
								${MontoIngreso}		
								${MontoEntrega}
						</div>`;
		} 
			//else {
		//	TextoHtml = `<div class="form-group col-md-12">
		//					<div class="form-group col-md-12">
		//						<label>Tipo Operación: ${TipoOperacion}</label>
		//					</div>
		//					<div class="form-group col-md-12">
		//						<label>Moneda Ingresa: ${Moneda}</label>
		//					</div>
		//					<div class="form-group col-md-12">
		//						<label>Monto: ${MontoIngreso}</label>
		//					</div>
		//				</div>`;
		//}
		return TextoHtml;
    }

	function guardarOperacion() {
		var ope = {};
		ope.MontoIngreso = document.getElementById("txtMonto").value;
		ope.Comentario = document.getElementById("txtComentario").value;
		if (parseInt(document.getElementById("cboTipoOperacion").value) == 0) {// operaciones de compra y venta
			ope.TipoOperacion = data.flagValorTipoOperacion;
			ope.Moneda = 0;
			ope.MontoSalida = document.getElementById("txtMontoEntrega").value;
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraDolar)
				ope.TipoCambio = document.getElementById("txtTCCompraDolar").value;
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaDolar)
				ope.TipoCambio = document.getElementById("txtTCVentaDolar").value;
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraEuro)
				ope.TipoCambio = document.getElementById("txtTCCompraEuro").value;
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaEuro)
				ope.TipoCambio = document.getElementById("txtTCVentaEuro").value;
		} else { // operaciones generales		
			ope.TipoOperacion = parseInt(document.getElementById("cboTipoOperacion").value);
			ope.Moneda = document.getElementById("cboMoneda").value;
			ope.MontoSalida = 0;
		}
		$.ajax({
			type: "POST",
			url: data.urlGuardarOperacion,
			data: '{ope: ' + JSON.stringify(ope) + '}',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (response) {
				if (response.Code == 1)
					swal({ title: "Operación Registrada!", text: "Se guardó la operación con éxito.", type: "success" });

				ocultarLoader();
				limpiarFormulario();
				obtenerConfCaja();
			},
			error: function () {
				toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
				ocultarLoader();
			}
		});
	};

	function limpiarFormulario() {		
		document.getElementById("cboMoneda").value = "0";
		document.getElementById("txtMonto").value = "";
		document.getElementById("txtPagaCon").value = "";
		document.getElementById("txtMontoEntrega").value = "";
		document.getElementById("txtVuelto").value = "";
		document.getElementById("txtComentario").value = "";
		data.flagValorTipoOperacion = 0;
	}

	function ForceDecimalOnly() {
		var $control = $("#txtMonto");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) {$control.val(valor)}
	}
	function changeTipoOperacion(ini) {
		var TipoOperacion = $("#cboTipoOperacion").val();
		if (ini == 'inicio') {			
			$("#divOtrasOpe").hide();
			$("#btnRegistrarOperacion").hide();			
			data.flagValorTipoOperacion = 0;
		} else {
			limpiarFormulario();
			if (TipoOperacion == '0') {				
				$("#divPagaCon").show();
				$("#divMontoEntrega").show();
				$("#divOtrasOpe").hide();
				$("#btnRegistrarOperacion").hide();			
				data.flagValorTipoOperacion = 0;
				$("#divODolar").show();
				$("#divOEuro").show();
				$("#divODolarEuro").show();
				$("#divMostrarDatos").show();
			}
			else {
				if (TipoOperacion == '5')
					data.flagValorTipoOperacion = 5;
				if (TipoOperacion == '6')
					data.flagValorTipoOperacion = 6;
				if (TipoOperacion == '7')
					data.flagValorTipoOperacion = 7;
				if (TipoOperacion == '8')
					data.flagValorTipoOperacion = 8;

				$("#divPagaCon").hide();
				$("#divMontoEntrega").hide();
				$("#divOtrasOpe").show();
				$("#divODolar").hide();
				$("#divOEuro").hide();
				$("#divODolarEuro").hide();
				$("#divMostrarDatos").hide();				
				$("#btnRegistrarOperacion").show();	
            }

        }
    }

	function cargaInicial() {
		$.ajax({
			type: "POST",
			url: data.urlCargaInicial,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (d) {
				var lista = d.lstCargaInicial;
				$("#cboTipoOperacion").append('<option value="0" > -- Seleccione -- </option>');
				$("#cboMoneda").append('<option value="0" > -- Seleccione -- </option>');
				for (var i = 0; i < lista.length; i++) {
					if (lista[i].IdTabla === data.valores.TblTipoOperacion && (lista[i].ValorItem == "7" || lista[i].ValorItem == "8" || lista[i].ValorItem == "9" || lista[i].ValorItem == "10"))
						$("#cboTipoOperacion").append('<option value=' + lista[i].ValorItem + '>' + lista[i].NombreItem + '</option>');
					if (lista[i].IdTabla === data.valores.TblMoneda) {
						$("#cboMoneda").append('<option value=' + lista[i].ValorItem + '>' + lista[i].NombreItem + '</option>');
						}
					}					
			},
			error: function (ex) {
				alert(ex.responseText);
				//ocultarLoader();
			}
		});
    }



	//funcion de inicio
	init();

})(window, document);