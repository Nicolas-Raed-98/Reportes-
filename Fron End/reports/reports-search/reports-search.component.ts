import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VoucherSearchViewModel } from 'src/app/models/voucher-search-view.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReportsSearchViewModel } from 'src/app/models/reports-search-view.model';
@Component({
  selector: 'app-reports-search',
  templateUrl: './reports-search.component.html',
  styleUrls: ['./reports-search.component.css']
})
export class ReportsSearchComponent implements OnInit {

  @Input() reportsSearchViewModel: ReportsSearchViewModel;
  

  formGroup: FormGroup;
  
  @Output() reportsSearchViewModelEmitter: EventEmitter<ReportsSearchViewModel> = new EventEmitter<ReportsSearchViewModel>(); 
  
  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit() {
    this.setFormGroup();
  }
  
  private setFormGroup() {
      this.formGroup = this.fb.group({
      from: new FormControl(this.reportsSearchViewModel.from),
      to: new FormControl(this.reportsSearchViewModel.to),
    });
  }
  
  dateChange(event) {
  }
    
  formValid(): boolean {
    return this.formGroup.status === "VALID";
  }
  
  setEndDate() {
    if (this.formGroup.value.to < this.formGroup.value.from) {
       this.formGroup.value.to = this.formGroup.value.from;
    }
  }
  
  onSubmit() {
    const formModel = this.formGroup.value;
    this.reportsSearchViewModel.from = formModel.from;
    this.setEndDate();
    this.reportsSearchViewModel.to = formModel.to;
    
    this.reportsSearchViewModelEmitter.emit(this.reportsSearchViewModel);
  }

}
