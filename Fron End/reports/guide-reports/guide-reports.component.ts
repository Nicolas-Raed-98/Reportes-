import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportsSearchViewModel } from 'src/app/models/reports-search-view.model';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import * as moment from 'moment';
import { GuideReportRequestViewModel } from 'src/app/models/guides-report-request-view-model';

@Component({
  selector: 'app-guide-reports',
  templateUrl: './guide-reports.component.html',
  styleUrls: ['./guide-reports.component.css']
})
export class GuideReportsComponent implements OnInit {

  
  
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
    this.getGuidesReport(event);
  }

  private getGuidesReport(reportsSearchViewModel: ReportsSearchViewModel){
    let request = new  GuideReportRequestViewModel();
    request.from = moment(reportsSearchViewModel.from).format("YYYY-MM-DD");
    request.to = moment(reportsSearchViewModel.to).format("YYYY-MM-DD");
    this.reportsService.getGuidesReport(request).subscribe(data =>{
      this.barChartData = new Array<any>();
      this.barChartLabels = new Array<any>();
      var dateSelected = { 
        data: [], 
        label: 'Guías con mas actividades realizadas',
        backgroundColor: [] 
      };
      data.forEach(x => {
        this.barChartLabels.push(x.nameGuide);
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
