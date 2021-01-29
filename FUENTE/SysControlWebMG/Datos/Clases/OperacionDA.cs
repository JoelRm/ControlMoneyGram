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
                                  IdTabla = catalogo.DatoGeneralId
                              }).ToList();
                return lstCatalogo;
            }
        }

        public ConfiguracionCajaCLS ObtenerConfCaja()
        {
            ConfiguracionCajaCLS lstConfCaja = null;
             using (var db = new BDControlMGEntities())
            {
                lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaCLS>("Usp_obtenerConfCaja").SingleOrDefault();
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
            string UsuarioCreacion = "ecamarena";

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
                if (ope.Moneda == 1)
                    FlagSumaCajaSol = true;
                if (ope.Moneda == 2)
                    FlagSumaCajaDolar = true;
                if (ope.Moneda == 3)
                    FlagSumaCajaEuro = true;
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

        //public int GuardarOperacion(OperacionCLS ope)
        //{
        //    int CodResult = 0;

        //    try
        //    {
        //        using (var db = new BDControlMGEntities())
        //        {
        //            Operacion objOperacion = new Operacion();
        //            objOperacion.TipoOperacion = ope.TipoOperacion;

        //            objOperacion.MontoIngreso = ope.MontoIngreso;
        //            objOperacion.MontoSalida = ope.MontoSalida;

        //            objOperacion.Comentario = ope.Comentario;
        //            objOperacion.Moneda = ope.Moneda;
        //            objOperacion.TipoCambio = ope.TipoCambio;

        //            objOperacion.FlagSumaCajaSol = false;
        //            objOperacion.FlagRestaCajaSol = false;
        //            objOperacion.FlagSumaCajaDolar = false;
        //            objOperacion.FlagRestaCajaDolar = false;
        //            objOperacion.FlagSumaCajaEuro = false;
        //            objOperacion.FlagRestaCajaEuro = false;
        //            if (ope.TipoOperacion == 1)
        //            {
        //                objOperacion.FlagSumaCajaDolar = true;
        //                objOperacion.FlagRestaCajaSol = true;
        //                objOperacion.MontoIngreso = ope.MontoIngreso;
        //                objOperacion.MontoSalida = ope.MontoSalida;
        //            }
        //            else if (ope.TipoOperacion == 2)
        //            {
        //                objOperacion.FlagSumaCajaSol = true;
        //                objOperacion.FlagRestaCajaDolar = true;
        //                objOperacion.MontoIngreso = ope.MontoSalida;
        //                objOperacion.MontoSalida = ope.MontoIngreso;
        //            }
        //            else if (ope.TipoOperacion == 3)
        //            {
        //                objOperacion.FlagSumaCajaEuro = true;
        //                objOperacion.FlagRestaCajaSol = true;
        //                objOperacion.MontoIngreso = ope.MontoIngreso;
        //                objOperacion.MontoSalida = ope.MontoSalida;
        //            }
        //            else if (ope.TipoOperacion == 4)
        //            {
        //                objOperacion.FlagSumaCajaSol = true;
        //                objOperacion.FlagRestaCajaEuro = true;
        //                objOperacion.MontoIngreso = ope.MontoSalida;
        //                objOperacion.MontoSalida = ope.MontoIngreso;
        //            }
        //            else if (ope.TipoOperacion == 5)
        //            {
        //                objOperacion.FlagSumaCajaDolar = true;
        //                objOperacion.FlagRestaCajaEuro = true;
        //                objOperacion.MontoIngreso = ope.MontoIngreso;
        //                objOperacion.MontoSalida = ope.MontoSalida;
        //            }
        //            else if (ope.TipoOperacion == 6)
        //            {
        //                objOperacion.FlagRestaCajaDolar = true;
        //                objOperacion.FlagSumaCajaEuro = true;
        //                objOperacion.MontoIngreso = ope.MontoIngreso;
        //                objOperacion.MontoSalida = ope.MontoSalida;
        //            }
        //            else
        //            {
        //                objOperacion.MontoIngreso = ope.MontoIngreso;
        //                if(objOperacion.Moneda == 1)
        //                    objOperacion.FlagSumaCajaSol = true;
        //                if (objOperacion.Moneda == 2)
        //                    objOperacion.FlagSumaCajaDolar = true;
        //                if (objOperacion.Moneda == 3)
        //                    objOperacion.FlagSumaCajaEuro = true;
        //            }

        //            objOperacion.HoraMovimiento = DateTime.Now;
        //            objOperacion.FechaMovimiento = DateTime.Now;
        //            objOperacion.Eliminado = false;
        //            objOperacion.UsuarioCreacion = "ecamarena";
        //            objOperacion.FechaCreacion = DateTime.Now;
        //            db.Operacion.Add(objOperacion);
        //            db.SaveChanges();
        //            CodResult = 1;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        CodResult = 0;
        //    }
        //    return CodResult;
        //}
    }
}
