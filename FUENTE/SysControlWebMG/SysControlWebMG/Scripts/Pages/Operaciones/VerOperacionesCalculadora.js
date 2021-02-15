var app_VerOperacionesCalculadora = (function (win, doc) {

	const data = {
		urlObtenerListaOperaciones: '/Operacion/ObtenerListaOperacionesCalculadora'
	}

	function init() {
		listarOperacionesCalculadora();
		document.getElementById("btnActualizar").addEventListener("click", listarOperacionesCalculadora);
	}

	function listarOperacionesCalculadora() {
		mostrarLoader();
		$.ajax({
			type: "POST",
			url: data.urlObtenerListaOperaciones,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				const rpta = data.lstOperaciones;
				if (rpta.length > 0) {
					crearTabla(rpta);
				} else {
					$('#tbListaOperacionesCalculadora').DataTable().clear().destroy();
					toastr.error('No existe registros para este filtro, intente otro');
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

	function crearTabla(data) {
		let tbody = '';
		const thead = `<thead>
                                    <th data-width="100px">Operación</th>
                                    <th data-width="10px">Resultado</th>
                                    <th data-width="100px">Comentario</th>
                                    <th data-width="10px">Hora</th>
                                    <th data-width="40px">Usuario</th>
                                </tr>
                            </thead>`;
		if (data !== null) {
			tbody = data.map(x => {
				return `<tr>
                                <td data-width="100px">${x.Operacion}</td>
                                <td data-width="10px">${x.Resultado.toFixed(2)}</td>
                                <td data-width="100px">${x.Comentario}</td>
                                <td data-width="10px">${x.HoraCreacion}</td>
                                <td data-width="40px">${x.UsuarioCreacion}</td>
                            </tr>`;
			}).join('');
		}
		const table = `<table id="tbListaOperacionesCalculadora" class ="table table-bordered table-hover" style="width:1350px">${thead}<tbody id="bodyTbListaOperaCalc">${tbody}</tbody></table>`;
		document.getElementById("div_tbListaOperacionesCalculadora").innerHTML = table;
		fotmatTable();
	}

	function fotmatTable() {
		$('#tbListaOperacionesCalculadora').DataTable({
			"order": [[3, "asc"]],
			"columnDefs": [
				{ "orderable": false, "targets": 0 },
				{ "orderable": false, "targets": 1 },
				{ "orderable": false, "targets": 2 },
				{ "orderable": false, "targets": 3 }
			],
		});
	}

	//funcion de inicio
	init();

})(window, document);