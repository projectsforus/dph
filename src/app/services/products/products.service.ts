import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Product } from './../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private api: ApiService) { }

  getBrands(options = {}) {
    return this.api.get('/brands', {});
  }

  getBrandProducts(brandId, options = {}) {
    return this.api.get(`/brands/${brandId}/products`, options);
  }

  getFeaturedOffers(options = {}) {
    return this.api.get('/featured_offers', options);
  }

}
