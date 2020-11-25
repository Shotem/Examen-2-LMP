import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Person } from 'src/classes/Person';

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {
  constructor( private client: HttpClient ) { }

  async call(name : string) : Promise<Person>{
    
    if ( name == undefined || name.trim() === "" ) {
      throw "Esception: Name is undefined or \"\"";
    }

    name = name.trim();

    let url : string = "https://cors-anywhere.herokuapp.com/http://swapi.dev/api/people/";
    let options = { headers: {"X-Requested-With": "XMLHttpRequest"}, params: {search: name} };
    let response;
    try {
      response = this.client.get( url, options );
    } catch ( e: any ){
      console.error(e);
    }
    
    return response.toPromise();
  }
}


