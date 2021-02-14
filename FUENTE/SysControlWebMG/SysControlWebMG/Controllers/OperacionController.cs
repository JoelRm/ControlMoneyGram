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

        public ActionResult VerOperacionesCalculadora()
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
        public JsonResult ObtenerListaOperaciones()
        {
            var lstOperaciones = objOperacion.ObtenerListaOperaciones();
            return Json(new { lstOperaciones, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerListaOperacionesCalculadora()
        {
            var lstOperaciones = objOperacion.ObtenerListaOperacionesCalculadora();
            return Json(new { lstOperaciones, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult AnularOperacion(int idMovimiento)
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            var Code = objOperacion.AnularOperacion(idMovimiento, objUsuarioCLS.Usser);
            return Json(new { Code, JsonRequestBehavior.AllowGet });
        }
    }
}