import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CreatorZoomComponent } from './creator-zoom/creator-zoom.component';
import { DOCUMENT } from '@angular/common';
import { CreatorService } from '../../services/creator.service';


@Component({
  selector: 'app-creator-details',
  templateUrl: './creator-details.component.html',
  styleUrls: ['./creator-details.component.sass']
})
export class CreatorDetailsComponent implements OnInit {

  public config: SwiperConfigInterface = {};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product: Product;
  public creator: any;
  public comics: any[] = [];
  public series: any[] = [];
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
  public r_flag: number = 0;

  public counter: number = 1;

  index: number;
  bigProductImageIndex = 0;

  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute, public productsService: ProductService, public dialog: MatDialog, private router: Router, private creatorService: CreatorService) {
    this.route.params.subscribe(params => {

      this.creatorService.getCreatorById(+params['id']).subscribe(data => {
        this.creator = data.data.results[0];

         });

      this.creatorService.getCreatorComicsById(+params['id']).subscribe(data => {
        this.setComics(data.data.results);
         });
      this.creatorService.getCreatorSeriesById(+params['id']).subscribe(data => {
        this.setSeries(data.data.results);
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
    let dialogRef = this.dialog.open(CreatorZoomComponent,
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


  public searchMoreComics(id: number) {
    this.router.navigate(['/comic'],{queryParams:{crID:id}});
  }

  public setComics(Comics){
    for (let i = 0; i < Comics.length; i++) {
      this.w_flag = 0;
      this.c_flag = 0;
      this.r_flag = 0;
      if(Comics[i].creators.available > 0){

        for (let x = 0; x < Comics[i].creators.items.length; x++) {

          if(Comics[i].creators.items[x].role == 'writer' && this.w_flag == 0){
            Comics[i].creators.writer = Comics[i].creators.items[x].name;
            this.w_flag = 1;
          }else if(Comics[i].creators.items[x].role == 'penciller (cover)' && this.c_flag == 0){
            Comics[i].creators.cover = Comics[i].creators.items[x].name;
            this.c_flag = 1;
          }

          if(Comics[i].creators.items[x].name == this.creator.fullName && this.r_flag == 0){
            Comics[i].creators.role = Comics[i].creators.items[x].role;
            this.r_flag = 1;
          }

          if(this.w_flag == 0){Comics[i].creators.writer = 'Not Available';}
          if(this.c_flag == 0){Comics[i].creators.cover = 'Not Available';}
          if(this.r_flag == 0){Comics[i].creators.role = 'Not Available';}
          
        }

      }else{

        Comics[i].creators.writer = 'Not Available';
        Comics[i].creators.cover = 'Not Available';
        Comics[i].creators.role = 'Not Available';

      }
      
      this.comics = Comics;
    }
  }


  public setSeries(series){

    for (let i = 0; i < series.length; i++) {
      this.r_flag = 0;
      if(series[i].creators.available > 0){

        for (let x = 0; x < series[i].creators.items.length; x++) {

          if(series[i].creators.items[x].name == this.creator.fullName && this.r_flag == 0){
            series[i].creators.role = series[i].creators.items[x].role;
            this.r_flag = 1;
          }

          if(this.r_flag == 0){series[i].creators.role = 'Not Available';}
          
        }

      }else{

        series[i].creators.role = 'Not Available';

      }
      
      this.series = series;
    }
  }



}


