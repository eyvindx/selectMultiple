import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ClienteService } from './cliente.service';
import { environment } from '../../environments/environment';
import { Catalogo } from '../model/Catalogo';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [`
      :host ::ng-deep .ui-multiselected-item-token,
      :host ::ng-deep .ui-multiselected-empty-token {
          padding: 2px 4px;
          margin: 0 0.286em 0 0;
          display: inline-block;
          vertical-align:middle;
          height: 1.857em;
      }

      :host ::ng-deep .ui-multiselected-item-token {
          background: #007ad9;
          color: #ffffff;
      }

      :host ::ng-deep .ui-multiselected-empty-token {
          background: #d95f00;
          color: #ffffff;
      }
  `]
})
export class ClienteComponent implements OnInit {
  cars: SelectItem[] = [];
  catalogos: Catalogo[];
  selectedCars1: string[] = [];
  es: any;
  label = 'SELECCIONE INGRESOS ECONOMICOS';
  fieldArray: Array<any> = [];
  private newAttribute: any = {};

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
         'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
        today: 'Hoy',
        clear: 'Borrar'
    };
    this.clienteService.getElementos(environment.rubroIngresoEconomico).subscribe(response => {
      this.catalogos = response;
      this.catalogos.forEach(field => {
        this.cars.push({label: field.descripcion, value: field.catId});
      });

    });
  }
  addFieldValue(e: any) {
    if (this.selectedCars1.length == 0) {
      this.fieldArray = [];
    }
    if(!this.selectedCars1.includes(e.itemValue)) {
        this.deleteFieldValue(e.itemValue);
    } else {
      this.newAttribute.codigo = e.itemValue;
      this.newAttribute.nombre = e.originalEvent.currentTarget.innerText;
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
      }
  }
  deleteFieldValue(index: any) {
      const dvalor = this.fieldArray.findIndex(d => d.codigo === index);
      this.fieldArray.splice(dvalor, 1);
  }
  confirmar(index: any) {
    this.fieldArray.map(dato => {
      if (dato.codigo == index.codigo) {
        dato.valor = index.valor;
        dato.fecha = index.fecha;
      }
      return dato;
    });
    console.log(this.fieldArray);
  }

  constructor(private clienteService: ClienteService, private rutaActiva: ActivatedRoute) {
/*       this.cars = [
          {label: 'Audi', value: '1'},
          {label: 'BMW', value: '2'},
          {label: 'Fiat', value: '3'},
          {label: 'Ford', value: '4'},
          {label: 'Honda', value: '5'},
          {label: 'Jaguar', value: '6'},
          {label: 'Mercedes', value: '7'},
          {label: 'Renault', value: '8'},
          {label: 'VW', value: '9'},
          {label: 'Volvo', value: '10'},
      ];  */

  }

  cargar(): void{
    this.rutaActiva.params.subscribe(params =>{
      const ide = params['id'];
      if(ide) {
        this.clienteService.getInfo(ide).subscribe((cliente) =>{
          return this.cliente = cliente;
        });
      }
    })
  }

}
