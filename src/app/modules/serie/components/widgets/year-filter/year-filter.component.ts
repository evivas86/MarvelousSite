import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {VERSION} from '@angular/material/core';

@Component({
  selector: 'app-year-filter',
  templateUrl: './year-filter.component.html',
  styleUrls: ['./year-filter.component.sass']
})
export class YearFilterComponent implements OnInit {

  @Input() character: any;

  myControl = new FormControl();
  filteredOptions: Observable<any>;
  dates: any[] = [];


  @Output()
  yearForSearch = new EventEmitter<any>();


  version = VERSION;
  date = new Date();
  chosenYearDate: Date;
  chosenMonthDate: Date = new Date(2020,0,1);
  chosenSemesterDate: Date;
  chosenWeekDate: Date;
  chosenDate: Date;
  monthInputCtrl: FormControl = new FormControl(new Date(2020,0,1));
  public startYear: Date;
  public endYear: Date;

  visible = true;

  constructor() { }

  ngOnInit() {
  }

  setStartYear(event){
    this.startYear = event;
    if(this.startYear > this.endYear || this.endYear == null){
      this.endYear = this.startYear;
    }
  }

  setEndYear(event){
    this.endYear = event;
    if(this.endYear < this.startYear || this.startYear == null){
      this.startYear = this.endYear;
    }
  }

  sendEmitter(){
    let emmiter = [this.startYear.getFullYear(),this.endYear.getFullYear()];
    this.yearForSearch.emit(emmiter);
  }



}
