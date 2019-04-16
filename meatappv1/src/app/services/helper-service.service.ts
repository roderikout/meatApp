import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  constructor() { }
  // Helper functions
  csvToArray(csvString: string): string[] {
    let arrayOfItems: string[];
    let finalArrayOfItems: string[] = [];
    arrayOfItems = csvString.split(',');
    for (let i = 0; i < arrayOfItems.length; i++) {
      const capitalizadItem = this.titleCase(arrayOfItems[i]);
      finalArrayOfItems[i] = capitalizadItem;
    }
    finalArrayOfItems = finalArrayOfItems.filter(function(item) {
      return item.trim() !== '';
    });
    return finalArrayOfItems;
  }

  csvToObjectCuts(csvValue: string): object { // solo para objetos en firebase que necesitan un booleano
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

  titleCase(str: string): string {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
 }
}
