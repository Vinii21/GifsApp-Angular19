import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  constructor () {
    this.loadTrendingGifs();
  }

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);

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
      map(({data})=> GifMapper.mapGiphyItemsToGifArray(data) )
    );

    /* .subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.searchGifs.set(gifs);
      console.log({serach: gifs});
    }) */
  }

}
