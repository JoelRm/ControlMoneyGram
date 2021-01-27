using Datos.Modelos;
using Entidades;
using System.Collections.Generic;
using System.Linq;

namespace Datos.Clases
{
    public class TipoMovimientoDA
    {
        public List<TipoMovimientoCLS> ListarTipoMovimiento()
        {
            List<TipoMovimientoCLS> lstTipoMov = null;
            using (var db = new BDControlMGEntities())
            {
                lstTipoMov = (from tipoMov in db.TipoMovimiento
                              where tipoMov.EstadoEliminacion == false
                                select new TipoMovimientoCLS
                                {
                                    IdTipoMovimiento = tipoMov.IdTipoMovimiento,
                                    NombreTipoMovimiento = tipoMov.NombreTipoMovimiento,
                                    FechaCreacion = tipoMov.FechaCreacion,
                                    UsuarioCreacion = tipoMov.UsuarioCreacion,
                                    FechaModificacion = tipoMov.FechaModificacion,
                                    UsuarioModificacion = tipoMov.UsuarioModificacion,
                                    EstadoTipoMovimiento = tipoMov.EstadoTipoMovimiento,
                                    FechaCreacionJS = tipoMov.FechaCreacion.ToString()

                                }).ToList();

                return lstTipoMov;
            }
        }
    }
}
