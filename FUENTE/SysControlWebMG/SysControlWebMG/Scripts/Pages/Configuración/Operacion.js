var app_Operacion = (function (win, doc) {

	const data = {
		urlCargaInicial: '/Operacion/CargaInicial',
		urlGuardarOperacion: '/Operacion/GuardarOperacion',
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
				TipoOperacionVentaEuro: 4
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
		changeTipoOperacion('inicio');
		document.getElementById("cboTipoOperacion").addEventListener("change", changeTipoOperacion);
		document.getElementById("txtMonto").addEventListener("blur", ForceDecimalOnly);
		document.getElementById("btnCompraDolar").addEventListener("click", click_CompraDolar);
		document.getElementById("btnVentaDolar").addEventListener("click", click_VentaDolar);
		document.getElementById("btnCompraEuro").addEventListener("click", click_CompraEuro);
		document.getElementById("btnVentaEuro").addEventListener("click", click_VentaEuro);
		document.getElementById("btnCalcularOperacion").addEventListener("click", guardarOperacion2);

		
	}
	function click_CompraDolar() {
		data.flagValorTipoOperacion = 1;
		calculoMonto(1);
	}
	function click_VentaDolar() {
		data.flagValorTipoOperacion = 2;
		calculoMonto(2);
	}
	function click_CompraEuro() {
		data.flagValorTipoOperacion = 3;
		calculoMonto(3);
	}
	function click_VentaEuro() {
		data.flagValorTipoOperacion = 4;
		calculoMonto(4);
	}

	function calculoMonto(valor) {
		var monto = parseFloat(document.getElementById("txtMonto").value);
		var TipoCambioCompraDolar = parseFloat(document.getElementById("txtTCCompraDolar").value);
		var TipoCambioVentaDolar = parseFloat(document.getElementById("txtTCVentaDolar").value);
		var TipoCambioCompraEuro = parseFloat(document.getElementById("txtTCCompraEuro").value);
		var TipoCambioVentaEuro = parseFloat(document.getElementById("txtTCVentaEuro").value);

		// Dólares 
		// Compra
		if (valor == data.valores.TipoOperacionCV.TipoOperacionCompraDolar)
			document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraDolar).toFixed(2)

		// Venta
		if (valor == data.valores.TipoOperacionCV.TipoOperacionVentaDolar)
			document.getElementById("txtMontoEntrega").value = parseFloat(monto / TipoCambioVentaDolar).toFixed(2)
		// Euros
		// Compra
		if (valor == data.valores.TipoOperacionCV.TipoOperacionCompraEuro)
			document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraEuro).toFixed(2)
		// Venta
		if (valor == data.valores.TipoOperacionCV.TipoOperacionVentaEuro)
			document.getElementById("txtMontoEntrega").value = parseFloat(monto / TipoCambioVentaEuro).toFixed(2)
	}

	function validarDatosOperacion() {
		var TipoOperacion = $("#cboTipoOperacion").val();
		var MontoIngreso = $("#txtMonto").val();
		var MontoEntrega = $("#txtMontoEntrega").val();
		var Moneda = $("#cboMoneda").val();

		if ($.isNumeric(MontoIngreso) == false) {
			toastr.error('Debe ingresar un monto válido', 'Error');
			return false;
		}
		if (TipoOperacion == '0') {
			if ($.isNumeric(MontoEntrega) == false) {
				toastr.error('Debe calcular la operación', 'Error');
				return false;
			}
		}
		else {
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
		var MontoIngreso = document.getElementById("txtMonto").value;
		var MontoEntrega = document.getElementById("txtMontoEntrega").value;
		var Moneda = "";
		var TextoHtml = "";

		if (data.flagValorTipoOperacion == 1) {
			TipoOperacion = "Cambio Dólares ($)";
			TipoCambio = document.getElementById("txtTCCompraDolar").value;
			MontoIngreso = '$' + document.getElementById("txtMonto").value;
			MontoEntrega = 'S/.'+ document.getElementById("txtMontoEntrega").value;
		}
		if (data.flagValorTipoOperacion == 2) {
			TipoOperacion = "Venta Dólares ($)";
			TipoCambio = document.getElementById("txtTCVentaDolar").value;
			MontoIngreso = 'S/.' + document.getElementById("txtMonto").value;
			MontoEntrega = '$' + document.getElementById("txtMontoEntrega").value;
		}
		if (data.flagValorTipoOperacion == 3) {
			TipoOperacion = "Cambio Euros (€)";
			TipoCambio = document.getElementById("txtTCCompraEuro").value;
			MontoIngreso = '€' + document.getElementById("txtMonto").value;
			MontoEntrega = 'S/.' + document.getElementById("txtMontoEntrega").value;
		}
		if (data.flagValorTipoOperacion == 4) {
			TipoOperacion = "Venta Euros (€)";
			TipoCambio = document.getElementById("txtTCVentaEuro").value;
			MontoIngreso = 'S/.' + document.getElementById("txtMonto").value;
			MontoEntrega = '€' + document.getElementById("txtMontoEntrega").value;
		}
		if (data.flagValorTipoOperacion == 5) {
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
		if (data.flagValorTipoOperacion == 6) {
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
		if (data.flagValorTipoOperacion == 7) {
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
		if (data.flagValorTipoOperacion == 8) {
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

		if (parseInt(document.getElementById("cboTipoOperacion").value) == 0) {
			TextoHtml = `<div class="form-group col-md-12">
							<div class="form-group col-md-12">
								<label>Tipo Operación: ${TipoOperacion}</label>
							</div>
							<div class="form-group col-md-12">
								<label>Tipo Cambio: ${TipoCambio}</label>
							</div>
							<div class="form-group col-md-12">
								<label>Monto Ingresa: ${MontoIngreso}</label>
							</div>
							<div class="form-group col-md-12">
								<label>Monto Entrega: ${MontoEntrega}</label>
							</div>
						</div>`;
		} else {
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
		}
		return TextoHtml;
    }

	function guardarOperacion2() {
		if (validarDatosOperacion()) {
			swal({
				title: "¿Desea registrar la operación?",
				text: getTxtHtml(),
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
						debugger;
						var ope = {};
						ope.MontoIngreso = document.getElementById("txtMonto").value;
						ope.Comentario = document.getElementById("txtComentario").value;
						if (parseInt(document.getElementById("cboTipoOperacion").value) == 0) {// operaciones de compra y venta
							ope.TipoOperacion = data.flagValorTipoOperacion;
							ope.Moneda = 0;
							ope.MontoSalida = document.getElementById("txtMontoEntrega").value;
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
								debugger;

							},
							error: function () {
								toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
								ocultarLoader;
							}
						});

					}
				}
			);
		}
	};

	function guardarOperacion() {
		if (validarDatosOperacion()) {

			//$.ajax({
			//	type: "POST",
			//	url: data.urlGuardarOperacion,
			//	data: '{ope: ' + JSON.stringify(ope) + '}',
			//	dataType: "json",
			//	contentType: "application/json; charset=utf-8",
			//	success: function (response) {
			//		debugger;

			//	},
			//	error: function () {
			//		toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
			//		ocultarLoader;
			//	}
			//});
		}
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
			data.flagValorTipoOperacion = 0;
		} else {
			debugger;
			if (TipoOperacion == '0') {
				$("#divMontoEntrega").show();
				$("#divOtrasOpe").hide();
				data.flagValorTipoOperacion = 0;
				$("#divODolar").show();
				$("#divOEuro").show();
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

				$("#divMontoEntrega").hide();
				$("#divOtrasOpe").show();
				$("#divODolar").hide();
				$("#divOEuro").hide();
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
					if (lista[i].IdTabla === data.valores.TblTipoOperacion && (lista[i].ValorItem == "5" || lista[i].ValorItem == "6" || lista[i].ValorItem == "7" || lista[i].ValorItem == "8"))
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