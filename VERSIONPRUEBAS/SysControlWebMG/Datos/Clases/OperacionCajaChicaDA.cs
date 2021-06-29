using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos.Clases
{
    public class OperacionCajaChicaDA
    {
        public List<CalatogoCLS> CargaInicial()
        {
            List<CalatogoCLS> lstCatalogo = null;
            using (var db = new BDControlMGEntities())
            {
                lstCatalogo = (from catalogo in db.DatoGeneralDetalle
                               where catalogo.Habilitado == true
                               select new CalatogoCLS
                               {
                                   IdItem = catalogo.DatoGeneralDetalleId,
                                   ValorItem = catalogo.ValorTabla.ToString(),
                                   NombreItem = catalogo.Descripcion,
                                   IdTabla = (int)catalogo.DatoGeneralId
                               }).ToList();
                return lstCatalogo;
            }
        }

        public ConfiguracionCajaChicaCLS ObtenerConfCajaChica(string Usuario)
        {
            ConfiguracionCajaChicaCLS lstConfCaja = null;
            using (var db = new BDControlMGEntities())
            {
                lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaChicaCLS>(
                "Usp_obtenerConfCajaChica @Usuario",
                new SqlParameter("@Usuario", Usuario)).SingleOrDefault();
            }
            return lstConfCaja;
        }

        public int GuardarOperacionCajaChicaCalculadora(CalculadoraCLS ope)
        {
            int CodResult = 0;
            try
            {
                var comentario = "";
                if (ope.Comentario is null) { comentario = ""; }
                else { comentario = ope.Comentario; }

                CalculadoraCLS lstCal = null;
                using (var db = new BDControlMGEntities())
                {
                    lstCal = db.Database.SqlQuery<CalculadoraCLS>(
                    "Usp_InsertUpdateOperacionCajaChicaCalculadora @idOperacionCajaChica,@OperacionCajaChica,@Resultado,@UsuarioCreacion,@TipoOpeIU,@Comentario",
                    new SqlParameter("@idOperacionCajaChica", ope.idOperacion),
                    new SqlParameter("@OperacionCajaChica", ope.Operacion),
                    new SqlParameter("@Resultado", ope.Resultado),
                    new SqlParameter("@UsuarioCreacion", "ecamarena"),
                    new SqlParameter("@TipoOpeIU", "Insert"),
                    new SqlParameter("@Comentario", comentario)
                    ).SingleOrDefault();
                    CodResult = 1;
                }
            }
            catch (Exception ex)
            {
                CodResult = 0;
            }

            return CodResult;
        }

        public int GuardarCuadreCajaChica(CuadreCajaChicaCLS cuadre)
        {
            int CodResult = 0;
            try
            {

                CuadreCajaChicaCLS Cuadre = null;
                using (var db = new BDControlMGEntities())
                {
                    Cuadre = db.Database.SqlQuery<CuadreCajaChicaCLS>(
                    "Usp_InsertCuadreCajaChica @CajaChicaSolesSistema,@CajaChicaSolesCuadre,@CajaChicaDolaresSistema,@CajaChicaDolaresCuadre,@CajaChicaEurosSistema,@CajaChicaEurosCuadre,@CantidadxBilletexMoneda,@NumeroBilletesDeteriorados,@UsuarioCreacion,@Comentario",
                    new SqlParameter("@CajaChicaSolesSistema", cuadre.CajaChicaSolesSistema),
                    new SqlParameter("@CajaChicaSolesCuadre", cuadre.CajaChicaSolesCuadre),
                    new SqlParameter("@CajaChicaDolaresSistema", cuadre.CajaChicaDolaresSistema),
                    new SqlParameter("@CajaChicaDolaresCuadre", cuadre.CajaChicaDolaresCuadre),
                    new SqlParameter("@CajaChicaEurosSistema", cuadre.CajaChicaEurosSistema),
                    new SqlParameter("@CajaChicaEurosCuadre", cuadre.CajaChicaEurosCuadre),
                    new SqlParameter("@CantidadxBilletexMoneda", cuadre.CantidadxBilletexMoneda),
                    new SqlParameter("@NumeroBilletesDeteriorados", cuadre.NumeroBilletesDeteriorados),
                    new SqlParameter("@UsuarioCreacion", cuadre.UsuarioCreacion),
                    new SqlParameter("@Comentario", cuadre.Comentario)
                    ).SingleOrDefault();
                    CodResult = 1;
                }
            }
            catch (Exception ex)
            {
                CodResult = 0;
            }

            return CodResult;
        }




        public int GuardarOperacionCajaChica(OperacionCajaChicaCLS ope)
        {
            int CodResult = 0;
            decimal MontoIngreso = 0;
            decimal MontoSalida = 0;
            int TipoOperacionCajaChica = ope.TipoOperacionCajaChica;
            string Comentario = "";
            if (ope.Comentario is null) { Comentario = ""; }
            else { Comentario = ope.Comentario; }
            int Moneda = ope.Moneda;
            bool FlagSumaCajaChicaSol = false;
            bool FlagRestaCajaChicaSol = false;
            bool FlagSumaCajaChicaDolar = false;
            bool FlagRestaCajaChicaDolar = false;
            bool FlagSumaCajaChicaEuro = false;
            bool FlagRestaCajaChicaEuro = false;
            bool Eliminado = false;
            decimal TipoCambio = ope.TipoCambio;
            string UsuarioCreacion = ope.UsuarioCreacion;

            if (ope.TipoOperacionCajaChica == 1)
            {
                FlagSumaCajaChicaDolar = true;
                FlagRestaCajaChicaSol = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else if (ope.TipoOperacionCajaChica == 2)
            {
                FlagSumaCajaChicaSol = true;
                FlagRestaCajaChicaDolar = true;
                MontoIngreso = ope.MontoSalida;
                MontoSalida = ope.MontoIngreso;
            }
            else if (ope.TipoOperacionCajaChica == 3)
            {
                FlagSumaCajaChicaEuro = true;
                FlagRestaCajaChicaSol = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else if (ope.TipoOperacionCajaChica == 4)
            {
                FlagSumaCajaChicaSol = true;
                FlagRestaCajaChicaEuro = true;
                MontoIngreso = ope.MontoSalida;
                MontoSalida = ope.MontoIngreso;
            }
            else if (ope.TipoOperacionCajaChica == 5)
            {
                FlagSumaCajaChicaDolar = true;
                FlagRestaCajaChicaEuro = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else if (ope.TipoOperacionCajaChica == 6)
            {
                FlagRestaCajaChicaDolar = true;
                FlagSumaCajaChicaEuro = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else
            {
                MontoIngreso = ope.MontoIngreso;
                if (ope.TipoOperacionCajaChica == 7 || ope.TipoOperacionCajaChica == 8)
                {
                    if (ope.Moneda == 1)
                        FlagSumaCajaChicaSol = true;
                    if (ope.Moneda == 2)
                        FlagSumaCajaChicaDolar = true;
                    if (ope.Moneda == 3)
                        FlagSumaCajaChicaEuro = true;
                }
                if (ope.TipoOperacionCajaChica == 9 || ope.TipoOperacionCajaChica == 10)
                {
                    if (ope.Moneda == 1)
                        FlagRestaCajaChicaSol = true;
                    if (ope.Moneda == 2)
                        FlagRestaCajaChicaDolar = true;
                    if (ope.Moneda == 3)
                        FlagRestaCajaChicaEuro = true;
                }
            }

            try
            {
                OperacionCajaChicaCLS lstOpe = null;

                using (var db = new BDControlMGEntities())
                {
                    lstOpe = db.Database.SqlQuery<OperacionCajaChicaCLS>(
                       "Usp_InsertOperacionCajaChica @MontoIngreso,@MontoSalida,@TipoOperacionCajaChica,@Comentario,@Moneda," +
                       "@FlagSumaCajaChicaSol,@FlagRestaCajaChicaSol,@FlagSumaCajaChicaDolar,@FlagRestaCajaChicaDolar,@FlagSumaCajaChicaEuro," +
                       "@FlagRestaCajaChicaEuro,@Eliminado,@TipoCambio,@UsuarioCreacion",
                       new SqlParameter("@MontoIngreso", MontoIngreso),
                       new SqlParameter("@MontoSalida", MontoSalida),
                       new SqlParameter("@TipoOperacionCajaChica", TipoOperacionCajaChica),
                       new SqlParameter("@Comentario", Comentario),
                       new SqlParameter("@Moneda", Moneda),
                       new SqlParameter("@FlagSumaCajaChicaSol", FlagSumaCajaChicaSol),
                       new SqlParameter("@FlagRestaCajaChicaSol", FlagRestaCajaChicaSol),
                       new SqlParameter("@FlagSumaCajaChicaDolar", FlagSumaCajaChicaDolar),
                       new SqlParameter("@FlagRestaCajaChicaDolar", FlagRestaCajaChicaDolar),
                       new SqlParameter("@FlagSumaCajaChicaEuro", FlagSumaCajaChicaEuro),
                       new SqlParameter("@FlagRestaCajaChicaEuro", FlagRestaCajaChicaEuro),
                       new SqlParameter("@Eliminado", Eliminado),
                       new SqlParameter("@TipoCambio", TipoCambio),
                       new SqlParameter("@UsuarioCreacion", UsuarioCreacion)
                       ).SingleOrDefault();
                    CodResult = 1;
                }
            }
            catch (Exception e)
            {
                CodResult = 0;
            }
            return CodResult;
        }

        
        

        public List<OperacionCajaChicaCLS> ObtenerListaOperacionesCajaChica()
        {
            List<OperacionCajaChicaCLS> lstListaOperacionesCajaChica = new List<OperacionCajaChicaCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstListaOperacionesCajaChica = db.Database.SqlQuery<OperacionCajaChicaCLS>("Usp_obtenerListaOperacionesCajaChica").ToList();
            }
            return lstListaOperacionesCajaChica;
        }

        public List<CalculadoraCLS> ObtenerListaOperacionesCajaChicaCalculadora()
        {
            List<CalculadoraCLS> lstListaOperacionesCajaChica = new List<CalculadoraCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstListaOperacionesCajaChica = db.Database.SqlQuery<CalculadoraCLS>("Usp_obtenerListaOperacionesCajaChicaCalculadora").ToList();
            }
            return lstListaOperacionesCajaChica;
        }

        public int AnularOperacionCajaChica(int idOperacionCajaChica, string Usuario)
        {
            int rpta = 0;
            OperacionCajaChicaCLS lstOpe = null;

            using (var db = new BDControlMGEntities())
            {
                lstOpe = db.Database.SqlQuery<OperacionCajaChicaCLS>(
                "Usp_AnularOperacionCajaChica @IdOperacionCajaChica,@Usuario",
                new SqlParameter("IdOperacionCajaChica", idOperacionCajaChica),
                new SqlParameter("@Usuario", Usuario)).SingleOrDefault();
                rpta = 1;
            }
            return rpta;
        }
        public List<CuadreCajaChicaCLS> ObtenerCuadreCajaChica(FiltrosReporte objFiltros)
        {
            List<CuadreCajaChicaCLS> lstVerCuadreCajaChica = new List<CuadreCajaChicaCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstVerCuadreCajaChica = db.Database.SqlQuery<CuadreCajaChicaCLS>(
                "exec Usp_ObtenerCuadreCajaChica @Fecha, @Usuario",
                new SqlParameter("@Fecha", objFiltros.Fecha),
                new SqlParameter("@Usuario", objFiltros.Usuario)).ToList();
            }
            return lstVerCuadreCajaChica;
        }
    }
}
