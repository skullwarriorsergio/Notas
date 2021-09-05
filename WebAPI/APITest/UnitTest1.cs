using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using WebAPI.Controllers;
using Xunit;

namespace APITest
{
    public class UnitTest1 : IClassFixture<SharedDatabaseFixture>
    {
        #region Properties

        public UnitTest1(SharedDatabaseFixture fixture) => Fixture = fixture;

        public SharedDatabaseFixture Fixture { get; }

        #endregion

        [Fact]
        public async void NotasTest()
        {
            using (var transaction = Fixture.Connection.BeginTransaction())
            {
                using (var context = Fixture.CreateContext(transaction))
                {          
                    //Probando "Estudiantes"
                    var controllerEst = new EstudiantesController(context);
                    _ = await controllerEst.PostEstudiante(new WebAPI.Models.EstudiantePOST
                    {
                        Nombre = "Lizbet"
                    });
                    Assert.Single(controllerEst.GetEstudiante().Result.Value);
                    var estudiante = controllerEst.GetEstudiante().Result.Value.First();

                    var controllerProf = new ProfesoresController(context);
                    _ = await controllerProf.PostProfesor(new WebAPI.Models.ProfesorPOST
                    {
                        Nombre = "Sergio"
                    });
                    _ = await controllerProf.PostProfesor(new WebAPI.Models.ProfesorPOST
                    {
                        Nombre = "Kevin"
                    });
                    Assert.Equal(2, controllerProf.GetProfesor().Result.Value.Count());
                    var profesor= controllerProf.GetProfesor().Result.Value.Last();

                    var controller = new NotasController(context);
                    _ = controller.PostNota(new WebAPI.Models.NotaPOST
                    {
                        EstudianteID = estudiante.EstudianteID,
                        ProfesorID = profesor.ProfesorID,
                        Nombre = "Matemáticas",
                        Valor = 5
                    });
                    var result = controller.GetNota().Result;
                    Assert.Single(result.Value);
                    Assert.Equal(5, result.Value.First().Valor);
                }
            }
        }
    }
}
