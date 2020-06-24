import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchCharacterService {

  public api: string = environment.api_url;
  public key: string = environment.api_key;
  public ts: string = environment.ts;
  public hash: string = environment.hash;

  constructor(private httpClient: HttpClient) {
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
