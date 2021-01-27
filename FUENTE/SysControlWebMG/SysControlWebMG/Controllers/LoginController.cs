using Entidades;
using Negocio;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class LoginController : Controller
    {
        UsuariosNE objUsuario = new UsuariosNE();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ValidarUsuario(UsuariosCLS usu)
        {
            UsuariosCLS oUsuario = new UsuariosCLS();
            oUsuario = objUsuario.ObtenerDatosUsuario(usu.Usser, usu.Password);
            Session["Usuario"] = oUsuario;
            return Json(new { oUsuario, JsonRequestBehavior.AllowGet });
        }
    }
}