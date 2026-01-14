import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  valider(msg: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
    });

    Toast.fire({
      icon: 'success',
      title: msg
    });
  }

  error(msg: string = 'Error!') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    });
  }
}
