import {ProductCategorie} from "./productcategorie";
import {Gebruiker} from "./gebruiker";
import {Bezorgwijzen} from "./Bezorgwijzen";

export interface Product {
  id: number;
  naam: string;
  prijs: number;
  categorie: ProductCategorie;
  omschrijving: string;
  verkocht: boolean;
  gereserveerd: boolean;
  postDate: Date;
  verkoper: Gebruiker;
  betaalwijzen: object;
  bezorgwijzen: Bezorgwijzen;

  soort: string;
}
