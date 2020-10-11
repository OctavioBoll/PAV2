import { Injectable } from '@angular/core';
import { articulosfamilias } from '../models/ArticulosFamilia.collection';
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MockArticulosFamiliasService {

  constructor() { 
      
  }

  getArticulosFamilias(){
    return articulosfamilias
  }
}
