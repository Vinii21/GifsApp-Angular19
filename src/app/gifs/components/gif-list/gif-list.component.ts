import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifItemComponent } from "./gif-item/gif-item.component";

@Component({
  selector: 'gif-list',
  imports: [GifItemComponent],
  templateUrl: './gif-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  public gifs = input.required<string[]>()
}
