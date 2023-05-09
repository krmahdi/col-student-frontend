import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: Date): string {
    const elapsed = Date.now() - new Date(value).getTime();
    const seconds = Math.floor(elapsed / 1000);
    if (seconds < 60) {
      return `Just now`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return ` Il y a ${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `Il y a ${hours} heures`;
    }
    const days = Math.floor(hours / 24);
    return `Il y a ${days} jours`;
  }


}
