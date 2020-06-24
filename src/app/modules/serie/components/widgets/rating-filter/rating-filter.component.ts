import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-filter',
  templateUrl: './rating-filter.component.html',
  styleUrls: ['./rating-filter.component.sass']
})
export class RatingFilterComponent implements OnInit {

  @Output()
  ratingForSearch = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onChangeRating(rating){
    this.ratingForSearch.emit(rating);
  }

}
