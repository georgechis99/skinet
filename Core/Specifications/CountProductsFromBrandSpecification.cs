using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class CountProductsFromBrandSpecification : BaseSpecification<Product>
    {
          public CountProductsFromBrandSpecification(int brandId)
                    : base(x => 
                (x.ProductBrandId == brandId) 
            )
        {
        }
    }
}