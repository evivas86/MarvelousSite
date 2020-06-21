import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CharacterZoomComponent } from './character-zoom/character-zoom.component';
import { DOCUMENT } from '@angular/common';
import { CharacterService } from '../../services/character.service';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.sass']
})
export class CharacterDetailsComponent implements OnInit {

  public config: SwiperConfigInterface = {};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product: Product;
  public comic: any;
  public characters: any;
  public creators: any;
  public products: Product[] = [];
  public images: Product;
  public image: any;
  public zoomImage: any;
  public fullImgPath: string;
  public suggestedComics: any;
  public writer: string;
  public cover: string;
  public w_flag: number = 0;
  public c_flag: number = 0;

  public counter: number = 1;

  index: number;
  bigProductImageIndex = 0;

  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute, public productsService: ProductService, public dialog: MatDialog, private router: Router, private CharacterService: CharacterService) {
    this.route.params.subscribe(params => {

      this.CharacterService.getComicById(+params['id']).subscribe(data => {
        this.comic = data.data.results[0];
        this.comic.description == null ? this.comic.description = 'No description Available' : this.comic.description;
        let titleSlice: string = this.comic.title.slice(0,7).toLowerCase();
        this.CharacterService.getComicSuggestions(titleSlice.trim()).subscribe(data => {
          this.setSuggestedComics(data.data.results);
           });

         });
      this.CharacterService.getComicCharactersById(+params['id']).subscribe(data => {
        this.characters = data.data.results;

         });
      this.CharacterService.getComicCreatorsById(+params['id']).subscribe(data => {
        this.creators = data.data.results;

         });

      this.productsService.getProduct(1).subscribe(product => {
        this.product = product
      });
      window.scrollTo(0, 0)
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        document.body.scrollTop = 0; // scroll top to body element
      }
    });
  }


  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);

    this.document.body.scrollTop = 0;

  }

  public slideNavConfig = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slick',
    arrows: false,
    dots: false,
    focusOnSelect: true
  }
  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },


      }
    }
  }

  public openProductDialog(bigProductImageIndex) {
    let dialogRef = this.dialog.open(CharacterZoomComponent,
      {
      data: {img: bigProductImageIndex},

      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {});
  }

  public getImg(path: string,extension: string) {
    this.fullImgPath = path +'.'+ extension;
    return path +'.'+ extension;
  }

  public getRole(fullname: string) {
    let comicCreators = this.comic.creators.items;
    for (let index = 0; index < comicCreators.length; index++) {
      if(comicCreators[index].name == fullname){
        return comicCreators[index].role;
      }      
    }
  }

  public setSuggestedComics(suggestedComics){
    for (let i = 0; i < suggestedComics.length; i++) {
      this.w_flag = 0;
      this.c_flag = 0;
      if(suggestedComics[i].creators.available > 0){

        for (let x = 0; x < suggestedComics[i].creators.items.length; x++) {

          if(suggestedComics[i].creators.items[x].role == 'writer' && this.w_flag == 0){
            suggestedComics[i].creators.writer = suggestedComics[i].creators.items[x].name;
            this.w_flag = 1;
          }else if(suggestedComics[i].creators.items[x].role == 'penciller (cover)' && this.c_flag == 0){
            suggestedComics[i].creators.cover = suggestedComics[i].creators.items[x].name;
            this.c_flag = 1;
          }

          if(this.w_flag == 0){suggestedComics[i].creators.writer = 'Not Available';}
          if(this.c_flag == 0){suggestedComics[i].creators.cover = 'Not Available';}
          
        }

      }else{

        suggestedComics[i].creators.writer = 'Not Available';
         suggestedComics[i].creators.cover = 'Not Available';

      }
      
      this.suggestedComics = suggestedComics.filter(item => item.id != this.comic.id);
    }
  }



}


