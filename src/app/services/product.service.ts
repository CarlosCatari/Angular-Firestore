import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productDoc?: AngularFirestoreDocument<Product>;
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  constructor(public db: AngularFirestore) { 
    this.productsCollection = this.db.collection<Product>('products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  addProduct(product: Product){
    this.productsCollection.add(product);
  }

  deleteProduct(product: Product): void {
    this.productDoc = this.db.doc<Product>(`products/${product.id}`);
    this.productDoc.delete();
  }

  updateProduct(product: Product): void {
    this.productDoc = this.db.doc<Product>(`products/${product.id}`);
    this.productDoc.update(product);
  }
}
