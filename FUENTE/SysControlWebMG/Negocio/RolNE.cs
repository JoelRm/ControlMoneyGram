using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class RolNE
    {
        private static RolDA obj = new RolDA();
        public List<RolCLS> ListarRolesForCombo()
        {
            return obj.ListarRolesForCombo();
        }
    }
}
