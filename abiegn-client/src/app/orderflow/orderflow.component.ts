import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderflow',
  templateUrl: './orderflow.component.html',
  styleUrls: ['./orderflow.component.scss']
})
export class OrderflowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  finishFunction() {
    alert('Finished!');
  }
}
