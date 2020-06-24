import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap, map, filter } from 'rxjs/operators';
import { SerieService } from '../../../services/serie.service';

@Component({
  selector: 'app-type-filter',
  templateUrl: './type-filter.component.html',
  styleUrls: ['./type-filter.component.sass']
})
export class TypeFilterComponent implements OnInit {

  @Output()
  typeForSearch = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onChangeType(type){
    this.typeForSearch.emit(type);
  }

}
