import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  constructor() { }
  // Helper functions
  csvToArray(csvString: string): string[] {
    return csvString.split(',');
  }

  csvToObject(csvValue: string): object { // solo para objetos en firebase que necesitan un booleano
    const newObject = {};
    const newArray: string[] = this.csvToArray(csvValue);
    for (const k in newArray) {
      if (newArray.hasOwnProperty(k)) {
        const name: string = newArray[k];
        newObject[name] = true;
      }
    }
    return newObject;
  }

  arrayToObject(arrayIn: string[]): object { // solo para objetos en firebase que necesitan un booleano
    const newObject = {};
    for (const k in arrayIn) {
      if (arrayIn.hasOwnProperty(k)) {
        const name: string = arrayIn[k];
        newObject[name] = true;
      }
    }
    return newObject;
  }

  arrayToCsv(arrayValue: string[]): string {
    let csv = '';
    return csv = arrayValue.join(', ');
  }

  objToArray(object: object): string[] {
    const keys = [];
    for (const k in object) {
      if (object.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    return keys;
  }
}
