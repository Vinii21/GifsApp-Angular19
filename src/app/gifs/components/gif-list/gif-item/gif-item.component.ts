import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-item',
  imports: [],
  templateUrl: './gif-item.component.html',
})
export class GifItemComponent {
  public imageURL = input.required<string>()
}
