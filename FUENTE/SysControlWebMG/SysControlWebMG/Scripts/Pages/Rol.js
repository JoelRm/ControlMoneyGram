function cargarTablaRoles() {
    mostrarLoader();
    var rows = "";
    $.ajax({
        type: "POST",
        url: '/Rol/ListarRoles',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            for (var i = 0; i < data.lstRoles.length; i++) {
                rows += '<tr>';
                rows += '<td>' + data.lstRoles[i].IdRol + '</td>';
                rows += '<td>' + data.lstRoles[i].NombreRol + '</td>';
                rows += '<td>' + data.lstRoles[i].UsuarioCreacion + '</td>';
                rows += '<td>' + data.lstRoles[i].FechaCreacionJS + '</td>';
                if (data.lstRoles[i].EstadoRol) {
                    rows += '<td><span onclick="cambiarEstadoRol(' + data.lstRoles[i].IdRol + ')" title="Cambiar estado" class="label label-sm label-success" style="cursor: pointer;"> Activado</span></td>';
                }
                else {
                    rows += '<td><span onclick="cambiarEstadoRol(' + data.lstRoles[i].IdRol + ')" title="Cambiar estado" class="label label-sm label-danger" style="cursor: pointer;">Desactivado</span></td>';
                }
                rows += '<td align="center">';
                rows += '<span onclick="obtenerRol(' + data.lstRoles[i].IdRol + ')" class="fa fa-edit" style="font-size:20px; cursor: pointer;" title="Editar"></span>';
                rows += '<span onclick="obtenerUsuario(' + data.lstRoles[i].IdRol + ')" class="fa fa-cog" style="font-size:20px; cursor: pointer; padding-left: 10px" title="Configurar Permisos"></span>';
                rows += '<span onclick="eliminarRol(' + data.lstRoles[i].IdRol + ')" class="fa fa-trash" style="font-size:20px; cursor: pointer; padding-left: 10px" title="Eliminar" ></span></td>';
                rows += '</tr>';
            }
            document.getElementById("bodytbRoles").innerHTML = rows;
            ocultarLoader();
        },
        error: function (ex) {
            alert(ex.responseText);
            ocultarLoader();
        }
    });
    ocultarLoader();
};

function agregarRol() {
    mostrarLoader();
    if (validarDatosRol()) {
        var rol = {};
        rol.NombreRol = $("#NombreRol").val();
        $.ajax({
            type: "POST",
            url: "/Rol/AgregarRol",
            data: '{rol: ' + JSON.stringify(rol) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.Code == 2) {
                    toastr.error('Ya existen registros con un nombre similar, intente otro', 'Error');
                    ocultarLoader();
                }
                else {
                    if (response.Code == 1) {
                        $('#modalNuevoRol').modal('hide');
                        limpiarValoresRol();
                        cargarTablaRoles();
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

function limpiarValoresRol() {
    var NombreRol = $("#NombreRol").val();
    if (NombreRol == '') {
        toastr.error('Debe digitar un nombre de Rol', 'Error');
        return false;
    }
    return true;
};

function limpiarValoresUsuarios() {
    $("#NombreRol").val('');
};

function obtenerRol(IdRol) {
    mostrarLoader();
    $('#modalEditarRol').modal('show');
    var IdRol = IdRol;
    $.ajax({
        type: "POST",
        url: "/Rol/ObtenerRolPorId",
        data: '{IdRol: ' + IdRol + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#idRolEditar").val(response.rolCLS.IdRol);
            $("#NombreRolEditar").val(response.rolCLS.NombreRol);
            ocultarLoader();
        },
        error: function () {
            toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
            ocultarLoader();
        }
    });
};

function editarRol() {
    mostrarLoader();
    if (validarDatosRolEditar()) {
        var rol = {};
        rol.IdRol = $("#idRolEditar").val();
        rol.NombreRol = $("#NombreRolEditar").val();
        $.ajax({
            type: "POST",
            url: "/Rol/EditarRol",
            data: '{objRolCLS: ' + JSON.stringify(rol) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.Code == 1) {
                    toastr.success('Se realizaron los cambios con éxito', 'Éxito');
                    cargarTablaRoles();
                    $('#modalEditarRol').modal('hide');
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

function validarDatosRolEditar() {
    var IdRol = $("#idRolEditar").val();
    var NombreRol = $("#NombreRolEditar").val();

    if (IdRol == '') {
        toastr.error('Debe haber un IdRol', 'Error');
        return false;
    }
    if (NombreRol == '') {
        toastr.error('Debe digitar un nombre de Rol', 'Error');
        return false;
    }
    return true;
};

function eliminarRol(idRol) {
    swal({
        title: "Eliminar Rol",
        text: "¿Está seguro que desea eliminar este Rol?",
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
                var IdRol = idRol;
                $.ajax({
                    type: "POST",
                    url: "/Rol/EliminarRol",
                    data: '{IdRol: ' + JSON.stringify(IdRol) + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.Code == 1) {
                            toastr.success('Se eliminó con éxito', 'Éxito');
                            cargarTablaRoles();
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

function cambiarEstadoRol(idRol) {
    swal({
        title: "Cambio de Estado Usuario",
        text: "¿Está seguro que desea cambiar el estado de este Rol?",
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
                var IdRol = idRol;
                $.ajax({
                    type: "POST",
                    url: "/Rol/CambiarEstadoRol",
                    data: '{IdRol: ' + JSON.stringify(IdRol) + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.Code == 1) {
                            toastr.success('Se cambio el estado con éxito', 'Éxito');
                            cargarTablaRoles();
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