using Datos.Modelos;
using Entidades;
using System.Collections.Generic;
using System.Linq;

namespace Datos.Clases
{
    public class RolDA
    {
        public List<RolCLS> ListarRolesForCombo()
        {
            List<RolCLS> lstRol = null;
            using (var db = new BDControlMGEntities())
            {
                lstRol = (from rol in db.Rol
                            where rol.EstadoEliminacion == false && rol.EstadoRol == true
                            select new RolCLS
                            {
                                IdRol = rol.IdRol,
                                NombreRol = rol.NombreRol

                            }).ToList();

                return lstRol;
            }
        }
    }
}
