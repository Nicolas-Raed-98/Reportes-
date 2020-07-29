import { Injectable } from '@angular/core';
import { BookingsReportRequestViewModel } from '../models/bookings-report-request-view-model';
import { BehaviorSubject, Observable } from "rxjs";
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { BookingsByDateViewModels } from '../models/bookings-by-date-view-models';
import { environment } from 'src/environments/environment';
import { ExcursionsReportRequestViewModel } from '../models/excursions-report-request-view-model';
import { ExcursionsByDateViewModel } from '../models/excursions-by-date-view-model';
import { ClientsReportRequestViewModel } from '../models/clients-report-request-view-model';
import { ClientsByDateViewModel } from '../models/clients-by-date-view-model';
import { OperatorReportRequestViewModel } from '../models/operator-report-request-view-model';
import { OperatorByDateViewModel } from '../models/operator-by-date-view-model';
import { GuideReportRequestViewModel } from '../models/guides-report-request-view-model';
import { GuideByDateViewModel } from '../models/guides-by-date-view-model';
import { TransportByDateViewModel } from '../models/transport-by-date-view-model';
import { TransportReportRequestViewModel } from '../models/transport-report-request-view-model';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {   
  }

  public getoBokingsReport(bookingsReportRequestViewModel: BookingsReportRequestViewModel) {
    let request = new BookingsReportRequestViewModel();
    request.from = moment(bookingsReportRequestViewModel.from).format('YYYY-MM-DD');
    request.to =  moment(bookingsReportRequestViewModel.to).format('YYYY-MM-DD');
    

    return this.http.post<BookingsByDateViewModels[]>(environment.baseUrl + 'api/Reports/Booking', request);     
  }
  public getActivitiesReport(excursionsReportRequestViewModel: ExcursionsReportRequestViewModel) {
    let request = new ExcursionsReportRequestViewModel();
    request.from = moment(excursionsReportRequestViewModel.from).format('YYYY-MM-DD');
    request.to =  moment(excursionsReportRequestViewModel.to).format('YYYY-MM-DD');
    

    return this.http.post<ExcursionsByDateViewModel[]>(environment.baseUrl + 'api/Reports/Activity', request);     
  }
  public getClientsReport(clientsReportRequestViewModel: ClientsReportRequestViewModel){
    let request = new ClientsReportRequestViewModel();
    request.from = moment(clientsReportRequestViewModel.from).format('YYYY-MM-DD');
    request.to = moment(clientsReportRequestViewModel.to).format('YYYY-MM-DD');

    return this.http.post<ClientsByDateViewModel[]>(environment.baseUrl + 'api/Reports/Client', request);
  }
  public getOperatorsReport(operatorReportRequestViewModel: OperatorReportRequestViewModel){
    let request = new OperatorReportRequestViewModel();
    request.from = moment(operatorReportRequestViewModel.from).format('YYYY-MM-DD');
    request.to = moment(operatorReportRequestViewModel.to).format('YYYY-MM-DD');

    return this.http.post<OperatorByDateViewModel[]>(environment.baseUrl + 'api/Reports/Operator', request);
  }
  public getGuidesReport(guideReportRequestViewModel: GuideReportRequestViewModel){
    let request = new OperatorReportRequestViewModel();
    request.from = moment(guideReportRequestViewModel.from).format('YYYY-MM-DD');
    request.to = moment(guideReportRequestViewModel.to).format('YYYY-MM-DD');

    return this.http.post<GuideByDateViewModel[]>(environment.baseUrl + 'api/Reports/Guide', request);
  }
  public getTransportsReport(transportReportRequestViewModel: TransportReportRequestViewModel){
    let request = new TransportReportRequestViewModel();
    request.from = moment(transportReportRequestViewModel.from).format('YYYY-MM-DD');
    request.to = moment(transportReportRequestViewModel.to).format('YYYY-MM-DD');

    return this.http.post<TransportByDateViewModel[]>(environment.baseUrl + 'api/Reports/Transport', request);
  }

}
