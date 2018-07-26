import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarandorderService {

  constructor() { }

  private _parsedConfiguration: AutoSpec;

  get parsedConfiguration(): AutoSpec {
    return this._parsedConfiguration;
  }

  set parsedConfiguration(value: AutoSpec) {
    this._parsedConfiguration = value;
  }

}
