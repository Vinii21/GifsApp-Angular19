import { Component, input } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-item',
  imports: [],
  templateUrl: './gif-item.component.html',
})
export class GifItemComponent {
  public imageURL = input.required<string>()
}
