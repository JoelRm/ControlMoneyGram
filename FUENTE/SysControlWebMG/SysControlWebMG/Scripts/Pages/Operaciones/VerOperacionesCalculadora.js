var app_VerOperacionesCalculadora = (function (win, doc) {

	const data = {
		urlObtenerListaOperaciones: '/Operacion/ObtenerListaOperacionesCalculadora'
	}

	function init() {
		listarOperacionesCalculadora();
		document.getElementById("btnRefrescar").addEventListener("click", listarOperacionesCalculadora);
	}

	function listarOperacionesCalculadora() {
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
						rows += '<td>' + data.lstOperaciones[i].Operacion + '</td>';
						rows += '<td>' + data.lstOperaciones[i].Resultado.toFixed(2) + '</td>';
						rows += '<td>' + data.lstOperaciones[i].Comentario + '</td>';
						rows += '<td>' + data.lstOperaciones[i].HoraCreacion + '</td>';
						rows += '<td>' + data.lstOperaciones[i].UsuarioCreacion + '</td>';
						rows += '</tr>';
					}
<<<<<<< HEAD
					document.getElementById("bodyTbListaOperaCalc").innerHTML = rows;
					$('#tbListaOperacionesCalculadora').DataTable({
						"order": [[3, "asc"]]
					});
=======
                    document.getElementById("bodyTbListaOperaCalc").innerHTML = rows;
>>>>>>> f75e46177613731bd6500a3a2f369c968c017302
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