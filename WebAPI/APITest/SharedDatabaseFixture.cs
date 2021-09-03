using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Data;

namespace APITest
{
    public class SharedDatabaseFixture : IDisposable
    {
        private static readonly object _lock = new object();
        private static bool _databaseInitialized;
        private static DbContextOptionsBuilder<WebAPIContext> builder;

        public SharedDatabaseFixture()
        {
            var serviceProvider = new ServiceCollection()
            .AddEntityFrameworkSqlServer()
            .BuildServiceProvider();


            builder = new DbContextOptionsBuilder<WebAPIContext>();
            builder.UseSqlServer($"Server=(localdb)\\mssqllocaldb;Database=api_db;Trusted_Connection=True;MultipleActiveResultSets=true")
                    .UseInternalServiceProvider(serviceProvider);


            Connection = new SqlConnection(@"Server=(localdb)\mssqllocaldb;Database=api_db;ConnectRetryCount=0");

            Seed();

            Connection.Open();

        }

        public DbConnection Connection { get; }

        public WebAPIContext CreateContext(DbTransaction transaction = null)
        {
            var context = new WebAPIContext(builder.Options);
            //context.Database.Migrate();
            try
            {

                if (transaction != null)
                {
                    context.Database.UseTransaction(transaction);
                }
            }
            catch
            {
            }

            return context;
        }

        private void Seed()
        {
            lock (_lock)
            {
                try
                {
                    if (!_databaseInitialized)
                    {
                        using (var context = CreateContext())
                        {
                            context.Database.EnsureDeleted();
                            context.Database.EnsureCreated();


                            context.SaveChanges();
                        }

                        _databaseInitialized = true;
                    }
                }
                catch
                {

                    throw;
                }

            }
        }

        public void Dispose() => Connection.Dispose();
    }
}
