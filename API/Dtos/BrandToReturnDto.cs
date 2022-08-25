using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class BrandToReturnDto
    {
        public BrandToReturnDto(int id, string name, int productsCount = 0)
        {
            Id = id;
            Name = name;
            ProductsCount = productsCount;
        }
         public int Id { get; set; }
        
        public string Name { get; set; }

        public int ProductsCount {get; set;}
    }
}