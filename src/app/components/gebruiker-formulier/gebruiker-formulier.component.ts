import {Component, Input, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Gebruiker} from "../../models/gebruiker";
import {GebruikerService} from "../../services/gerbuiker.service";


function emailValidator(control: AbstractControl): ValidationErrors | null {
  if(!control.value){
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
  emailInpunt = new FormControl('', [Validators.required, emailValidator])



  constructor(private gebruikerService: GebruikerService) { }

  ngOnInit(): void {
    this.gebruikerForm = new FormGroup({
      naam: new FormControl(''),
      email: this.emailInpunt,
    });
  }

  addGebruiker(): void {
    this.gebruikerService.add(this.gebruikerForm.value);
    this.gebruikerForm.reset();
  }

}
