var app_Caja = (function (win, doc) {

	const data = {
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
		document.getElementById("txtCajaActualSoles").addEventListener("blur", FormatCajaActualSoles);
		document.getElementById("txtCajaActualDolares").addEventListener("blur", FormatCajaActualDolares);
		document.getElementById("txtCajaActualEuros").addEventListener("blur", FormatCajaActualEuros);
		document.getElementById("txtTCCompraDolar").addEventListener("blur", FormatTCCompraDolar);
		document.getElementById("txtTCVentaDolar").addEventListener("blur", FormatTCVentaDolar);
		document.getElementById("txtTCCompraEuro").addEventListener("blur", FormatTCCompraEuro);
		document.getElementById("txtTCVentaEuro").addEventListener("blur", FormatTCVentaEuro);
		document.getElementById("btnGuardarConf").addEventListener("click", guardarConfiguracion);
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

	function guardarConfiguracion() {
		if (validarDatosConfiguracion()) {
			var confCaja = {};
			confCaja.CajaActualSoles = parseFloat($("#txtCajaActualSoles").val()).toFixed(2);
			confCaja.CajaActualDolares = parseFloat($("#txtCajaActualDolares").val()).toFixed(2);
			confCaja.CajaActualEuros = parseFloat($("#txtCajaActualEuros").val()).toFixed(2);
			confCaja.TCCompraDolar = parseFloat($("#txtTCCompraDolar").val()).toFixed(2);
			confCaja.TCVentaDolar = parseFloat($("#txtTCVentaDolar").val()).toFixed(2);
			confCaja.TCCompraEuro = parseFloat($("#txtTCCompraEuro").val()).toFixed(2);
			confCaja.TCVentaEuro = parseFloat($("#txtTCVentaEuro").val()).toFixed(2);
			$.ajax({
				type: "POST",
				url: data.urlGuardarConf,
				data: '{confCaja: ' + JSON.stringify(confCaja) + '}',
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					debugger;
					//if (response.Code == 2) {
					//	toastr.error('Ya existen registros con un nombre similar, intente otro', 'Error');
					//	ocultarLoader();
					//}
					//else {
					//	if (response.Code == 1) {
					//		$('#modalNuevoUsuario').modal('hide');
					//		limpiarValoresUsuarios();
					//		cargarTablaUsuarios();
					//		toastr.success('Se agregaron los datos correctamente', 'Éxito');
					//		ocultarLoader();
					//	}
					//	else {
					//		toastr.error('Error al agregar los datos', 'Error');
					//		ocultarLoader();
					//	}
					//}
				},
				error: function () {
					toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
					ocultarLoader;
				}
			});
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
			$control.val(valor);
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
		$control.val(valor);
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
		$control.val(valor);
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
		$control.val(valor);
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
		$control.val(valor);
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
		$control.val(valor);
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
		$control.val(valor);
	}


	//funcion de inicio
	init();



})(window, document);