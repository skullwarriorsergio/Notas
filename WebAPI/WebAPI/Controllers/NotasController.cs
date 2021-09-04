using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [EnableCors("Policy")]
    [Route("api/[controller]")]
    [ApiController]
    public class NotasController : ControllerBase
    {
        private readonly WebAPIContext _context;

        public NotasController(WebAPIContext context)
        {
            _context = context;
        }

        // GET: api/Notas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotaDTO>>> GetNota()
        {
            return await _context.Notas.Select(x => new NotaDTO 
            {
                Estudiante = x.Estudiante.Nombre,
                Profesor = x.Profesor.Nombre,
                Valor = x.Valor,
                Nombre = x.Nombre,
                NotaID = x.NotaID
            }).ToListAsync();
        }

        // GET: api/Notas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotaDTO>> GetNota(int id)
        {
            var nota = await _context.Notas.FindAsync(id);

            if (nota == null)
            {
                return NotFound();
            }

            return new NotaDTO
            {
                Estudiante = nota.Estudiante.Nombre,
                Profesor = nota.Profesor.Nombre,
                Valor = nota.Valor,
                Nombre = nota.Nombre,
                NotaID = nota.NotaID
            };
        }

        // PUT: api/Notas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNota(int id, NotaDTO nota)
        {
            if (id != nota.NotaID)
            {
                return BadRequest();
            }

            var _nota = _context.Notas.FirstOrDefaultAsync(x => x.NotaID == id).Result;
            if (_nota == null)
                return NotFound();

            _nota.Nombre = nota.Nombre;
            _nota.Valor = nota.Valor;

            _context.Entry(_nota).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Notas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Nota>> PostNota(NotaPOST nota)
        {
            var newNota = new Nota
            {
                EstudianteID = nota.EstudianteID,
                Nombre = nota.Nombre,
                ProfesorID = nota.ProfesorID,
                Valor = nota.Valor,
            };
            _context.Notas.Add(newNota);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNota", new { id = newNota.NotaID }, newNota);
        }

        // DELETE: api/Notas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNota(int id)
        {
            var nota = await _context.Notas.FindAsync(id);
            if (nota == null)
            {
                return NotFound();
            }

            _context.Notas.Remove(nota);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NotaExists(int id)
        {
            return _context.Notas.Any(e => e.NotaID == id);
        }
    }
}
