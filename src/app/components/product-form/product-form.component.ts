import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  product = {} as Product;
  constructor(public productService: ProductService){}

  addProduct(){
    if(this.product.name !=='' && this.product.description !=='' && this.product.price !==''){
      this.productService.addProduct(this.product);
      this.product = {} as Product;
    }
    
  }
}
