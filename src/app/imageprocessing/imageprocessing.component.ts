import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-imageprocessing',
  templateUrl: './imageprocessing.component.html',
  styleUrls: ['./imageprocessing.component.css']
})
export class ImageprocessingComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    var baseURL = 'http://localhost:3000/';
    const  params = new  HttpParams().set('uri', 'http://images.sadhguru.org/sites/default/files/media_files/iso/en/64083-natures-temples.jpg');
    return this.http.get<any>(baseURL+'home/imagedownload',{params}).subscribe(data => {
      console.log(data);
    })
  }

}
