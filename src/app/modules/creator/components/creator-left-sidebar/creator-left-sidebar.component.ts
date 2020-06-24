import { Component, OnInit } from '@angular/core';
import { CreatorService } from '../../services/creator.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-creator-left-sidebar',
  templateUrl: './creator-left-sidebar.component.html',
  styleUrls: ['./creator-left-sidebar.component.sass']
})
export class CreatorLeftSidebarComponent implements OnInit {
  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = 'firstName';   // sorting
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public colorFilters :   ColorFilter[] = [];

  public items        :   Product[] = [];
  public allItems: any;
  public allItemsCount: any;
  public creators: any[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  public offset       :   number = 0;
  public Term       :   string = '';
  public Characters       :   string = '';

  searchTerms = new Subject<string>();
  comics$: Observable<any>;
  loading: boolean = false;

  constructor(private spinner: NgxSpinnerService, private creatorService: CreatorService, private route: ActivatedRoute) {
    this.spinner.show();
    this.route.params.subscribe(
      (params: Params) => {

        this.creatorService.getCreators(this.offset,this.sortByOrder,this.Term).subscribe(creator => {
          console.log(creator);
          this.allItems = creator.data.results;
          this.allItemsCount = creator.data.total;
          this.creators = creator.data.results.slice(0.8);
          this.spinner.hide();
           });
      }
    )
  }

  search(term: string) {
    this.spinner.show();
    this.Term = term;
    this.creatorService.getCreators(this.offset,this.sortByOrder,this.Term).subscribe(creator => {
      this.allItems = null;
      this.allItems = creator.data.results;
      this.allItemsCount = creator.data.total;
      this.creators = creator.data.results.slice(0.8);
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
        this.creatorService.getCreators(this.page,this.sortByOrder,this.Term).subscribe(creator => {
          this.allItems = null;
          this.allItems = creator.data.results;
          this.allItemsCount = creator.data.total;
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
  this.creatorService.getCreators(this.offset,this.sortByOrder,this.Term).subscribe(creator => {
    this.allItems = null;
    this.allItems = creator.data.results;
    this.allItemsCount = creator.data.total;
    this.spinner.hide();
     });
  window.scrollTo(0,0);
}

public getCharactersByLetter(letter){
  this.Term = letter;
  this.spinner.show();
  this.creatorService.getCreators(this.offset,this.sortByOrder,this.Term).subscribe(creator => {
    this.allItems = null;
    this.allItems = creator.data.results;
    this.allItemsCount = creator.data.total;
    this.spinner.hide();
     });
}

}
