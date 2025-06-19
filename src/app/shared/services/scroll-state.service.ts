import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {
  scrollState = signal(0);

  // Este es un ejemplo que puede orientarte para crear un estado para cada página
/*   scrollStatePages: Record<string, number> = {
    'home': 0,
    'gallery': 0,
  } */
}
