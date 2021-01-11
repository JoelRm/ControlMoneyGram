using Datos.Clases;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class OperacionNE
    {
        private static OperacionDA obj = new OperacionDA();

        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
    }
}
