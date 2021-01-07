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
    }
}
