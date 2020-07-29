import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { BookingsReportRequestViewModel } from 'src/app/models/bookings-report-request-view-model';


@Component({
  selector: 'app-bookings-reports',
  templateUrl: './bookings-reports.component.html',
  styleUrls: ['./bookings-reports.component.css']
})
export class BookingsReportsComponent implements OnInit {

  public barChartLabels: string[] = new Array<string>();

  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: ChartDataSets[] = [];
  public colors = [];
  title: string;

  constructor(private route: ActivatedRoute, private reportsService: ReportsService) {
    this.route.data.subscribe(d => { 
      this.title = d.title;
    });
   }

  ngOnInit() {
    this.getBookingsReport();
  }

  private getBookingsReport(){
    let request = new  BookingsReportRequestViewModel();
    this.reportsService.getoBokingsReport(request).subscribe(data =>{
      this.barChartData = new Array<any>();
      var currentYearValues = { 
        data: [],
        label: 'Año actual',
        backgroundColor: []
      };
      var pastYearValues = { data: [],
         label: 'Año anterior',
         backgroundColor: []
      };
      data.forEach(x => {
        this.barChartLabels.push(x.month);
        currentYearValues.data.push(x.quantityActual);
        pastYearValues.data.push(x.quantityPast);
        currentYearValues.backgroundColor.push('midnightblue');
        pastYearValues.backgroundColor.push('darkkhaki');
      });
       this.barChartData.push(currentYearValues);
       this.barChartData.push(pastYearValues); 
      });

  }
  public showChart() : boolean {
    return this.barChartData !== null && this.barChartData.length > 0;
  }
}


