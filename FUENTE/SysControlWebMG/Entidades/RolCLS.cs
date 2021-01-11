using System;

namespace Entidades
{
    public class RolCLS
    {
        public int IdRol { get; set; }
        public string NombreRol { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public DateTime FechaModificacion { get; set; }
        public bool EstadoRol { get; set; }
        public bool EstadoEliminacion { get; set; }
        public string FechaCreacionJS { get; set; }
    }
}
