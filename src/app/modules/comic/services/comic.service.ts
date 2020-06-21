import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComicInterface } from '../interface/comic.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  public api: string = environment.api_url;
  public key: string = environment.api_key;
  public ts: string = environment.ts;
  public hash: string = environment.hash;

  public currency : string = 'USD';
  public catalogMode : boolean = false;

  public observer   :  Subscriber<{}>;

  constructor(private httpClient: HttpClient) {
  }

  private comics(offset: number,sortByOrder: string,term: string, characters: string): Observable<ComicInterface> {
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
      searchCharacter = '&sharedAppearances=' + characters;
    }
    return this.httpClient.get<ComicInterface>(this.api + 'comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&offset=' + offset + '&orderBy=' + sortByOrder + searchTerm + searchCharacter);
  }

  private comic(id: number): Observable<ComicInterface> {
    return this.httpClient.get<ComicInterface>(this.api + 'comics/' + id + '?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private comicCharactersById(id: number): Observable<ComicInterface> {
    return this.httpClient.get<ComicInterface>(this.api + 'comics/' + id + '/characters?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private comicCreatorsById(id: number): Observable<ComicInterface> {
    return this.httpClient.get<ComicInterface>(this.api + 'comics/' + id + '/creators?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private comicSuggestions(Term: string): Observable<ComicInterface> {
    return this.httpClient.get<ComicInterface>(this.api + 'comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&orderBy=title&limit=4&titleStartsWith=' + Term);
  }

    // Get Comics
    public getComics(offset: number, sortByOrder: string, term: string, characters: string): Observable<ComicInterface> {
      return this.comics(offset,sortByOrder,term,characters);
    }

    // Get Comics
    public getComicById(id: number): Observable<ComicInterface> {
      return this.comic(id);
    }

    // Get Comics
    public getComicCharactersById(id: number): Observable<ComicInterface> {
      return this.comicCharactersById(id);
    }

    // Get Comics
    public getComicCreatorsById(id: number): Observable<ComicInterface> {
      return this.comicCreatorsById(id);
    }

    public getComicSuggestions(Term: string): Observable<ComicInterface> {
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
