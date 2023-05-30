import { Injectable } from '@angular/core';
declare let alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message:string):any{
    alertify.success(message);
  }
  danger(message:string):any{
    alertify.error(message);
  }
}
