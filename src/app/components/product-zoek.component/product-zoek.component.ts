import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-zoek',
  templateUrl: './product-zoek.component.html',
  styleUrls: ['./product-zoek.component.css']
})
export class ProductZoekComponent {

  producten$ = this.productService.productenUpdated$;
  producten: Product[] = [];
  zoekString: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.productenUpdated$
      .subscribe(p => {
        this.producten = p;
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

  zoekProduct(): void{
    this.productService.search(this.zoekString)
  }

}
