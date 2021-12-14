import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {serverUrl} from "../../environments/environment";
import {Product} from "../models/product";
import {ProductCategorie} from "../models/productcategorie";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = serverUrl + '/producten';
  uri2 = serverUrl+ '/artikelen';
  uri3 = serverUrl+ '/diensten';

  constructor(private http: HttpClient) {
  }


  private _productenUpdated$ = new Subject<Product[]>();




  getAll(): void {
    this.http.get<Product[]>(this.uri) // get contacts from server
      .subscribe(                      // when the results arrive (some time in the future):
        producten => this._productenUpdated$.next(producten)
      );                               // rise the contactsUpdated event and supply the contacts
  }

  add(p: Product, soort: string): void {
    if(soort==="Artikel"){
      this.http.post<Product>(this.uri2+'/input', p).subscribe( () => this.getAll());
    } else {
      this.http.post<Product>(this.uri3+'/input', p).subscribe(() => this.getAll());
    }
  }

  delete(p: Product): void {
    this.http.delete(`${this.uri}/${p.id}`) // delete contact from server
      .subscribe(() => this.getAll());      // when deleted: getAll (refresh)
  }

  search(value: string): void {
    this.http.get<Product[]>(`${this.uri}?q=${value}`)
      .subscribe(producten => this._productenUpdated$.next(producten));
  }

  get productenUpdated$(): Subject<Product[]> {
    return this._productenUpdated$;
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.uri}/${id}`);
  }

  update(p: Product, id: number): void {
    this.http.put<Product[]>(`${this.uri}/${id}`, p) // put contact to server
      .subscribe(() => this.getAll());  // when posted: getAll (refresh)
  }

}
