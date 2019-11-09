import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() faceApiResponse: FaceRecognitionResponse;
  constructor() {}

  ngOnInit() {}

  getFaceId () {
    console.log(this.faceApiResponse);
    var face = JSON.stringify(this.faceApiResponse);
    console.log(face);
  }
}
