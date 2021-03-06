﻿var app_CuadreCaja = (function (win, doc) {

    const data = {
        urlObtenerConfCaja: '/Operacion/ObtenerConfCaja',
        urlCargaInicial: '/Operacion/CargaInicial'
    }

    function init() {
        cargaInicial();
        obtenerConfCaja();
        document.getElementById("txtMontoBillete").addEventListener("keypress", FormatNumeros, false);
        document.getElementById("txtNumeroBilletes").addEventListener("keypress", FormatNumeros, false);
        document.getElementById("btnAgregar").addEventListener("click", agregarCaja);
        document.getElementById("btnLimpiarCajaSolesManual").addEventListener("click", borrarTxt);
        document.getElementById("btnLimpiarCajaDolaresManual").addEventListener("click", borrarTxt);
        document.getElementById("btnLimpiarCajaEurosManual").addEventListener("click", borrarTxt);
    }

    function borrarTxt() {
        if (this.id === 'btnLimpiarCajaSolesManual') {
            document.getElementById("txtCajaSolesManual").value = "";
        }
        if (this.id === 'btnLimpiarCajaDolaresManual') {
            document.getElementById("txtCajaDolaresManual").value = "";
        }
        if (this.id === 'btnLimpiarCajaEurosManual') {
            document.getElementById("txtCajaEurosManual").value = "";
        }
    }

    function validacionAgregar() {
        var Moneda = $("#cboMoneda").val();
        var MontoBillete = $("#txtMontoBillete").val();
        var NumeroBilletes = $("#txtNumeroBilletes").val();

        if (Moneda == '0') {
            toastr.error('Debe ingresar la moneda', 'Error');
            return false;
        }
        if (MontoBillete == '') {
            toastr.error('Debe ingresar el monto del billete', 'Error');
            return false;
        }
        if (NumeroBilletes == '') {
            toastr.error('Debe ingresar el número de billetes', 'Error');
            return false;
        }
        return true;
    };

    function agregarCaja() {
        if (validacionAgregar()) {
            var Moneda = $("#cboMoneda").val();
            var MontoBillete = parseFloat($("#txtMontoBillete").val()).toFixed(1);
            var NumeroBilletes = parseInt($("#txtNumeroBilletes").val());
            if (Moneda == '1') {
                var sumarCajaSolesManual = parseFloat(parseFloat(MontoBillete).toFixed(1) * parseInt(NumeroBilletes)).toFixed(1);
                var cajaSolesActual = parseFloat($("#txtCajaSolesManual").val()).toFixed(1);          
                if (isNaN(cajaSolesActual)) { cajaSolesActual = 0 }
                document.getElementById("txtCajaSolesManual").value = parseFloat(parseFloat(cajaSolesActual) + parseFloat(sumarCajaSolesManual)).toFixed(1);
                toastr.success(null, 'Agregado con éxito.');
            }
            if (Moneda == '2') {
                var sumarCajaDolaresManual = parseFloat(parseFloat(MontoBillete).toFixed(1) * parseInt(NumeroBilletes)).toFixed(1);
                var cajaDolaresActual = parseFloat($("#txtCajaDolaresManual").val()).toFixed(1);          
                if (isNaN(cajaDolaresActual)) { cajaDolaresActual = 0 }
                document.getElementById("txtCajaDolaresManual").value = parseFloat(parseFloat(cajaDolaresActual) + parseFloat(sumarCajaDolaresManual)).toFixed(1);
                toastr.success(null, 'Agregado con éxito.');
            }
            if (Moneda == '3') {
                var sumarCajaEurosManual = parseFloat(parseFloat(MontoBillete).toFixed(1) * parseInt(NumeroBilletes)).toFixed(1);
                var cajaEurosActual = parseFloat($("#txtCajaEurosManual").val()).toFixed(1);
                if (isNaN(cajaEurosActual)) { cajaEurosActual = 0 }
                document.getElementById("txtCajaEurosManual").value = parseFloat(parseFloat(cajaEurosActual) + parseFloat(sumarCajaEurosManual)).toFixed(1);
                toastr.success(null, 'Agregado con éxito.');
            }
            document.getElementById("cboMoneda").value ='0';
            document.getElementById("txtMontoBillete").value = '';
            document.getElementById("txtNumeroBilletes").value = '';
        }
    }


    function obtenerConfCaja() {
        $.ajax({
            type: "POST",
            url: data.urlObtenerConfCaja,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (d) {
                if (d.lstConfCaja != null) {
                    document.getElementById("txtCajaActualSoles").value = d.lstConfCaja.CajaActualSoles.toFixed(1);
                    document.getElementById("txtCajaActualDolares").value = d.lstConfCaja.CajaActualDolares.toFixed(1);
                    document.getElementById("txtCajaActualEuros").value = d.lstConfCaja.CajaActualEuros.toFixed(1);
                    toastr.success(null, 'Se obtuvo los ultimos valores de las cajas.');
                } else {
                    toastr.error('Debe configurar su caja antes de ingresar alguna operación', 'Error');
                }
            },
            error: function (ex) {
                alert(ex.responseText);
                //ocultarLoader();
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

    //function FormatMontoBillete() {
    //    ForceNumeros($("#txtTCVentaEuro_ME"));
    //}
    function FormatNumeros(e) {
        var key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
    }
    //funcion de inicio
    init();

})(window, document);