var app_CuadreCajaChica = (function (win, doc) {

    const data = {
        urlObtenerConfCajaChica: '/OperacionCajaChica/ObtenerConfCajaChica',
        urlCargaInicial: '/OperacionCajaChica/CargaInicial',
        urlGuardarCuadreCajaChica: '/OperacionCajaChica/GuardarCuadreCajaChica',
        CantidadxBilletexMoneda: {
            CantidadxBilletexSoles: "",
            CantidadxBilletexDolares: "",
            CantidadxBilletexEuros: ""
        }
    }

    function init() {
        cargaInicial();
        obtenerConfCajaChica();
        limpiarTbl();
        document.getElementById("TxtDeteriorados").addEventListener("keypress", FormatNumeros, false);
        document.getElementById("T_500").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_200").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_100").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_50").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_20").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_10").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_5").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_2").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_1").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_05").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_02").addEventListener("blur", FozarDecimales, false);
        document.getElementById("T_01").addEventListener("blur", FozarDecimales, false);

        document.getElementById("btnLimpiarCajaChicaSolesManual").addEventListener("click", borrarTxt);
        document.getElementById("btnLimpiarCajaChicaDolaresManual").addEventListener("click", borrarTxt);
        document.getElementById("btnLimpiarCajaChicaEurosManual").addEventListener("click", borrarTxt);
        document.getElementById("cboMoneda").addEventListener("change", changeCboMoneda);
        document.getElementById("btnCalcular").addEventListener("click", calcularCajaxMoneda);
        document.getElementById("btnGuardarCuadreCajaChica").addEventListener("click", guardarCuadreCajaChica);        
    }

    function validarGuardarCuadreCajaChica() {
        var cajaSolesCuadre = $("#txtCajaChicaSolesManual").val();
        var cajaDolaresCuadre = $("#txtCajaChicaDolaresManual").val();
        var cajaEurosCuadre = $("#txtCajaChicaEurosManual").val();
        if (cajaSolesCuadre == "") {
            toastr.error('Debe ingresar el monto en soles.', 'Error');
            return false;
        }
        if (cajaDolaresCuadre == "") {
            toastr.error('Debe ingresar el monto en dólares.', 'Error');
            return false;
        }
        if (cajaEurosCuadre == "") {
            toastr.error('Debe ingresar el monto en euros.', 'Error');
            return false;
        }
        return true;
    };

    function guardarCuadreCajaChica() {
        if (validarGuardarCuadreCajaChica()) {
            swal({
                title: "¿Desea registrar el cuadre?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Registrar",
                cancelButtonText: "Cancelar"
            },
                function (isConfirm) {
                    if (isConfirm) {
                        var cuadre = {
                            CantidadxBilletexMoneda: JSON.stringify(data.CantidadxBilletexMoneda),
                            NumeroBilletesDeteriorados: _parseInt($("#TxtDeteriorados").val()),
                            CajaChicaSolesSistema: _parseFloat($("#txtCajaChicaActualSoles").val()),
                            CajaChicaDolaresSistema: _parseFloat($("#txtCajaChicaActualDolares").val()),
                            CajaEChicaurosSistema: _parseFloat($("#txtCajaChicaActualEuros").val()),
                            CajaChicaSolesCuadre: _parseFloat($("#txtCajaChicaSolesManual").val()),
                            CajaChicaDolaresCuadre: _parseFloat($("#txtCajaChicaDolaresManual").val()),
                            CajaChicaEurosCuadre: _parseFloat($("#txtCajaChicaEurosManual").val()),
                            Comentario: $("#txtComentario").val()
                        }
                        $.ajax({
                            type: "POST",
                            url: data.urlGuardarCuadreCajaChica,
                            data: '{cuadre: ' + JSON.stringify(cuadre) + '}',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (d) {
                                toastr.success("Se registró con éxito");
                                setTimeout(location.reload(), 2000);
                                //swal({ title: "Operación Registrada!", text: "Se guardó la operación con éxito.", type: "success" });
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

    function calcularCajaxMoneda() {
        var moneda = parseInt(document.getElementById("cboMoneda").value);
        var CajaChicaSolesSistema = parseInt(document.getElementById("txtCajaChicaActualSoles").value);
        var CajaChicaDolaresSistema = parseInt(document.getElementById("txtCajaChicaActualDolares").value);
        var CajaEChicaurosSistema = parseInt(document.getElementById("txtCajaChicaActualEuros").value);
        if (moneda > 0) {
            if (moneda === 1) {
                const T_200 = parseFloat($("#T_200").val()).toFixed(2);
                const T_100 = parseFloat($("#T_100").val()).toFixed(2);
                const T_50 = parseFloat($("#T_50").val()).toFixed(2);
                const T_20 = parseFloat($("#T_20").val()).toFixed(2);
                const T_10 = parseFloat($("#T_10").val()).toFixed(2);
                const T_5 = parseFloat($("#T_5").val()).toFixed(2);
                const T_2 = parseFloat($("#T_2").val()).toFixed(2);
                const T_1 = parseFloat($("#T_1").val()).toFixed(2);
                const T_05 = parseFloat($("#T_05").val()).toFixed(2);
                const T_02 = parseFloat($("#T_02").val()).toFixed(2);
                const T_01 = parseFloat($("#T_01").val()).toFixed(2);
                var sumaTotal = _parseFloat(T_200) + _parseFloat(T_100) + _parseFloat(T_50) + _parseFloat(T_20)  + _parseFloat(T_10)  + _parseFloat(T_5)  + _parseFloat(T_2) + _parseFloat(T_1) + _parseFloat(T_05) + _parseFloat(T_02) + _parseFloat(T_01) ;
                document.getElementById("txtCajaChicaSolesManual").value = parseFloat(sumaTotal).toFixed(2);
                if (CajaChicaSolesSistema > 0) {
                    var total = (CajaChicaSolesSistema) - (sumaTotal);

                }
                if (CajaChicaSolesSistema < 0) {
                    var total = ((CajaChicaSolesSistema) + (sumaTotal));

                }           
                document.getElementById("txtTotalSoles").value = parseFloat(total).toFixed(2);
                const objCantidadxBilleteSoles = {
                    Billete_200: T_200,
                    Billete_100: T_100,
                    Billete_50: T_50,
                    Billete_20: T_20,
                    Billete_10: T_10,
                    Billete_5: T_5,
                    Billete_2: T_2,
                    Billete_1: T_1,
                    Billete_05: T_05,
                    Billete_02: T_02,
                    Billete_01: T_01
                }
                data.CantidadxBilletexMoneda.CantidadxBilletexSoles = objCantidadxBilleteSoles;
            }
            if (moneda === 2) {
                const T_100 = parseFloat($("#T_100").val()).toFixed(2);
                const T_50 = parseFloat($("#T_50").val()).toFixed(2);
                const T_20 = parseFloat($("#T_20").val()).toFixed(2);
                const T_10 = parseFloat($("#T_10").val()).toFixed(2);
                const T_5 = parseFloat($("#T_5").val()).toFixed(2);
                const T_1 = parseFloat($("#T_1").val()).toFixed(2);
                var sumaTotal = _parseFloat(T_100) + _parseFloat(T_50) + _parseFloat(T_20) + _parseFloat(T_10) + _parseFloat(T_5)  + _parseFloat(T_1);
                document.getElementById("txtCajaChicaDolaresManual").value = parseFloat(sumaTotal).toFixed(2);
                if (CajaChicaDolaresSistema > 0) {
                    var total = (CajaChicaDolaresSistema) - (sumaTotal);

                }
                if (CajaChicaDolaresSistema < 0) {
                    var total = ((CajaChicaDolaresSistema) + (sumaTotal));

                }
                document.getElementById("txtTotalDolares").value = parseFloat(total).toFixed(2);
                const objCantidadxBilleteDolares = {
                    Billete_100: T_100,
                    Billete_50: T_50,
                    Billete_20: T_20,
                    Billete_10: T_10,
                    Billete_5: T_5,
                    Billete_1: T_1,
                }
                data.CantidadxBilletexMoneda.CantidadxBilletexDolares = objCantidadxBilleteDolares;
            }
            if (moneda === 3) {
                const T_500 = parseFloat($("#T_500").val()).toFixed(2);
                const T_200 = parseFloat($("#T_200").val()).toFixed(2);
                const T_100 = parseFloat($("#T_100").val()).toFixed(2);
                const T_50 = parseFloat($("#T_50").val()).toFixed(2);
                const T_20 = parseFloat($("#T_20").val()).toFixed(2);
                const T_10 = parseFloat($("#T_10").val()).toFixed(2);
                const T_5 = parseFloat($("#T_5").val()).toFixed(2);
                var sumaTotal = _parseFloat(T_500) + _parseFloat(T_200) + _parseFloat(T_100) + _parseFloat(T_50) + _parseFloat(T_20) + _parseFloat(T_10) + _parseFloat(T_5);
                document.getElementById("txtCajaChicaEurosManual").value = parseFloat(sumaTotal).toFixed(2);
                if (CajaEChicaurosSistema > 0) {
                    var total = (CajaEChicaurosSistema) - (sumaTotal);

                }
                if (CajaEChicaurosSistema < 0) {
                    var total = ((CajaEChicaurosSistema) + (sumaTotal));

                }
                document.getElementById("txtTotalEuros").value = parseFloat(total).toFixed(2);
                const objCantidadxBilleteEuros = {
                    Billete_500: T_500,
                    Billete_200: T_200,
                    Billete_100: T_100,
                    Billete_50: T_50,
                    Billete_20: T_20,
                    Billete_10: T_10,
                    Billete_5: T_5,
                }
                data.CantidadxBilletexMoneda.CantidadxBilletexEuros = objCantidadxBilleteEuros;
            }
            limpiarTbl();
        } else {
            limpiarTbl();
        }
    }
    function _parseFloat(_valor) {
        if (!_isStringEmpty(_valor)) {
            let result = _valor.toString().trim().replace(/,/g, "");
            if (result.length > 0) {
                if (!isNaN(result)) {
                    return parseFloat(result);
                }
            }
        }
        return 0.0;
    }
    function _parseInt(_valor) {
        if (!_isStringEmpty(_valor)) {
            let result = _valor.toString().trim().replace(/,/g, "");
            if (result.length > 0) {
                if (!isNaN(result)) {
                    return parseInt(result);
                }
            }
        }
        return 0;
    }
    const _isStringEmpty = (campo) => { return (campo === null || typeof campo === 'undefined' || campo.toString().trim().length === 0); };

    function changeCboMoneda() {
        var moneda = parseInt(this.value);
        if (moneda > 0) {
            if (moneda === 1) {
                $("#T_500").prop("disabled", true);
                $("#T_200").prop("disabled", false);
                $("#T_100").prop("disabled", false);
                $("#T_50").prop("disabled", false);
                $("#T_20").prop("disabled", false);
                $("#T_10").prop("disabled", false);
                $("#T_5").prop("disabled", false);
                $("#T_2").prop("disabled", false);
                $("#T_1").prop("disabled", false);
                $("#T_05").prop("disabled", false);
                $("#T_02").prop("disabled", false);
                $("#T_01").prop("disabled", false);
            }
            if (moneda === 2) {
                $("#T_500").prop("disabled", true);
                $("#T_200").prop("disabled", true);
                $("#T_100").prop("disabled", false);
                $("#T_50").prop("disabled", false);
                $("#T_20").prop("disabled", false);
                $("#T_10").prop("disabled", false);
                $("#T_5").prop("disabled", false);
                $("#T_2").prop("disabled", true);
                $("#T_1").prop("disabled", false);
                $("#T_05").prop("disabled", true);
                $("#T_02").prop("disabled", true);
                $("#T_01").prop("disabled", true);
            }
            if (moneda === 3) {
                $("#T_500").prop("disabled", false);
                $("#T_200").prop("disabled", false);
                $("#T_100").prop("disabled", false);
                $("#T_50").prop("disabled", false);
                $("#T_20").prop("disabled", false);
                $("#T_10").prop("disabled", false);
                $("#T_5").prop("disabled", false);
                $("#T_2").prop("disabled", true);
                $("#T_1").prop("disabled", true);
                $("#T_05").prop("disabled", true);
                $("#T_02").prop("disabled", true);
                $("#T_01").prop("disabled", true);
            }
            $("#T_500").val("0");
            $("#T_200").val("0");
            $("#T_100").val("0");
            $("#T_50").val("0");
            $("#T_20").val("0");
            $("#T_10").val("0");
            $("#T_5").val("0");
            $("#T_2").val("0");
            $("#T_1").val("0");
            $("#T_05").val("0");
            $("#T_02").val("0");
            $("#T_01").val("0");
        } else {
            limpiarTbl();
        }
    }

    function limpiarTbl() {
        $("#T_500").prop("disabled", true);
        $("#T_200").prop("disabled", true);
        $("#T_100").prop("disabled", true);
        $("#T_50").prop("disabled", true);
        $("#T_20").prop("disabled", true);
        $("#T_10").prop("disabled", true);
        $("#T_5").prop("disabled", true);
        $("#T_2").prop("disabled", true);
        $("#T_1").prop("disabled", true);
        $("#T_05").prop("disabled", true);
        $("#T_02").prop("disabled", true);
        $("#T_01").prop("disabled", true);
        $("#T_500").val("0");
        $("#T_200").val("0");
        $("#T_100").val("0");
        $("#T_50").val("0");
        $("#T_20").val("0");
        $("#T_10").val("0");
        $("#T_5").val("0");
        $("#T_2").val("0");
        $("#T_1").val("0");
        $("#T_05").val("0");
        $("#T_02").val("0");
        $("#T_01").val("0");
        $("#cboMoneda").val("0");
    }

    function borrarTxt() {
        if (this.id === 'btnLimpiarCajaChicaSolesManual') {
            document.getElementById("txtCajaChicaSolesManual").value = "";
            document.getElementById("txtTotalSoles").value = "";
            data.CantidadxBilletexMoneda.CantidadxBilletexSoles = "";
        }
        if (this.id === 'btnLimpiarCajaChicaDolaresManual') {
            document.getElementById("txtCajaChicaDolaresManual").value = "";
            document.getElementById("txtTotalDolares").value = "";
            data.CantidadxBilletexMoneda.CantidadxBilletexDolares = "";
        }
        if (this.id === 'btnLimpiarCajaChicaEurosManual') {
            document.getElementById("txtCajaChicaEurosManual").value = "";
            document.getElementById("txtTotalEuros").value = "";
            data.CantidadxBilletexMoneda.CantidadxBilletexEuros = "";
        }
    }
    
    function obtenerConfCajaChica() {
        $.ajax({
            type: "POST",
            url: data.urlObtenerConfCajaChica,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (d) {
                if (d.lstConfCajaChica != null) {
                    document.getElementById("txtCajaChicaActualSoles").value = d.lstConfCajaChica.CajaChicaActualSoles.toFixed(1);
                    document.getElementById("txtCajaChicaActualDolares").value = d.lstConfCajaChica.CajaChicaActualDolares.toFixed(1);
                    document.getElementById("txtCajaChicaActualEuros").value = d.lstConfCajaChica.CajaChicaActualEuros.toFixed(1);
                    toastr.success(null, 'Se obtuvo los ultimos valores de las CajaChicas.');
                } else {
                    toastr.error('Debe configurar su CajaChica antes de ingresar alguna operación', 'Error');
                }
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
    function cargaInicial() {
        $.ajax({
            type: "POST",
            url: data.urlCargaInicial,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (d) {
                var lista = d.lstCargaInicial;
                $("#cboMoneda").append('<option value="0" > -- Seleccione -- </option>');
                for (var i = 0; i < lista.length; i++) {
                    if (lista[i].IdTabla === 2) {
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

    function FormatNumeros(e) {
        var key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
    }

    function FozarDecimales() {
        ForceDecimalOnly($(`#${this.id}`), 2);
    }

    function ForceDecimalOnly($control, cantDecimales) {
        $control.on("input", function (evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9\.]/g, ''));
            if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
                evt.preventDefault();
            }
        });
        var valor = parseFloat($control.val()).toFixed(cantDecimales);
        if ($.isNumeric(valor)) { $control.val(valor) }
        return $control.val();
    }
    //funcion de inicio
    init();

})(window, document);