import { Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from './gifsSideMenuHeader/gifsSideMenuHeader.component';
import { GifsSideMenuOptionsComponent } from './gifsSideMenuOptions/gifsSideMenuOptions.component';


@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent],
  templateUrl: './gifsSideMenu.component.html',
})
export class GifsSideMenuComponent { }
