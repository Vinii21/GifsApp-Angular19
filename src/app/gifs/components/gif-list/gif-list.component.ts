import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifItemComponent } from "./gif-item/gif-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifItemComponent],
  templateUrl: './gif-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  public gifs = input.required<Gif[]>()

  xd () {
    console.log("hola")
    console.log("Cargando...")
    setTimeout(()=>{
      console.log(this.gifs())
    },2000)
  }
}
