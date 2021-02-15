var app_VerOperaciones = (function (win, doc) {
//const data = null;

	const data = {
		urlObtenerListaOperaciones: '/Operacion/ObtenerListaOperaciones',
		urlCargaInicial: '/Operacion/CargaInicial',
		valores: {
			TblTipoOperacion: 1
		}
	}

	function init() {
		listarOperaciones();
		document.getElementById("btnRefrescarO").addEventListener("click", listarOperaciones);
	}

	function listarOperaciones() {
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
					$('#tbListaOperaciones').DataTable().clear().destroy();
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
                                    <th width="1%">Operación</th>
                                    <th width="1%">Movimiento</th>
                                    <th width="1%">Salida</th>
                                    <th width="1%">Ingreso</th>
                                    <th width="1%">Tipo Cambio</th>
                                    <th width="2%">Caja (S/.)</th>
                                    <th width="2%">Caja ($)</th>
                                    <th width="2%">Caja (€)</th>
                                    <th width="2%">Usuario</th>
                                    <th width="1%">Hora</th>
                                    <th width="1%">Estado</th>
                                    <th width="1%">Acción</th>
                                </tr>
                            </thead>`;
		if (data !== null) {
			tbody = data.map(x => {
				return `<tr>
                                <td width="1%">${x.NombreOperacion}</td>
                                <td width="1%">${x.DescripcionOperacion}</td>
                                <td width="1%">${x.MontoSalida.toFixed(2)}</td>
                                <td width="1%">${x.MontoIngreso.toFixed(2)}</td>
                                <td width="1%">${x.TipoCambio.toFixed(2)}</td>
                                <td width="2%">${x.CajaSol.toFixed(2)}</td>
                                <td width="2%">${x.CajaDolar.toFixed(2)}</td>
                                <td width="2%">${x.CajaEuro.toFixed(2)}</td>
                                <td width="2%">${x.UsuarioCreacion}</td>
                                <td width="1%">${x.HoraCreacion}</td>
                                <td width="1%">${x.DescripcionEstado}</td>
								<td width="1%" align="center"><span onclick="anularMovimiento(${x.IdOperacion})" class="fas fa-window-close" style="font-size:20px; cursor: pointer;color: red;" title="Anular"></span></td>
								</tr>`;
			}).join('');
		}
		const table = `<table id="tbListaOperaciones" class ="table table-bordered table-hover" style="width:1350px">${thead}<tbody id="bodytbListaOperaciones">${tbody}</tbody></table>`;
		document.getElementById("div_tbListaOperaciones").innerHTML = table;
		fotmatTable();
	}

	function fotmatTable() {
		$('#tbListaOperaciones').DataTable({
			"order": [[9, "asc"]],
			"columnDefs": [
				{ "orderable": false, "targets": 0 },
				{ "orderable": false, "targets": 1 },
				{ "orderable": false, "targets": 2 },
				{ "orderable": false, "targets": 3 },
				{ "orderable": false, "targets": 4 },
				{ "orderable": false, "targets": 5 },
				{ "orderable": false, "targets": 6 },
				{ "orderable": false, "targets": 7 },
				{ "orderable": false, "targets": 8 },
				{ "orderable": false, "targets": 9 },
				{ "orderable": false, "targets": 10 },
				{ "orderable": false, "targets": 11 }
			],
		});
	}



	function anularMovimiento(idMovimiento) {
		//swal({
		//	title: "Anular Movimiento",
		//	text: "¿Está seguro que desea anular este Tipo Movimiento?",
		//	type: "warning",
		//	showCancelButton: true,
		//	confirmButtonClass: "btn-danger",
		//	confirmButtonText: "Anular",
		//	cancelButtonText: "Cancelar"
		//},
		//	function (isConfirm) {
		//		if (isConfirm) {
		//			swal.close()
		//			mostrarLoader();
		//			$.ajax({
		//				type: "POST",
		//				url: "/Operacion/AnularOperacion",
		//				data: '{idMovimiento: ' + JSON.stringify(idMovimiento) + '}',
		//				dataType: "json",
		//				contentType: "application/json; charset=utf-8",
		//				success: function (response) {
		//					if (response.Code == 1) {
		//						toastr.success('Se anuló con éxito', 'Éxito');
		//						listarOperaciones();
		//						ocultarLoader();
		//					}
		//					else {
		//						toastr.error('Ocurrió un error al realizar la anulación, inténtelo de nuevo', 'Error');
		//						ocultarLoader();
		//					}
		//				},
		//				error: function () {
		//					toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
		//					ocultarLoader();
		//				}
		//			});
		//		}
		//	}
		//);
	}



	////funcion de inicio
	init();

})(window, document);
