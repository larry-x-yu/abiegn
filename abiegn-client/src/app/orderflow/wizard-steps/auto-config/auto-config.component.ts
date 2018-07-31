import { WizardStep } from '../wizard-step';
import { CarandorderService } from '@app/util/carandorder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-config',
  templateUrl: './auto-config.component.html',
  styleUrls: ['./auto-config.component.scss']
})
export class AutoConfigComponent implements OnInit, WizardStep {

  _autoSpec: AutoSpec;
  constructor(private carandorder: CarandorderService) {
  }

  ngOnInit() {
  }

  get autoSpec() {
    return this.carandorder.parsedConfiguration;
  }

  canEnter(): boolean {
    return true;
  }
  canExit(): boolean {
    return false;
  }

}
