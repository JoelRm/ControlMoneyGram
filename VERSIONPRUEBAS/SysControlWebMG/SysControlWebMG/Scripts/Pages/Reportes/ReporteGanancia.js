var app_ReporteGanancia = (function (win, doc) {

    const data = {
        urlGenerarReporteGanancia: '/Reporte/GenerarReporteGanancia'
    }

    function init() {
        formatoRangoFecha();
        document.getElementById("btnBuscarGanancia").addEventListener("click", listarGanancia);
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
        document.getElementById("fInicio").value = ano + '-' + mes + '-' + dia;
    }

    function listarGanancia() {
        var objFiltro = {};
        objFiltro.Finicio = document.getElementById("fInicio").value;
        $.ajax({
            type: "POST",
            url: data.urlGenerarReporteGanancia,
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                const rpta = data.lstReporte;
                if (rpta != null) {
                    crearTabla(rpta);
                } else {
                    $('#tbListaGanancia').DataTable().clear().destroy();
                    toastr.error('No existe registros para este filtro, intente otro');
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
                                        <th data-width="10px">Tipo Cambio Ref.</th>
                                        <th data-width="10px">Caja Inicio</th>
                                        <th data-width="10px">Caja Final</th>
                                        <th data-width="10px">Ingresos</th>
                                        <th data-width="10px">Envíos</th>
                                        <th data-width="10px">Pagos</th>
                                        <th data-width="10px">Gastos</th>
                                        <th data-width="10px">Ganancia</th>
                                </tr>
                            </thead>`;

        if (data !== null) {
                 tbody = `<tr>
                                <td data-width="100px">${data.TipoCambioReferencial.toFixed(3)}</td>
                                <td data-width="10px">${data.InicioCajaTotalDolares.toFixed(1)}</td>
                                <td data-width="100px">${data.FinCajaTotalDolares.toFixed(1)}</td>
                                <td data-width="10px">${data.TotalIngresosDolar.toFixed(1)}</td>
                                <td data-width="40px">${data.TotalEnviosDolar.toFixed(1)}</td>
                                <td data-width="40px">${data.TotalPagosDolar.toFixed(1)}</td>
                                <td data-width="40px">${data.TotalGastosDolar.toFixed(1)}</td>
                                <td data-width="40px">${data.Ganancia.toFixed(1)}</td>
                            </tr>`;
        }
        const table = `<table id="tbListaGanancia" class ="table table-bordered table-hover" style="width:1200px">${thead}<tbody id="bodyTbListaGanancia">${tbody}</tbody></table>`;
        document.getElementById("div_tbListaGanancia").innerHTML = table;
    }

    //funcion de inicio
    init();

})(window, document);