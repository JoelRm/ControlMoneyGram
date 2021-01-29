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
        public ConfiguracionCajaCLS ObtenerConfCaja()
        {
            return obj.ObtenerConfCaja();
        }
        
        public int GuardarOperacion(OperacionCLS ope)
        {
            return obj.GuardarOperacion(ope);
        }
        public int GuardarOperacionCalculadora(CalculadoraCLS ope)
        {
            return obj.GuardarOperacionCalculadora(ope);
        }
        
    }
}
