import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

/* const imageUrls: string[] = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
]; */

@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trendingPage.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {

  gifService = inject(GifService);
  scrollState = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>("scrollDivRef");

  ngAfterViewInit(): void {
    // En el momento que se construye el componente, se establece el valor del scroll
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollState.scrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    // Para determinar el cuando, ejecutar la petición de la nueva data a mostrar.
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    // Se establece el scrollTop en el servicio para preservarlo.
    this.scrollState.scrollState.set(scrollDiv.scrollTop);

    if(isAtBottom) {
      // TODO: cargar la siguiente página de gifs
      this.gifService.loadTrendingGifs();
    }
  }

}
