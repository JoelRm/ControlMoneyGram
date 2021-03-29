var app_Reporte = (function (win, doc) {

    const data = {
        urlGenerarReporteOperacionesCajaChica: '/ReporteCajaChica/GenerarReporteOperacionesCajaChica'
    }

    function init() {
        document.getElementById("btnExportarOperacionesCajaChica").style.display = "none";
        formatoRangoFecha();
        document.getElementById("btnBuscarOperacionesCajaChica").addEventListener("click", listarOperacionesCajaChica);
        document.getElementById("btnExportarOperacionesCajaChica").addEventListener("click", ExportarExcel);

    }

    function formatoRangoFecha() {
        //********************LÓGICA PARA OBTENER FECHA ACTUAL******************
        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth() + 1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10 (DIA)
        if (mes < 10)
            mes = '0' + mes //agrega cero si el menor de 10 (MES)
        //********************LÓGICA PARA OBTENER FECHA ACTUAL******************
        $('#fInicio').val(ano + '-' + mes + '-' + dia);
        $('#fFin').val(ano + '-' + mes + '-' + dia);
    }


    function listarOperacionesCajaChica() {
        mostrarLoader();
        var objFiltro = {};
        objFiltro.Finicio = $("#fInicio").val();
        objFiltro.Ffin = $("#fFin").val();
        objFiltro.TipoOperacion = $("#idTipoOperacion").val();
        objFiltro.Usuario = $("#Usuario").val();
        objFiltro.Estado = $('input[name="estado"]:checked').val();
        $.ajax({
            type: "POST",
            url: data.urlGenerarReporteOperacionesCajaChica,
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                const rpta = data.lstReporteCajaChica;
                if (rpta.length > 0) {
                    crearTabla(rpta);
                    document.getElementById("btnExportarOperacionesCajaChica").style.display = "block";
                } else {
                    $('#tbListaOperacionesCajaChica').DataTable().clear().destroy();
                    toastr.error('No existe registros para este filtro, intente otro');
                    document.getElementById("btnExportarOperacionesCajaChica").style.display = "none";
                }
                ocultarLoader();
            },
            error: function (ex) {
                alert(ex.responseText);
                ocultarLoader();
            }
        });
        ocultarLoader();
    };


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
                                </tr>
                            </thead>`;
        if (data !== null) {
            tbody = data.map(x => {
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
                                <td width="1%">${x.DescripcionEstado}</td>
								</tr>`;
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
            ],
        });
    }



    function ExportarExcel() {
        mostrarLoader();

        var fil = {};
        fil.Finicio = $("#fInicio").val();
        fil.Ffin = $("#fFin").val();
        fil.TipoOperacion = $("#idTipoOperacion").val();
        fil.Usuario = $("#Usuario").val();
        fil.Estado = $('input[name="estado"]:checked').val();

        var TipoOpe = document.getElementById("idTipoOperacion");
        var textTipoOpe = TipoOpe.options[TipoOpe.selectedIndex].text;


        var htmls = "";
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };

        var format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };
        htmls = "<table border='2px'>";
        htmls += "<thead>";
        htmls += "<tr>";
        htmls += "<th>Fecha Inicio</th>";
        htmls += "<th>Fecha Fin</th>";
        htmls += "<th>Tipo Operacion</th>";
        htmls += "<th>Usuario</th>";
        htmls += "<tbody>";
        htmls += "<tr>";
        htmls += "<td>" + $("#fInicio").val() + "</td>"
        htmls += "<td>" + $("#fFin").val() + "</td>"
        htmls += "<td>" + textTipoOpe + "</td>"
        htmls += "<td>" + $("#Usuario").val(); + "</td>"
        htmls += "</tr>";
        htmls += "<tr></tr>";
        htmls += "<tr></tr>";
        htmls += "</tbody>";
        htmls += "</tr>"
        htmls += "</thead>"
        htmls += "</table>";
        htmls += "";
        htmls += "";
        htmls += "<table border='2px'>"
        htmls += "<thead>";
        htmls += "<thead><th width='1%'>Operación</th><th width='1%'>Movimiento</th><th width='1%'>Salida</th><th width='1%'>Ingreso</th><th width='1%'>Tipo Cambio</th><th width='2%'>Caja (S/.)</th><th width='2%'>Caja ($)</th><th width='2%'>Caja (€)</th><th width='2%'>Usuario</th><th width='1%'>Hora</th><th width='1%'>Estado</th></tr></thead>";
        htmls += "<tbody>";
        $.ajax({
            type: "POST",
            url: '/ReporteCajaChica/GenerarReporteOperacionesCajaChica',
            data: '{objFiltro: ' + JSON.stringify(fil) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.lstReporteCajaChica.length > 0) {
                    for (var i = 0; i < data.lstReporteCajaChica.length; i++) {
                        htmls += '<tr>';
                        htmls += '<td width="1%">' + data.lstReporteCajaChica[i].NombreOperacionCajaChica + '</td>';
                        htmls += '<td width="1%">' + data.lstReporteCajaChica[i].DescripcionOperacionCajaChica + '</td>';
                        htmls += '<td width="1%">' + data.lstReporteCajaChica[i].MontoSalida.toFixed(2) + '</td>';
                        htmls += '<td width="1%">' + data.lstReporteCajaChica[i].MontoIngreso.toFixed(2) + '</td>';
                        htmls += '<td width="1%">' + data.lstReporteCajaChica[i].TipoCambio.toFixed(2) + '</td>';
                        htmls += '<td width="2%">' + data.lstReporteCajaChica[i].CajaChicaSol.toFixed(2) + '</td>';
                        htmls += '<td width="2%">' + data.lstReporteCajaChica[i].CajaChicaDolar.toFixed(2) + '</td>';
                        htmls += '<td width="2%">' + data.lstReporteCajaChica[i].CajaChicaEuro.toFixed(2) + '</td>';
                        htmls += '<td width="2%">' + data.lstReporteCajaChica[i].UsuarioCreacion + '</td>';
                        htmls += '<td width="1%">' + data.lstReporteCajaChica[i].HoraCreacion + '</td>';
                        htmls += '<td width="1%">' + data.lstReporteCajaChica[i].DescripcionEstado + '</td>';
                        htmls += '</tr>';
                    }
                    htmls += "</tbody>";
                    htmls += "</table>";
                    var ctx = {
                        worksheet: 'Worksheet',
                        table: htmls
                    }

                    var link = document.createElement("a");
                    link.download = "ReporteOperacionCajaChica.xls";
                    link.href = uri + base64(format(template, ctx));
                    link.click();
                }
                else {
                    toastr.error('No hubo resultados;');
                }
                ocultarLoader();
            },
            error: function (ex) {
                alert(ex.responseText);
                ocultarLoader();
            }
        });
    };

    //funcion de inicio
    init();

})(window, document);