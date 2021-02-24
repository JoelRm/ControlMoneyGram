var app_EditarConfiguracionTipoCambio = (function (win, doc) {

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
		document.getElementById("txtTCCompraDolarReferencial_ME").addEventListener("blur", FormatTCCompraDolarReferencial);
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
				if (d.lstConfCaja != null) {
					document.getElementById("txtTCCompraDolar_ME").value = d.lstConfCaja.TCCompraDolar.toFixed(3);
					document.getElementById("txtTCCompraDolarReferencial_ME").value = d.lstConfCaja.TCCompraDolarReferencial.toFixed(3);
					document.getElementById("txtTCVentaDolar_ME").value = d.lstConfCaja.TCVentaDolar.toFixed(3);
					document.getElementById("txtTCCompraEuro_ME").value = d.lstConfCaja.TCCompraEuro.toFixed(3);
					document.getElementById("txtTCVentaEuro_ME").value = d.lstConfCaja.TCVentaEuro.toFixed(3);
					document.getElementById("txtCajaActualSoles_ME").value = d.lstConfCaja.CajaActualSoles.toFixed(1);
					document.getElementById("txtCajaActualDolares_ME").value = d.lstConfCaja.CajaActualDolares.toFixed(1);
					document.getElementById("txtCajaActualEuros_ME").value = d.lstConfCaja.CajaActualEuros.toFixed(1);
				}
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
		ForceDecimalOnly($("#txtTCCompraDolar_ME"), 3);
	}
	function FormatTCCompraDolarReferencial() {
		ForceDecimalOnly($("#txtTCCompraDolarReferencial_ME"), 3);
	}
	function FormatTCVentaDolar() {
		ForceDecimalOnly($("#txtTCVentaDolar_ME"), 3);
	}
	function FormatTCCompraEuro() {
		ForceDecimalOnly($("#txtTCCompraEuro_ME"), 3);
	}
	function FormatTCVentaEuro() {
		ForceDecimalOnly($("#txtTCVentaEuro_ME"), 3);
	}
	function guardarConfCaja() {
		if (validarDatosConfiguracion()) {
			var confCaja = {};
			confCaja.TCCompraDolar = parseFloat($("#txtTCCompraDolar_ME").val()).toFixed(3);
			confCaja.TCCompraDolarReferencial = parseFloat($("#txtTCCompraDolarReferencial_ME").val()).toFixed(3);
			confCaja.TCVentaDolar = parseFloat($("#txtTCVentaDolar_ME").val()).toFixed(3);
			confCaja.TCCompraEuro = parseFloat($("#txtTCCompraEuro_ME").val()).toFixed(3);
			confCaja.TCVentaEuro = parseFloat($("#txtTCVentaEuro_ME").val()).toFixed(3);
			confCaja.TipoOpeIU = "Editar";
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
				document.getElementById("txtTCCompraDolar").value = d.lstConfCaja.TCCompraDolar.toFixed(3);
				document.getElementById("txtTCCompraDolarReferencial").value = d.lstConfCaja.TCCompraDolarReferencial.toFixed(3);
				document.getElementById("txtTCVentaDolar").value = d.lstConfCaja.TCVentaDolar.toFixed(3);
				document.getElementById("txtTCCompraEuro").value = d.lstConfCaja.TCCompraEuro.toFixed(3);
				document.getElementById("txtTCVentaEuro").value = d.lstConfCaja.TCVentaEuro.toFixed(3);
				document.getElementById("txtCajaActualSoles").value = d.lstConfCaja.CajaActualSoles.toFixed(1);
				document.getElementById("txtCajaActualDolares").value = d.lstConfCaja.CajaActualDolares.toFixed(1);
				document.getElementById("txtCajaActualEuros").value = d.lstConfCaja.CajaActualEuros.toFixed(1);
				var montoCajaSolesEnDolares = parseFloat(d.lstConfCaja.CajaActualSoles.toFixed(1) / d.lstConfCaja.TCCompraDolarReferencial.toFixed(3)).toFixed(1);
				document.getElementById("txtCajaActualSolesEnDolares").value = montoCajaSolesEnDolares;
			},
			error: function (ex) {
				alert(ex.responseText);
			}
		});
	}

	function ForceDecimalOnly($control,num) {
		$control.on("input", function (evt) {
			var self = $(this);
			self.val(self.val().replace(/[^0-9\.]/g, ''));
			if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
				evt.preventDefault();
			}
		});
		var valor = parseFloat($control.val()).toFixed(num);
		if ($.isNumeric(valor)) { $control.val(valor) }
		if (isNaN(valor)) { $control.val("") }
	}

	//funcion de inicio
	init();
	return {
		obtenerConfCaja: obtenerConfCaja,
		init: init
    }


})(window, document);