using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos.Clases
{
    public class OperacionDA
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
                                   IdTabla = catalogo.DatoGeneralId
                               }).ToList();
                return lstCatalogo;
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
                    objOperacion.Comentario = ope.Comentario;

                    objOperacion.FlagSumaCajaSol = false;
                    objOperacion.FlagRestaCajaSol = false;
                    objOperacion.FlagSumaCajaDolar = false;
                    objOperacion.FlagRestaCajaDolar = false;
                    objOperacion.FlagSumaCajaEuro = false;
                    objOperacion.FlagRestaCajaEuro = false;
                    if (ope.TipoOperacion == 1 || ope.TipoOperacion == 2)
                    {
      
                        objOperacion.MontoSalida = ope.MontoSalida;

                        //Cambio de Dólares a Soles
                        if (objOperacion.MonedaDe == 2 && objOperacion.MonedaA == 1)
                        {
                            objOperacion.FlagSumaCajaDolar = true;
                            objOperacion.FlagRestaCajaSol = true;
                        }
                        //Cambio de Soles a Dólares
                        if (objOperacion.MonedaDe == 1 && objOperacion.MonedaA == 2)
                        {
                            objOperacion.FlagSumaCajaSol = true;
                            objOperacion.FlagRestaCajaDolar = true;
                        }
                        //Cambio de Euros a Soles
                        if (objOperacion.MonedaDe == 3 && objOperacion.MonedaA == 1)
                        {
                            objOperacion.FlagSumaCajaEuro = true;
                            objOperacion.FlagRestaCajaSol = true;
                        }
                        //Cambio de Soles a Euros
                        if (objOperacion.MonedaDe == 1 && objOperacion.MonedaA == 3)
                        {
                            objOperacion.FlagSumaCajaSol = true;
                            objOperacion.FlagRestaCajaEuro = true;
                        }
                    }
                    else
                    {
                        objOperacion.Moneda = ope.Moneda;
                        objOperacion.FlagSumaCajaSol = true;
                    }

                    objOperacion.HoraMovimiento = DateTime.Now;
                    objOperacion.FechaMovimiento = DateTime.Now;
                    objOperacion.Eliminado = false;
                    objOperacion.UsuarioCreacion = "Admin";
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
