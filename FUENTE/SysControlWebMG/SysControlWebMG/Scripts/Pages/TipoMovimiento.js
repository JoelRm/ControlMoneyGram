function cargarTablaTipoMovimiento() {
    //mostrarLoader();
    var rows = "";
    $.ajax({
        type: "POST",
        url: '/TipoMovimiento/ListarTipoMovimiento',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            for (var i = 0; i < data.lstTipoMov.length; i++) {
                rows += '<tr>';
                rows += '<td>' + data.lstTipoMov[i].IdTipoMovimiento + '</td>';
                rows += '<td>' + data.lstTipoMov[i].NombreTipoMovimiento + '</td>';
                rows += '<td>' + data.lstTipoMov[i].FechaCreacionJS + '</td>';
                rows += '<td>' + data.lstTipoMov[i].UsuarioCreacion + '</td>';
                if (data.lstTipoMov[i].EstadoTipoMovimiento) {
                    rows += '<td><span onclick="cambiarEstado(' + data.lstTipoMov[i].IdTipoMovimiento + ')" title="Cambiar estado" class="label label-sm label-success" style="cursor: pointer;"> Activado</span></td>';
                }
                else {
                    rows += '<td><span onclick="cambiarEstado(' + data.lstTipoMov[i].IdTipoMovimiento + ')" title="Cambiar estado" class="label label-sm label-danger" style="cursor: pointer;">Desactivado</span></td>';
                }
                rows += '<td align="center">';
                rows += '<span onclick="obtenerSucursal(' + data.lstTipoMov[i].IdTipoMovimiento + ')" class="fa fa-edit" style="font-size:20px; cursor: pointer;" title="Editar"></span>';
                rows += '<span onclick="eliminarSucursal(' + data.lstTipoMov[i].IdTipoMovimiento + ')" class="fa fa-trash" style="font-size:20px; cursor: pointer; padding-left: 10px" title="Eliminar" ></span></td>';
                rows += '</tr>';
            }
            document.getElementById("bodytbTipoMov").innerHTML = rows;
            //ocultarLoader();
        },
        error: function (ex) {
            alert(ex.responseText);
            //ocultarLoader();
        }
    });
    //ocultarLoader();
};