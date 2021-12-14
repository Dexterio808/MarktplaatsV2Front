import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {ProductCategorie} from "../models/productcategorie";
import {serverUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategorieenService {


  uriCategorie = serverUrl+ '/categorie';

  private _categorieenUpdated$ = new Subject<ProductCategorie[]>();

  constructor(private http: HttpClient) { }


  getAllCategorieen(): void {
    this.http.get<ProductCategorie[]>(this.uriCategorie) // get contacts from server
      .subscribe(                      // when the results arrive (some time in the future):
        categorieen => this._categorieenUpdated$.next(categorieen)
      );                               // rise the contactsUpdated event and supply the contacts
  }

  get categorieenUpdated$(): Subject<ProductCategorie[]>{
    return this._categorieenUpdated$;
  }


}
