using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class CalculadoraCLS
    {
        public int idOperacion { get; set; }
        public string Operacion { get; set; }
        public decimal Resultado { get; set; }
        public string Comentario { get; set; }        
        public string UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public DateTime FechaModificacion { get; set; }
        public string HoraCreacion { get; set; }

    }
}
