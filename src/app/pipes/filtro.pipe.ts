import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  
  transform(value: any,arg: any): any {
    if(arg === '' ||  arg.lengrh < 2) return value;
    
    const resultado = [];
    for(const res of value){
      if (res.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultado.push(res);
      };
    };
    return resultado
  }
}
