using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
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
        public void Test1()
        {
            using (var transaction = Fixture.Connection.BeginTransaction())
            {
                using (var context = Fixture.CreateContext(transaction))
                {

                }
            }
        }
    }
}
