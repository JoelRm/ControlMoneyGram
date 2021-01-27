using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
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

        public List<ConfiguracionCajaCLS> ObtenerConfiguracionCaja()
        {
            List<ConfiguracionCajaCLS> lstConfCaja = null;
            using (var db = new BDControlMGEntities())
            {
                lstConfCaja = (from catalogo in db.DatoGeneralDetalle
                               where catalogo.Habilitado == true
                               select new ConfiguracionCajaCLS
                               {
                                   CajaActualSoles = 3000,
                                   CajaActualDolares = 2000,
                                   CajaActualEuros = 3000,
                                   TCCompraDolar = Convert.ToDecimal(3.20),
                                   TCVentaDolar = Convert.ToDecimal(3.50),
                                   TCCompraEuro = Convert.ToDecimal(3.60),
                                   TCVentaEuro = Convert.ToDecimal(3.90)
                               }).ToList();
                return lstConfCaja;
            }
        }


        public int GuardarOperacion(OperacionCLS ope)
        {
            int CodResult = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {
                    Operacion objOperacion = new Operacion();
                    objOperacion.TipoOperacion = ope.TipoOperacion;

                    objOperacion.MontoIngreso = ope.MontoIngreso;
                    objOperacion.MontoSalida = ope.MontoSalida;

                    objOperacion.Comentario = ope.Comentario;
                    objOperacion.Moneda = ope.Moneda;
                    objOperacion.TipoCambio = ope.TipoCambio;

                    objOperacion.FlagSumaCajaSol = false;
                    objOperacion.FlagRestaCajaSol = false;
                    objOperacion.FlagSumaCajaDolar = false;
                    objOperacion.FlagRestaCajaDolar = false;
                    objOperacion.FlagSumaCajaEuro = false;
                    objOperacion.FlagRestaCajaEuro = false;
                    if (ope.TipoOperacion == 1)
                    {
                        objOperacion.FlagSumaCajaDolar = true;
                        objOperacion.FlagRestaCajaSol = true;
                        objOperacion.MontoIngreso = ope.MontoIngreso;
                        objOperacion.MontoSalida = ope.MontoSalida;
                    }
                    else if (ope.TipoOperacion == 2)
                    {
                        objOperacion.FlagSumaCajaSol = true;
                        objOperacion.FlagRestaCajaDolar = true;
                        objOperacion.MontoIngreso = ope.MontoSalida;
                        objOperacion.MontoSalida = ope.MontoIngreso;
                    }
                    else if (ope.TipoOperacion == 3)
                    {
                        objOperacion.FlagSumaCajaEuro = true;
                        objOperacion.FlagRestaCajaSol = true;
                        objOperacion.MontoIngreso = ope.MontoIngreso;
                        objOperacion.MontoSalida = ope.MontoSalida;
                    }
                    else if (ope.TipoOperacion == 4)
                    {
                        objOperacion.FlagSumaCajaSol = true;
                        objOperacion.FlagRestaCajaEuro = true;
                        objOperacion.MontoIngreso = ope.MontoSalida;
                        objOperacion.MontoSalida = ope.MontoIngreso;
                    }
                    else if (ope.TipoOperacion == 5)
                    {
                        objOperacion.FlagSumaCajaDolar = true;
                        objOperacion.FlagRestaCajaEuro = true;
                        objOperacion.MontoIngreso = ope.MontoIngreso;
                        objOperacion.MontoSalida = ope.MontoSalida;
                    }
                    else if (ope.TipoOperacion == 6)
                    {
                        objOperacion.FlagRestaCajaDolar = true;
                        objOperacion.FlagSumaCajaEuro = true;
                        objOperacion.MontoIngreso = ope.MontoIngreso;
                        objOperacion.MontoSalida = ope.MontoSalida;
                    }
                    else
                    {
                        objOperacion.MontoIngreso = ope.MontoIngreso;
                        if(objOperacion.Moneda == 1)
                            objOperacion.FlagSumaCajaSol = true;
                        if (objOperacion.Moneda == 2)
                            objOperacion.FlagSumaCajaDolar = true;
                        if (objOperacion.Moneda == 3)
                            objOperacion.FlagSumaCajaEuro = true;
                    }

                    objOperacion.HoraMovimiento = DateTime.Now;
                    objOperacion.FechaMovimiento = DateTime.Now;
                    objOperacion.Eliminado = false;
                    objOperacion.UsuarioCreacion = "ecamarena";
                    objOperacion.FechaCreacion = DateTime.Now;
                    db.Operacion.Add(objOperacion);
                    db.SaveChanges();
                    CodResult = 1;
                }
            }
            catch (Exception e)
            {
                CodResult = 0;
            }
            return CodResult;
        }
    }
}
