import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.apiUrl;
  allProductsWithoutPagination: IProduct[] = [];
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();


  constructor(private http: HttpClient) { }

  getAllProducts() {

    let params = new HttpParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);

    return this.http.get<IProduct[]>(this.baseUrl + 'products/all', { observe: 'response', params })
      .pipe(
        map(response => {
          this.allProductsWithoutPagination = response.body;
          console.log(this.allProductsWithoutPagination);
          return this.allProductsWithoutPagination;
        })
      )
  }

  getProducts(useCache: boolean) {

    if(useCache == false){
      this.productCache = new Map();
    }

    if(this.productCache.size > 0 && useCache === true){
      if(this.productCache.has(Object.values(this.shopParams).join('-'))){
        this.pagination.data = this.productCache.get(Object.values(this.shopParams).join('-'));
        return of(this.pagination);
      }
    }

    var params = this.getParams();

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          this.productCache.set(Object.values(this.shopParams).join('-'), response.body.data);
          this.pagination = response.body;
          return this.pagination;
        })
      )
  }

  setShopParams(params: ShopParams){
    this.shopParams = params;
  }

  getShopParams() { 
    return this.shopParams;
  }

  getProduct(id: number) {
    let product: IProduct;
    this.productCache.forEach((products: IProduct[]) => {
      product = products.find(p => p.id === id);
    })

    if(product){
      return of(product);
    }

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getParams(){
    let params = new HttpParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return params;
  }

  getBrands(ignoreCache: boolean = false) {
    var params = this.getParams();
    if(!ignoreCache && this.brands.length > 0){
      return of(this.brands);
    }

    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands', { observe: 'response', params }).pipe(
      map(response => {
        this.brands = response.body;
        return this.brands;
      })
    );
  }

  getTypes(ignoreCache: boolean = false) {
    var params = this.getParams();
    if(!ignoreCache && this.types.length > 0){
      return of(this.types);
    }

    return this.http.get<IType[]>(this.baseUrl + 'products/types', { observe: 'response', params }).pipe(
      map(response => {
        this.types = response.body;
        return this.types;
      })
    );
  }


}
