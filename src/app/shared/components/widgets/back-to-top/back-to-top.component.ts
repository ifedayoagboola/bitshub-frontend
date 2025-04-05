import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-back-to-top',
    imports: [],
    templateUrl: './back-to-top.component.html',
    styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {

  constructor(private viewScroller: ViewportScroller) { }

  tapToTop() {
  	this.viewScroller.scrollToPosition([0, 0]);
  }

}
