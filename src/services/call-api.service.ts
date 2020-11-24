import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {
  constructor( private client: HttpClient ) { }

  async call(name : string) : Promise<any>{
    console.log(name);
    //name = name.replace(" ", "%20");
    console.log(name);
    let url : string = "https://cors-anywhere.herokuapp.com/http://swapi.dev/api/people/";
    let options = { headers: {"X-Requested-With": "XMLHttpRequest"}, params: {search: name} };
    let response = this.client.get( url, options );
    //let data = response.subscribe( (data)=>{return data;}, (error)=>{console.log(error);} );
    return response.toPromise();
    /*.subscribe(
      data => {data}, 
      (error:any) => { console.log(error); } 
     );
     */
  }
}


