using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Data
{
    public static class DbInitializer
    {
        /// <summary>
        /// Inicializar y generar datos en la BD
        /// </summary>
        /// <param name="context"></param>
        public static void Initialize(WebAPIContext context)
        {
            context.Database.EnsureCreated();



            context.SaveChanges();
        }
    }
}
