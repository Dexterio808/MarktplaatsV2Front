import {Component, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Product} from "../../models/product";
import {Gebruiker} from "../../models/gebruiker";
import {GebruikerService} from "../../services/gebruiker.service";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {ProductCategorie} from "../../models/productcategorie";
import {CategorieenService} from "../../services/categorieen.service";

/*function postDateSetter(){
  return Date.now().toLocaleString('en-GB');*/

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
      categorie: this.categorie
      /*bezorgwijzen*/
    });
  }


  addProduct(): void {
    console.log(this.productForm.value, this.productsoort);
    console.log("loggedinuser: " + this.userService.loggedInUser);
    console.log("loggedinuser id " + this.userService.loggedInUser.id);
    this.productService.add(this.productForm.value, this.productsoort);
    this.productForm.reset(); //haalt het formulier leeg na registratie
    this.ngOnInit(); //zet het formulier terug naar default values
  }


}
