using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Estudiante
    {
        public int EstudianteID { get; set; }
        public string Nombre { get; set; }
    }

    public class EstudiantePOST
    {
        public string Nombre { get; set; }
    }
}
