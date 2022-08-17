
using API.Dtos;
using API.Errors;
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
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts(){

            var spec = new ProductsWithTypesAndBrandsSpecification();
            
            var products = await _productsRepo.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
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
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands(){
            var brands = await _productBrandRepo.ListAllAsync();

            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductTypes(){
            var types = await _productTypeRepo.ListAllAsync();
            return Ok(types);
        }
    }
}