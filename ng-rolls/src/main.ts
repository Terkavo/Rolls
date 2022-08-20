import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Array.prototype.LeadToSimilarityWithBlacklist = function (newArray: any[], nameIgnoredFields?: string[] | string) {
  let safeNameIgnoredFields: string[]
  if (nameIgnoredFields === undefined)
    safeNameIgnoredFields = [];
  else if (typeof nameIgnoredFields === "string")
    safeNameIgnoredFields = [nameIgnoredFields]
  else safeNameIgnoredFields = nameIgnoredFields
  for (let i = 0; i < this.length; i++) {
    const thisArrayElement = this[i];
    let copyThisArrayElement: any = {};
    Object.assign(copyThisArrayElement, thisArrayElement)
    safeNameIgnoredFields.forEach(value => {
      delete copyThisArrayElement[value]
    })
    let isNeedDelete = true
    newArray.forEach(newArrayElement => {
      let copyNewArrayElement: any = {};
      Object.assign(copyNewArrayElement, newArrayElement)
      safeNameIgnoredFields.forEach(value => {
        delete copyNewArrayElement[value]
      })
      if (JSON.stringify(copyNewArrayElement) === JSON.stringify(copyThisArrayElement))
        isNeedDelete = false;
    })
    if (isNeedDelete) {
      this.splice(i, 1);
      i--
    }
  }
  newArray.forEach((newArrayElement, id) => {
    let copyNewArrayElement: any = {};
    Object.assign(copyNewArrayElement, newArrayElement)
    safeNameIgnoredFields.forEach(value => {
      delete copyNewArrayElement[value]
    })
    let isNeedAdd = true
    this.forEach(thisArrayElement => {
      let copyThisArrayElement: any = {};
      Object.assign(copyThisArrayElement, thisArrayElement)
      safeNameIgnoredFields.forEach(value => {
        delete copyThisArrayElement[value]
      })
      if (JSON.stringify(copyThisArrayElement) === JSON.stringify(copyNewArrayElement)) {
        isNeedAdd = false
      }
    })
    if (isNeedAdd)
      this.push(newArrayElement);
  });
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
