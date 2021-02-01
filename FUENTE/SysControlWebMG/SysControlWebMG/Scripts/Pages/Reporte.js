function GenerarReporte() {
    mostrarLoader();
    var fil = {};
    fil.Finicio = $("#fInicio").val();
    fil.Ffin = $("#fFin").val();
    fil.TipoOperacion = $("#idTipoOperacion").val();
    fil.Usuario = $("#Usuario").val();
    fil.Estado = $('input[name="estado"]:checked').val();

    var rows = "";
    $.ajax({
        type: "POST",
        url: '/Reporte/GenerarReporte',
        data: '{objFiltro: ' + JSON.stringify(fil) + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.lstReporte.length > 0) {
                for (var i = 0; i < data.lstReporte.length; i++) {
                    rows += '<tr>';
                    rows += '<td>' + data.lstReporte[i].Desc_Operacion + '</td>';
                    rows += '<td>' + data.lstReporte[i].Monto_Salida + '</td>';
                    rows += '<td>' + data.lstReporte[i].Tipo_Cambio + '</td>';
                    rows += '<td>' + data.lstReporte[i].Caja_Sol + '</td>';
                    rows += '<td>' + data.lstReporte[i].Caja_Dolar + '</td>';
                    rows += '<td>' + data.lstReporte[i].Caja_Euro + '</td>';
                    rows += '<td>' + data.lstReporte[i].Usuario_Creacion + '</td>';
                    rows += '<td>' + data.lstReporte[i].Fecha_Javascript + '</td>';
                    if (data.lstReporte[i].Estado) {
                        rows += '<td><span class="label label-sm label-danger"> Anulado</span></td>';
                    }
                    else {
                        rows += '<td><span class="label label-sm label-success" > Activo</span></td>';
                    }
                    rows += '</tr>';
                }
                document.getElementById("bodytbReporte").innerHTML = rows;
                $('#tbReporte').DataTable();
                //$("#modalFiltrosReporte .CerrarPopUpFiltrosReporte").click()
                $('#modalFiltrosReporte').modal('hide');
                document.getElementById("Botones_Exportar").style.display = "block";
            }
            else {
                toastr.error('No existe registros para este filtro, intente otro');
                document.getElementById("Botones_Exportar").style.display = "none";
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
    htmls += "<td>"+ $("#fInicio").val()+"</td>"
    htmls += "<td>" + $("#fFin").val() +"</td>"
    htmls += "<td>" + textTipoOpe +"</td>"
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
    htmls += "<tr bgcolor='#87AFC6'><th>Tipo Operacion</th><th>Monto Salida</th><th>Tipo Cambio</th><th>Caja Soles</th><th>Caja Dolares</th><th>Caja Euros</th><th>Ususario Creacion</th>";
    htmls += "<th>Fecha Creacion</th><th>Estado</th></tr ></thead >";
    htmls += "<tbody>";

    $.ajax({
        type: "POST",
        url: '/Reporte/GenerarReporte',
        data: '{objFiltro: ' + JSON.stringify(fil) + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.lstReporte.length > 0) {
                for (var i = 0; i < data.lstReporte.length; i++) {
                    htmls += '<tr>';
                    htmls += '<td>' + data.lstReporte[i].Desc_Operacion + '</td>';
                    htmls += '<td>' + data.lstReporte[i].Monto_Salida + '</td>';
                    htmls += '<td>' + data.lstReporte[i].Tipo_Cambio + '</td>';
                    htmls += '<td>' + data.lstReporte[i].Caja_Sol + '</td>';
                    htmls += '<td>' + data.lstReporte[i].Caja_Dolar + '</td>';
                    htmls += '<td>' + data.lstReporte[i].Caja_Euro + '</td>';
                    htmls += '<td>' + data.lstReporte[i].Usuario_Creacion + '</td>';
                    htmls += '<td>' + data.lstReporte[i].Fecha_Javascript + '</td>';
                    if (data.lstReporte[i].Estado) {
                        htmls += '<td><span class="label label-sm label-danger"> Anulado</span></td>';
                    }
                    else {
                        htmls += '<td><span class="label label-sm label-success" > Activo</span></td>';
                    }
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

//function ExportarPDF() {
//    var doc = new jsPDF();
//    var elementHTML = $('#tbReporte').html();
//    var specialElementHandlers = {
//        '#elementH': function (element, renderer) {
//            return true;
//        }
//    };
//    doc.fromHTML(elementHTML, 15, 15, {
//        'width': 170,
//        'elementHandlers': specialElementHandlers
//    });

//    // Save the PDF
//    doc.save('sample-document.pdf');
//}