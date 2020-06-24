import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  public api: string = environment.api_url;
  public key: string = environment.api_key;
  public ts: string = environment.ts;
  public hash: string = environment.hash;

  public catalogMode : boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  private series(offset: number,sortByOrder: string,term: string, characters: string, type: string): Observable<any> {
    let searchTerm = '';
    if(term == ''){
      searchTerm = '';
    }else{
      searchTerm = '&titleStartsWith=' + term;
    }
    let searchCharacter = '';
    if(characters == ''){
      searchCharacter = '';
    }else{
      searchCharacter = '&characters=' + characters;
    }
    let searchType = '';
    if(type == ''){
      searchType = '';
    }else{
      searchType = '&seriesType=' + type;
    }
    return this.httpClient.get<any>(this.api + 'series?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&offset=' + offset + '&orderBy=' + sortByOrder + searchTerm + searchCharacter + searchType);
  }

  private serie(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'series/' + id + '?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private comicCharactersById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'comics/' + id + '/characters?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private comicCreatorsById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'comics/' + id + '/creators?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private comicSuggestions(Term: string): Observable<any> {
    return this.httpClient.get<any>(this.api + 'comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&orderBy=title&limit=4&titleStartsWith=' + Term);
  }

    // Get Comics
    public getSeries(offset: number, sortByOrder: string, term: string, characters: string, type: string): Observable<any> {
      return this.series(offset,sortByOrder,term,characters,type);
    }

    // Get Comics
    public getSerieById(id: number): Observable<any> {
      return this.serie(id);
    }

    // Get Comics
    public getComicCharactersById(id: number): Observable<any> {
      return this.comicCharactersById(id);
    }

    // Get Comics
    public getComicCreatorsById(id: number): Observable<any> {
      return this.comicCreatorsById(id);
    }

    public getComicSuggestions(Term: string): Observable<any> {
      return this.comicSuggestions(Term);
    }


    searchComic(term: string): Observable<any> {
      let url = this.api + 'comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&titleStartsWith=' + term;
      if (!term.trim()) {
        return of([]);
      }
      return this.httpClient.get<any>(url);
    }    

    public getData(name: string) {
      if(name.length < 1){ name = 'a' }
      return this.httpClient.get(this.api + 'characters?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&nameStartsWith=' + name)
    }

    public getDataID(id: string) {
      if(id.length > 0){
        return this.httpClient.get(this.api + 'characters/'+ id +'?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash)
      }
    }

}
