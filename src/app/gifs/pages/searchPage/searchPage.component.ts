import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './searchPage.component.html',
})
export default class SearchPageComponent {

  gifservice = inject(GifService);
  gifs = signal<Gif[]>([])

  onSearch(query: string) {
    this.gifservice.loadSearchGifs(query).subscribe((resp)=>{
      this.gifs.set(resp)
    });
  }
}
