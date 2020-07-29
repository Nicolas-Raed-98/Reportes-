import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportsSearchViewModel } from 'src/app/models/reports-search-view.model';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { GuideReportRequestViewModel } from 'src/app/models/guides-report-request-view-model';
import * as moment from 'moment';
import { TransportReportRequestViewModel } from 'src/app/models/transport-report-request-view-model';

@Component({
  selector: 'app-transport-report',
  templateUrl: './transport-report.component.html',
  styleUrls: ['./transport-report.component.css']
})
export class TransportReportComponent implements OnInit {

  
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
    
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public colors = [];

  public barChartData: ChartDataSets[] = [];

  title: string;
  reportsSearchViewModel: ReportsSearchViewModel = new ReportsSearchViewModel();

  constructor(private route: ActivatedRoute,private reportsService: ReportsService) { 
    this.route.data.subscribe(d => { 
      this.title = d.title;
    });
  }

  ngOnInit() {
  }

  searchExcursionsReports(event: ReportsSearchViewModel){
    this.getTransportsReport(event);
  }

  private getTransportsReport(reportsSearchViewModel: ReportsSearchViewModel){
    let request = new  TransportReportRequestViewModel();
    request.from = moment(reportsSearchViewModel.from).format("YYYY-MM-DD");
    request.to = moment(reportsSearchViewModel.to).format("YYYY-MM-DD");
    this.reportsService.getTransportsReport(request).subscribe(data =>{
      this.barChartData = new Array<any>();
      this.barChartLabels = new Array<any>();
      var dateSelected = { 
        data: [], 
        label: 'Transportes con mas actividades realizadas',
        backgroundColor: [] 
      };
      data.forEach(x => {
        this.barChartLabels.push(x.transportName);
        dateSelected.data.push(x.quantity);
        dateSelected.backgroundColor.push('midnightblue')
      });
       this.barChartData.push(dateSelected); 
      });
  }

  public showChart() : boolean {
    return this.barChartData !== null && this.barChartData.length > 0;
  }


}
