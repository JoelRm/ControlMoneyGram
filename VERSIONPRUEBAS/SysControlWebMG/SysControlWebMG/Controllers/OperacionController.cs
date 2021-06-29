﻿using Entidades;
using Negocio;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class OperacionController : Controller
    {
        OperacionNE objOperacion = new OperacionNE();
        UsuariosCLS objUsuarioCLS = new UsuariosCLS();
        UsuariosNE objUsuariosNE = new UsuariosNE();
        // GET: Operacion
        public ActionResult Index()
        { 
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            return View();
        }

        public ActionResult VerCuadreCaja()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            List<UsuariosCLS> ListaUsuarios = new List<UsuariosCLS>();
            ListaUsuarios = objUsuariosNE.ListarUsuarios();
            ListaUsuarios.Insert(0, new UsuariosCLS { Usser = "-- Seleccione --" });
            return View(ListaUsuarios);
        }
        public ActionResult VerOperaciones()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            return View();
        }

        public ActionResult CuadreCaja()
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
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            var lstConfCaja = objOperacion.ObtenerConfCaja(objUsuarioCLS.Usser);
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
        public async Task<JsonResult> GuardarCuadreCaja(CuadreCajaCLS cuadre)
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            cuadre.UsuarioCreacion = objUsuarioCLS.Usser;
            int codigoRpt = objOperacion.GuardarCuadreCaja(cuadre);
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
        public JsonResult AnularOperacion(int idOperacion)
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            var Code = objOperacion.AnularOperacion(idOperacion, objUsuarioCLS.Usser);
            return Json(new { Code, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerCuadreCaja(FiltrosReporte objFiltro)
        {
            var lstCuadreCaja = objOperacion.ObtenerCuadreCaja(objFiltro);
            return Json(new { lstCuadreCaja, JsonRequestBehavior.AllowGet });
        }
    }
}