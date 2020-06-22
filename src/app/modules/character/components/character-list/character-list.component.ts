import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.sass']
})
export class CharacterListComponent implements OnInit {

 @Input() character: any;

 public writer: string;
 public cover: string;
 public w_flag: number = 0;
 public c_flag: number = 0;

  constructor( ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

  }

   public getImg(path: string,extension: string) {
     return path +'.'+ extension;
 }

}
