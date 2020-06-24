import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  public api: string = environment.api_url;
  public key: string = environment.api_key;
  public ts: string = environment.ts;
  public hash: string = environment.hash;

  constructor(private httpClient: HttpClient) {
  }

  private creators(offset: number,sortByOrder: string,term: string): Observable<any> {
    let searchTerm = '';
    if(term == ''){
      searchTerm = '';
    }else{
      searchTerm = '&nameStartsWith=' + term;
    }
    if(sortByOrder == ''){
      sortByOrder = 'firstName';
    }
    return this.httpClient.get<any>(this.api + 'creators?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&offset=' + offset + '&orderBy=' + sortByOrder + searchTerm);
  }

  private creator(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'creators/' + id + '?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private creatorComicsById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'creators/' + id + '/comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }
  private creatorSeriesById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'creators/' + id + '/series?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

    // Get Comics
    public getCreators(offset: number, sortByOrder: string, term: string): Observable<any> {
      return this.creators(offset,sortByOrder,term);
    }

    // Get Comics
    public getCreatorById(id: number): Observable<any> {
      return this.creator(id);
    }

    // Get Comics
    public getCreatorComicsById(id: number): Observable<any> {
      return this.creatorComicsById(id);
    }

    public getCreatorSeriesById(id: number): Observable<any> {
      return this.creatorSeriesById(id);
    }


    searchComic(term: string): Observable<any> {
      let url = this.api + 'comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&titleStartsWith=' + term;
      if (!term.trim()) {
        return of([]);
      }
      return this.httpClient.get<any>(url);
    }    

}
