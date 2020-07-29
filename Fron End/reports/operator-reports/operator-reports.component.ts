import { Component, OnInit } from '@angular/core';
import { ReportsSearchViewModel } from 'src/app/models/reports-search-view.model';
import { OperatorReportRequestViewModel } from 'src/app/models/operator-report-request-view-model';
import * as moment from 'moment';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { ReportsService } from 'src/app/services/reports.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operator-reports',
  templateUrl: './operator-reports.component.html',
  styleUrls: ['./operator-reports.component.css']
})
export class OperatorReportsComponent implements OnInit {

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

  private getOperatorsReport(reportsSearchViewModel: ReportsSearchViewModel){
    let request = new OperatorReportRequestViewModel();
    request.from = moment(reportsSearchViewModel.from).format("YYYY-MM-DD");
    request.to = moment(reportsSearchViewModel.to).format("YYYY-MM-DD");
    this.reportsService.getOperatorsReport(request).subscribe(data =>{
      this.barChartData = new Array<any>();
      this.barChartLabels = new Array<any>();
      var dateSelected = { 
        data: [], 
        label: 'Operadores con mas actividades realizadas',
        backgroundColor: [] 
      };
      data.forEach(x => {
        this.barChartLabels.push(x.operatorName);
        dateSelected.data.push(x.quantityBooking);
        dateSelected.backgroundColor.push('midnightblue')
      });
       this.barChartData.push(dateSelected); 
      });
  }

  searchExcursionsReports(event: ReportsSearchViewModel){
    this.getOperatorsReport(event);
  }
}
