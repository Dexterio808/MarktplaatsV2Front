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

function postDateSetter(){
  return Date.now();
}

@Component({
  selector: 'app-product-formulier',
  templateUrl: './product-formulier.component.html',
  styleUrls: ['./product-formulier.component.css']
})
export class ProductFormulierComponent implements OnInit {

  @Input() product: Product;

  productForm: FormGroup;

  postDate: Date;
  gebruiker: Gebruiker;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      naam: [''],
      prijs: [''],
      omschrijving: [''],
      verkocht:[false],
      gereserveerd:[false],
      postDate: postDateSetter(),
      /*verkoper: this.gebruiker,*/
      betaalwijzen: this.fb.group({
        ideal: [false],
        creditcard: [false],
        contant: [false],
      })
      /*categorie*/
      /*soort*/
    });
  }


  addProduct(): void {
    console.log(this.productForm.value)
/*    this.productService.add(this.gebruikerForm.value);
    this.gebruikerForm.reset(); //haalt het formulier leeg na registratie
    this.ngOnInit(); //zet het formulier terug naar default values*/
  }


}
