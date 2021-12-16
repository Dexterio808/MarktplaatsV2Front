import {Component, Input, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {ProductCategorie} from "../../models/productcategorie";
import {CategorieenService} from "../../services/categorieen.service";


@Component({
  selector: 'app-product-formulier',
  templateUrl: './product-formulier.component.html',
  styleUrls: ['./product-formulier.component.css']
})
export class ProductFormulierComponent implements OnInit {

  @Input() product: Product;

  productForm: FormGroup;

  productsoort: string;
  categorie: ProductCategorie = {id: 1, omschrijving: "test"} as ProductCategorie;

  categorieenUpdated$ = this.categorieenService.categorieenUpdated$;
  categorieen: ProductCategorie[];

  constructor(private userService: UserService,
              private productService: ProductService,
              private fb: FormBuilder,
              private categorieenService: CategorieenService) {
  }

  ngOnInit(): void {
    this.categorieenUpdated$.subscribe(c => this.categorieen = c);
    this.categorieenService.getAllCategorieen();
    this.productForm = this.fb.group({
      naam: [''],
      prijs: [''],
      omschrijving: [''],
      verkocht: [false],
      gereserveerd: [false],
      verkoper: this.userService.loggedInUser,
      betaalwijzen: this.fb.group({
        ideal: [false],
        creditcard: [false],
        contant: [false],
      }),
      categorie: this.categorie,
      bezorgwijzen: this.fb.group({
        thuis: [false],
        magazijn: [false],
        versturen: [false],
        rembours: [false],
      })
    });
  }


  addProduct(): void {
    this.productService.add(this.productForm.value, this.productsoort);
    this.productForm.reset(); //haalt het formulier leeg na registratie
    this.ngOnInit(); //zet het formulier terug naar default values
  }


}
