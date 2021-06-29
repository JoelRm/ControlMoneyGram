using Entidades;
using Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            OperacionNE objOpe = new OperacionNE();
            TotalCajasCLS oTotal = new TotalCajasCLS();
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            oTotal = objOpe.ObtenerTotalCajas();
            return View(oTotal);
        }
    }
}