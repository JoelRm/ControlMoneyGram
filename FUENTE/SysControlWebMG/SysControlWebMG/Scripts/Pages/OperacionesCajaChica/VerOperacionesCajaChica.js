var app_VerOperacionesCajaChica = (function (win, doc) {
    const data = {
        urlObtenerListaOperacionesCajaChica: '/OperacionCajaChica/ObtenerListaOperacionesCajaChica',
        urlCargaInicial: '/OperacionCajaChica/CargaInicial',
        urlAnularOperacion: '/OperacionCajaChica/AnularOperacionCajaChica',
        valores: {
            TblTipoOperacion: 1
        }
    }

    function init() {
        //debugger;
        listarOperacionesCajaChica();
        document.getElementById("btnRefrescarO").addEventListener("click", listarOperacionesCajaChica);
    }

    function listarOperacionesCajaChica() {
        //debugger;
        mostrarLoader();
        $.ajax({
            type: "POST",
            url: data.urlObtenerListaOperacionesCajaChica,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                const rpta = data.lstOperacionesCajaChica;
                if (rpta.length > 0) {
                    crearTabla(rpta);
                } else {
                    $('#tbListaOperacionesCajaChica').DataTable().clear().destroy();
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
                let btnAnular = ``;
                if (x.Eliminado == false)
                    btnAnular = `<td width="1%"><button type="button" class="btn btn-danger btn-xs" onclick="app_VerOperacionesCajaChica.anularOperacion(${x.IdOperacionCajaChica},this)"><span style="font-size:20px; cursor: pointer;" class="fa fa-xs fa-trash"></span></button></td>`;
                else
                    btnAnular = `<td width="1%"></td>`;
                return `<tr>
                                <td width="1%">${x.NombreOperacionCajaChica}</td>
                                <td width="1%">${x.DescripcionOperacionCajaChica}</td>
                                <td width="1%">${x.MontoSalida.toFixed(2)}</td>
                                <td width="1%">${x.MontoIngreso.toFixed(2)}</td>
                                <td width="1%">${x.TipoCambio.toFixed(2)}</td>
                                <td width="2%">${x.CajaChicaSol.toFixed(2)}</td>
                                <td width="2%">${x.CajaChicaDolar.toFixed(2)}</td>
                                <td width="2%">${x.CajaChicaEuro.toFixed(2)}</td>
                                <td width="2%">${x.UsuarioCreacion}</td>
                                <td width="1%">${x.HoraCreacion}</td>
                                <td width="1%">${x.DescripcionEstado}</td>` +
                    btnAnular +
                    `</tr>`;
            }).join('');
        }
        const table = `<table id="tbListaOperacionesCajaChica" class ="table table-bordered table-hover" style="width:1350px">${thead}<tbody id="bodytbListaOperacionesCajaChica">${tbody}</tbody></table>`;
        document.getElementById("div_tbListaOperacionesCajaChica").innerHTML = table;
        fotmatTable();
    }

    function fotmatTable() {
        $('#tbListaOperacionesCajaChica').DataTable({
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



    function anularOperacion(idOperacion, btn) {
        swal({
            title: "Anular Movimiento",
            text: "¿Está seguro que desea anular este Operación?",
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
                        url: data.urlAnularOperacion,
                        data: '{idOperacion: ' + JSON.stringify(idOperacion) + '}',
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            if (response.Code == 1) {
                                toastr.success('Se anuló con éxito', 'Éxito');
                                listarOperacionesCajaChica();
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



    ////funcion de inicio
    init();

    return {
        anularOperacion: anularOperacion
    }

})(window, document);
