
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseAPIController
    {
        private readonly IMapper _mapper;

        public IGenericRepository<Product> _productsRepo { get; }
        public IGenericRepository<ProductBrand> _productBrandRepo { get; }
        public IGenericRepository<ProductType> _productTypeRepo { get; }

        public ProductsController(IGenericRepository<Product> productsRepo, 
            IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo,
            IMapper mapper)
        {
            _productsRepo = productsRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery]ProductSpecParams productParams){

            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var totalItems = await _productsRepo.CountAsync(countSpec);
            
            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

         [HttpGet("fromBrand/{brandId}")]
        public async Task<ActionResult<int>> GetCountOfProductsFromBrand(int brandId){

            var countSpec = new CountProductsFromBrandSpecification(brandId);
            var countOfProductsFromBrand = await _productsRepo.CountAsync(countSpec);

            return Ok(countOfProductsFromBrand);
        }

        [HttpGet("ofType/{typeId}")]
        public async Task<ActionResult<int>> GetCountOfProductsOfType(int typeId){

            var countSpec = new CountProductsOfTypeSpecification(typeId);
            var countOfProductsOfType = await _productsRepo.CountAsync(countSpec);

            return Ok(countOfProductsOfType);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]       //these 2 lines are documentation for Swagger for it to know what kind 
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]   // of responses this endpoint could return
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id){

            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _productsRepo.GetEntityWithSpec(spec);

            if(product == null){
                return NotFound(new ApiResponse(404));
            }

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<BrandToReturnDto>>> GetProductBrands(){
            var brands = await _productBrandRepo.ListAllAsync();
            
            var brandDtos = new List<BrandToReturnDto>();

            foreach(ProductBrand brand in brands){
                 var countSpec = new CountProductsFromBrandSpecification(brand.Id);
                 var countOfProductsFromBrand = await _productsRepo.CountAsync(countSpec);

                 var brandDto = new BrandToReturnDto(brand.Id, brand.Name);
                 brandDto.ProductsCount = countOfProductsFromBrand;

                 brandDtos.Add(brandDto);
                
            }

            return Ok(brandDtos);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<TypeToReturnDto>>> GetProductTypes(){
            var types = await _productTypeRepo.ListAllAsync();
            
            
            var typeDtos = new List<TypeToReturnDto>();

            foreach(ProductType type in types){
                 var countSpec = new CountProductsOfTypeSpecification(type.Id);
                 var countOfProductsOfType = await _productsRepo.CountAsync(countSpec);

                 var typeDto = new TypeToReturnDto(type.Id, type.Name);
                 typeDto.ProductsCount = countOfProductsOfType;

                 typeDtos.Add(typeDto);
                
            }

            return Ok(typeDtos);
        }


    }
}