using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BeerCatalog.Repositories.Interfaces
{
    public interface IRepository<T> where T: class
    {
        void Create(T entity);
        List<T> Include(Expression<Func<T, IProperty>> expression);
        List<T> Find(Func<T, bool> predicate);
        void Update(T entity);
        void Delete(T entity);
        Task<int> SaveChanges();
    }
}
