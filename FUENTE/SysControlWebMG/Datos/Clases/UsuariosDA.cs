using Datos.Modelos;
using Entidades;
using System.Collections.Generic;
using System.Linq;

namespace Datos.Clases
{
    public class UsuariosDA
    {
        public List<UsuariosCLS> ListarUsuarios()
        {
            List<UsuariosCLS> lstUsuario = null;
            using (var db = new BDControlMGEntities())
            {
                lstUsuario = (from usu in db.Usuario
                              join rol in db.Rol on usu.IdRol equals rol.IdRol
                              where usu.EstadoEliminacion == false
                              select new UsuariosCLS
                              {
                                  IdUsuario = usu.IdUsuario,
                                  NombreUsuario = usu.NombreUsuario,
                                  ApMaternoUsuario = usu.ApMaternoUsuario,
                                  ApPaternoUsuario = usu.ApPaternoUsuario,
                                  IdRol = usu.IdRol,
                                  Usser = usu.Usser,
                                  Password=usu.Password,
                                  EmailUsuario = usu.EmailUsuario,
                                  FechaCreacion = usu.FechaCreacion,
                                  UsuarioCreacion = usu.UsuarioCreacion,
                                  FechaModificacion = usu.FechaModificacion,
                                  UsuarioModificacion = usu.UsuarioModificacion,
                                  EstadoUsuario = usu.EstadoUsuario,
                                  FechaCreacionJS = usu.FechaCreacion.ToString(),
                                  NombreCargo = rol.NombreRol
                              }).ToList();

                return lstUsuario;
            }
        }
    }
}
