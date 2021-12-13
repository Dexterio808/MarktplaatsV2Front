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
import {Gebruiker} from "../../models/gebruiker";
import {GerbuikerService} from "../../services/gebruiker.service";


function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const regex = /^.+@.+\.[a-zA-Z]+$/;
  return regex.test(control.value) ? null : {email: {valid: false}};

}


@Component({
  selector: 'app-gebruiker-formulier',
  templateUrl: './gebruiker-formulier.component.html',
  styleUrls: ['./gebruiker-formulier.component.css']
})
export class GebruikerFormulierComponent implements OnInit {

  @Input() gebruiker: Gebruiker;

  BezorgData: Array<any> = [
    {name: 'Afhalen', value: 'AFHALEN'},
    {name: 'Thuis Bezorgen', value: 'THUIS'},
    {name: 'Post', value: 'POST'},
    {name: 'Rembours', value: 'REMBOURS'}
  ];

  gebruikerForm: FormGroup;

  requireToS = new FormControl('', [Validators.requiredTrue])
  emailInpunt = new FormControl('', [Validators.required, emailValidator])

  constructor(private gebruikerService: GerbuikerService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.gebruikerForm = this.fb.group({
      tos: this.requireToS,
      naam: [''],
      email: this.emailInpunt,
      adres: this.fb.group({
        straat: [''],
        huisnummer: [''],
        postcode: [''],
        stad: [''],
      }),

      bezorgwijzen: this.fb.group({
        thuis: [false],
        magazijn: [false],
        versturen: [false],
        rembours: [false],
      })
    });
  }


  addGebruiker(): void {
    console.log(this.gebruikerForm.value)
    console.log(this.gebruikerForm.value.bezorgwijze);
    this.gebruikerService.add(this.gebruikerForm.value);
    this.gebruikerForm.reset(); //haalt het formulier leeg na registratie
    this.ngOnInit(); //zet het formulier terug naar default values
  }


}
