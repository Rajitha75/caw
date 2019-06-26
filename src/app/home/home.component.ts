import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    var baseURL = 'http://localhost:3000/';
    return this.http.get<any>(baseURL+'home').subscribe(data => {
      console.log(data);
    })
  }

  


}
