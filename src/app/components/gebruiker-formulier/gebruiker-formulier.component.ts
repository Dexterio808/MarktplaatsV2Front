import {Component, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Gebruiker} from "../../models/gebruiker";
import {GebruikerService} from "../../services/gebruiker.service";
import {Router} from "@angular/router";



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

  gebruikerForm: FormGroup;

  requireToS = new FormControl('', [Validators.requiredTrue])
  emailInpunt = new FormControl('', [Validators.required, emailValidator])

  constructor(private gebruikerService: GebruikerService, private fb: FormBuilder, private router: Router) {
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
    this.gebruikerService.add(this.gebruikerForm.value);
    this.gebruikerForm.reset(); //haalt het formulier leeg na registratie
    this.ngOnInit(); //zet het formulier terug naar default values
    this.router.navigate(['/producten']);
  }


}
