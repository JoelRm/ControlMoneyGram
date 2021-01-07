
$(document).ready(function () {
    $("#login-form").on("submit", function (e) {
        e.preventDefault()
        if (ValidarCampos()) {
            swal({
                title: "Bienvenido al sistema!",
                text: "No olvides configurar tu caja y tipo de cambio!",
                type: "success"
            }, function () {
                var url = "/Home/Index/";
                location.href = url;
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