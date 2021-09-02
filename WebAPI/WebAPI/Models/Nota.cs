using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Nota
    {
        /// <summary>
        /// ID
        /// </summary>
        public int NotaID { get; set; }
        /// <summary>
        /// Nombre
        /// </summary>
        public string Nombre { get; set; }
        /// <summary>
        /// Valor de la nota
        /// </summary>
        public int Valor { get; set; }

        #region Llaves foranéas

        public int EstudianteID { get; set; }
        public int ProfesorID { get; set; }

        #endregion

        #region Navegación

        public Estudiante Estudiante { get; set; }
        public Profesor Profesor { get; set; }

        #endregion
    }
}
