using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class OperacionCajaChicaNE
    {
        private static OperacionCajaChicaDA obj = new OperacionCajaChicaDA();

        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
        public ConfiguracionCajaChicaCLS ObtenerConfCajaChica(string Usuario)
        {
            return obj.ObtenerConfCajaChica(Usuario);
        }

        public int GuardarOperacionCajaChica(OperacionCajaChicaCLS ope)
        {
            return obj.GuardarOperacionCajaChica(ope);
        }
        public int GuardarCuadreCajaChica(CuadreCajaChicaCLS cuadre)
        {
            return obj.GuardarCuadreCajaChica(cuadre);
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
        public List<CuadreCajaChicaCLS> ObtenerCuadreCajaChica(FiltrosReporte objFiltros)
        {
            return obj.ObtenerCuadreCajaChica(objFiltros);
        }

    }
}
