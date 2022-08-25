using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class CountProductsOfTypeSpecification : BaseSpecification<Product>
    {
          public CountProductsOfTypeSpecification(int typeId)
                    : base(x => 
                (x.ProductTypeId == typeId) 
            )
        {
        }
    }
}