import { CarandorderService } from '@app/util/carandorder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-config',
  templateUrl: './auto-config.component.html',
  styleUrls: ['./auto-config.component.scss']
})
export class AutoConfigComponent implements OnInit {

  private autoSpec: AutoSpec;
  constructor(private carandorder: CarandorderService) {
    this.autoSpec = carandorder.parsedConfiguration;
  }

  ngOnInit() {
  }

}
