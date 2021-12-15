import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

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

  goToDetails(id: number): void {
    this.router.navigate(['/productdetails', id])
  }

  zoekProduct(): void{
    this.productService.search(this.zoekString)
  }

}
