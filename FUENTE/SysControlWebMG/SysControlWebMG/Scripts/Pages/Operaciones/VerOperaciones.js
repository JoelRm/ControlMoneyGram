var app_VerOperaciones = (function (win, doc) {

	const data = {
		urlObtenerListaOperaciones: '/Operacion/ObtenerListaOperaciones',
		urlCargaInicial: '/Operacion/CargaInicial',
		valores: {
			TblTipoOperacion: 1
		},
	}

	function init() {
		listarOperaciones();
		document.getElementById("btnRefrescarO").addEventListener("click", listarOperaciones);
	}

	function listarOperaciones() {
		mostrarLoader();
		var rows = "";
		$.ajax({
			type: "POST",
			url: data.urlObtenerListaOperaciones,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				if (data.lstOperaciones.length > 0) {
					for (var i = 0; i < data.lstOperaciones.length; i++) {
						rows += '<tr>';
						rows += '<td>' + data.lstOperaciones[i].NombreOperacion + '</td>';
						rows += '<td>' + data.lstOperaciones[i].DescripcionOperacion + '</td>';
						rows += '<td>' + data.lstOperaciones[i].MontoSalida.toFixed(2) + '</td>';
						rows += '<td>' + data.lstOperaciones[i].MontoIngreso.toFixed(2) + '</td>';
						rows += '<td>' + data.lstOperaciones[i].TipoCambio.toFixed(2) + '</td>';
						rows += '<td>' + data.lstOperaciones[i].CajaSol.toFixed(2) + '</td>';
						rows += '<td>' + data.lstOperaciones[i].CajaDolar.toFixed(2) + '</td>';
						rows += '<td>' + data.lstOperaciones[i].CajaEuro.toFixed(2) + '</td>';
						rows += '<td>' + data.lstOperaciones[i].UsuarioCreacion + '</td>';
						rows += '<td>' + data.lstOperaciones[i].HoraCreacion + '</td>';
						rows += '<td><span class="label label-sm label-success" >' + data.lstOperaciones[i].DescripcionEstado +'</span></td>';
						rows += '</tr>';
					}
					document.getElementById("bodyTbListaOpera").innerHTML = rows;
					$('#tbListaOperaciones').DataTable({
						"order": [[9, "asc"]]
					});
				}
				else {
					toastr.error('Aún no tien registros para mostrar');
				}
				ocultarLoader();
			},
			error: function (ex) {
				alert(ex.responseText);
				ocultarLoader();
			}
		});
		ocultarLoader();
	}


	//funcion de inicio
	init();

})(window, document);