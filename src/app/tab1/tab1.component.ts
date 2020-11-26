import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/classes/Person';
import { CallAPIService } from 'src/services/call-api.service';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {

  title = 'Examen 2 - Lenguajes Modernos de Programación';
  @Input() name: string;

  people: Person[] = [];
  display: boolean;
  noResults: boolean = false;
  cookie: string;

  constructor(private api_service: CallAPIService) {
    this.cookie = document.cookie;
  }

  ngOnInit(): void {}

  search() {
    this.display = true;
    this.callAPI();
    this.people = [];
  }

  async feelingLucky() : Promise<void>{
    this.display=false;
    await this.callAPI();
    if (this.people && this.people.length > 0){
      console.log("Automatic selection taking place");
      this.select(this.people[0]);
    }
    this.people = [];
  }

  async callAPI() : /*Por mucho que me moleste, tiene que devolver*/ Promise<void>{
    console.log("Calling API...");

    await this.api_service.call(this.name).then( // Threading
    (data) =>{                // Lambda
      this.people = data.results;
      this.noResults = (this.people.length === 0);
      console.log("Data retrieved successfully");
      console.log(this.people);
    },
    (error)=>{                // Lamda, Exception Handling
      this.people = [];
      alert(error);
      console.warn(error);
    })
  }

  select(person: Person) :void {
    console.log("Selection taking place");
    this.setCookie(person)
    // Incoming: Database Managment via ORM
    console.log(document.cookie);
    
  }

  setCookie(person: Person) : void {         // Cookie creation
    let today = new Date();
    let twoDaysFromToday = new Date(today.setDate(today.getDate() + 2));
    document.cookie = "name=" + person.name + ";SameSite=strict;expires=" + twoDaysFromToday;
    
  }

  getCookie() :string {
    return document.cookie;
  }
  
  resetCookie() : void {         // Cookie removal
    let today = new Date();
    let yesterday = new Date( today.setDate(today.getDate() - 1 ));
    document.cookie = "name=;SameSite=strict;expires=" + yesterday;
  }
}
