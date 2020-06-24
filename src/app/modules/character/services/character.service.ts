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

  private character(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'characters/' + id + '?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash);
  }

  private characterComicsById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'characters/' + id + '/comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&limit=4');
  }
  private characterSeriesById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + 'characters/' + id + '/series?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&limit=4');
  }

    // Get Comics
    public getCharacters(offset: number, sortByOrder: string, term: string): Observable<any> {
      return this.characters(offset,sortByOrder,term);
    }

    // Get Comics
    public getCharacterById(id: number): Observable<any> {
      return this.character(id);
    }

    // Get Comics
    public getCharacterComicsById(id: number): Observable<any> {
      return this.characterComicsById(id);
    }

    public getCharacterSeriesById(id: number): Observable<any> {
      return this.characterSeriesById(id);
    }


    searchComic(term: string): Observable<any> {
      let url = this.api + 'comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&titleStartsWith=' + term;
      if (!term.trim()) {
        return of([]);
      }
      return this.httpClient.get<any>(url);
    }    

}
