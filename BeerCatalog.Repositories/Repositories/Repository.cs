using BeerCatalog.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BeerCatalog.Repositories.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationContext context;
        private DbSet<T> entities;

        public Repository(ApplicationContext context)
        {
            this.context = context;
        }

        public void Create(T entity)
        {
            entities.Add(entity);
        }

        public void Delete(T entity)
        {
            entities.Remove(entity);
        }

        public List<T> Find(Func<T, bool> predicate)
        {
            return entities.Where(predicate).ToList();
        }

        public List<T> Include(Expression<Func<T, IProperty>> expression)
        {
            return entities.Include(expression).ToList<T>();
        }

        public async Task<int> SaveChanges()
        {
            var result = await context.SaveChangesAsync();
            return result;
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
