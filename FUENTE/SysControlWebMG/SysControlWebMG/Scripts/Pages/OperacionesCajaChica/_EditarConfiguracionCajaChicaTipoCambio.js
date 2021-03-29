var app_EditarConfiguracionTipoCambio = (function (win, doc) {

    const data = {
        urlObtenerConfCajaChica: '/OperacionCajaChica/ObtenerConfCajaChica',
        urlGuardarConf: '/CajaChica/GuardarConfiguracion',
        valores: {
            Monedas: {
                IdSoles: "1",
                IdDolares: "2",
                IdEuros: "1"
            },
            TipoOperacionCompra: "1",
            TipoOperacionVenta: "2",
            TipoOperacionCV: {
                TipoOperacionCompraDolar: 1,
                TipoOperacionVentaDolar: 2,
                TipoOperacionCompraEuro: 3,
                TipoOperacionVentaEuro: 4
            },
            TipoOperacionOtras: {
                TipoOperacionIngreso: 5,
                TipoOperacionVentaEnvio: 6,
                TipoOperacionVentaPago: 7,
                TipoOperacionVentaGasto: 8
            },
            TblTipoOperacion: 1,
            TblMoneda: 2
        },
        flagValorTipoOperacion: 0
    }

    function init() {
        obtenerConfCajaChica();
        document.getElementById("btnEditarConfCajaChica").addEventListener("click", guardarConfCajaChica);
        document.getElementById("txtTCCompraDolar_ME").addEventListener("blur", FormatTCCompraDolar);
        document.getElementById("txtTCCompraDolarReferencial_ME").addEventListener("blur", FormatTCCompraDolarReferencial);
        document.getElementById("txtTCVentaDolar_ME").addEventListener("blur", FormatTCVentaDolar);
        document.getElementById("txtTCCompraEuro_ME").addEventListener("blur", FormatTCCompraEuro);
        document.getElementById("txtTCVentaEuro_ME").addEventListener("blur", FormatTCVentaEuro);
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
                    document.getElementById("txtTCCompraDolar_ME").value = d.lstConfCajaChica.TCCompraDolar.toFixed(3);
                    document.getElementById("txtTCCompraDolarReferencial_ME").value = d.lstConfCajaChica.TCCompraDolarReferencial.toFixed(3);
                    document.getElementById("txtTCVentaDolar_ME").value = d.lstConfCajaChica.TCVentaDolar.toFixed(3);
                    document.getElementById("txtTCCompraEuro_ME").value = d.lstConfCajaChica.TCCompraEuro.toFixed(3);
                    document.getElementById("txtTCVentaEuro_ME").value = d.lstConfCajaChica.TCVentaEuro.toFixed(3);
                    document.getElementById("txtCajaChicaActualSoles_ME").value = d.lstConfCajaChica.CajaChicaActualSoles.toFixed(1);
                    document.getElementById("txtCajaChicaActualDolares_ME").value = d.lstConfCajaChica.CajaChicaActualDolares.toFixed(1);
                    document.getElementById("txtCajaChicaActualEuros_ME").value = d.lstConfCajaChica.CajaChicaActualEuros.toFixed(1);
                }
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }

    function validarDatosConfiguracion() {
        var TCCompraDolar = $("#txtTCCompraDolar").val();
        var TCVentaDolar = $("#txtTCVentaDolar").val();
        var TCCompraEuro = $("#txtTCCompraEuro").val();
        var TCVentaEuro = $("#txtTCVentaEuro").val();
        if (TCCompraDolar == '') {
            toastr.error('Debe ingresar el tipo de cambio de compra en dólares', 'Error');
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

    function FormatTCCompraDolar() {
        ForceDecimalOnly($("#txtTCCompraDolar_ME"), 3);
    }
    function FormatTCCompraDolarReferencial() {
        ForceDecimalOnly($("#txtTCCompraDolarReferencial_ME"), 3);
    }
    function FormatTCVentaDolar() {
        ForceDecimalOnly($("#txtTCVentaDolar_ME"), 3);
    }
    function FormatTCCompraEuro() {
        ForceDecimalOnly($("#txtTCCompraEuro_ME"), 3);
    }
    function FormatTCVentaEuro() {
        ForceDecimalOnly($("#txtTCVentaEuro_ME"), 3);
    }
    function guardarConfCajaChica() {

        if (validarDatosConfiguracion()) {
            var confCaja = {};
            confCaja.TCCompraDolar = parseFloat($("#txtTCCompraDolar_ME").val()).toFixed(3);
            confCaja.TCCompraDolarReferencial = parseFloat($("#txtTCCompraDolarReferencial_ME").val()).toFixed(3);
            confCaja.TCVentaDolar = parseFloat($("#txtTCVentaDolar_ME").val()).toFixed(3);
            confCaja.TCCompraEuro = parseFloat($("#txtTCCompraEuro_ME").val()).toFixed(3);
            confCaja.TCVentaEuro = parseFloat($("#txtTCVentaEuro_ME").val()).toFixed(3);
            confCaja.TipoOpeIU = "Editar";
            $.ajax({
                type: "POST",
                url: data.urlGuardarConf,
                data: '{confCaja: ' + JSON.stringify(confCaja) + '}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    app_OperacionCajaChica.obtenerConfCajaChica();
                    $('#modalEditarConfCajaChica').modal('hide');
                    toastr.success('Se realizó la edición con éxito..!')
                },
                error: function () {
                    toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                    ocultarLoader;
                }
            });
        }
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
        if (isNaN(valor)) { $control.val("") }
    }

    //funcion de inicio
    init();
    return {
        obtenerConfCajaChica: obtenerConfCajaChica,
        init: init
    }


})(window, document);