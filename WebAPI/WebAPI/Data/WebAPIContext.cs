using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class WebAPIContext : DbContext
    {
        #region Properties

        public DbSet<WebAPI.Models.Estudiante> Estudiantes { get; set; }
        public DbSet<WebAPI.Models.Nota> Notas { get; set; }
        public DbSet<WebAPI.Models.Profesor> Profesores { get; set; }

        #endregion

        public WebAPIContext (DbContextOptions<WebAPIContext> options)
            : base(options)
        {
        }       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Nota>().ToTable("Notas");
            modelBuilder.Entity<Estudiante>().ToTable("Estudiantes");
            modelBuilder.Entity<Profesor>().ToTable("Profesores");
        }
    }
}
