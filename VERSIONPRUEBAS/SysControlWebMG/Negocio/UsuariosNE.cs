using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class UsuariosNE
    {
        private static UsuariosDA obj = new UsuariosDA();

        public List<UsuariosCLS> ListarUsuarios()
        {
            return obj.ListarUsuarios();
        }
        public int AgregarUsuario(UsuariosCLS objUsuarioCLS)
        {
            return obj.AgregarUsuario(objUsuarioCLS);
        }
        public int CambiarEstadoUsuario(UsuariosCLS objUsuarioCLS)
        {
            return obj.CambiarEstadoUsuario(objUsuarioCLS);
        }
        public UsuariosCLS ObtenerUsuarioPorId(int idUsu)
        {
            return obj.ObtenerUsuarioPorId(idUsu);
        }
        public int EditarUsuario(UsuariosCLS objUsuarioCls)
        {
            return obj.EditarUsuario(objUsuarioCls);
        }
        public int EliminarUsuario(UsuariosCLS objUsuarioCls)
        {
            return obj.EliminarUsuario(objUsuarioCls);
        }
        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
        public UsuariosCLS ObtenerDatosUsuario(string usser, string pass)
        {
            return obj.ObtenerDatosUsuario(usser, pass);
        }
    }
}
