import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.getProduct(+params.get('id'));
      }
    );

  }


  private getProduct(id: number): void {
    console.log(id);
    this.productService.get(id).subscribe(p => {
        this.product = p;
        console.log(p);
      }
    );
  }
}
