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
  cookie: string;
  firstSearch: boolean = false;

  constructor(private api_service: CallAPIService) {
    this.cookie = document.cookie;
  }

  ngOnInit(): void {}

  search() {
    this.display = true;
    this.callAPI();
    this.people = [];
  }

  feelingLucky() : void{
    this.display=false;
    this.callAPI();
    if (this.people && this.people.length > 0){
      console.log("Automatic selection taking place");
      this.select(this.people[0]);
    }
    this.people = [];
  }

  async callAPI() {
    console.log("Calling API...");

    await this.api_service.call(this.name).then(
    (data) =>{                // Lambda
      this.people = data.results;
      console.log("Data retrieved successfully");
      console.log(this.people);
    },
    (error)=>{                // Lamda, Exception Handling
      this.people = [];
      alert(error);
      console.error(error);
    })
    
    this.firstSearch = true;
  }

  select(person: Person) {
    console.log("Selection taking place");
    this.setCookie(person)
    // Agregar a la base de datos
    console.log(document.cookie);
    
  }

  setCookie(person: Person) {         // Cookie creation
    let today = new Date();
    let twoDaysFromToday = new Date(today.setDate(today.getDate() + 2));
    document.cookie = "name=" + person.name + ";SameSite=strict;expires=" + twoDaysFromToday;
    
  }

  getCookie() :string {
    return document.cookie;
  }
  
  resetCookie() : boolean {         // Cookie removal
    let today = new Date();
    let yesterday = new Date( today.setDate(today.getDate() - 1 ));
    document.cookie = "name=;SameSite=strict;expires=" + yesterday;
    return true;
  }
}
