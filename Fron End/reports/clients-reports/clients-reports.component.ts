import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { ClientsReportRequestViewModel } from 'src/app/models/clients-report-request-view-model';
import { ReportsSearchViewModel } from 'src/app/models/reports-search-view.model';
import * as moment from 'moment';

@Component({
  selector: 'app-clients-reports',
  templateUrl: './clients-reports.component.html',
  styleUrls: ['./clients-reports.component.css']
})
export class ClientsReportsComponent implements OnInit {
  
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = new Array<string>();

  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: ChartDataSets[] = [];
  public colors = [];
  title: string;
  reportsSearchViewModel: ReportsSearchViewModel = new ReportsSearchViewModel();

  public showChart() : boolean {
    return this.barChartData !== null && this.barChartData.length > 0;
  }

  constructor(private route: ActivatedRoute,private reportsService: ReportsService) { 
    this.route.data.subscribe(d => { 
      this.title = d.title;
    });
  }


  ngOnInit() {
    
  }
  
  private getClientsReport(reportsSearchViewModel: ReportsSearchViewModel){
    let request = new  ClientsReportRequestViewModel();
    request.from = moment(reportsSearchViewModel.from).format("YYYY-MM-DD");
    request.to = moment(reportsSearchViewModel.to).format("YYYY-MM-DD");
    this.reportsService.getClientsReport(request).subscribe(data =>{
      this.barChartData = new Array<any>();
      this.barChartLabels = new Array<any>();
      var dateSelected = { 
        data: [], 
        label: 'Clientes con mas ventas',
        backgroundColor: [] 
      };
      data.forEach(x => {
        this.barChartLabels.push(x.clientName);
        dateSelected.data.push(x.quantityBooking);
        dateSelected.backgroundColor.push('midnightblue')
      });
       this.barChartData.push(dateSelected); 
      });
  }

  searchExcursionsReports(event: ReportsSearchViewModel){
    this.getClientsReport(event);
  }
 
  


}
