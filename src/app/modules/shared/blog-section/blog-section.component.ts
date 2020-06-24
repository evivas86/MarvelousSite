import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.sass']
})
export class BlogSectionComponent implements OnInit {

  public news: any;
  public api: string = environment.news_url;
  public key: string = environment.news_key;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.GetNewsData();
  }

  GetNewsData() {

    let query = 'marvel';
    let language = 'en';
    let pageSize = '5';

    this.httpClient
    .get<any>(this.api + '?qInTitle=' + query + '&language=' + language + '&pageSize=' + pageSize + '&apiKey=' + this.key)
    .subscribe(data => {  this.news = data.articles; console.log(this.news);  });
    
  }

}
