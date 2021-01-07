using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class OperacionController : Controller
    {
        // GET: Operacion
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListaOperaciones()
        {
            return View();
        }
    }
}