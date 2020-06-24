import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public banners = [];
  public slides = [
    
    { title: 'ALL MARVEL COMICS CATALOG!', subtitle: 'Go to comics Page', image: 'assets/images/carousel/marvel-digital-only.jpg', url:'comic' },
    { title: 'THE BEST HEROES OF ALL UNIVERSE!', subtitle: 'Go to characters Page', image: 'assets/images/carousel/Universo_Marvel.png', url:'character' },
    { title: 'CREATORS WHERE ALL BEGUNS!', subtitle: 'Go to creators Page', image: 'assets/images/carousel/gettyimages-154668851.jpg', url:'creator' },
    { title: 'SERIES THAT TELL YOU EVERYTHING!', subtitle: 'Go to series Page', image: 'assets/images/carousel/alpha-flight-rumor-marvel-mcu.jpg', url:'serie' },

  ];

  constructor() { }

  ngOnInit() {

  }






}
