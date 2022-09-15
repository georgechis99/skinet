import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  allProductsWithoutPagination: IProduct[];
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  multiselectDropdownTitle = "Brands";
  multiselectDropdownValues = [
    "Nike", "Adidas", "Apple", "Asus", "Gigabyte", "Finland",
    "Russia", "Latvia", "Lithuania", "Poland", "A", "B", "C", "D", "India", "USA", "UK", "Russia",
    "Sunday", "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit() {
    this.getProducts(true);
    this.getAllProducts();
    this.getBrands();
    this.getTypes();
  }

  getAllProducts() {
    this.shopService.getAllProducts().subscribe(response => {
      this.allProductsWithoutPagination = response;

      console.log(this.allProductsWithoutPagination);
    }, error => {
      console.log(error);
    });
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;

    }, error => {
      console.log(error);
    });
  }

  getBrands(ignoreCache: boolean = false) {
    this.shopService.getBrands(ignoreCache).subscribe(response => {
      this.brands = [{ id: 0, name: 'All', productsCount: 0 }, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(ignoreCache: boolean = false) {
    this.shopService.getTypes(ignoreCache).subscribe(response => {
      this.types = [{ id: 0, name: 'All', productsCount: 0 }, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getTypes(true);
    this.getBrands(true);
    console.log("types:" + this.types);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getBrands(true);
    this.getTypes(true);
    console.log("brands:" + this.brands);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }

  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
    console.log(this.searchTerm.nativeElement.value);
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
