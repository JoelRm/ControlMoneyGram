using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Datos.Clases
{
    public class UsuariosDA
    {
        public List<UsuariosCLS> ListarUsuarios()
        {
            List<UsuariosCLS> lstUsuario = null;
            using (var db = new BDControlMGEntities())
            {
                lstUsuario = (from usu in db.Usuario
                              join rol in db.Rol on usu.IdRol equals rol.IdRol
                              where usu.EstadoEliminacion == false
                              select new UsuariosCLS
                              {
                                  IdUsuario = usu.IdUsuario,
                                  NombreUsuario = usu.NombreUsuario,
                                  ApMaternoUsuario = usu.ApMaternoUsuario,
                                  ApPaternoUsuario = usu.ApPaternoUsuario,
                                  IdRol = usu.IdRol,
                                  Usser = usu.Usser,
                                  Password = usu.Password,
                                  EmailUsuario = usu.EmailUsuario,
                                  FechaCreacion = usu.FechaCreacion,
                                  UsuarioCreacion = usu.UsuarioCreacion,
                                  FechaModificacion = usu.FechaModificacion,
                                  UsuarioModificacion = usu.UsuarioModificacion,
                                  EstadoUsuario = usu.EstadoUsuario,
                                  FechaCreacionJS = usu.FechaCreacion.ToString(),
                                  NombreCargo = rol.NombreRol
                              }).ToList();

                return lstUsuario;
            }
        }

        public int AgregarUsuario(UsuariosCLS objUsuarioCLS)
        {
            int CodResult = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {

                    if (validarUsuario(objUsuarioCLS.Usser))
                    {
                        Usuario objUsuario = new Usuario();
                        objUsuario.IdRol = objUsuarioCLS.IdRol;
                        objUsuario.NombreUsuario = objUsuarioCLS.NombreUsuario;
                        objUsuario.ApMaternoUsuario = objUsuarioCLS.ApMaternoUsuario;
                        objUsuario.ApPaternoUsuario = objUsuarioCLS.ApPaternoUsuario;
                        objUsuario.EmailUsuario = objUsuarioCLS.EmailUsuario;
                        objUsuario.TelefonoUsuario = objUsuarioCLS.TelefonoUsuario;
                        objUsuario.Usser = objUsuarioCLS.Usser;
                        objUsuario.Password = objUsuarioCLS.Password;
                        objUsuario.FechaCreacion = DateTime.Now;
                        objUsuario.UsuarioCreacion = "Admin";
                        objUsuario.FechaModificacion = DateTime.Now;
                        objUsuario.UsuarioModificacion = "Admin";
                        objUsuario.EstadoUsuario = true;
                        objUsuario.EstadoEliminacion = false;
                        db.Usuario.Add(objUsuario);
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

        private bool validarUsuario(string nombreUsuario)
        {
            List<UsuariosCLS> lstUsuario = null;
            bool rpta = true;
            using (var db = new BDControlMGEntities())
            {
                lstUsuario = (from usu in db.Usuario
                              where usu.EstadoEliminacion == false && usu.EstadoUsuario == true && usu.Usser.ToUpper().Equals(nombreUsuario.ToUpper())
                              select new UsuariosCLS
                              {
                                  IdRol = usu.IdUsuario

                              }).ToList();

                if (lstUsuario.Count > 0)
                {
                    rpta = false;
                }
            }
            return rpta;
        }

        public int CambiarEstadoUsuario(UsuariosCLS objUsuarioCLS)
        {
            int codigoRpt = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {
                    Usuario oUsuario = db.Usuario.Where(p => p.IdUsuario.Equals(objUsuarioCLS.IdUsuario)).First();

                    if (oUsuario.EstadoUsuario)
                        objUsuarioCLS.EstadoUsuario = false;
                    else
                        objUsuarioCLS.EstadoUsuario = true;

                    oUsuario.EstadoUsuario = objUsuarioCLS.EstadoUsuario;
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

        public UsuariosCLS ObtenerUsuarioPorId(int idUsu)
        {
            UsuariosCLS objUsuariosCLS = new UsuariosCLS();
            using (var db = new BDControlMGEntities())
            {
                Usuario oUsuario = db.Usuario.Where(p => p.IdUsuario.Equals(idUsu)).First();
                objUsuariosCLS.IdUsuario = oUsuario.IdUsuario;
                objUsuariosCLS.NombreUsuario = oUsuario.NombreUsuario;
                objUsuariosCLS.ApPaternoUsuario = oUsuario.ApPaternoUsuario;
                objUsuariosCLS.ApMaternoUsuario = oUsuario.ApMaternoUsuario;
                objUsuariosCLS.EmailUsuario = oUsuario.EmailUsuario;
                objUsuariosCLS.TelefonoUsuario = oUsuario.TelefonoUsuario;
                objUsuariosCLS.IdRol = oUsuario.IdRol;
                objUsuariosCLS.Usser = oUsuario.Usser;
                objUsuariosCLS.Password = oUsuario.Password;
            }
            return objUsuariosCLS;
        }

        public int EditarUsuario(UsuariosCLS objUsuarioCls)
        {
            int cdgoRpt = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {
                    Usuario oUsuario = db.Usuario.Where(p => p.IdUsuario.Equals(objUsuarioCls.IdUsuario)).First();
                    oUsuario.IdRol = objUsuarioCls.IdRol;
                    oUsuario.NombreUsuario = objUsuarioCls.NombreUsuario;
                    oUsuario.ApMaternoUsuario = objUsuarioCls.ApMaternoUsuario;
                    oUsuario.ApPaternoUsuario = objUsuarioCls.ApPaternoUsuario;
                    oUsuario.EmailUsuario = objUsuarioCls.EmailUsuario;
                    oUsuario.TelefonoUsuario = objUsuarioCls.TelefonoUsuario;
                    oUsuario.Usser = objUsuarioCls.Usser;
                    oUsuario.Password = objUsuarioCls.Password;
                    oUsuario.FechaModificacion = DateTime.Now;
                    oUsuario.UsuarioModificacion = "Admin";
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

        public int EliminarUsuario(UsuariosCLS objUsuarioCls)
        {
            int cdgoRpt = 0;
            try
            {
                using (var db = new BDControlMGEntities())
                {
                    Usuario oUsuario = db.Usuario.Where(p => p.IdUsuario.Equals(objUsuarioCls.IdUsuario)).First();
                    oUsuario.EstadoEliminacion = true;
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

        public List<CalatogoCLS> CargaInicial()
        {
            List<CalatogoCLS> lstCatalogo = null;
            using (var db = new BDControlMGEntities())
            {
                lstCatalogo = (from catalogo in db.DatoGeneralDetalle
                               where catalogo.Habilitado == true && catalogo.DatoGeneralId == 3
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

        public UsuariosCLS ObtenerDatosUsuario(string usser, string pass)
        {
            UsuariosCLS objUsuariosCLS = new UsuariosCLS();
            using (var db = new BDControlMGEntities())
            {
                Usuario oUsuario = db.Usuario.Where(p => p.Usser.ToUpper().Trim() == usser.ToUpper().Trim() && p.Password == pass).SingleOrDefault();

                if (oUsuario != null)
                {
                    objUsuariosCLS.IdUsuario = oUsuario.IdUsuario;
                    objUsuariosCLS.NombreUsuario = oUsuario.NombreUsuario;
                    objUsuariosCLS.ApPaternoUsuario = oUsuario.ApPaternoUsuario;
                    objUsuariosCLS.ApMaternoUsuario = oUsuario.ApMaternoUsuario;
                    objUsuariosCLS.EmailUsuario = oUsuario.EmailUsuario;
                    objUsuariosCLS.TelefonoUsuario = oUsuario.TelefonoUsuario;
                    objUsuariosCLS.Usser = oUsuario.Usser;
                    objUsuariosCLS.IdRol = oUsuario.IdRol;
                }
            }
            return objUsuariosCLS;
        }

    }
}
