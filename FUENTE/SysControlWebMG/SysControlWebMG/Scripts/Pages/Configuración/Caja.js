var app_Caja = (function (win, doc) {

	const data = {
		url: '/DesarrolloTextil/EvaluacionTextil/',
		valores: {
			IdSoles: "1",
			IdDolares: "2",
			IdEuros: "1",
			TipoOperacionCompra: "1",
			TipoOperacionVenta: "2"
		}
	}


	function init() {
		document.getElementById("cboTipoOperacion").addEventListener("change", changeTipoOperacion);
		document.getElementById("btnCalcularOperacion").addEventListener("click", calculoMonto);
		changeTipoOperacion('inicio');
	}
	function changeTipoOperacion(ini) {
		var TipoOperacion = document.getElementById("cboTipoOperacion").value;
		if (TipoOperacion == "1" || TipoOperacion == "2" || ini == 'inicio') {
			$("#cboTOVentaCompra").show();
			$("#divCalcularOperacion").show();
			$("#divMontoEntrega").show();
			$("#cboTOGeneral").hide();
			if (TipoOperacion == "1") {				
				$("#divTipoCambioCompra").show();
				$("#divTipoCambioVenta").hide();
			}
			if (TipoOperacion == "2") {
				$("#divTipoCambioCompra").hide();
				$("#divTipoCambioVenta").show();
			}
		}
		else {
			$("#divCalcularOperacion").hide();
			$("#divMontoEntrega").hide();
			$("#cboTOVentaCompra").hide();
			$("#cboTOGeneral").show();
        }
    }
	function calculoMonto() {
		var tipoMonedaDe = document.getElementById("cboMonedaDe").value;
		var tipoMonedaA = document.getElementById("cboMonedaA").value;
		var monto = parseFloat(document.getElementById("txtMonto").value);
		var TipoOperacion = parseFloat(document.getElementById("cboTipoOperacion").value);

		if (tipoMonedaDe == tipoMonedaA)
			alert('Los tipos de moneda de cambio no puedes ser iguales');
		if (tipoMonedaDe == data.valores.IdSoles && tipoMonedaA == data.valores.IdDolares)
			if (TipoOperacion == data.valores.TipoOperacionCompra) {
				var TipoCambioCompraDolar = document.getElementById("txtTCCompraDolar").value;
				document.getElementById("txtMontoEntrega").value = parseFloat(monto/TipoCambioCompraDolar)
			}
		if (TipoOperacion == data.valores.TipoOperacionVenta) {
				var TipoCambioVentaDolar = document.getElementById("txtTCVentaDolar").value;
				document.getElementById("txtMontoEntrega").value = parseFloat(monto/TipoCambioVentaDolar)
			}
	}


	//funcion de inicio
	init();



})(window, document);