import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.sass']
})
export class SerieListComponent implements OnInit {

 @Input() serie: any;

 public writer: string;
 public cover: string;
 public w_flag: number = 0;
 public c_flag: number = 0;

  constructor( ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.setSerie(this.serie);

  }

   public getImg(path: string,extension: string) {
     return path +'.'+ extension;
 }

 public setSerie(serie){
    this.w_flag = 0;
    this.c_flag = 0;
    if(serie.creators.available > 0){

      for (let x = 0; x < serie.creators.items.length; x++) {

        if(serie.creators.items[x].role == 'writer' && this.w_flag == 0){
          serie.creators.writer = serie.creators.items[x].name;
          this.w_flag = 1;
        }else if(serie.creators.items[x].role == 'penciller (cover)' && this.c_flag == 0){
          serie.creators.cover = serie.creators.items[x].name;
          this.c_flag = 1;
        }

        if(this.w_flag == 0){serie.creators.writer = 'Not Available';}
        if(this.c_flag == 0){serie.creators.cover = 'Not Available';}
        
      }

    }else{

      serie.creators.writer = 'Not Available';
      serie.creators.cover = 'Not Available';

    }
    
    this.serie = serie;
}

}
