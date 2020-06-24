import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.sass']
})
export class CreatorListComponent implements OnInit {

 @Input() creator: any;

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
