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
				TipoOperacionIngreso: 7,
				TipoOperacionEnvio: 8,
				TipoOperacionPago: 9,
				TipoOperacionGasto: 10
            },
			TblTipoOperacion: 1,
			TblMoneda: 2
		},
		flagValorTipoOperacion: 0,
		nombreTipoOperacion: ''
	}


	function init() {
		configMostrarOcultarElementos(0);
		cargaInicial();
		obtenerConfCaja();
		document.getElementById("btnCompraDolar").addEventListener("click", click_CompraDolar);
		document.getElementById("btnVentaDolar").addEventListener("click", click_VentaDolar);
		document.getElementById("btnCompraEuro").addEventListener("click", click_CompraEuro);
		document.getElementById("btnVentaEuro").addEventListener("click", click_VentaEuro);
		document.getElementById("btnDolAEuro").addEventListener("click", click_DolAEuro);
		document.getElementById("btnEuroADol").addEventListener("click", click_EuroADol);
		document.getElementById("cboTipoOperacion").addEventListener("change", changeTipoOperacion);
		document.getElementById("txtMonto").addEventListener("blur", calcularOperacion);
		document.getElementById("txtPagaCon").addEventListener("blur", calcularVuelto);

		document.getElementById("btnRegistrarOperacion").addEventListener("click", guardarOperacion);
		document.getElementById("btnEditarTipoCambio").addEventListener("click", btnEditarTipoCambio_Click);
		document.getElementById("btn_g").addEventListener("click", btn_g_Click);			
	}

	function calcularVuelto() {
		if (data.flagValorTipoOperacion > 0) {
			// Dólares 
			// Venta
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaDolar) {
				// Vuelto 
				if ($.isNumeric($("#txtMonto").val()) == true && $.isNumeric($("#txtPagaCon").val()) == true)
					document.getElementById("txtVuelto").value = parseFloat(document.getElementById("txtPagaCon").value).toFixed(1) - parseFloat(document.getElementById("txtMontoEntrega").value).toFixed(1);
			}

			// Euros
			// Venta
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaEuro) {
				// Vuelto 
				if ($.isNumeric($("#txtMonto").val()) == true && $.isNumeric($("#txtPagaCon").val()) == true)
					document.getElementById("txtVuelto").value = parseFloat(document.getElementById("txtPagaCon").value).toFixed(1) - parseFloat(document.getElementById("txtMontoEntrega").value).toFixed(1);
			}

		}
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
				if (d.lstConfCaja != null) {
					document.getElementById("txtTCCompraDolar").value = d.lstConfCaja.TCCompraDolar.toFixed(3);
					document.getElementById("txtTCVentaDolar").value = d.lstConfCaja.TCVentaDolar.toFixed(3);
					document.getElementById("txtTCCompraEuro").value = d.lstConfCaja.TCCompraEuro.toFixed(3);
					document.getElementById("txtTCVentaEuro").value = d.lstConfCaja.TCVentaEuro.toFixed(3);
					if (d.lstConfCaja.CajaActualSoles > 0 && d.lstConfCaja.CajaActualDolares > 0 && d.lstConfCaja.CajaActualEuros > 0 && d.lstConfCaja.TCCompraDolar > 0 && d.lstConfCaja.TCVentaDolar > 0 && d.lstConfCaja.TCCompraEuro > 0 && d.lstConfCaja.TCVentaEuro > 0) {
						document.getElementById("txtCajaActualSoles").value = d.lstConfCaja.CajaActualSoles.toFixed(1);
						document.getElementById("txtCajaActualDolares").value = d.lstConfCaja.CajaActualDolares.toFixed(1);
						document.getElementById("txtCajaActualEuros").value = d.lstConfCaja.CajaActualEuros.toFixed(1);
						toastr.success(null, 'Se obtuvo los ultimos valores registrados en caja y tipo de cambio.');

						//swal({ title: "Valores Obtenidos!", text: "Se obtuvo los ultimos valores registrados en caja y tipo de cambio.", type: "success", confirmButtonText: 'Aceptar' });
					} else {
						if (d.lstConfCaja.CajaActualSoles > 1)
							document.getElementById("txtCajaActualSoles").value = d.lstConfCaja.CajaActualSoles.toFixed(1);
						else
							toastr.error('La caja en soles no tiene monto ingresado.r', 'Error');

						if (d.lstConfCaja.CajaActualDolares > 1)
							document.getElementById("txtCajaActualDolares").value = d.lstConfCaja.CajaActualDolares.toFixed(1);
						else
							toastr.error('La caja en dólares no tiene monto ingresado.', 'Error');

						if (d.lstConfCaja.CajaActualEuros > 1)
							document.getElementById("txtCajaActualEuros").value = d.lstConfCaja.CajaActualEuros.toFixed(1);
						else
							toastr.error('La caja en euros no tiene monto ingresado.', 'Error');
					}
				}else{
					toastr.error('Debe configurar su caja antes de ingresar alguna operación', 'Error');
                }
	
			},
			error: function (ex) {
				alert(ex.responseText);
				//ocultarLoader();
			}
		});
    }

	function btnEditarTipoCambio_Click() {
		$('#modalEditarConfCaja').modal('show');
	}

	function configMostrarOcultarElementos(idTipoOperacion) {
		limpiarFormulario();
		if (idTipoOperacion == 0) {
			data.flagValorTipoOperacion = 0;
			data.nombreTipoOperacion = 'Ninguna';
			$("#divMonto").hide(); 
			$("#divPagaCon").hide();
			$("#divMontoEntrega").hide();
			$("#divMontoVuelto").hide();
			$("#divComentario").hide();
			$("#divRegistrarOperacion").hide();		
			$("#divMoneda").hide();
		}
		if (idTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraDolar) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionCompraDolar;
			data.nombreTipoOperacion = 'COMPRA DÓLAR';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divMontoEntrega").show();
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divRegistrarOperacion").show();
			$("#divMoneda").hide();
			toastr.success(null, 'CAMBIO DÓLAR');
		}
		if (idTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaDolar) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionVentaDolar;
			data.nombreTipoOperacion = 'VENTA DÓLAR';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divMontoEntrega").show();
			$("#divPagaCon").show();
			$("#divMontoVuelto").show();
			$("#divRegistrarOperacion").show();			
			$("#divMoneda").hide();		
			toastr.success(null, 'VENTA DÓLAR');
		}
		if (idTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraEuro) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionCompraEuro;
			data.nombreTipoOperacion = 'CAMBIO EURO';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divMontoEntrega").show();
			$("#divRegistrarOperacion").show();			
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divMoneda").hide();
			toastr.success(null, 'CAMBIO EURO');
		}
		if (idTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaEuro) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionVentaEuro;
			data.nombreTipoOperacion = 'VENTA EURO';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divMontoEntrega").show();
			$("#divPagaCon").show();
			$("#divMontoVuelto").show();
			$("#divRegistrarOperacion").show();			
			$("#divMoneda").hide();		
			toastr.success(null, 'VENTA EURO');
		}
		if (idTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionDolAEuro) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionDolAEuro;
			data.nombreTipoOperacion = 'CAMBIO DÓLAR A EURO';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divMontoEntrega").show();
			$("#divRegistrarOperacion").show();			
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divMoneda").hide();		
			toastr.success(null, 'CAMBIO DÓLAR A EURO');
		}
		if (idTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionEuroADol) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionCV.TipoOperacionEuroADol;
			data.nombreTipoOperacion = 'CAMBIO EURO A DÓLAR';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divMontoEntrega").show();
			$("#divRegistrarOperacion").show();			
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divMoneda").hide();		
			toastr.success(null, 'CAMBIO EURO A DÓLAR');
		}

		if (idTipoOperacion == data.valores.TipoOperacionOtras.TipoOperacionIngreso) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionOtras.TipoOperacionIngreso;
			data.nombreTipoOperacion = 'INGRESO';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divRegistrarOperacion").show();
			$("#divMontoEntrega").hide();
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divMoneda").show();		
			toastr.success(null, 'INGRESO');
		}

		if (idTipoOperacion == data.valores.TipoOperacionOtras.TipoOperacionEnvio) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionOtras.TipoOperacionEnvio;
			data.nombreTipoOperacion = 'ENVÍO';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divRegistrarOperacion").show();
			$("#divMontoEntrega").hide();
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divMoneda").show();		
			toastr.success(null, 'ENVÍO');
		}

		if (idTipoOperacion == data.valores.TipoOperacionOtras.TipoOperacionPago) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionOtras.TipoOperacionPago;
			data.nombreTipoOperacion = 'PAGO';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divRegistrarOperacion").show();
			$("#divMontoEntrega").hide();
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divMoneda").show();		
			toastr.success(null, 'PAGO');
		}

		if (idTipoOperacion == data.valores.TipoOperacionOtras.TipoOperacionGasto) {
			data.flagValorTipoOperacion = data.valores.TipoOperacionOtras.TipoOperacionGasto;
			data.nombreTipoOperacion = 'GASTO';
			$("#divComentario").show();
			$("#divMonto").show();
			$("#divRegistrarOperacion").show();
			$("#divMontoEntrega").hide();
			$("#divPagaCon").hide();
			$("#divMontoVuelto").hide();
			$("#divMoneda").show();		
			toastr.success(null, 'GASTO');
		}

    }

	function click_CompraDolar() {
		configMostrarOcultarElementos(data.valores.TipoOperacionCV.TipoOperacionCompraDolar);
	}
	function click_VentaDolar() {
		configMostrarOcultarElementos(data.valores.TipoOperacionCV.TipoOperacionVentaDolar);
	}
	function click_CompraEuro() {
		configMostrarOcultarElementos(data.valores.TipoOperacionCV.TipoOperacionCompraEuro);
	}
	function click_VentaEuro() {
		configMostrarOcultarElementos(data.valores.TipoOperacionCV.TipoOperacionVentaEuro);
	}
	function click_DolAEuro() {
		configMostrarOcultarElementos(data.valores.TipoOperacionCV.TipoOperacionDolAEuro);
	}
	function click_EuroADol() {
		configMostrarOcultarElementos(data.valores.TipoOperacionCV.TipoOperacionEuroADol);
	}


	function calcularOperacion() {
		var monto = ForceDecimalOnly($("#txtMonto"));
		var TipoCambioCompraDolar = parseFloat(document.getElementById("txtTCCompraDolar").value);
		var TipoCambioVentaDolar = parseFloat(document.getElementById("txtTCVentaDolar").value);
		var TipoCambioCompraEuro = parseFloat(document.getElementById("txtTCCompraEuro").value);
		var TipoCambioVentaEuro = parseFloat(document.getElementById("txtTCVentaEuro").value);
		var Vuelto = ''

		if (data.flagValorTipoOperacion > 0) {
			// Dólares y Euros
			// Dólares a Euros
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionDolAEuro) {
				var resultadooperacion1 = parseFloat(monto * TipoCambioCompraDolar).toFixed(1);
				var resultadooperacion2 = parseFloat(resultadooperacion1 / TipoCambioVentaEuro).toFixed(1);
				document.getElementById("txtMontoEntrega").value = resultadooperacion2;
				document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (€):';
			}
			// Euros a Dólares
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionEuroADol) {
				var resultadooperacion1 = parseFloat(monto * TipoCambioCompraEuro).toFixed(1)
				var resultadooperacion2 = parseFloat(resultadooperacion1 / TipoCambioVentaDolar).toFixed(1);
				document.getElementById("txtMontoEntrega").value = resultadooperacion2;
				document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar ($):';
			}

			// Dólares 
			// Compra
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraDolar) {
				document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraDolar).toFixed(1)
				document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (S/.):';
			}
			// Venta
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaDolar) {
				document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioVentaDolar).toFixed(1)
				document.getElementById('lblMontoIngreso').innerHTML = 'Monto a pagar ($):';
			}

			// Euros
			// Compra
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionCompraEuro) {
				document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraEuro).toFixed(1)
				document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (S/.):';
			}
			// Venta
			if (data.flagValorTipoOperacion == data.valores.TipoOperacionCV.TipoOperacionVentaEuro) {
				document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioVentaEuro).toFixed(1)
				document.getElementById('lblMontoIngreso').innerHTML = 'Monto a pagar (€):';
			}
        }
	}

	function validarGuardarOperacion() {
		var TipoOperacion = $("#cboTipoOperacion").val();
		var MontoIngreso = $("#txtMonto").val();
		var Moneda = $("#cboMoneda").val();

		var CajaActualSoles = $("#txtCajaActualSoles").val();
		var CajaActualDolares = $("#txtCajaActualDolares").val();
		var CajaActualEuros = $("#txtCajaActualEuros").val();
		if (CajaActualSoles < 1 || CajaActualDolares < 1 || CajaActualEuros < 1) {
			toastr.error('Debe configurar su caja antes de ingresar alguna operación', 'Error');
			limpiarFormulario();
			return false;
		}

		if (data.flagValorTipoOperacion < 1) {
			toastr.error('Debe seleccionar un tipo de operación', 'Error');
			limpiarFormulario();
			return false;
		}

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

	function guardarOperacion() {
		if (validarGuardarOperacion()) {
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
						swal({ title: data.nombreTipoOperacion, text: "Se guardó la operación con éxito.", type: "success" });
					configMostrarOcultarElementos(0);
					limpiarFormulario();
					obtenerConfCaja();
				},
				error: function () {
					toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
					ocultarLoader();
				}
			});
        }
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

	function ForceDecimalOnly($control) {
		//var $control = $("#txtMonto");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		return $control.val();
	}


	function changeTipoOperacion() {
		var idTipoOperacion = $("#cboTipoOperacion").val();
		if (idTipoOperacion == "0") {
			configMostrarOcultarElementos(0);
        }
		else {
			if (idTipoOperacion == "7")
				configMostrarOcultarElementos(7);
			if (idTipoOperacion == "8")
				configMostrarOcultarElementos(8);
			if (idTipoOperacion == "9")
				configMostrarOcultarElementos(9);
			if (idTipoOperacion == "10")
				configMostrarOcultarElementos(10);
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

	return {
		calcularOperacion: calcularOperacion,
		obtenerConfCaja: obtenerConfCaja
    }

})(window, document);