using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class UsuariosCLS
    {
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string ApPaternoUsuario { get; set; }
        public string ApMaternoUsuario { get; set; }
        public string Usser { get; set; }
        public string Password { get; set; }
        public string EmailUsuario { get; set; }
        public int IdRol { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public DateTime FechaModificacion { get; set; }
        public bool EstadoUsuario { get; set; }
        public bool EstadoEliminacion { get; set; }
        public string FechaCreacionJS { get; set; }
        public string NombreCargo { get; set; }
    }
}
