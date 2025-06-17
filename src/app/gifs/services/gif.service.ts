import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';

import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

const GIF_KEY = "gifs";

const loadGifsFromLocalStorage = (): Record<string, Gif[]> => {
  // TODO: Sería valioso validar que efectivamente el tipo de dato sea el que se especifico, ya que los datos del localStorage se pueden modificar desde el lado del cliente con mucha facilidad.
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs: Record<string, Gif[]> = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);

  searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage());
  // Cada que la señal searchHistry() cambie, se volverá a computar el searchHistoryKey()
  searchHistoryKey = computed(()=> Object.keys(this.searchHistory()));

  // [[gif1,gif2,gif3],[gif4,gif5,gif6]]
  // Para galería con diseño Masonry
  trendingGifGroup = computed<Gif[][]>(()=>{
    const groups = [];
    for(let i = 0; i < this.trendingGifs().length; i += 3){
      groups.push(this.trendingGifs().slice(i, i + 3));
    };
    return groups;
  });

  constructor () {
    this.loadTrendingGifs();
  };

  // Efecto de signal para almacenar el localStorage
  saveLocalStorage = effect(()=>{
    const historyJson = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyJson);
  });

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      console.log({trending: this.trendingGifs()})
    })
  };

  loadSearchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({data})=> GifMapper.mapGiphyItemsToGifArray(data) ),
      // Historial
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }))
      })
    );

    /* .subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.searchGifs.set(gifs);
      console.log({serach: gifs});
    }) */
  }

  getHistoryGifs(query: string): Gif[] {
    // Acceso a la propiedad del objeto mediante corchetes, bracket notation
    return this.searchHistory()[query] ?? [];
  }

}
