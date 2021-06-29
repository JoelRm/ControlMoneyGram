var app_ReporteOperacionesCajaChicaCalculadora = (function (win, doc) {

    const data = {
        urlGenerarReporteCalculadora: '/ReporteCajaChica/GenerarReporteCajaChicaCalculadora'
    }

    function init() {
        document.getElementById("btnExportarOperacionesCajaChicaCalc").style.display = "none";
        formatoRangoFecha();
        document.getElementById("btnBuscarOperacionesCajaChicaCalc").addEventListener("click", listarOperacionesCajaChicaCalculadora);
        document.getElementById("btnExportarOperacionesCajaChicaCalc").addEventListener("click", ExportarExcel);

    }

    function ExportarExcel() {
        mostrarLoader();
        var objFiltro = {};
        objFiltro.Finicio = document.getElementById("fInicio").value;
        objFiltro.Ffin = document.getElementById("fFin").value;
        objFiltro.Usuario = document.getElementById("Usuario").value;
        objFiltro.Estado = $('input[name="estado"]:checked').val();

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
        htmls += "<th>Usuario</th>";
        htmls += "<tbody>";
        htmls += "<tr>";
        htmls += "<td>" + $("#fInicio").val() + "</td>"
        htmls += "<td>" + $("#fFin").val() + "</td>"
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
        htmls += "<tr bgcolor='#87AFC6'><th>Operacion</th><th>Resultado</th><th>Comentario</th><th>Hora Creacion</th><th>Usuario</th></tr></thead>";
        htmls += "<tbody>";

        $.ajax({
            type: "POST",
            url: data.urlGenerarReporteCalculadora,
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //debugger;

                if (data.lstReporteCajaChica.length > 0) {
                    for (var i = 0; i < data.lstReporteCajaChica.length; i++) {
                        htmls += '<tr>';
                        htmls += '<td>' + data.lstReporteCajaChica[i].Operacion + '</td>';
                        htmls += '<td>' + data.lstReporteCajaChica[i].Resultado + '</td>';
                        htmls += '<td>' + data.lstReporteCajaChica[i].Comentario + '</td>';
                        htmls += '<td>' + data.lstReporteCajaChica[i].HoraCreacion + '</td>';
                        htmls += '<td>' + data.lstReporteCajaChica[i].UsuarioCreacion + '</td>';
                        htmls += '</tr>';
                    }
                    htmls += "</tbody>";
                    htmls += "</table>";
                    var ctx = {
                        worksheet: 'Worksheet',
                        table: htmls
                    }
                    var link = document.createElement("a");
                    link.download = "export.xls";
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
        document.getElementById("fInicio").value = ano + '-' + mes + '-' + dia;
        document.getElementById("fFin").value = ano + '-' + mes + '-' + dia;
    }

    function listarOperacionesCajaChicaCalculadora() {
        mostrarLoader();
        var objFiltro = {};
        objFiltro.Finicio = document.getElementById("fInicio").value;
        objFiltro.Ffin = document.getElementById("fFin").value;
        objFiltro.Usuario = document.getElementById("Usuario").value;
        objFiltro.Estado = $('input[name="estado"]:checked').val();
        $.ajax({
            type: "POST",
            url: data.urlGenerarReporteCalculadora,
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                const rpta = data.lstReporteCajaChica;
                if (rpta.length > 0) {
                    crearTabla(rpta);
                    document.getElementById("btnExportarOperacionesCajaChicaCalc").style.display = "block";
                } else {
                    $('#tbListaOperacionesCajaChicaCalculadora').DataTable().clear().destroy();
                    toastr.error('No existe registros para este filtro, intente otro');
                    document.getElementById("btnExportarOperacionesCajaChicaCalc").style.display = "none";
                }
                ocultarLoader();
            },
            error: function (ex) {
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
                                <td data-width="10px">${x.Resultado}</td>
                                <td data-width="100px">${x.Comentario}</td>
                                <td data-width="10px">${x.HoraCreacion}</td>
                                <td data-width="40px">${x.UsuarioCreacion}</td>
                            </tr>`;
            }).join('');
        }
        const table = `<table id="tbListaOperacionesCajaChicaCalculadora" class ="table table-bordered table-hover" style="width:1350px">${thead}<tbody id="bodyTbListaOperaCalc">${tbody}</tbody></table>`;
        document.getElementById("div_tbListaOperacionesCajaChicaCalculadora").innerHTML = table;
        fotmatTable();
    }

    function fotmatTable() {
        $('#tbListaOperacionesCajaChicaCalculadora').DataTable({
            "order": [[3, "asc"]]
        });
    }

    //funcion de inicio
    init();

})(window, document);