import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/classes/Person';
import { CallAPIService } from 'src/services/call-api.service';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {
  title = 'tarea-n5';
  @Input() name: string;
  people: Person[];
  cookie: string;

  constructor(private api_service: CallAPIService) {
    this.cookie = document.cookie;
  }

  ngOnInit(): void {

  }

  async callAPI() {
    let data = await this.api_service.call(this.name);
    this.people = data.results;
  }

  select(person: Person) {
    if (this.setCookie(person)) {
      console.log(document.cookie);
    }
  }

  setCookie(person: Person): boolean {
    let today = new Date();
    let twoDaysFromToday = new Date(today.setDate(today.getDate() + 2));
    document.cookie = "name=" + person.name + ";SameSite=strict;expires=" + twoDaysFromToday;
    this.people = [];
    return true;
  }

  getCookie() :string {
    return document.cookie;
  }
  
  resetCookie() : boolean {
    let today = new Date();
    let yesterday = new Date( today.setDate(today.getDate() - 1 ));
    document.cookie = "name=;SameSite=strict;expires="+ yesterday;
    return true;
  }
}
