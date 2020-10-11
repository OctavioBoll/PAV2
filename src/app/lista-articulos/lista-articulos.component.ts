import { Component, OnInit } from '@angular/core';
import { Articulo } from '../models/Articulos';
import { ArticuloFamilias } from '../models/ArticulosFamilia.collection'
//import { MockArticulosService } from '../services/mock-articulos.service'
//import { MockArticulosFamiliasService } from '../services/mock-articulos-familias.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ArticulosService } from '../services/articulos-service.service'
import { ArticulosFamiliasService } from '../services/articulos-familia-service.service'
import { ModalDialogService } from '../services/modal-dialog.service';


@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})

export class ListaArticulosComponent implements OnInit {


  filtroArt: string = '';


  Titulo = "Articulos";

  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };


  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };


  FormFiltro: FormGroup;
  FormReg: FormGroup;
 

  submitted = false; 
  Lista: Articulo[] = [];
  RegistrosTotal: number;
  Familias: ArticuloFamilias[] = [];
  SinBusquedasRealizadas = true;
  Pagina = 1; // inicia pagina 1

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: "" },
    { Id: true, Nombre: "SI" },
    { Id: false, Nombre: "NO" }
  ];

  constructor(
    private articuloServicio: ArticulosService,
    private ArticulosFamiliasService:ArticulosFamiliasService,
    //private articuloServicio: MockArticulosService,
    //private articulosFamiliasServicios: MockArticulosFamiliasService,
    private modalDialogService:ModalDialogService,

    public formBuilder: FormBuilder
    
) 
    {
    /* this.Lista = articuloServicio.get(this.FormReg.value.Nombre, this.FormReg.value.Activo, this.Pagina) */ 
  }

  ngOnInit(): void {
    this.FormFiltro = this.formBuilder.group({
      Nombre: [null],
      Activo: [null]
    });
    this.FormReg = this.formBuilder.group({
      IdArticulo: [null],
      Nombre: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(55)]],
      Precio: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      Stock: [null, [Validators.required, Validators.pattern("[0-9]{1,10}")]],
      CodigoDeBarra: [null, [Validators.required, Validators.pattern("[0-9]{13}")]],
      IdArticuloFamilia: [null, [Validators.required]],
      FechaAlta: [null, [Validators.required, Validators.pattern(
        "(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}")]],
      Activo: [false]
    });

      this.GetFamiliasArticulos();  
  }

  GetFamiliasArticulos() {
    this.ArticulosFamiliasService.get().subscribe((res: ArticuloFamilias[]) => {
  this.Familias = res;
});
}

  GetArticuloFamiliaNombre(Id){
    var ArticuloFamilia = this.Familias.filter(x => x.IdArticuloFamilia === Id)[0];
    if (ArticuloFamilia)
        return ArticuloFamilia.Nombre;
    else
      return "";
  }





  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset({Activo: true});
    this.submitted = false;
    this.FormReg.markAsUntouched();

  }

  // Buscar segun los filtros, establecidos en FormReg
  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.modalDialogService.BloquearPantalla();
    this.articuloServicio.get(this.FormFiltro.value.Nombre, this.FormFiltro.value.Activo,
      this.Pagina).subscribe((res:any) => {
        this.Lista = res.Lista;
        this.RegistrosTotal = res.RegistrosTotal;
        this.modalDialogService.DesbloquearPantalla();
      });
    
    
    //antes del modalDialog
    /* this.articuloServicio.get(this.FormFiltro.value.Nombre, this.FormFiltro.value.Activo, this.Pagina)
      .subscribe((res: any) => {
        this.Lista = res.Lista;
        this.RegistrosTotal = res.RegistrosTotal;
      });
    this.SinBusquedasRealizadas = false;
 */
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) { window.scroll(0, 0); // ir al incio del scroll
    
    this.articuloServicio.getById(Dto.IdArticulo).subscribe((res: any) => {
  
      const itemCopy = { ...res };  // hacemos copia para no modificar el array original del mock
      
      //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      var arrFecha = itemCopy.FechaAlta.substr(0, 10).split("-");
      itemCopy.FechaAlta = arrFecha[2] + "/" + arrFecha[1] + "/" + arrFecha[0];

      this.FormReg.patchValue(itemCopy);
      this.AccionABMC = AccionABMC;
    });

  }

  Consultar(Dto) {
    this.BuscarPorId(Dto, "C");
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Dto) {
    if (!Dto.Activo) {
      this.modalDialogService.Alert("No puede modificarse un registro inactivo")
      //alert("No puede modificarse un registro Inactivo.");
      return;
    }
    this.BuscarPorId(Dto, "M");
    this.submitted = false;
    this.FormReg.markAsUntouched();
  }

  // grabar tanto altas como modificaciones
  Grabar() {

    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }

    
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };
 
    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = 
          new Date(
            arrFecha[2],
            arrFecha[1] - 1,
            arrFecha[0]
          ).toISOString();
 
    // agregar post
    if (itemCopy.IdArticulo == 0 || itemCopy.IdArticulo == null) {
      this.articuloServicio.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agragado correctamente");
        //alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
      // modificar put
      this.articuloServicio
        .put(itemCopy.IdArticulo, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          alert('Registro modificado correctamente.');
          this.Buscar();
        });
    }

  }


  ActivarDesactivar(Dto) {

    this.modalDialogService.Confirm(
      "Esta seguro de " +
      (Dto.Activo ? "desactivar" : "activar") +
      " este registro?",
      undefined,
      undefined,
      undefined,
      () => this.articuloServicio.delete(Dto.IdArticulo).subscribe((res:any) => this.Buscar()),
      null
    )




    //anterior sin modalDialog
    /* var resp = confirm( "Esta seguro de " +
      (Dto.Activo ? "desactivar" : "activar") +
      " este registro?");
    
      if (resp === true)
      {
       this.articuloServicio
            .delete(Dto.IdArticulo)
            .subscribe((res: any) => 
              this.Buscar()
            );
      } */
  }



  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = "L";
  }

  ImprimirListado() {
    alert('Sin desarrollar...');
  }



















  textoTabla: string = "Ocultar Tabla";
  TablaVisible = true;

  CambiarVisibilidadTabla() {
    this.TablaVisible = !this.TablaVisible;
    this.textoTabla = this.TablaVisible ? 'Ocultar Tabla' : 'Mostrar Tabla';
  }
}
