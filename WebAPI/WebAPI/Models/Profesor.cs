using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Profesor
    {
        public int ProfesorID { get; set; }

        public string Nombre { get; set; }
    }

    public class ProfesorPOST
    {
        public string Nombre { get; set; }
    }
}
