import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() title: string;
  @Input() routerLink: string;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  showBookingReports(){
    switch (this.title){
      case "Reservas": this.router.navigate(["bookings-reports"]);
      break;
      case "Excursiones": this.router.navigate(["excursions-reports"]);
      break;
      case "Clientes": this.router.navigate(["clients-reports"]);
      break;
      case "Operadores": this.router.navigate(["operators-reports"]);
      break;
      case "Guias": this.router.navigate(["guides-reports"]);
      break;
      case "Transportes": this.router.navigate(["transports-reports"]);
      break;
    }
  }

  getImageUrl() : string{
    return `assets/${this.title}.jpg`;
  }
}
