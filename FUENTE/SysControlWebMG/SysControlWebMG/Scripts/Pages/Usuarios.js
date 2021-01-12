function cargarTablaUsuarios() {
    mostrarLoader();
    var rows = "";
    $.ajax({
        type: "POST",
        url: '/Usuarios/ListarUsuarios',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            for (var i = 0; i < data.lstUsuarios.length; i++) {
                rows += '<tr>';
                rows += '<td>' + data.lstUsuarios[i].IdUsuario  + '</td>';
                rows += '<td>' + data.lstUsuarios[i].NombreUsuario + " " + data.lstUsuarios[i].ApPaternoUsuario + " " + data.lstUsuarios[i].ApMaternoUsuario + '</td>';
                rows += '<td>' + data.lstUsuarios[i].Usser + '</td>';
                rows += '<td>' + data.lstUsuarios[i].NombreCargo + '</td>';
                rows += '<td>' + data.lstUsuarios[i].FechaCreacionJS + '</td>';
                if (data.lstUsuarios[i].EstadoUsuario) {
                    rows += '<td><span onclick="cambiarEstadoUsuario(' + data.lstUsuarios[i].IdUsuario + ')" title="Cambiar estado" class="label label-sm label-success" style="cursor: pointer;"> Activado</span></td>';
                }
                else {
                    rows += '<td><span onclick="cambiarEstadoUsuario(' + data.lstUsuarios[i].IdUsuario + ')" title="Cambiar estado" class="label label-sm label-danger" style="cursor: pointer;">Desactivado</span></td>';
                }
                rows += '<td align="center">';
                rows += '<span onclick="obtenerUsuario(' + data.lstUsuarios[i].IdUsuario + ')" class="fa fa-edit" style="font-size:20px; cursor: pointer;" title="Editar"></span>';
                rows += '<span onclick="eliminarUsuario(' + data.lstUsuarios[i].IdUsuario + ')" class="fa fa-trash" style="font-size:20px; cursor: pointer; padding-left: 10px" title="Eliminar" ></span></td>';
                rows += '</tr>';
            }
            document.getElementById("bodytbUsuarios").innerHTML = rows;
            ocultarLoader();
        },
        error: function (ex) {
            alert(ex.responseText);
            ocultarLoader();
        }
    });
    ocultarLoader();
};

function agregarUsuario() {
    mostrarLoader();
    if (validarDatosUsuario()) {
        var usu = {};
        usu.NombreUsuario = $("#NombreUsuario").val();
        usu.ApPaternoUsuario = $("#APaternoUsuario").val();
        usu.ApMaternoUsuario = $("#AMaternoUsuario").val();
        usu.Usser = $("#Usuario").val();
        usu.Password = $("#Conrasenia").val();
        usu.EmailUsuario = $("#EmailUsuario").val();
        usu.TelefonoUsuario = $("#TelefonoUsuario").val();
        usu.IdRol = $("#idCargoUsario").val();
        $.ajax({
            type: "POST",
            url: "/Usuarios/AgregarUsuario",
            data: '{usu: ' + JSON.stringify(usu) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.Code == 2) {
                    toastr.error('Ya existen registros con un nombre similar, intente otro', 'Error');
                    ocultarLoader();
                }
                else {
                    if (response.Code == 1) {
                        $('#modalNuevoUsuario').modal('hide');
                        limpiarValoresUsuarios();
                        cargarTablaUsuarios();
                        toastr.success('Se agregaron los datos correctamente', 'Éxito');
                        ocultarLoader();
                    }
                    else {
                        toastr.error('Error al agregar los datos', 'Error');
                        ocultarLoader();
                    }
                }
            },
            error: function () {
                toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                ocultarLoader;
            }
        });
    }
    ocultarLoader();
};

function validarDatosUsuario() {
    var NombreUsuario = $("#NombreUsuario").val();
    var ApPaternoUsuario = $("#APaternoUsuario").val();
    var ApMaternoUsuario = $("#AMaternoUsuario").val();
    var Usser = $("#Usuario").val();
    var Password = $("#Conrasenia").val();
    var IdRol = $("#idCargoUsario").val();

    if (NombreUsuario == '') {
        toastr.error('Debe digitar un nombre', 'Error');
        return false;
    }
    if (ApPaternoUsuario == '') {
        toastr.error('Debe digitar un Apellido Paterno', 'Error');
        return false;
    }
    if (ApMaternoUsuario == '') {
        toastr.error('Debe digitar un Apellido Materno', 'Error');
        return false;
    }
    if (Usser == '') {
        toastr.error('Debe digitar un Usuario', 'Error');
        return false;
    }
    if (Password == '') {
        toastr.error('Debe digitar una contraseña', 'Error');
        return false;
    }
    if (IdRol == '0') {
        toastr.error('Debe seleccionar un Rol', 'Error');
        return false;
    }
    return true;
};

function validarDatosUsuarioEditar() {
    var IdUsuario = $("#idUsuarioEditar").val();
    var NombreUsuario = $("#NombreUsuarioEditar").val();
    var ApPaternoUsuario = $("#APaternoUsuarioEditar").val();
    var ApMaternoUsuario = $("#AMaternoUsuarioEditar").val();
    var Usser = $("#UsuarioEditar").val();
    var Password = $("#ConraseniaEditar").val();
    var IdRol = $("#idCargoUsarioEditar").val();
    
    if (IdUsuario == '') {
        toastr.error('Debe haber un IdUsuario', 'Error');
        return false;
    }
    if (NombreUsuario == '') {
        toastr.error('Debe digitar un nombre', 'Error');
        return false;
    }
    if (ApPaternoUsuario == '') {
        toastr.error('Debe digitar un Apellido Paterno', 'Error');
        return false;
    }
    if (ApMaternoUsuario == '') {
        toastr.error('Debe digitar un Apellido Materno', 'Error');
        return false;
    }
    if (Usser == '') {
        toastr.error('Debe digitar un Usuario', 'Error');
        return false;
    }
    if (Password == '') {
        toastr.error('Debe digitar una contraseña', 'Error');
        return false;
    }
    if (IdRol == '0') {
        toastr.error('Debe seleccionar un Rol', 'Error');
        return false;
    }
    return true;
};

