using Entidades;
using Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class RolController : Controller
    {
        RolNE objRol = new RolNE();
        // GET: Rol
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ListarRoles()
        {
            var lstRoles = objRol.ListarRoles();
            return Json(new { lstRoles, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult AgregarRol(RolCLS rol)
        {
            int codigoRpt = objRol.AgregarRol(rol);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerRolPorId(int IdRol)
        {
            var rolCLS = objRol.ObtenerRolPorId(IdRol);
            return Json(new { rolCLS, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult EditarRol(RolCLS objRolCLS)
        {
            int codigoRpt = objRol.EditarRol(objRolCLS);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult EliminarRol(int IdRol)
        {
            int codigoRpt = objRol.EliminarRol(IdRol);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult CambiarEstadoRol(int IdRol)
        {
            var codigRpt = objRol.CambiarEstadoRol(IdRol);
            return Json(new { Code = codigRpt, JsonRequestBehavior.AllowGet });
        }
    }
}