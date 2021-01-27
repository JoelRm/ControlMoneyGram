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
        public List<RolCLS> ListarRoles()
        {
            return obj.ListarRoles();
        }
        public int AgregarRol(RolCLS objRolCLS)
        {
            return obj.AgregarRol(objRolCLS);
        }
        public RolCLS ObtenerRolPorId(int idRol)
        {
            return obj.ObtenerRolPorId(idRol);
        }
        public int EditarRol(RolCLS objRolCls)
        {
            return obj.EditarRol(objRolCls);
        }
        public int EliminarRol(int idRol)
        {
            return obj.EliminarRol(idRol);
        }
        public int CambiarEstadoRol(int idRol)
        {
            return obj.CambiarEstadoRol(idRol);
        }
    }
}