function limpiarValoresUsuarios() {
    $("#NombreUsuario").val('');
    $("#APaternoUsuario").val('');
    $("#AMaternoUsuario").val('');
    $("#Usuario").val('');
    $("#Conrasenia").val('');
    $("#idCargoUsario").val('0');
    $("#TelefonoUsuario").val('');
    $("#EmailUsuario").val('');
};

function limpiarValoresUsuariosEditar() {
    $("#idUsuarioEditar").val('');
    $("#NombreUsuarioEditar").val('');
    $("#APaternoUsuarioEditar").val('');
    $("#AMaternoUsuarioEditar").val('');
    $("#UsuarioEditar").val('');
    $("#ConraseniaEditar").val('');
    $("#idCargoUsarioEditar").val('0');
    $("#TelefonoUsuarioEditar").val('');
    $("#EmailUsuarioEditar").val('');
};

function cambiarEstadoUsuario(idUsuario) {
    swal({
        title: "Cambio de Estado Usuario",
        text: "¿Está seguro que desea cambiar el estado de este Usuario?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Cambiar",
        cancelButtonText: "Cancelar"
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                mostrarLoader();
                var usu = {};
                usu.IdUsuario = idUsuario;
                $.ajax({
                    type: "POST",
                    url: "/Usuarios/CambiarEstadoUsuario",
                    data: '{usu: ' + JSON.stringify(usu) + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.Code == 1) {
                            toastr.success('Se cambio el estado con éxito', 'Éxito');
                            cargarTablaUsuarios();
                            ocultarLoader();
                        }
                        else {
                            toastr.error('Ocurrió un error al realizar la eliminación, inténtelo de nuevo', 'Error');
                            ocultarLoader();
                        }
                    },
                    error: function () {
                        toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                        ocultarLoader();
                    }
                });
            }
        }
    );
};

function obtenerUsuario(idUsuario) {
    mostrarLoader();
    $('#modalEditarUsuario').modal('show');
    var idUsuario = idUsuario;
    $.ajax({
        type: "POST",
        url: "/Usuarios/ObtenerUsuarioPorId",
        data: '{usu: ' + idUsuario + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#idUsuarioEditar").val(response.usuarioCLS.IdUsuario);
            $("#NombreUsuarioEditar").val(response.usuarioCLS.NombreUsuario);
            $("#APaternoUsuarioEditar").val(response.usuarioCLS.ApPaternoUsuario);
            $("#AMaternoUsuarioEditar").val(response.usuarioCLS.ApMaternoUsuario);
            $("#EmailUsuarioEditar").val(response.usuarioCLS.EmailUsuario);
            $("#TelefonoUsuarioEditar").val(response.usuarioCLS.TelefonoUsuario);
            $("#idCargoUsarioEditar").val(response.usuarioCLS.IdRol);
            $("#UsuarioEditar").val(response.usuarioCLS.Usser);
            $("#ConraseniaEditar").val(response.usuarioCLS.Password);
            ocultarLoader();
        },
        error: function () {
            toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
            ocultarLoader();
        }
    });
};

function editarUsuario() {
    mostrarLoader();
    if (validarDatosUsuarioEditar()) {
        var usu = {};
        usu.IdUsuario = $("#idUsuarioEditar").val();
        usu.NombreUsuario = $("#NombreUsuarioEditar").val();
        usu.ApPaternoUsuario = $("#APaternoUsuarioEditar").val();
        usu.ApMaternoUsuario = $("#AMaternoUsuarioEditar").val();
        usu.Usser = $("#UsuarioEditar").val();
        usu.Password = $("#ConraseniaEditar").val();
        usu.EmailUsuario = $("#EmailUsuarioEditar").val();
        usu.TelefonoUsuario = $("#TelefonoUsuarioEditar").val();
        usu.IdRol = $("#idCargoUsarioEditar").val();

        $.ajax({
            type: "POST",
            url: "/Usuarios/EditarUsuario",
            data: '{usu: ' + JSON.stringify(usu) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.Code == 1) {
                    toastr.success('Se realizaron los cambios con éxito', 'Éxito');
                    cargarTablaUsuarios();
                    limpiarValoresUsuariosEditar();
                    $('#modalEditarUsuario').modal('hide');
                    ocultarLoader();
                }
                else {
                    toastr.error('Error al agregar los datos', 'Error');
                    ocultarLoader();
                }
            },
            error: function () {
                toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                ocultarLoader();
            }
        });
    }
    ocultarLoader();
};

function eliminarUsuario(idUsuario) {
    swal({
        title: "Eliminar Usuario",
        text: "¿Está seguro que desea eliminar este Usuario?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                mostrarLoader();
                var und = {};
                und.IdUsuario = idUsuario;
                $.ajax({
                    type: "POST",
                    url: "/Usuarios/EliminarUsuario",
                    data: '{usu: ' + JSON.stringify(usu) + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.Code == 1) {
                            toastr.success('Se eliminó con éxito', 'Éxito');
                            cargarTablaUsuarios();
                            ocultarLoader();
                        }
                        else {
                            toastr.error('Ocurrió un error al realizar la eliminación, inténtelo de nuevo', 'Error');
                            ocultarLoader();
                        }
                    },
                    error: function () {
                        toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                        ocultarLoader();
                    }
                });
            }
        }
    );
};