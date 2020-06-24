import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap, map, filter } from 'rxjs/operators';
import { SerieService } from '../../../services/serie.service';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.sass']
})
export class CharacterFilterComponent implements OnInit {

  @Input() character: any;

  myControl = new FormControl();
  filteredOptions: Observable<any>;
  characters: any[] = [];


  @Output()
  charactersForSearch = new EventEmitter<any>();

  constructor(private serieService: SerieService) { }

  ngOnInit() {

    if(this.character != ''){
      this.serieService.getDataID(this.character).subscribe((c: any)=>{
        this.addCharacter(c.data.results[0].id,c.data.results[0].name);
      })
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.serieService.getData(value).pipe(
      filter(data => !!data),
      map((data) => {
        let results = data['data']['results'];
        return results.filter(option => option.name.toLowerCase().includes(value))
      })
    )
  }

  addCharacter(id,name) {

    var character = {
      id: id,
      name: name
    }
    this.characters.push(character);
    this.processCharacters(this.characters);
  }

  deleteCharacter(i) {
    this.characters.splice(i, 1);
    this.processCharacters(this.characters);
  }

  processCharacters(characters) {
    let s = '';
    for (let i = 0; i < characters.length; i++) {
      if(i == 0){
        s = s + characters[i].id;
      }else{
        s = s + ',' + characters[i].id;
      }
    }
    this.charactersForSearch.emit(s);
  }

}
