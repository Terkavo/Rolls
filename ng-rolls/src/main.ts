import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


Array.prototype.Remove = function (el: any) {
  let num;
  for (let index = 0; index < this.length; index++) {
    if (this[index] === el)
      num = index
  }
  if (num === undefined)
    return false;
  this.splice(num, 1)
  return true;
}
Array.prototype.Exists = function (fn: (x: any) => boolean) {
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    if (fn(element))
      return true;
  }
  return false;
}
Array.prototype.СombineOnField = function (arr: any[], field: string) {
  for (let index = 0; index < arr.length; index++) {
    const elementOtherArr = arr[index];
    let IsDoNotAdd = false;
    for (let index = 0; index < this.length; index++) {
      const elementThisArr = this[index];
      if (elementThisArr[field] === elementOtherArr[field]) {
        IsDoNotAdd = true;
        break
      }
    }
    if (IsDoNotAdd)
      continue
    this.push(elementOtherArr)
  }
}
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
