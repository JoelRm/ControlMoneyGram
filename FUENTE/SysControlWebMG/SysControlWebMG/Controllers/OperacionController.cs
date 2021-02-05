using Entidades;
using Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class OperacionController : Controller
    {
        OperacionNE objOperacion = new OperacionNE();
        UsuariosCLS objUsuarioCLS = new UsuariosCLS();
        // GET: Operacion
        public ActionResult Index()
        {
            
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            return View();
        }

        public ActionResult VerOperaciones()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            return View();
        }

        [HttpPost]
        public JsonResult CargaInicial()
        {
            var lstCargaInicial = objOperacion.CargaInicial();
            return Json(new { lstCargaInicial, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerConfCaja()
        {
            var lstConfCaja = objOperacion.ObtenerConfCaja();
            return Json(new { lstConfCaja, JsonRequestBehavior.AllowGet });
        }

        [HttpPost()]
        public async Task<JsonResult> GuardarOperacion(OperacionCLS ope)
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ope.UsuarioCreacion = objUsuarioCLS.Usser;
            int codigoRpt = objOperacion.GuardarOperacion(ope);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost()]
        public async Task<JsonResult> GuardarOperacionCalculadora(CalculadoraCLS ope)
        {
            int codigoRpt = objOperacion.GuardarOperacionCalculadora(ope);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerListaOperaciones(OperacionCLS ope)
        {
            var lstOperaciones = objOperacion.ObtenerListaOperaciones(ope);
            return Json(new { lstOperaciones, JsonRequestBehavior.AllowGet });
        }
    }
}