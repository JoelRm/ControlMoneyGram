using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class OperacionNE
    {
        private static OperacionDA obj = new OperacionDA();

        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
        public ConfiguracionCajaCLS ObtenerConfCaja(string Usuario)
        {
            return obj.ObtenerConfCaja(Usuario);
        }

        public int GuardarOperacion(OperacionCLS ope)
        {
            return obj.GuardarOperacion(ope);
        }
        public int GuardarCuadreCaja(CuadreCajaCLS cuadre)
        {
            return obj.GuardarCuadreCaja(cuadre);
        }      
        public int GuardarOperacionCalculadora(CalculadoraCLS ope)
        {
            return obj.GuardarOperacionCalculadora(ope);
        }
        public List<OperacionCLS> ObtenerListaOperaciones()
        {
            return obj.ObtenerListaOperaciones();
        }
        public List<CalculadoraCLS> ObtenerListaOperacionesCalculadora()
        {
            return obj.ObtenerListaOperacionesCalculadora();
        }
        public int AnularOperacion(int idOperacion, string Usuario)
        {
            return obj.AnularOperacion(idOperacion, Usuario);
        }
        public List<CuadreCajaCLS> ObtenerCuadreCaja(FiltrosReporte objFiltros)
        {
            return obj.ObtenerCuadreCaja(objFiltros);
        }
        public TotalCajasCLS ObtenerTotalCajas()
        {
            return obj.ObtenerTotalCajas();
        }
    }
}
