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
  productcategorie: ProductCategorie;

  categorieenUpdated = this.productService.categorieenUpdated$;

  constructor(private userService: UserService, private productService: ProductService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      naam: [''],
      prijs: [''],
      omschrijving: [''],
      verkocht:[false],
      gereserveerd:[false],
      verkoper: this.userService.loggedInUser,
      betaalwijzen: this.fb.group({
        ideal: [false],
        creditcard: [false],
        contant: [false],
      }),
      categorie: this.categorieenUpdated
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
