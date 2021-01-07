using Negocio;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class UsuariosController : Controller
    {
        UsuariosNE objUsuario = new UsuariosNE();
        // GET: Usuarios
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ListarUsuarios()
        {
            var lstUsuarios = objUsuario.ListarUsuarios();
            return Json(new { lstUsuarios, JsonRequestBehavior.AllowGet });
        }

    }
}