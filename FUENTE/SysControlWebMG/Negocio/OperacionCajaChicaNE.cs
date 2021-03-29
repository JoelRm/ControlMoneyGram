using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class OperacionCajaChicaNE
    {
        private static OperacionCajaChicaDA obj = new OperacionCajaChicaDA();
        public ConfiguracionCajaChicaCLS ObtenerConfCajaChica(string Usuario)
        {
            return obj.ObtenerConfCajaChica(Usuario);
        }

        public int GuardarOperacionCajaChica(OperacionCajaChicaCLS ope)
        {
            return obj.GuardarOperacionCajaChica(ope);
        }

        public int GuardarOperacionCajaChicaCalculadora(CalculadoraCLS ope)
        {
            return obj.GuardarOperacionCajaChicaCalculadora(ope);
        }

        public List<OperacionCajaChicaCLS> ObtenerListaOperacionesCajaChica()
        {
            return obj.ObtenerListaOperacionesCajaChica();
        }

        public List<CalculadoraCLS> ObtenerListaOperacionesCajaChicaCalculadora()
        {
            return obj.ObtenerListaOperacionesCajaChicaCalculadora();
        }

        public int AnularOperacionCajaChica(int idOperacionCajaChica, string Usuario)
        {
            return obj.AnularOperacionCajaChica(idOperacionCajaChica, Usuario);
        }

    }
}
