import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { articulosfamilias } from "../models/ArticuloFamilia";
import { ArticuloFamilias } from '../models/ArticulosFamilia.collection';

@Injectable({
  providedIn: "root"
})
export class ArticulosFamiliasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
//    this.resourceUrl = "http://localhost:49681/api/articulos/";
    this.resourceUrl = "http://bitgocba.duckdns.org/api/ArticulosFamilias";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

}