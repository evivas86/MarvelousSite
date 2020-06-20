import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComicInterface } from '../interface/comic.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';


// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

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

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {
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

    // Get Comics
    public getComics(offset: number, sortByOrder: string, term: string, characters: string): Observable<ComicInterface> {
      return this.comics(offset,sortByOrder,term,characters);
    }


    searchComic(term: string): Observable<any> {
      let url = this.api + 'comics?apikey=' + this.key + '&ts=' + this.ts + '&hash=' + this.hash + '&titleStartsWith=' + term;
      if (!term.trim()) {
        return of([]);
      }
      return this.httpClient.get<any>(url);
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.log(`failed: ${error.message}`);
        return of(result as T);
      };
    }

    

}
