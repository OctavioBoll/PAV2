import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component'
import {ListaArticulosComponent } from './lista-articulos/lista-articulos.component' 
import { ArticulosFamiliasComponent } from './articulos-familias/articulos-familias.component'

const routes: Routes = [
  {path:'inicio',component:InicioComponent},
  {path:'listaArticulo',component:ListaArticulosComponent},
  {path:'ArticulosFamilia',component:ArticulosFamiliasComponent},
  {path:'',redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
