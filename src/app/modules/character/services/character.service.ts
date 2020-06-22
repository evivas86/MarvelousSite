import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public api: string = environment.api_url;
  public key: string = environment.api_key;
  public ts: string = environment.ts;
  public hash: string = environment.hash;

  constructor(private httpClient: HttpClient) {
  }

  private characters(offset: number,sortByOrder: string,term: string): Observable<any> {
    let searchTerm = '';
    if(term == ''){
      searchTerm = '';
    }else{
      searchTerm = '&nameStartsWith=' + term;
    }
    if(sortByOrder == ''){
      sortByOrder = 'name';
    }
    return this.httpClient.get<any>(this.api + 'characters?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&offset=' + offset + '&orderBy=' + sortByOrder + searchTerm);
  }

  private comic(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'comics/' + id + '?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
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
    public getCharacters(offset: number, sortByOrder: string, term: string): Observable<any> {
      return this.characters(offset,sortByOrder,term);
    }

    // Get Comics
    public getComicById(id: number): Observable<any> {
      return this.comic(id);
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

}
