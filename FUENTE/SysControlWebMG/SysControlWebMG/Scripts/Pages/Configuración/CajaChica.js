var app_CajaChica = (function (win, doc) {

    const data = {
        urlObtenerConfCajaChica: '/OperacionCajaChica/ObtenerConfCajaChica',
        urlObtenerUltimaConfCajaChica: '/CajaChica/ObtenerUltimaConfCajaChica',
        urlGuardarConf: '/CajaChica/GuardarConfiguracion',
        valores: {
            IdSoles: "1",
            IdDolares: "2",
            IdEuros: "1",
            TipoOperacionCompra: "1",
            TipoOperacionVenta: "2",
            TblTipoOperacion: 1,
            TblMoneda: 2
        }
    }

    function init() {
        obtenerConfCajaChica();
        document.getElementById("txtCajaChicaActualSoles").addEventListener("blur", FormatCajaChicaActualSoles);
        document.getElementById("txtCajaChicaActualDolares").addEventListener("blur", FormatCajaChicaActualDolares);
        document.getElementById("txtCajaChicaActualEuros").addEventListener("blur", FormatCajaChicaActualEuros);
        document.getElementById("txtTCCompraDolar").addEventListener("blur", FormatTCCompraDolar);
        document.getElementById("txtTCCompraDolarReferencial").addEventListener("blur", FormatTCCompraDolarReferencial);
        document.getElementById("txtTCVentaDolar").addEventListener("blur", FormatTCVentaDolar);
        document.getElementById("txtTCCompraEuro").addEventListener("blur", FormatTCCompraEuro);
        document.getElementById("txtTCVentaEuro").addEventListener("blur", FormatTCVentaEuro);
        document.getElementById("btnGuardarConf").addEventListener("click", guardarConfiguracion);
        document.getElementById("btnActualizarConf").addEventListener("click", btnActualizarConf_Click);
        document.getElementById("btnLimpiarConf").addEventListener("click", limpiarFormulario);
    }

    function limpiarFormulario() {
        document.getElementById("txtCajaChicaActualSoles").value = "";
        document.getElementById("txtCajaChicaActualDolares").value = "";
        document.getElementById("txtCajaChicaActualEuros").value = "";
        document.getElementById("txtTCCompraDolar").value = "";
        document.getElementById("txtTCVentaDolar").value = "";
        document.getElementById("txtTCCompraEuro").value = "";
        document.getElementById("txtTCVentaEuro").value = "";
    }

    function validarDatosConfiguracion() {
        var CajaChicaActualSoles = $("#txtCajaChicaActualSoles").val();
        var CajaChicaActualDolares = $("#txtCajaChicaActualDolares").val();
        var CajaChicaActualEuros = $("#txtCajaChicaActualEuros").val();
        var TCCompraDolar = $("#txtTCCompraDolar").val();
        var TCCompraDolarReferencial = $("#txtTCCompraDolarReferencial").val();
        var TCVentaDolar = $("#txtTCVentaDolar").val();
        var TCCompraEuro = $("#txtTCCompraEuro").val();
        var TCVentaEuro = $("#txtTCVentaEuro").val();

        if (CajaChicaActualSoles == '') {
            toastr.error('Debe ingresar el monto de CajaChica en soles', 'Error');
            return false;
        }
        if (CajaChicaActualDolares == '') {
            toastr.error('Debe ingresar el monto de CajaChica en dólares', 'Error');
            return false;
        }
        if (CajaChicaActualEuros == '') {
            toastr.error('Debe ingresar el monto de CajaChica en euros', 'Error');
            return false;
        }
        if (TCCompraDolar == '') {
            toastr.error('Debe ingresar el tipo de cambio de compra en dólares', 'Error');
            return false;
        }
        if (TCCompraDolarReferencial == '') {
            toastr.error('Debe ingresar el tipo de cambio de compra referencial en dólares', 'Error');
            return false;
        }
        if (TCVentaDolar == '') {
            toastr.error('Debe ingresar el tipo de cambio de venta en dólares', 'Error');
            return false;
        }
        if (TCCompraEuro == '') {
            toastr.error('Debe ingresar el tipo de cambio de compra en euros', 'Error');
            return false;
        }
        if (TCVentaEuro == '') {
            toastr.error('Debe ingresar el tipo de cambio de venta en euros', 'Error');
            return false;
        }
        return true;
    };

    function btnActualizarConf_Click() {
        obtenerUltimaConfCajaChica();
    }

    function obtenerUltimaConfCajaChica() {
        //debugger;
        $.ajax({
            type: "POST",
            url: data.urlObtenerUltimaConfCajaChica,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (d) {
                if (d.lstConfCajaChica != null) {
                    document.getElementById("txtTCCompraDolar").value = d.lstConfCajaChica.TCCompraDolar.toFixed(3);
                    document.getElementById("txtTCCompraDolarReferencial").value = d.lstConfCajaChica.TCCompraDolarReferencial.toFixed(3);
                    document.getElementById("txtTCVentaDolar").value = d.lstConfCajaChica.TCVentaDolar.toFixed(3);
                    document.getElementById("txtTCCompraEuro").value = d.lstConfCajaChica.TCCompraEuro.toFixed(3);
                    document.getElementById("txtTCVentaEuro").value = d.lstConfCajaChica.TCVentaEuro.toFixed(3);
                    document.getElementById("txtCajaChicaActualSoles").value = d.lstConfCajaChica.CajaChicaActualSoles.toFixed(1);
                    document.getElementById("txtCajaChicaActualDolares").value = d.lstConfCajaChica.CajaChicaActualDolares.toFixed(1);
                    document.getElementById("txtCajaChicaActualEuros").value = d.lstConfCajaChica.CajaChicaActualEuros.toFixed(1);
                    swal({ title: "Valores Obtenidos!", text: "Se obtuvo los ultimos valores registrados en CajaChica y tipo de cambio.", type: "success", confirmButtonText: 'Aceptar' });
                }
                else {
                    toastr.error('Porfavor, configurar CajaChica!', 'Error')
                }
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
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
                        swal({ title: "Valores Obtenidos!", text: "Se obtuvo los ultimos valores registrados en CajaChica y tipo de cambio.", type: "success", confirmButtonText: 'Aceptar' });
                    } else {
                        if (d.lstConfCajaChica.CajaChicaActualSoles > 1)
                            document.getElementById("txtCajaChicaActualSoles").value = d.lstConfCajaChica.CajaChicaActualSoles.toFixed(3);
                        else
                            toastr.error('La CajaChica en soles no tiene monto ingresado.r', 'Error');

                        if (d.lstConfCajaChica.CajaChicaActualDolares > 1)
                            document.getElementById("txtCajaChicaActualDolares").value = d.lstConfCajaChica.CajaChicaActualDolares.toFixed(3);
                        else
                            toastr.error('La CajaChica en dólares no tiene monto ingresado.', 'Error');

                        if (d.lstConfCajaChica.CajaChicaActualEuros > 1)
                            document.getElementById("txtCajaChicaActualEuros").value = d.lstConfCajaChica.CajaChicaActualEuros.toFixed(3);
                        else
                            toastr.error('La CajaChica en euros no tiene monto ingresado.', 'Error');
                    }


                    //document.getElementById("txtCajaChicaActualDolares").value = d.lstConfCajaChica.CajaChicaActualDolares;
                    //document.getElementById("txtCajaChicaActualEuros").value = d.lstConfCajaChica.CajaChicaActualEuros;
                }
                else {
                    toastr.error('Porfavor, configurar CajaChica!', 'Error')
                }
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }

    function guardarConfiguracion() {
        if (validarDatosConfiguracion()) {
            swal({
                title: "¿Desea registrar la configuración de CajaChica?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Registrar",
                cancelButtonText: "Cancelar"
            },
                function (isConfirm) {
                    if (isConfirm) {
                        var confCajaChica = {};
                        confCajaChica.CajaChicaActualSoles = parseFloat($("#txtCajaChicaActualSoles").val()).toFixed(2);
                        confCajaChica.CajaChicaActualDolares = parseFloat($("#txtCajaChicaActualDolares").val()).toFixed(2);
                        confCajaChica.CajaChicaActualEuros = parseFloat($("#txtCajaChicaActualEuros").val()).toFixed(2);
                        confCajaChica.TCCompraDolar = parseFloat($("#txtTCCompraDolar").val()).toFixed(3);
                        confCajaChica.TCCompraDolarReferencial = parseFloat($("#txtTCCompraDolarReferencial").val()).toFixed(3);
                        confCajaChica.TCVentaDolar = parseFloat($("#txtTCVentaDolar").val()).toFixed(3);
                        confCajaChica.TCCompraEuro = parseFloat($("#txtTCCompraEuro").val()).toFixed(3);
                        confCajaChica.TCVentaEuro = parseFloat($("#txtTCVentaEuro").val()).toFixed(3);
                        confCajaChica.TipoOpeIU = "Insert";
                        $.ajax({
                            type: "POST",
                            url: data.urlGuardarConf,
                            data: '{confCaja: ' + JSON.stringify(confCajaChica) + '}',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (response) {
                                obtenerConfCajaChica();
                                toastr.success('Datos registrados correctamente!', 'Éxito');
                            },
                            error: function () {
                                toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                                ocultarLoader;
                            }
                        });
                    }
                }
            );
        }
    }


    function FormatCajaChicaActualSoles() {
        ForceDecimalOnly($("#txtCajaChicaActualSoles"), 1);
    }
    function FormatCajaChicaActualDolares() {
        ForceDecimalOnly($("#txtCajaChicaActualDolares"), 1);
    }
    function FormatCajaChicaActualEuros() {
        ForceDecimalOnly($("#txtCajaChicaActualEuros"), 1);
    }
    function FormatTCCompraDolar() {
        ForceDecimalOnly($("#txtTCCompraDolar"), 3);
    }
    function FormatTCCompraDolarReferencial() {
        ForceDecimalOnly($("#txtTCCompraDolarReferencial"), 3);
    }
    function FormatTCVentaDolar() {
        ForceDecimalOnly($("#txtTCVentaDolar"), 3);
    }
    function FormatTCCompraEuro() {
        ForceDecimalOnly($("#txtTCCompraEuro"), 3);
    }
    function FormatTCVentaEuro() {
        ForceDecimalOnly($("#txtTCVentaEuro"), 3);
    }

    function ForceDecimalOnly($control, num) {
        $control.on("input", function (evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9\.]/g, ''));
            if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
                evt.preventDefault();
            }
        });
        var valor = parseFloat($control.val()).toFixed(num);
        if ($.isNumeric(valor)) { $control.val(valor) }
        return $control.val();
    }

    //funcion de inicio
    init();

})(window, document);