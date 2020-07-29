import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { ExcursionsReportRequestViewModel } from 'src/app/models/excursions-report-request-view-model';
import { ReportsSearchViewModel } from 'src/app/models/reports-search-view.model';
import { ReportsService } from 'src/app/services/reports.service';
import * as moment from 'moment';

@Component({
  selector: 'app-excursions-reports',
  templateUrl: './excursions-reports.component.html',
  styleUrls: ['./excursions-reports.component.css']
})
export class ExcursionsReportsComponent implements OnInit {

  
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
    this.getActivitiesReport(event);
  }

  private getActivitiesReport(reportsSearchViewModel: ReportsSearchViewModel){
    let request = new  ExcursionsReportRequestViewModel();
    request.from = moment(reportsSearchViewModel.from).format("YYYY-MM-DD");
    request.to = moment(reportsSearchViewModel.to).format("YYYY-MM-DD");
    this.reportsService.getActivitiesReport(request).subscribe(data =>{
      this.barChartData = new Array<any>();
      this.barChartLabels = new Array<any>();
      var dateSelected = { 
        data: [], 
        label: 'Actividades más vendidas',
        backgroundColor: [] 
      };
      data.forEach(x => {
        this.barChartLabels.push(x.title);
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
