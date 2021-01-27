﻿
$(document).ready(function () {
    $("#login-form").on("submit", function (e) {
        e.preventDefault()
        if (ValidarCampos()) {
            var usu = {};
            usu.Usser = $("#Usser").val();
            usu.Password = $("#Password").val();
            $.ajax({
                type: "POST",
                url: "/Login/ValidarUsuario",
                data: '{usu: ' + JSON.stringify(usu) + '}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.oUsuario.IdUsuario > 0) {
                        swal({
                            title: "Bienvenido al sistema!",
                            text: "No olvides configurar tu caja y tipo de cambio!",
                            type: "success"
                        }, function () {
                            var url = "/Home/Index/";
                            location.href = url;
                        });
                    } else {
                        alert('Error');
                    }
                },
                error: function () {
                    toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                    ocultarLoader;
                }
            });
            
        }
    });

});

function ValidarCampos() {
    var NombreUsuario = $("#Usser").val();
    var Password = $("#Password").val();
    if (NombreUsuario == '') {
        toastr.error('Debe digitar un usuario', 'Error');
        return false;
    }
    if (Password == '') {
        toastr.error('Debe digitar una contraseña', 'Error');
        return false;
    }
    return true;
}