var app_Caja = (function (win, doc) {

	const data = {
		urlObtenerConfCaja: '/Operacion/ObtenerConfCaja',
		urlGuardarConf: '/Caja/GuardarConfiguracion',
		valores: {
			IdSoles: "1",
			IdDolares: "2",
			IdEuros: "1",
			TipoOperacionCompra: "1",
			TipoOperacionVenta: "2",
			TblTipoOperacion: 1,
			TblMoneda: 2
		}
	}

	function init() {
		obtenerConfCaja();
		document.getElementById("txtCajaActualSoles").addEventListener("blur", FormatCajaActualSoles);
		document.getElementById("txtCajaActualDolares").addEventListener("blur", FormatCajaActualDolares);
		document.getElementById("txtCajaActualEuros").addEventListener("blur", FormatCajaActualEuros);
		document.getElementById("txtTCCompraDolar").addEventListener("blur", FormatTCCompraDolar);
		document.getElementById("txtTCVentaDolar").addEventListener("blur", FormatTCVentaDolar);
		document.getElementById("txtTCCompraEuro").addEventListener("blur", FormatTCCompraEuro);
		document.getElementById("txtTCVentaEuro").addEventListener("blur", FormatTCVentaEuro);
		document.getElementById("btnGuardarConf").addEventListener("click", guardarConfiguracion);
		document.getElementById("btnActualizarConf").addEventListener("click", btnActualizarConf_Click);
		document.getElementById("btnLimpiarConf").addEventListener("click", limpiarFormulario);
	}

	function limpiarFormulario() {
		document.getElementById("txtCajaActualSoles").value = "";
		document.getElementById("txtCajaActualDolares").value = "";
		document.getElementById("txtCajaActualEuros").value = "";
		document.getElementById("txtTCCompraDolar").value = "";
		document.getElementById("txtTCVentaDolar").value = "";
		document.getElementById("txtTCCompraEuro").value = "";
		document.getElementById("txtTCVentaEuro").value = "";
    }

	function validarDatosConfiguracion() {
		var CajaActualSoles = $("#txtCajaActualSoles").val();
		var CajaActualDolares = $("#txtCajaActualDolares").val();
		var CajaActualEuros = $("#txtCajaActualEuros").val();
		var TCCompraDolar = $("#txtTCCompraDolar").val();
		var TCVentaDolar = $("#txtTCVentaDolar").val();
		var TCCompraEuro = $("#txtTCCompraEuro").val();
		var TCVentaEuro = $("#txtTCVentaEuro").val();

		if (CajaActualSoles == '') {
			toastr.error('Debe ingresar el monto de caja en soles', 'Error');
			return false;
		}
		if (CajaActualDolares == '') {
			toastr.error('Debe ingresar el monto de caja en dólares', 'Error');
			return false;
		}
		if (CajaActualEuros == '') {
			toastr.error('Debe ingresar el monto de caja en euros', 'Error');
			return false;
		}
		if (TCCompraDolar == '') {
			toastr.error('Debe ingresar el tipo de cambio de compra en dólares', 'Error');
			return false;
		}
		if (TCVentaDolar == '') {
			toastr.error('Debe ingresar el tipo de cambio de venta en dólares', 'Error');
			return false;
		}
		if (TCCompraEuro == '') {
			toastr.error('Debe ingresar el tipo de cambio de compra en euros', 'Error');
			return false;
		}
		if (TCVentaEuro == '') {
			toastr.error('Debe ingresar el tipo de cambio de venta en euros', 'Error');
			return false;
		}
		return true;
	};

	function btnActualizarConf_Click() {
		obtenerConfCaja();
		swal({ title: "Valores Obtenidos!", text: "Se obtuvo los ultimos valores registrados en caja y tipo de cambio.", type: "success", confirmButtonText: 'Aceptar' });
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
			}
		});
	}







	function guardarConfiguracion() {
		if (validarDatosConfiguracion()) {
			swal({
				title: "¿Desea registrar la configuración de caja?",
				type: "warning",
				showCancelButton: true,
				confirmButtonClass: "btn-danger",
				confirmButtonText: "Registrar",
				cancelButtonText: "Cancelar"
			},
				function (isConfirm) {
					if (isConfirm) {
						var confCaja = {};
						confCaja.CajaActualSoles = parseFloat($("#txtCajaActualSoles").val()).toFixed(2);
						confCaja.CajaActualDolares = parseFloat($("#txtCajaActualDolares").val()).toFixed(2);
						confCaja.CajaActualEuros = parseFloat($("#txtCajaActualEuros").val()).toFixed(2);
						confCaja.TCCompraDolar = parseFloat($("#txtTCCompraDolar").val()).toFixed(2);
						confCaja.TCVentaDolar = parseFloat($("#txtTCVentaDolar").val()).toFixed(2);
						confCaja.TCCompraEuro = parseFloat($("#txtTCCompraEuro").val()).toFixed(2);
						confCaja.TCVentaEuro = parseFloat($("#txtTCVentaEuro").val()).toFixed(2);
						confCaja.TipoOpeIU = "Insert";
						$.ajax({
							type: "POST",
							url: data.urlGuardarConf,
							data: '{confCaja: ' + JSON.stringify(confCaja) + '}',
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							success: function (response) {
								obtenerConfCaja();
								toastr.success('Datos registrados correctamente!', 'Éxito');
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
    }

	function FormatCajaActualSoles() {
		var $control = $("#txtCajaActualSoles");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("")}
	}
	function FormatCajaActualDolares() {
		var $control = $("#txtCajaActualDolares");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("") }
	}
	function FormatCajaActualEuros() {
		var $control = $("#txtCajaActualEuros");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("") }
	}
	function FormatTCCompraDolar() {
		var $control = $("#txtTCCompraDolar");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("") }
	}
	function FormatTCVentaDolar() {
		var $control = $("#txtTCVentaDolar");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("") }
	}
	function FormatTCCompraEuro() {
		var $control = $("#txtTCCompraEuro");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("") }
	}
	function FormatTCVentaEuro() {
		var $control = $("#txtTCVentaEuro");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("") }
	}

	//funcion de inicio
	init();

})(window, document);