import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS  } from "@angular/common/http";
import { NgbPaginationModule , NgbModalModule } from '@ng-bootstrap/ng-bootstrap'

import { MyInterceptor } from "../shared/MyInterceptor";



import { AppRoutingModule } from './app-routing.module';

import { ListaArticulosComponent } from './lista-articulos/lista-articulos.component';
import { MenuComponent } from './menu/menu.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { InicioComponent } from './inicio/inicio.component';

import { MockArticulosFamiliasService } from './services/mock-articulos-familias.service'
import { MockArticulosService } from './services/mock-articulos.service';
import { FiltroPipe } from './pipes/filtro.pipe';
import { ArticulosFamiliasComponent } from './articulos-familias/articulos-familias.component';
import { ModalDialogComponent } from './modal/modal-dialog/modal-dialog.component'



@NgModule({
  declarations: [
    
    ListaArticulosComponent,
    MenuComponent,
    CuerpoComponent,
    InicioComponent,
    FiltroPipe,
    ArticulosFamiliasComponent,
    ModalDialogComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbModalModule

  ],
  providers: [
    MockArticulosService,
    MockArticulosFamiliasService,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }


  ],
  bootstrap: [CuerpoComponent],
  
  entryComponents: [ModalDialogComponent],

})
export class AppModule { }
