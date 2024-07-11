import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  editingProduct: Product = {} as Product; 
  editing: boolean = false;

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  deleteProduct(event: Event, product: Product) {
    if (confirm("Estas seguro de eliminar este producto?")) {
      this.productService.deleteProduct(product);
    }
  }

  editProduct(event: Event, product: Product){
    this.editingProduct = product;
    this.editing = !this.editing;
  }
  updateProduct(){
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = false;
  }
}
