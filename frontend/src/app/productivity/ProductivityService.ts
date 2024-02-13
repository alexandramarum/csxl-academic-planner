// import { Injectable } from '@angular/core';
// import { ProductivityTimer } from './productivity-timer';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductivityService {
//   static defaultTimer = new ProductivityTimer(
//     0,
//     0,
//     'default',
//     'this is a default timer.'
//   );
//   static timers: ProductivityTimer[] = [ProductivityService.defaultTimer];
//   static timerCount: number = ProductivityService.timers.length;
//   constructor() {}

//   public addTimer(
//     name: string,
//     description: string,
//     workLength: number,
//     breakLength: number
//     // index: string | null
//   ): void {
//     let newTime = new ProductivityTimer(
//       workLength * 60,
//       breakLength * 60,
//       name,
//       description
//     );
//     // ProductivityService.timers[ProductivityService.timerCount] = newTime;
//     ProductivityService.timers.push(newTime);
//   }
// }
