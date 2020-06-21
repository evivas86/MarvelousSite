import { Component, OnInit, Input } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.sass']
})
export class CharacterListComponent implements OnInit {

 @Input() comic: any;

 public writer: string;
 public cover: string;
 public w_flag: number = 0;
 public c_flag: number = 0;

  constructor( ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    if(this.comic.creators.available > 0){
      for (let i = 0; i < this.comic.creators.items.length; i++) {

        if(this.comic.creators.items[i].role == 'writer' && this.w_flag == 0){
          this.writer = this.comic.creators.items[i].name;
          this.w_flag = 1;
        }else if(this.comic.creators.items[i].role == 'penciller (cover)' && this.c_flag == 0){
          this.cover = this.comic.creators.items[i].name;
          this.c_flag = 1;
        }
      
      }

      if(this.w_flag == 0){this.writer = 'Not Available';}
      if(this.c_flag == 0){this.cover = 'Not Available';}
    }else{
      this.writer = 'Not Available';
      this.cover = 'Not Available';
    }

  }

   public getImg(path: string,extension: string) {
     return path +'.'+ extension;
 }

}
