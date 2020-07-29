import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  titleBookings="Reservas";
  titleExcursions="Excursiones";
  titleClients="Clientes";
  titleOperators="Operadores"
  titleGuides="Guias";
  titleTransports="Transportes"
  constructor() { }

  ngOnInit() {
  }

}
