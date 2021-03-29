var app_OperacionCajaChica = (function (win, doc) {

    const data = {
        urlCargaInicial: '/OperacionCajaChica/CargaInicial',
        urlGuardarOperacionCajaChica: '/OperacionCajaChica/GuardarOperacionCajaChica',
        urlGuardarOperacionCajaChicaCalculadora: '/OperacionCajaChica/GuardarOperacionCajaChicaCalculadora',
        urlEditarConfiguracionTipoCambio: '/OperacionCajaChica/_EditarConfiguracionTipoCambio',
        urlObtenerConfCajaChica: '/OperacionCajaChica/ObtenerConfCajaChica',
        urlObtenerGanancia: '/ReporteCajaChica/GenerarReporteGanancia',
        valores: {
            Monedas: {
                IdSoles: "1",
                IdDolares: "2",
                IdEuros: "1"
            },
            TipoOperacionCajaChicaCompra: "1",
            TipoOperacionCajaChicaVenta: "2",
            TipoOperacionCajaChicaCV: {
                TipoOperacionCajaChicaCompraDolar: 1,
                TipoOperacionCajaChicaVentaDolar: 2,
                TipoOperacionCajaChicaCompraEuro: 3,
                TipoOperacionCajaChicaVentaEuro: 4,
                TipoOperacionCajaChicaDolAEuro: 5,
                TipoOperacionCajaChicaEuroADol: 6,
            },
            TipoOperacionCajaChicaOtras: {
                TipoOperacionCajaChicaIngreso: 7,
                TipoOperacionCajaChicaEnvio: 8,
                TipoOperacionCajaChicaPago: 9,
                TipoOperacionCajaChicaGasto: 10
            },
            TblTipoOperacionCajaChica: 1,
            TblMoneda: 2
        },
        flagValorTipoOperacionCajaChica: 0,
        nombreTipoOperacionCajaChica: ''
    }


    function init() {
        configMostrarOcultarElementos(0);
        cargaInicial();
        obtenerConfCajaChica();
        document.getElementById("btnCompraDolar").addEventListener("click", click_CompraDolar);
        document.getElementById("btnVentaDolar").addEventListener("click", click_VentaDolar);
        document.getElementById("btnCompraEuro").addEventListener("click", click_CompraEuro);
        document.getElementById("btnVentaEuro").addEventListener("click", click_VentaEuro);
        document.getElementById("btnDolAEuro").addEventListener("click", click_DolAEuro);
        document.getElementById("btnEuroADol").addEventListener("click", click_EuroADol);
        document.getElementById("cboTipoOperacionCajaChica").addEventListener("change", changeTipoOperacionCajaChica);
        document.getElementById("txtMonto").addEventListener("blur", calcularOperacionCajaChica);
        document.getElementById("txtPagaCon").addEventListener("blur", calcularVuelto);

        document.getElementById("btnRegistrarOperacionCajaChica").addEventListener("click", guardarOperacionCajaChica);
        document.getElementById("btnEditarTipoCambio").addEventListener("click", btnEditarTipoCambio_Click);
        document.getElementById("btn_g").addEventListener("click", btn_g_Click);
    }

    function calcularVuelto() {
        if (data.flagValorTipoOperacionCajaChica > 0) {
            // Dólares 
            // Venta
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaDolar) {
                // Vuelto 
                if ($.isNumeric($("#txtMonto").val()) == true && $.isNumeric($("#txtPagaCon").val()) == true)
                    document.getElementById("txtVuelto").value = parseFloat(document.getElementById("txtPagaCon").value).toFixed(1) - parseFloat(document.getElementById("txtMontoEntrega").value).toFixed(1);
            }

            // Euros
            // Venta
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaEuro) {
                // Vuelto 
                if ($.isNumeric($("#txtMonto").val()) == true && $.isNumeric($("#txtPagaCon").val()) == true)
                    document.getElementById("txtVuelto").value = parseFloat(document.getElementById("txtPagaCon").value).toFixed(1) - parseFloat(document.getElementById("txtMontoEntrega").value).toFixed(1);
            }

        }
    }

    function validarGuardarOperacionCajaChicaCalculadora() {
        var OperacionCajaChica = $("#opr").text();
        var resultado = $("#tResult").val();
        if (OperacionCajaChica == "") {
            toastr.error('Debe realizar una operación', 'Error');
            return false;
        }
        if (resultado == "") {
            toastr.error('Debe calcular la operación', 'Error');
            return false;
        }
        return true;
    };

    function btn_g_Click() {
        if (validarGuardarOperacionCajaChicaCalculadora()) {
            swal({
                title: "¿Desea registrar la operación?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Registrar",
                cancelButtonText: "Cancelar"
            },
                function (isConfirm) {
                    if (isConfirm) {
                        var ope = {
                            idOperacion: 0,
                            Operacion: $("#opr").text(),
                            Resultado: $("#tResult").val(),
                            Comentario: $("#txtComentarioCalc").val()
                        }
                        $.ajax({
                            type: "POST",
                            url: data.urlGuardarOperacionCajaChicaCalculadora,
                            data: '{ope: ' + JSON.stringify(ope) + '}',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (d) {
                                toastr.success(null, 'Se realizó el registro con éxito.');
                            },
                            error: function (ex) {
                                alert(ex.responseText);
                            }
                        });
                    }
                }
            );
        }
    }

    function obtenerConfCajaChica() {
        $.ajax({
            type: "POST",
            url: data.urlObtenerConfCajaChica,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (d) {
                //debugger;
                if (d.lstConfCajaChica != null) {
                    document.getElementById("txtTCCompraDolar").value = d.lstConfCajaChica.TCCompraDolar.toFixed(3);
                    document.getElementById("txtTCCompraDolarReferencial").value = d.lstConfCajaChica.TCCompraDolarReferencial.toFixed(3);
                    document.getElementById("txtTCVentaDolar").value = d.lstConfCajaChica.TCVentaDolar.toFixed(3);
                    document.getElementById("txtTCCompraEuro").value = d.lstConfCajaChica.TCCompraEuro.toFixed(3);
                    document.getElementById("txtTCVentaEuro").value = d.lstConfCajaChica.TCVentaEuro.toFixed(3);
                    if (d.lstConfCajaChica.CajaChicaActualSoles > 0 && d.lstConfCajaChica.CajaChicaActualDolares > 0 && d.lstConfCajaChica.CajaChicaActualEuros > 0 && d.lstConfCajaChica.TCCompraDolar > 0 && d.lstConfCajaChica.TCVentaDolar > 0 && d.lstConfCajaChica.TCCompraEuro > 0 && d.lstConfCajaChica.TCVentaEuro > 0) {
                        document.getElementById("txtCajaChicaActualSoles").value = d.lstConfCajaChica.CajaChicaActualSoles.toFixed(1);
                        document.getElementById("txtCajaChicaActualDolares").value = d.lstConfCajaChica.CajaChicaActualDolares.toFixed(1);
                        document.getElementById("txtCajaChicaActualEuros").value = d.lstConfCajaChica.CajaChicaActualEuros.toFixed(1);
                        var montoCajaChicaSolesEnDolares = parseFloat(d.lstConfCajaChica.CajaChicaActualSoles.toFixed(1) / d.lstConfCajaChica.TCCompraDolarReferencial.toFixed(3)).toFixed(1);
                        document.getElementById("txtCajaChicaActualSolesEnDolares").value = montoCajaChicaSolesEnDolares;
                        var sumaTotalEnDolares = parseFloat(parseFloat(document.getElementById("txtCajaChicaActualSolesEnDolares").value) + parseFloat(document.getElementById("txtCajaChicaActualDolares").value)).toFixed(1);
                        document.getElementById("txtSumaTotalEnDolares").value = sumaTotalEnDolares;
                        ObtenerGananaciaActual();
                        toastr.success(null, 'Se obtuvo los ultimos valores registrados en CajaChica y tipo de cambio.');

                        //swal({ title: "Valores Obtenidos!", text: "Se obtuvo los ultimos valores registrados en CajaChica y tipo de cambio.", type: "success", confirmButtonText: 'Aceptar' });
                    } else {
                        if (d.lstConfCajaChica.CajaChicaActualSoles > 1)
                            document.getElementById("txtCajaChicaActualSoles").value = d.lstConfCajaChica.CajaChicaActualSoles.toFixed(1);
                        else
                            toastr.error('La CajaChica en soles no tiene monto ingresado.r', 'Error');

                        if (d.lstConfCajaChica.CajaChicaActualDolares > 1)
                            document.getElementById("txtCajaChicaActualDolares").value = d.lstConfCajaChica.CajaChicaActualDolares.toFixed(1);
                        else
                            toastr.error('La CajaChica en dólares no tiene monto ingresado.', 'Error');

                        if (d.lstConfCajaChica.CajaChicaActualEuros > 1)
                            document.getElementById("txtCajaChicaActualEuros").value = d.lstConfCajaChica.CajaChicaActualEuros.toFixed(1);
                        else
                            toastr.error('La CajaChica en euros no tiene monto ingresado.', 'Error');
                    }
                } else {
                    toastr.error('Debe configurar su CajaChica antes de ingresar alguna operación', 'Error');
                }

            },
            error: function (ex) {
                alert(ex.responseText);
                //ocultarLoader();
            }
        });
    }

    function ObtenerGananaciaActual() {
        var objFiltro = {};
        objFiltro.Finicio = new Date(); //Fecha actual
        $.ajax({
            type: "POST",
            url: data.urlObtenerGanancia,
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                const rpta = data.lstReporte;
                if (rpta != null) {
                    document.getElementById("txtGananciaActual").value = rpta.Ganancia;
                } else {
                    toastr.error('No se pudo obtener la ganancia actual');
                }
            },
            error: function (ex) {
                ocultarLoader();
            }
        });
        ocultarLoader();
    }

    function btnEditarTipoCambio_Click() {
        $('#modalEditarConfCajaChica').modal('show');
        app_EditarConfiguracionTipoCambio.init();
    }

    function configMostrarOcultarElementos(idTipoOperacionCajaChica) {
        limpiarFormulario();
        if (idTipoOperacionCajaChica == 0) {
            data.flagValorTipoOperacionCajaChica = 0;
            data.nombreTipoOperacionCajaChica = 'Ninguna';
            $("#divMonto").hide();
            $("#divPagaCon").hide();
            $("#divMontoEntrega").hide();
            $("#divMontoVuelto").hide();
            $("#divComentario").hide();
            $("#divRegistrarOperacionCajaChica").hide();
            $("#divMoneda").hide();
        }
        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraDolar) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraDolar;
            data.nombreTipoOperacionCajaChica = 'CAMBIO DÓLAR';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divMontoEntrega").show();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divMoneda").hide();
            toastr.success(null, 'CAMBIO DÓLAR');
            document.getElementById("cboTipoOperacionCajaChica").value = "0";
        }
        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaDolar) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaDolar;
            data.nombreTipoOperacionCajaChica = 'VENTA DÓLAR';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divMontoEntrega").show();
            $("#divPagaCon").show();
            $("#divMontoVuelto").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divMoneda").hide();
            toastr.success(null, 'VENTA DÓLAR');
            document.getElementById("cboTipoOperacionCajaChica").value = "0";
        }
        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraEuro) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraEuro;
            data.nombreTipoOperacionCajaChica = 'CAMBIO EURO';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divMontoEntrega").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divMoneda").hide();
            toastr.success(null, 'CAMBIO EURO');
            document.getElementById("cboTipoOperacionCajaChica").value = "0";
        }
        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaEuro) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaEuro;
            data.nombreTipoOperacionCajaChica = 'VENTA EURO';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divMontoEntrega").show();
            $("#divPagaCon").show();
            $("#divMontoVuelto").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divMoneda").hide();
            toastr.success(null, 'VENTA EURO');
            document.getElementById("cboTipoOperacionCajaChica").value = "0";
        }
        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaDolAEuro) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaDolAEuro;
            data.nombreTipoOperacionCajaChica = 'CAMBIO DÓLAR A EURO';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divMontoEntrega").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divMoneda").hide();
            toastr.success(null, 'CAMBIO DÓLAR A EURO');
            document.getElementById("cboTipoOperacionCajaChica").value = "0";
        }
        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaEuroADol) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaEuroADol;
            data.nombreTipoOperacionCajaChica = 'CAMBIO EURO A DÓLAR';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divMontoEntrega").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divMoneda").hide();
            toastr.success(null, 'CAMBIO EURO A DÓLAR');
            document.getElementById("cboTipoOperacionCajaChica").value = "0";
        }

        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaIngreso) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaIngreso;
            data.nombreTipoOperacionCajaChica = 'INGRESO';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divMontoEntrega").hide();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divMoneda").show();
            toastr.success(null, 'INGRESO');
        }

        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaEnvio) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaEnvio;
            data.nombreTipoOperacionCajaChica = 'ENVÍO';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divMontoEntrega").hide();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divMoneda").show();
            toastr.success(null, 'ENVÍO');
        }

        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaPago) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaPago;
            data.nombreTipoOperacionCajaChica = 'PAGO';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divMontoEntrega").hide();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divMoneda").show();
            toastr.success(null, 'PAGO');
        }

        if (idTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaGasto) {
            data.flagValorTipoOperacionCajaChica = data.valores.TipoOperacionCajaChicaOtras.TipoOperacionCajaChicaGasto;
            data.nombreTipoOperacionCajaChica = 'GASTO';
            $("#divComentario").show();
            $("#divMonto").show();
            $("#divRegistrarOperacionCajaChica").show();
            $("#divMontoEntrega").hide();
            $("#divPagaCon").hide();
            $("#divMontoVuelto").hide();
            $("#divMoneda").show();
            toastr.success(null, 'GASTO');
        }

    }

    function click_CompraDolar() {
        configMostrarOcultarElementos(data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraDolar);
    }
    function click_VentaDolar() {
        configMostrarOcultarElementos(data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaDolar);
    }
    function click_CompraEuro() {
        configMostrarOcultarElementos(data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraEuro);
    }
    function click_VentaEuro() {
        configMostrarOcultarElementos(data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaEuro);
    }
    function click_DolAEuro() {
        configMostrarOcultarElementos(data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaDolAEuro);
    }
    function click_EuroADol() {
        configMostrarOcultarElementos(data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaEuroADol);
    }


    function calcularOperacionCajaChica() {
        var monto = ForceDecimalOnly($("#txtMonto"));
        var TipoCambioCompraDolar = parseFloat(document.getElementById("txtTCCompraDolar").value);
        var TipoCambioVentaDolar = parseFloat(document.getElementById("txtTCVentaDolar").value);
        var TipoCambioCompraEuro = parseFloat(document.getElementById("txtTCCompraEuro").value);
        var TipoCambioVentaEuro = parseFloat(document.getElementById("txtTCVentaEuro").value);
        var Vuelto = ''

        if (data.flagValorTipoOperacionCajaChica > 0) {
            // Dólares y Euros
            // Dólares a Euros
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaDolAEuro) {
                var resultadoOperacionCajaChica1 = parseFloat(monto * TipoCambioCompraDolar).toFixed(1);
                var resultadoOperacionCajaChica2 = parseFloat(resultadoOperacionCajaChica1 / TipoCambioVentaEuro).toFixed(1);
                document.getElementById("txtMontoEntrega").value = resultadoOperacionCajaChica2;
                document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (€):';
            }
            // Euros a Dólares
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaEuroADol) {
                var resultadoOperacionCajaChica1 = parseFloat(monto * TipoCambioCompraEuro).toFixed(1)
                var resultadoOperacionCajaChica2 = parseFloat(resultadoOperacionCajaChica1 / TipoCambioVentaDolar).toFixed(1);
                document.getElementById("txtMontoEntrega").value = resultadoOperacionCajaChica2;
                document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar ($):';
            }

            // Dólares 
            // Compra
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraDolar) {
                document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraDolar).toFixed(1)
                document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (S/.):';
            }
            // Venta
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaDolar) {
                document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioVentaDolar).toFixed(1)
                document.getElementById('lblMontoIngreso').innerHTML = 'Monto a pagar ($):';
            }

            // Euros
            // Compra
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraEuro) {
                document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioCompraEuro).toFixed(1)
                document.getElementById('lblMontoIngreso').innerHTML = 'Monto a entregar (S/.):';
            }
            // Venta
            if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaEuro) {
                document.getElementById("txtMontoEntrega").value = parseFloat(monto * TipoCambioVentaEuro).toFixed(1)
                document.getElementById('lblMontoIngreso').innerHTML = 'Monto a pagar (€):';
            }
        }
    }

    function validarGuardarOperacionCajaChica() {
        var TipoOperacionCajaChica = $("#cboTipoOperacionCajaChica").val();
        var MontoIngreso = $("#txtMonto").val();
        var Moneda = $("#cboMoneda").val();

        var CajaChicaActualSoles = $("#txtCajaChicaActualSoles").val();
        var CajaChicaActualDolares = $("#txtCajaChicaActualDolares").val();
        var CajaChicaActualEuros = $("#txtCajaChicaActualEuros").val();
        if (CajaChicaActualSoles < 1 || CajaChicaActualDolares < 1 || CajaChicaActualEuros < 1) {
            toastr.error('Debe configurar su CajaChica antes de ingresar alguna operación', 'Error');
            limpiarFormulario();
            return false;
        }

        if (data.flagValorTipoOperacionCajaChica < 1) {
            toastr.error('Debe seleccionar un tipo de operación', 'Error');
            limpiarFormulario();
            return false;
        }

        if ($.isNumeric(MontoIngreso) == false) {
            toastr.error('Debe ingresar un monto válido', 'Error');
            limpiarFormulario();
            return false;
        }
        if (TipoOperacionCajaChica != '0') {
            if (Moneda == '0') {
                toastr.error('Debe seleccionar moneda', 'Error');
                return false;
            }
        }
        return true;
    };

    function guardarOperacionCajaChica() {
        if (validarGuardarOperacionCajaChica()) {
            var ope = {};
            ope.MontoIngreso = document.getElementById("txtMonto").value;
            ope.Comentario = document.getElementById("txtComentario").value;
            if (parseInt(document.getElementById("cboTipoOperacionCajaChica").value) == 0) {// OperacionCajaChicaes de compra y venta
                ope.TipoOperacionCajaChica = data.flagValorTipoOperacionCajaChica;
                ope.Moneda = 0;
                ope.MontoSalida = document.getElementById("txtMontoEntrega").value;
                if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraDolar)
                    ope.TipoCambio = document.getElementById("txtTCCompraDolar").value;
                if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaDolar)
                    ope.TipoCambio = document.getElementById("txtTCVentaDolar").value;
                if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaCompraEuro)
                    ope.TipoCambio = document.getElementById("txtTCCompraEuro").value;
                if (data.flagValorTipoOperacionCajaChica == data.valores.TipoOperacionCajaChicaCV.TipoOperacionCajaChicaVentaEuro)
                    ope.TipoCambio = document.getElementById("txtTCVentaEuro").value;
            } else { // OperacionCajaChicaes generales		
                ope.TipoOperacionCajaChica = parseInt(document.getElementById("cboTipoOperacionCajaChica").value);
                ope.Moneda = document.getElementById("cboMoneda").value;
                ope.MontoSalida = 0;
            }
            $.ajax({
                type: "POST",
                url: data.urlGuardarOperacionCajaChica,
                data: '{ope: ' + JSON.stringify(ope) + '}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.Code == 1)
                        swal({ title: data.nombreTipoOperacionCajaChica, text: "Se guardó la operación con éxito.", type: "success" });
                    configMostrarOcultarElementos(0);
                    limpiarFormulario();
                    obtenerConfCajaChica();
                    document.getElementById("cboTipoOperacionCajaChica").value = "0";
                },
                error: function () {
                    toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                    ocultarLoader();
                }
            });
        }
    };

    function limpiarFormulario() {
        document.getElementById("cboMoneda").value = "0";
        document.getElementById("txtMonto").value = "";
        document.getElementById("txtPagaCon").value = "";
        document.getElementById("txtMontoEntrega").value = "";
        document.getElementById("txtVuelto").value = "";
        document.getElementById("txtComentario").value = "";
        data.flagValorTipoOperacionCajaChica = 0;
    }

    function ForceDecimalOnly($control) {
        //var $control = $("#txtMonto");
        $control.on("input", function (evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9\.]/g, ''));
            if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
                evt.preventDefault();
            }
        });
        var valor = parseFloat($control.val()).toFixed(2);
        if ($.isNumeric(valor)) { $control.val(valor) }
        return $control.val();
    }


    function changeTipoOperacionCajaChica() {
        var idTipoOperacionCajaChica = $("#cboTipoOperacionCajaChica").val();
        if (idTipoOperacionCajaChica == "0") {
            configMostrarOcultarElementos(0);
        }
        else {
            if (idTipoOperacionCajaChica == "7")
                configMostrarOcultarElementos(7);
            if (idTipoOperacionCajaChica == "8")
                configMostrarOcultarElementos(8);
            if (idTipoOperacionCajaChica == "9")
                configMostrarOcultarElementos(9);
            if (idTipoOperacionCajaChica == "10")
                configMostrarOcultarElementos(10);
        }
    }

    function cargaInicial() {
        $.ajax({
            type: "POST",
            url: data.urlCargaInicial,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (d) {
                var lista = d.lstCargaInicial;
                $("#cboTipoOperacionCajaChica").append('<option value="0" > -- Seleccione -- </option>');
                $("#cboMoneda").append('<option value="0" > -- Seleccione -- </option>');
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].IdTabla === data.valores.TblTipoOperacionCajaChica && (lista[i].ValorItem == "7" || lista[i].ValorItem == "8" || lista[i].ValorItem == "9" || lista[i].ValorItem == "10"))
                        $("#cboTipoOperacionCajaChica").append('<option value=' + lista[i].ValorItem + '>' + lista[i].NombreItem + '</option>');
                    if (lista[i].IdTabla === data.valores.TblMoneda) {
                        $("#cboMoneda").append('<option value=' + lista[i].ValorItem + '>' + lista[i].NombreItem + '</option>');
                    }
                }
            },
            error: function (ex) {
                alert(ex.responseText);
                //ocultarLoader();
            }
        });
    }

    //funcion de inicio
    init();

    return {
        calcularOperacionCajaChica: calcularOperacionCajaChica,
        obtenerConfCajaChica: obtenerConfCajaChica,
        ObtenerGananaciaActual: ObtenerGananaciaActual
    }

})(window, document);