using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class TipoMovimientoNE
    {
        private static TipoMovimientoDA obj = new TipoMovimientoDA();

        public List<TipoMovimientoCLS> ListarTipoMovimiento()
        {
            return obj.ListarTipoMovimiento();
        }
    }
}
