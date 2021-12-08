import {Injectable} from "@angular/core";
import {serverUrl} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ContactService {

  uri = serverUrl + '/bezorgwijzen';

  constructor(private http: HttpClient) {
  }
/*

  getAll(): Set<Bezorgwijze[]> {
    this.http.get<Bezorgwijze[]>(this.uri).subscribe( bezorgwijzen => this.bezorgwijzenUpdated.next(bezorgwijzen))
  }
*/


}
