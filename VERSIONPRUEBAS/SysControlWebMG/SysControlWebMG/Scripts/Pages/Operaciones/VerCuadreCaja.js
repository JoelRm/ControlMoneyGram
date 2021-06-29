var app_CuadreCaja = (function (win, doc) {

    const data = {
        urlObtenerConfCaja : '/Operacion/ObtenerConfCaja',
        urlCargaInicial: '/Operacion/CargaInicial',
        urlGenerarReporteOperacionesCaja : '/Operacion/ObtenerCuadreCaja',
        CantidadxBilletexMoneda: {
            CantidadxBilletexSoles: "",
            CantidadxBilletexDolares: "",
            CantidadxBilletexEuros: ""
        }
    }

    function init() {
        cargaInicial();
        formatoRangoFecha();
        document.getElementById("btnBuscarCuadreCaja").addEventListener("click", verCuadreCaja);
        document.getElementById("cboMoneda").addEventListener("change", changeCboMoneda);
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
        $('#fecha').val(ano + '-' + mes + '-' + dia);
    }
    function verCuadreCaja() {
        limpiarTablas();
        limpiarDatos();
        mostrarLoader();
        var objFiltro = {};
        objFiltro.Fecha = $("#fecha").val();
        objFiltro.Usuario = $("#cboUsuario").val();
        $.ajax({
            type: "POST",
            url: data.urlGenerarReporteOperacionesCaja,
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {


                if (data.lstCuadreCaja.length > 0) {
                    $("#txtCajaActualSoles").val(data.lstCuadreCaja[0].CajaSolesSistema);
                    $("#txtCajaSolesManual").val(data.lstCuadreCaja[0].CajaSolesCuadre);

                    if ((data.lstCuadreCaja[0].CajaSolesSistema) > 0) {
                        ($("#txtTotalSoles")).val(data.lstCuadreCaja[0].CajaSolesSistema - data.lstCuadreCaja[0].CajaSolesCuadre);
                    }
                    else {
                        ($("#txtTotalSoles")).val(data.lstCuadreCaja[0].CajaSolesSistema + data.lstCuadreCaja[0].CajaSolesCuadre)
                    }
                    $("#txtCajaActualDolares").val(data.lstCuadreCaja[0].CajaDolaresSistema);
                    $("#txtCajaDolaresManual").val(data.lstCuadreCaja[0].CajaDolaresCuadre);

                    if ((data.lstCuadreCaja[0].CajaDolaresSistema) > 0) {
                        ($("#txtTotalDolares")).val(data.lstCuadreCaja[0].CajaDolaresSistema - data.lstCuadreCaja[0].CajaDolaresCuadre);
                    }
                    else {
                        ($("#txtTotalDolares")).val(data.lstCuadreCaja[0].CajaDolaresSistema + data.lstCuadreCaja[0].CajaDolaresCuadre);
                    }
                    $("#txtCajaActualEuros").val(data.lstCuadreCaja [0].CajaEurosSistema);
                    $("#txtCajaEurosManual").val(data.lstCuadreCaja [0].CajaEurosCuadre);
                   
                    if ((data.lstCuadreCaja[0].CajaEurosSistema) > 0) {
                        ($("#txtTotalEuros")).val(data.lstCuadreCaja[0].CajaEurosSistema - data.lstCuadreCaja[0].CajaEurosCuadre);
                    }
                    else {
                        ($("#txtTotalEuros")).val(data.lstCuadreCaja[0].CajaEurosSistema + data.lstCuadreCaja[0].CajaEurosCuadre);
                    }

                    var ArrDatosCuadre = JSON.parse(data.lstCuadreCaja [0].CantidadxBilletexMoneda);

                    $("#Hid_Soles_Billetesx200").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_200);
                    $("#Hid_Soles_Billetesx100").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_100);
                    $("#Hid_Soles_Billetesx50").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_50);
                    $("#Hid_Soles_Billetesx20").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_20);
                    $("#Hid_Soles_Billetesx10").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_10);
                    $("#Hid_Soles_Billetesx5").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_5);
                    $("#Hid_Soles_Billetesx2").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_2);
                    $("#Hid_Soles_Billetesx1").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_1);
                    $("#Hid_Soles_Billetesx05").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_05);
                    $("#Hid_Soles_Billetesx02").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_02);
                    $("#Hid_Soles_Billetesx01").val(ArrDatosCuadre.CantidadxBilletexSoles.Billete_01);

                    $("#Hid_Dolares_Billetesx100").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_100);
                    $("#Hid_Dolares_Billetesx50").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_50);
                    $("#Hid_Dolares_Billetesx20").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_20);
                    $("#Hid_Dolares_Billetesx10").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_10);
                    $("#Hid_Dolares_Billetesx5").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_5);
                    $("#Hid_Dolares_Billetesx1").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_1);

                    $("#Hid_Euros_Billetesx500").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_500);
                    $("#Hid_Euros_Billetesx200").val(ArrDatosCuadre.CantidadxBilletexDolares.Billete_200);
                    $("#Hid_Euros_Billetesx100").val(ArrDatosCuadre.CantidadxBilletexEuros.Billete_100);
                    $("#Hid_Euros_Billetesx50").val(ArrDatosCuadre.CantidadxBilletexEuros.Billete_50);
                    $("#Hid_Euros_Billetesx20").val(ArrDatosCuadre.CantidadxBilletexEuros.Billete_20);
                    $("#Hid_Euros_Billetesx10").val(ArrDatosCuadre.CantidadxBilletexEuros.Billete_10);
                    $("#Hid_Euros_Billetesx5").val(ArrDatosCuadre.CantidadxBilletexEuros.Billete_5);


                    $("#TxtDeteriorados").val(data.lstCuadreCaja[0].NumeroBilletesDeteriorados);
                    $("#txtComentario").val(data.lstCuadreCaja[0].Comentario);

                    toastr.success('Se obtuvo los registros exitosamente');

                } else {
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
    };
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
        limpiarDatos();
        var moneda = parseInt(this.value);
        if (moneda > 0) {
            if (moneda == 1) {
                var valor200 = $("#Hid_Soles_Billetesx200").val();
                $("#T_200").val(valor200);
                var valor100 = $("#Hid_Soles_Billetesx100").val();
                $("#T_100").val(valor100);
                var valor50 = $("#Hid_Soles_Billetesx50").val();
                $("#T_50").val(valor50);
                var valor20 = $("#Hid_Soles_Billetesx20").val();
                $("#T_20").val(valor20);
                var valor10 = $("#Hid_Soles_Billetesx10").val();
                $("#T_10").val(valor10);
                var valor5 = $("#Hid_Soles_Billetesx5").val();
                $("#T_5").val(valor5);
                var valor2 = $("#Hid_Soles_Billetesx2").val();
                $("#T_2").val(valor2);
                var valor1 = $("#Hid_Soles_Billetesx1").val();
                $("#T_1").val(valor1);
                var valor05 = $("#Hid_Soles_Billetesx05").val();
                $("#T_05").val(valor05);
                var valor02 = $("#Hid_Soles_Billetesx02").val();
                $("#T_02").val(valor02);
                var valor01 = $("#Hid_Soles_Billetesx01").val();
                $("#T_01").val(valor01);
            }

            if (moneda == 2) {
                var valor100 = $("#Hid_Dolares_Billetesx100").val();
                $("#T_100").val(valor100);
                var valor50 = $("#Hid_Dolares_Billetesx50").val();
                $("#T_50").val(valor50);
                var valor20 = $("#Hid_Dolares_Billetesx20").val();
                $("#T_20").val(valor20);
                var valor10 = $("#Hid_Dolares_Billetesx10").val();
                $("#T_10").val(valor10);
                var valor5 = $("#Hid_Dolares_Billetesx5").val();
                $("#T_5").val(valor5);
                var valor1 = $("#Hid_Dolares_Billetesx1").val();
                $("#T_1").val(valor1);
            }

            if (moneda == 3) {
                var valor500 = $("#Hid_Euros_Billetesx500").val();
                $("#T_500").val(valor500);
                var valor200 = $("#Hid_Euros_Billetesx200").val();
                $("#T_200").val(valor200);
                var valor100 = $("#Hid_Euros_Billetesx100").val();
                $("#T_100").val(valor100);
                var valor50 = $("#Hid_Euros_Billetesx50").val();
                $("#T_50").val(valor50);
                var valor20 = $("#Hid_Euros_Billetesx20").val();
                $("#T_20").val(valor20);
                var valor10 = $("#Hid_Euros_Billetesx10").val();
                $("#T_10").val(valor10);
                var valor5 = $("#Hid_Euros_Billetesx5").val();
                $("#T_5").val(valor5);
            }
        }
    }

    function limpiarDatos() {
        $("#T_200").val('');
        $("#T_100").val('');
        $("#T_50").val('');
        $("#T_20").val('');
        $("#T_10").val('');
        $("#T_5").val('');
        $("#T_2").val('');
        $("#T_1").val('');
        $("#T_05").val('');
        $("#T_02").val('');
        $("#T_01").val('');
    }

    function limpiarTablas() {
        $("#txtCajaActualSoles").val('');
        $("#txtCajaSolesManual").val('');
        $("#txtTotalSoles").val('');
        $("#txtCajaActualDolares").val('');
        $("#txtCajaDolaresManual").val('');
        $("#txtTotalDolares").val('');
        $("#txtCajaActualEuros").val('');
        $("#txtCajaEurosManual").val('');
        $("#txtTotalEuros").val('');
        $("#TxtDeteriorados").val('');
        $("#txtComentario").val('');

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
            }
        });
    }


    function FormatNumeros(e) {
        debugger;
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
    init();

})(window, document);