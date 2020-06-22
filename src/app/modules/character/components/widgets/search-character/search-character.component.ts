import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.sass']
})
export class SearchCharacterComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<any>;
  characters: any[] = [];
  letters: any = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  selectedLetter: string = '';

  @Output()
  letterForSearch = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  processCharacters(letter) {
    if(this.selectedLetter != letter){
      this.selectedLetter = letter;
    }else{
      this.selectedLetter = '';
    }
    this.letterForSearch.emit(this.selectedLetter);
  }

  setColor(letter){
    if(this.selectedLetter == letter){
      return 'accent';
    }else{
      return 'grey';
    }
  }

}
