import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gifHistory.component.html',
})
export default class GifHistoryComponent {
  // Ruta activa
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  )
}
