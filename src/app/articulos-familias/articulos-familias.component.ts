import { Component, OnInit } from '@angular/core';
import { MockArticulosFamiliasService } from '../services/mock-articulos-familias.service'
import { ArticuloFamilia } from '../models/ArticuloFamilia'
import { ArticulosFamiliasService } from '../services/articulos-familia-service.service'


@Component({
  selector: 'app-articulos-familias',
  templateUrl: './articulos-familias.component.html',
  styleUrls: ['./articulos-familias.component.css']
})
export class ArticulosFamiliasComponent implements OnInit {
  
  Titulo = "Articulos Familias";
  Items: ArticuloFamilia[] = [];

  
  constructor(private articuloFamiliaService:ArticulosFamiliasService) { 
    
  }

  ngOnInit(): void {
    this.GetFamiliasArticulos();
  }

  GetFamiliasArticulos() {
    this.articuloFamiliaService.get()
    .subscribe((res:ArticuloFamilia[]) => {
      this.Items = res;
    });
  }

}
