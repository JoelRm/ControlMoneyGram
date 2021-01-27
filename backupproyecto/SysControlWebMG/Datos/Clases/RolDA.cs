using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Datos.Clases
{
    public class RolDA
    {
        public List<RolCLS> ListarRolesForCombo()
        {
            List<RolCLS> lstRol = null;
            using (var db = new BDControlMGEntities())
            {
                lstRol = (from rol in db.Rol
                            where rol.EstadoEliminacion == false && rol.EstadoRol == true
                            select new RolCLS
                            {
                                IdRol = rol.IdRol,
                                NombreRol = rol.NombreRol

                            }).ToList();

                return lstRol;
            }
        }

        public List<RolCLS> ListarRoles()
        {
            List<RolCLS> lstRol = null;
            using (var db = new BDControlMGEntities())
            {
                lstRol = (from rol in db.Rol
                          where rol.EstadoEliminacion == false
                          select new RolCLS
                          {
                              IdRol = rol.IdRol,
                              NombreRol = rol.NombreRol,
                              EstadoRol = rol.EstadoRol,
                              UsuarioCreacion=rol.UsuarioCreacion,
                              FechaCreacionJS = rol.FechaCreacion.ToString()
                          }).ToList();

                return lstRol;
            }
        }

        public int AgregarRol(RolCLS objRolCLS)
        {
            int CodResult = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {

                    if (validarRol(objRolCLS.NombreRol))
                    {
                        Rol objRol = new Rol();
                        objRol.NombreRol = objRolCLS.NombreRol;
                        objRol.FechaCreacion = DateTime.Now;
                        objRol.UsuarioCreacion = "Admin";
                        objRol.FechaModificacion = DateTime.Now;
                        objRol.UsuarioModificacion = "Admin";
                        objRol.EstadoRol = true;
                        objRol.EstadoEliminacion = false;
                        db.Rol.Add(objRol);
                        db.SaveChanges();

                        CodResult = 1;
                    }
                    else
                    {
                        CodResult = 2;
                    }

                }
            }
            catch (Exception)
            {
                CodResult = 0;
            }
            return CodResult;
        }

        private bool validarRol(string nombreRol)
        {
            List<RolCLS> lstRol = null;
            bool rpta = true;
            using (var db = new BDControlMGEntities())
            {
                lstRol = (from rol in db.Rol
                        where rol.EstadoEliminacion == false && rol.EstadoRol == true && rol.NombreRol.ToUpper().Equals(nombreRol.ToUpper())
                        select new RolCLS
                        {
                            IdRol = rol.IdRol

                        }).ToList();

                if (lstRol.Count > 0)
                {
                    rpta = false;
                }
            }
            return rpta;
        }

        public RolCLS ObtenerRolPorId(int idRol)
        {
            RolCLS objRolCLS = new RolCLS();
            using (var db = new BDControlMGEntities())
            {
                Rol oRol = db.Rol.Where(p => p.IdRol.Equals(idRol)).First();
                objRolCLS.IdRol = oRol.IdRol;
                objRolCLS.NombreRol = oRol.NombreRol;
            }
            return objRolCLS;
        }

        public int EditarRol(RolCLS objRolCls)
        {
            int cdgoRpt = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {
                    Rol oRol = db.Rol.Where(p => p.IdRol.Equals(objRolCls.IdRol)).First();
                    oRol.IdRol = objRolCls.IdRol;
                    oRol.NombreRol = objRolCls.NombreRol;
                    oRol.FechaModificacion = DateTime.Now;
                    oRol.UsuarioModificacion = "Admin";
                    db.SaveChanges();
                    cdgoRpt = 1;
                }
            }
            catch (Exception e)
            {
                cdgoRpt = 0;
            }
            return cdgoRpt;
        }

        public int EliminarRol(int idRol)
        {
            int cdgoRpt = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {
                    Rol oRol = db.Rol.Where(p => p.IdRol.Equals(idRol)).First();
                    oRol.EstadoEliminacion = true;
                    db.SaveChanges();
                    cdgoRpt = 1;
                }
            }
            catch (Exception e)
            {
                cdgoRpt = 0;
            }
            return cdgoRpt;
        }

        public int CambiarEstadoRol(int idRol)
        {
            int codigoRpt = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {
                    Rol oRol = db.Rol.Where(p => p.IdRol.Equals(idRol)).First();

                    if (oRol.EstadoRol)
                        oRol.EstadoRol = false;
                    else
                        oRol.EstadoRol = true;
                    
                    db.SaveChanges();

                    codigoRpt = 1;
                }
            }
            catch (Exception e)
            {
                codigoRpt = 0;
                throw;
            }

            return codigoRpt;
        }

    }
}
