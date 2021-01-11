var app_Caja = (function (win, doc) {

	const data = {
		urlCargaInicial: '/Caja/CargaInicial',
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
		cargaInicial();
		document.getElementById("cboTipoOperacion").addEventListener("change", changeTipoOperacion);
		document.getElementById("btnCalcularOperacion").addEventListener("click", calculoMonto);
		document.getElementById("txtMonto").addEventListener("blur", ForceDecimalOnly);
		changeTipoOperacion('inicio');
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
		$control.val(valor);
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
		var TipoCambioCompraDolar = document.getElementById("txtTCCompraDolar").value;
		var TipoCambioVentaDolar = document.getElementById("txtTCVentaDolar").value;
		
		if (tipoMonedaDe == tipoMonedaA)
			alert('Los tipos de moneda de cambio no puedes ser iguales');
		// De soles a dólares
		if (tipoMonedaDe == data.valores.IdSoles && tipoMonedaA == data.valores.IdDolares) {
			// Compra
			if (TipoOperacion == data.valores.TipoOperacionCompra)			
				document.getElementById("txtMontoEntrega").value = parseFloat(monto / TipoCambioCompraDolar)
			// Venta
			if (TipoOperacion == data.valores.TipoOperacionVenta) 				
				document.getElementById("txtMontoEntrega").value = parseFloat(monto / TipoCambioVentaDolar)
		}
		// De dólares a soles
		if (tipoMonedaDe == data.valores.IdDolares && tipoMonedaA == data.valores.IdSoles) {
			// Compra
			if (TipoOperacion == data.valores.TipoOperacionCompra)
				document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraDolar)
			// Venta
			if (TipoOperacion == data.valores.TipoOperacionVenta)
				document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioVentaDolar)
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
				for (var i = 0; i < lista.length; i++) {
					if (lista[i].IdTabla === data.valores.TblTipoOperacion)
						$("#cboTipoOperacion").append('<option value=' + lista[i].ValorItem + '>' + lista[i].NombreItem + '</option>');
					if (lista[i].IdTabla === data.valores.TblMoneda) {
						$("#cboMonedaDe").append('<option value=' + lista[i].ValorItem + '>' + lista[i].NombreItem + '</option>');
						$("#cboMonedaA").append('<option value=' + lista[i].ValorItem + '>' + lista[i].NombreItem + '</option>');
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