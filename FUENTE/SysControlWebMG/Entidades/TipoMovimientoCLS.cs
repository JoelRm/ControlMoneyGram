using System;

namespace Entidades
{
    public class TipoMovimientoCLS
    {
        public int IdTipoMovimiento { get; set; }
        public string NombreTipoMovimiento { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public DateTime FechaModificacion { get; set; }
        public bool EstadoTipoMovimiento { get; set; }
        public bool EstadoEliminacion { get; set; }
        public string FechaCreacionJS { get; set; }
    }
}
