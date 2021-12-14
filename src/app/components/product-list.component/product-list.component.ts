import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  producten$ = this.productService.productenUpdated$;
  producten: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.productenUpdated$
      .subscribe(p => {
        this.producten = p;
        console.log(this.producten)
        this.addSoort();
      });
    this.productService.getAll();
  }

  addSoort() {
    this.producten.forEach(p => {
      if(p.bezorgwijzen) {
        p.soort = "Artikel"
      } else {
        p.soort = "Dienst"
      }
    })
  }

}
