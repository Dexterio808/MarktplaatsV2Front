import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-mijn-product',
  templateUrl: './mijn-product.component.html',
  styleUrls: ['./mijn-product.component.css']
})
export class MijnProductComponent implements OnInit {

  mijnproducten$ = this.productService.productenUpdated$;
  mijnproducten: Product[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.productenUpdated$
      .subscribe(p => {
        this.mijnproducten = p;
      });
    this.productService.getAllFromUser();
  }

  goToDetails(id: number): void {
    this.router.navigate(['productdetails', id])
  }

  delete(c: Product) {
    this.productService.delete(c)
  }
}
