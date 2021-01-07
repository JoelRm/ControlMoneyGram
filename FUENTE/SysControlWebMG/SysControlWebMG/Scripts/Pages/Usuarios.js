function cargarTablaUsuarios() {
    //mostrarLoader();
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
                    rows += '<td><span onclick="cambiarEstado(' + data.lstUsuarios[i].IdUsuario + ')" title="Cambiar estado" class="label label-sm label-success" style="cursor: pointer;"> Activado</span></td>';
                }
                else {
                    rows += '<td><span onclick="cambiarEstado(' + data.lstUsuarios[i].IdUsuario + ')" title="Cambiar estado" class="label label-sm label-danger" style="cursor: pointer;">Desactivado</span></td>';
                }
                rows += '<td align="center">';
                rows += '<span onclick="obtenerSucursal(' + data.lstUsuarios[i].IdUsuario + ')" class="fa fa-edit" style="font-size:20px; cursor: pointer;" title="Editar"></span>';
                rows += '<span onclick="eliminarSucursal(' + data.lstUsuarios[i].IdUsuario + ')" class="fa fa-trash" style="font-size:20px; cursor: pointer; padding-left: 10px" title="Eliminar" ></span></td>';
                rows += '</tr>';
            }
            document.getElementById("bodytbUsuarios").innerHTML = rows;
            //ocultarLoader();
        },
        error: function (ex) {
            alert(ex.responseText);
            //ocultarLoader();
        }
    });
    //ocultarLoader();
};