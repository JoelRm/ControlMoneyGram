//var app_VerOperaciones = (function (win, doc) {
//const data = null;

$(document).ready(function () {
    //data = {
    //    urlObtenerListaOperaciones: '/Operacion/ObtenerListaOperaciones',
    //    urlCargaInicial: '/Operacion/CargaInicial',
    //    valores: {
    //        TblTipoOperacion: 1
    //    },
    //}
    listarOperaciones();
    document.getElementById("btnRefrescarO").addEventListener("click", listarOperaciones);
});

<<<<<<< HEAD
	function init() {
		listarOperaciones();
		document.getElementById("btnRefrescarO").addEventListener("click", listarOperaciones);
	}
=======
	//function init() {
	//	listarOperaciones();
	//	//formatDatatable();
	//	//document.getElementById("btnRefrescarO").addEventListener("click", listarOperaciones);
	//}
>>>>>>> f75e46177613731bd6500a3a2f369c968c017302

	function listarOperaciones() {
		mostrarLoader();
		var rows = "";
		$.ajax({
			type: "POST",
            url: "/Operacion/ObtenerListaOperaciones",
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
                        if (data.lstOperaciones[i].DescripcionEstado == 'Activo') {
                            rows += '<td><span onclick="cambiarEstadoUsuario(' + data.lstOperaciones[i].DescripcionEstado + ')" title="Cambiar estado" class="label label-sm label-success" style="cursor: pointer;"> Activado</span></td>';
                        }
                        else {
                            rows += '<td><span onclick="cambiarEstadoUsuario(' + data.lstOperaciones[i].DescripcionEstado + ')" title="Cambiar estado" class="label label-sm label-danger" style="cursor: pointer;">Desactivado</span></td>';
                        }
                        rows += '<td align="center"><span onclick="anularMovimiento(' + data.lstOperaciones[i].IdOperacion + ')" class="fas fa-window-close" style="font-size:20px; cursor: pointer;color: red;" title="Anular"></span></td>';
						rows += '</tr>';
					}
<<<<<<< HEAD
					document.getElementById("bodyTbListaOpera").innerHTML = rows;
					$('#tbListaOperaciones').DataTable({
						"order": [[9, "asc"]]
					});
=======
                    document.getElementById("bodyTbListaOpera").innerHTML = rows;
                    $('#tbListaOperaciones').dataTable({
                        "order": [[9, "asc"]]
                    });
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

<<<<<<< HEAD

=======
	//function formatDatatable() {
 //       $('#tbListaOperaciones').dataTable({
 //           "order": [[9, "asc"]]
 //       });
 //       $('#tbListaOperaciones').DataTable();
 //   }
    
>>>>>>> f75e46177613731bd6500a3a2f369c968c017302
	//funcion de inicio
	//init();

//})(window, document);

function anularMovimiento(idMovimiento) {
    swal({
        title: "Anular Movimiento",
        text: "¿Está seguro que desea anular este Tipo Movimiento?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Anular",
        cancelButtonText: "Cancelar"
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                mostrarLoader();
                $.ajax({
                    type: "POST",
                    url: "/Operacion/AnularOperacion",
                    data: '{idMovimiento: ' + JSON.stringify(idMovimiento) + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.Code == 1) {
                            toastr.success('Se anuló con éxito', 'Éxito');
                            listarOperaciones();
                            ocultarLoader();
                        }
                        else {
                            toastr.error('Ocurrió un error al realizar la anulación, inténtelo de nuevo', 'Error');
                            ocultarLoader();
                        }
                    },
                    error: function () {
                        toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                        ocultarLoader();
                    }
                });
            }
        }
    );
}
