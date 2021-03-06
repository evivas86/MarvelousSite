import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { ComicService } from '../../services/comic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-comic-left-sidebar',
  templateUrl: './comic-left-sidebar.component.html',
  styleUrls: ['./comic-left-sidebar.component.sass']
})
export class ComicLeftSidebarComponent implements OnInit {
  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = 'title';   // sorting
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public colorFilters :   ColorFilter[] = [];

  public items        :   Product[] = [];
  public allItems: any[] = [];
  public allItemsCount: number = 0;
  public comics: any[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  public offset       :   number = 0;
  public Term       :   string = '';
  public Characters       :   string = '';
  public creators       :   string = '';
  public cID: string;
  public crID: string;
  public creatorName: string;

  searchTerms = new Subject<string>();
  comics$: Observable<any>;
  loading: boolean = false;

  constructor(private spinner: NgxSpinnerService, private comicService: ComicService, private productService: ProductService, private route: ActivatedRoute) {
    this.spinner.show();
    this.route.params.subscribe(
      (params: Params) => {
        this.cID = this.route.snapshot.queryParams["cID"];
        this.crID = this.route.snapshot.queryParams["crID"];
        if(this.cID){
          this.Characters = this.cID;
        }
        if(this.crID){
          this.creators = this.crID;
          this.comicService.getCreator(+this.creators).subscribe(creator => {
            this.creatorName = creator.data.results[0].fullName;
             });
        }
        this.comicService.getComics(this.offset,this.sortByOrder,this.Term,this.Characters,this.creators).subscribe(comics => {
          this.allItems = comics.data.results;
          this.allItemsCount = comics.data.total;
          this.comics = comics.data.results.slice(0.8);
          this.spinner.hide();
           });
      }
    )
  }

  search(term: string) {
    this.spinner.show();
    this.Term = term;
    this.comicService.getComics(this.offset,this.sortByOrder,this.Term,this.Characters,this.creators).subscribe(comics => {
      this.allItems = null;
      this.allItems = comics.data.results;
      this.allItemsCount = comics.data.total;
      this.comics = comics.data.results.slice(0.8);
      this.spinner.hide();
       });
  }



     // Get current product tags
     public getTags(products) {
      var uniqueBrands = []
      var itemBrand = Array();
      products.map((product, index) => {
         if(product.tags) {
            product.tags.map((tag) => {
            const index = uniqueBrands.indexOf(tag);
            if(index === -1)  uniqueBrands.push(tag);
         })
        }
      });
      for (var i = 0; i < uniqueBrands.length; i++) {
           itemBrand.push({brand:uniqueBrands[i]})
      }
      this.tags = itemBrand
   }

     // Get current product colors
     public getColors(products) {
      var uniqueColors = []
      var itemColor = Array();
      products.map((product, index) => {
        if(product.colors) {
        product.colors.map((color) => {
            const index = uniqueColors.indexOf(color);
            if(index === -1)  uniqueColors.push(color);
        })
       }
      });
      for (var i = 0; i < uniqueColors.length; i++) {
           itemColor.push({color:uniqueColors[i]})
      }
      this.colors = itemColor
   }

  ngOnInit(){ }



  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
    // Animation Effect fadeIn
    public fadeIn() {
      this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
      this.animation = 'fadeOut';
  }

    // Update tags filter
    public updateTagFilters(tags: any[]) {
      this.tagsFilters = tags;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



    // sorting type ASC / DESC / A-Z / Z-A etc.
    public onChangeSorting(val) {

      this.sortByOrder = val;
      if(val != 'low' && val != 'high'){
        this.spinner.show();
        this.page = 0;
        this.comicService.getComics(this.page,this.sortByOrder,this.Term,this.Characters,this.creators).subscribe(comics => {
          this.allItems = null;
          this.allItems = comics.data.results;
          this.allItemsCount = comics.data.total;
          this.spinner.hide();
         });
      }

      

   }

     // Initialize filetr Items
  public filterItems(): Product[] {
    return this.items.filter((item: Product) => {
        const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
          if(item.colors){
            if (item.colors.includes(curr.color)) {
              return prev && true;
            }
          }
        }, true);
        const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
          if(item.tags) {
            if (item.tags.includes(curr)) {
              return prev && true;
            }
          }
        }, true);
        return Colors && Tags; // return true
    });

}

public onPageChanged(event){
  this.spinner.show();
  this.page = event;
  this.offset = ( this.page * 20 ) - 20;
  if(this.sortByOrder == 'low' || this.sortByOrder == 'high'){
    this.sortByOrder = 'title';
  }
  this.comicService.getComics(this.offset,this.sortByOrder,this.Term,this.Characters,this.creators).subscribe(comics => {
    this.allItems = null;
    this.allItems = comics.data.results;
    this.allItemsCount = comics.data.total;
    this.spinner.hide();
     });
  window.scrollTo(0,0);
}

public getCharacters(characters){
  console.log(characters);
  this.Characters = characters;
  this.spinner.show();
  if(this.sortByOrder == 'low' || this.sortByOrder == 'high'){
    this.sortByOrder = 'title';
  }
  this.comicService.getComics(this.offset,this.sortByOrder,this.Term,this.Characters,this.creators).subscribe(comics => {
    this.allItems = null;
    this.allItems = comics.data.results;
    this.allItemsCount = comics.data.total;
    this.spinner.hide();
     });
}

}
