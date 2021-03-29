using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos.Clases
{
    public class OperacionDA
    {

        public List<CalatogoCLS> CargaInicial()        {
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

        public ConfiguracionCajaCLS ObtenerConfCaja(string Usuario)
        {
            ConfiguracionCajaCLS lstConfCaja = null;
             using (var db = new BDControlMGEntities())
            {
                //lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaCLS>("Usp_obtenerConfCaja").SingleOrDefault();
                lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaCLS>(
                "Usp_obtenerConfCaja @Usuario",
                new SqlParameter("@Usuario", Usuario)).SingleOrDefault();
            }
            return lstConfCaja;
        }

        public int GuardarOperacionCalculadora(CalculadoraCLS ope)
        {
            int CodResult = 0;
            try
            {
                var comentario = "";      
                if (ope.Comentario is null) {comentario = "";}
                else { comentario = ope.Comentario;}
                
                CalculadoraCLS lstCal = null;
                using (var db = new BDControlMGEntities())
                {
                    lstCal = db.Database.SqlQuery<CalculadoraCLS>(
                    "Usp_InsertUpdateOperacionCalculadora @idOperacion,@Operacion,@Resultado,@UsuarioCreacion,@TipoOpeIU,@Comentario",
                    new SqlParameter("@idOperacion", ope.idOperacion),
                    new SqlParameter("@Operacion", ope.Operacion),
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

        public int GuardarOperacion(OperacionCLS ope)
        {
            int CodResult = 0;
            decimal MontoIngreso = 0;
            decimal MontoSalida = 0;
            int TipoOperacion = ope.TipoOperacion;
            string Comentario = "";
            if (ope.Comentario is null) { Comentario = ""; }
            else { Comentario = ope.Comentario; }
            int Moneda = ope.Moneda;
            bool FlagSumaCajaSol = false;
            bool FlagRestaCajaSol = false;
            bool FlagSumaCajaDolar = false;
            bool FlagRestaCajaDolar = false;
            bool FlagSumaCajaEuro = false;
            bool FlagRestaCajaEuro = false;
            bool Eliminado = false;
            decimal TipoCambio = ope.TipoCambio;
            string UsuarioCreacion = ope.UsuarioCreacion;

            if (ope.TipoOperacion == 1)
            {
                FlagSumaCajaDolar = true;
                FlagRestaCajaSol = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else if (ope.TipoOperacion == 2)
            {
                FlagSumaCajaSol = true;
                FlagRestaCajaDolar = true;
                MontoIngreso = ope.MontoSalida;
                MontoSalida = ope.MontoIngreso;
            }
            else if (ope.TipoOperacion == 3)
            {
                FlagSumaCajaEuro = true;
                FlagRestaCajaSol = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else if (ope.TipoOperacion == 4)
            {
                FlagSumaCajaSol = true;
                FlagRestaCajaEuro = true;
                MontoIngreso = ope.MontoSalida;
                MontoSalida = ope.MontoIngreso;
            }
            else if (ope.TipoOperacion == 5)
            {
                FlagSumaCajaDolar = true;
                FlagRestaCajaEuro = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else if (ope.TipoOperacion == 6)
            {
                FlagRestaCajaDolar = true;
                FlagSumaCajaEuro = true;
                MontoIngreso = ope.MontoIngreso;
                MontoSalida = ope.MontoSalida;
            }
            else
            {
                MontoIngreso = ope.MontoIngreso;
                if (ope.TipoOperacion == 7 || ope.TipoOperacion == 8 )
                {
                    if (ope.Moneda == 1)
                        FlagSumaCajaSol = true;
                    if (ope.Moneda == 2)
                        FlagSumaCajaDolar = true;
                    if (ope.Moneda == 3)
                        FlagSumaCajaEuro = true;
                }
                if (ope.TipoOperacion == 9 || ope.TipoOperacion == 10)
                {
                    if (ope.Moneda == 1)
                        FlagRestaCajaSol = true;
                    if (ope.Moneda == 2)
                        FlagRestaCajaDolar = true;
                    if (ope.Moneda == 3)
                        FlagRestaCajaEuro = true;
                }
            }

            try
            {
                OperacionCLS lstOpe = null;

                using (var db = new BDControlMGEntities())
                {
                    lstOpe = db.Database.SqlQuery<OperacionCLS>(
                       "Usp_InsertOperacion @MontoIngreso,@MontoSalida,@TipoOperacion,@Comentario,@Moneda," +
                       "@FlagSumaCajaSol,@FlagRestaCajaSol,@FlagSumaCajaDolar,@FlagRestaCajaDolar,@FlagSumaCajaEuro," +
                       "@FlagRestaCajaEuro,@Eliminado,@TipoCambio,@UsuarioCreacion",
                       new SqlParameter("@MontoIngreso", MontoIngreso),
                       new SqlParameter("@MontoSalida", MontoSalida),
                       new SqlParameter("@TipoOperacion", TipoOperacion),
                       new SqlParameter("@Comentario", Comentario),
                       new SqlParameter("@Moneda", Moneda),
                       new SqlParameter("@FlagSumaCajaSol", FlagSumaCajaSol),
                       new SqlParameter("@FlagRestaCajaSol", FlagRestaCajaSol),
                       new SqlParameter("@FlagSumaCajaDolar", FlagSumaCajaDolar),
                       new SqlParameter("@FlagRestaCajaDolar", FlagRestaCajaDolar),
                       new SqlParameter("@FlagSumaCajaEuro", FlagSumaCajaEuro),
                       new SqlParameter("@FlagRestaCajaEuro", FlagRestaCajaEuro),
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

        public List<OperacionCLS> ObtenerListaOperaciones()
        {
            List<OperacionCLS> lstListaOperaciones = new List<OperacionCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstListaOperaciones = db.Database.SqlQuery<OperacionCLS>("Usp_obtenerListaOperaciones").ToList();
            }
            return lstListaOperaciones;
        }

        public List<CalculadoraCLS> ObtenerListaOperacionesCalculadora()
        {
            List<CalculadoraCLS> lstListaOperaciones = new List<CalculadoraCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstListaOperaciones = db.Database.SqlQuery<CalculadoraCLS>("Usp_obtenerListaOperacionesCalculadora").ToList();
            }
            return lstListaOperaciones;
        }

        public int AnularOperacion(int idOperacion, string Usuario)
        {
            int rpta = 0;
            OperacionCLS lstOpe = null;

            using (var db = new BDControlMGEntities())
            {
                lstOpe = db.Database.SqlQuery<OperacionCLS>(
                "Usp_AnularOperacion @IdOperacion,@Usuario",
                new SqlParameter("IdOperacion", idOperacion),
                new SqlParameter("@Usuario", Usuario)).SingleOrDefault();
                rpta = 1;
            }
            return rpta;
        }

    }
}
