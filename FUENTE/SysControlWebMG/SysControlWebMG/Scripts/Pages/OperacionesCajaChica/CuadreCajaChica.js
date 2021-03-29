var app_CuadreCajaChica = (function (win, doc) {

    const data = {
        urlObtenerConfCajaChica: '/OperacionCajaChica/ObtenerConfCajaChica',
        urlCargaInicial: '/OperacionCajaChica/CargaInicial'
    }

    function init() {
        cargaInicial();
        obtenerConfCajaChica();
        document.getElementById("txtMontoBillete").addEventListener("keypress", FormatNumeros, false);
        document.getElementById("txtNumeroBilletes").addEventListener("keypress", FormatNumeros, false);
        document.getElementById("btnAgregar").addEventListener("click", agregarCajaChica);
        document.getElementById("btnLimpiarCajaChicaSolesManual").addEventListener("click", borrarTxt);
        document.getElementById("btnLimpiarCajaChicaDolaresManual").addEventListener("click", borrarTxt);
        document.getElementById("btnLimpiarCajaChicaEurosManual").addEventListener("click", borrarTxt);
    }

    function borrarTxt() {
        if (this.id === 'btnLimpiarCajaChicaSolesManual') {
            document.getElementById("txtCajaChicaSolesManual").value = "";
        }
        if (this.id === 'btnLimpiarCajaChicaDolaresManual') {
            document.getElementById("txtCajaChicaDolaresManual").value = "";
        }
        if (this.id === 'btnLimpiarCajaChicaEurosManual') {
            document.getElementById("txtCajaChicaEurosManual").value = "";
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

    function agregarCajaChica() {
        if (validacionAgregar()) {
            var Moneda = $("#cboMoneda").val();
            var MontoBillete = parseFloat($("#txtMontoBillete").val()).toFixed(1);
            var NumeroBilletes = parseInt($("#txtNumeroBilletes").val());
            if (Moneda == '1') {
                var sumarCajaChicaSolesManual = parseFloat(parseFloat(MontoBillete).toFixed(1) * parseInt(NumeroBilletes)).toFixed(1);
                var CajaChicaSolesActual = parseFloat($("#txtCajaChicaSolesManual").val()).toFixed(1);
                if (isNaN(CajaChicaSolesActual)) { CajaChicaSolesActual = 0 }
                document.getElementById("txtCajaChicaSolesManual").value = parseFloat(parseFloat(CajaChicaSolesActual) + parseFloat(sumarCajaChicaSolesManual)).toFixed(1);
                toastr.success(null, 'Agregado con éxito.');
            }
            if (Moneda == '2') {
                var sumarCajaChicaDolaresManual = parseFloat(parseFloat(MontoBillete).toFixed(1) * parseInt(NumeroBilletes)).toFixed(1);
                var CajaChicaDolaresActual = parseFloat($("#txtCajaChicaDolaresManual").val()).toFixed(1);
                if (isNaN(CajaChicaDolaresActual)) { CajaChicaDolaresActual = 0 }
                document.getElementById("txtCajaChicaDolaresManual").value = parseFloat(parseFloat(CajaChicaDolaresActual) + parseFloat(sumarCajaChicaDolaresManual)).toFixed(1);
                toastr.success(null, 'Agregado con éxito.');
            }
            if (Moneda == '3') {
                var sumarCajaChicaEurosManual = parseFloat(parseFloat(MontoBillete).toFixed(1) * parseInt(NumeroBilletes)).toFixed(1);
                var CajaChicaEurosActual = parseFloat($("#txtCajaChicaEurosManual").val()).toFixed(1);
                if (isNaN(CajaChicaEurosActual)) { CajaChicaEurosActual = 0 }
                document.getElementById("txtCajaChicaEurosManual").value = parseFloat(parseFloat(CajaChicaEurosActual) + parseFloat(sumarCajaChicaEurosManual)).toFixed(1);
                toastr.success(null, 'Agregado con éxito.');
            }
            document.getElementById("cboMoneda").value = '0';
            document.getElementById("txtMontoBillete").value = '';
            document.getElementById("txtNumeroBilletes").value = '';
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