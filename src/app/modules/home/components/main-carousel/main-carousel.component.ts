import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.sass']
})
export class MainCarouselComponent implements OnInit {

  @Input('slides') slides: Array<any> = [];

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(private router: Router) { }

  ngOnInit() { }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      observeSlideChildren: true,
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: true,
      preloadImages: true,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "fade"
    }
  }

  goTo(url){
    this.router.navigate([url]);
  }




}
