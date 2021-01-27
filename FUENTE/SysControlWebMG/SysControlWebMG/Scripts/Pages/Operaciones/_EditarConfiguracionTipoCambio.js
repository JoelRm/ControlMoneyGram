var app_Operacion = (function (win, doc) {

	const data = {
		urlObtenerConfCaja: '/Operacion/ObtenerConfCaja',
		urlGuardarConf: '/Caja/GuardarConfiguracion',
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
		obtenerConfCaja();
		document.getElementById("btnEditarConfCaja").addEventListener("click", guardarConfCaja);
		document.getElementById("txtTCCompraDolar_ME").addEventListener("blur", FormatTCCompraDolar);
		document.getElementById("txtTCVentaDolar_ME").addEventListener("blur", FormatTCVentaDolar);
		document.getElementById("txtTCCompraEuro_ME").addEventListener("blur", FormatTCCompraEuro);
		document.getElementById("txtTCVentaEuro_ME").addEventListener("blur", FormatTCVentaEuro);
	}

	function obtenerConfCaja() {
		$.ajax({
			type: "POST",
			url: data.urlObtenerConfCaja,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (d) {
				document.getElementById("txtTCCompraDolar_ME").value = d.lstConfCaja.TCCompraDolar;
				document.getElementById("txtTCVentaDolar_ME").value = d.lstConfCaja.TCVentaDolar;
				document.getElementById("txtTCCompraEuro_ME").value = d.lstConfCaja.TCCompraEuro;
				document.getElementById("txtTCVentaEuro_ME").value = d.lstConfCaja.TCVentaEuro;
				document.getElementById("txtCajaActualSoles_ME").value = d.lstConfCaja.CajaActualSoles;
				document.getElementById("txtCajaActualDolares_ME").value = d.lstConfCaja.CajaActualDolares;
				document.getElementById("txtCajaActualEuros_ME").value = d.lstConfCaja.CajaActualEuros;
			},
			error: function (ex) {
				alert(ex.responseText);
			}
		});
	}



	function validarDatosConfiguracion() {
		var TCCompraDolar = $("#txtTCCompraDolar").val();
		var TCVentaDolar = $("#txtTCVentaDolar").val();
		var TCCompraEuro = $("#txtTCCompraEuro").val();
		var TCVentaEuro = $("#txtTCVentaEuro").val();
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

	function FormatTCCompraDolar() {
		var $control = $("#txtTCCompraDolar_ME");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
	}
	function FormatTCVentaDolar() {
		var $control = $("#txtTCVentaDolar_ME");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
	}
	function FormatTCCompraEuro() {
		var $control = $("#txtTCCompraEuro_ME");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
	}
	function FormatTCVentaEuro() {
		var $control = $("#txtTCVentaEuro_ME");
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(2);
		if ($.isNumeric(valor)) { $control.val(valor) }
	}
	function guardarConfCaja() {
		if (validarDatosConfiguracion()) {
			var confCaja = {};
			confCaja.CajaActualSoles = parseFloat($("#txtCajaActualSoles_ME").val()).toFixed(2);
			confCaja.CajaActualDolares = parseFloat($("#txtCajaActualDolares_ME").val()).toFixed(2);
			confCaja.CajaActualEuros = parseFloat($("#txtCajaActualEuros_ME").val()).toFixed(2);
			confCaja.TCCompraDolar = parseFloat($("#txtTCCompraDolar_ME").val()).toFixed(2);
			confCaja.TCVentaDolar = parseFloat($("#txtTCVentaDolar_ME").val()).toFixed(2);
			confCaja.TCCompraEuro = parseFloat($("#txtTCCompraEuro_ME").val()).toFixed(2);
			confCaja.TCVentaEuro = parseFloat($("#txtTCVentaEuro_ME").val()).toFixed(2);
			$.ajax({
				type: "POST",
				url: data.urlGuardarConf,
				data: '{confCaja: ' + JSON.stringify(confCaja) + '}',
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					obtenerConfCajaOperaciones();
				},
				error: function () {
					toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
					ocultarLoader;
				}
			});
		}
	}
	function obtenerConfCajaOperaciones() {
		$.ajax({
			type: "POST",
			url: data.urlObtenerConfCaja,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (d) {
				debugger;
				//var lista = d.lstConfCaja;
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

	//funcion de inicio
	init();



})(window, document);