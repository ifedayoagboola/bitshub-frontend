import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  CommonModule,
  NgClass
} from "./chunk-P5WZZZXF.js";
import "./chunk-OQ6UAC5I.js";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Renderer2,
  ViewChild,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵviewQuery
} from "./chunk-RUI3P2BR.js";
import "./chunk-XCIYP5SE.js";
import "./chunk-ZUJ64LXG.js";
import "./chunk-OYTRG5F6.js";
import "./chunk-YHCV7DAQ.js";

// node_modules/ngx-image-zoom/fesm2015/ngx-image-zoom.mjs
var _c0 = ["zoomContainer"];
var _c1 = ["imageThumbnail"];
var _c2 = ["fullSizeImage"];
var _c3 = (a0) => ({
  ngxImageZoomFullContainer: true,
  ngxImageZoomLensEnabled: a0
});
var NgxImageZoomComponent = class _NgxImageZoomComponent {
  constructor(renderer, changeDetectorRef) {
    this.renderer = renderer;
    this.changeDetectorRef = changeDetectorRef;
    this.zoomScroll = new EventEmitter();
    this.zoomPosition = new EventEmitter();
    this.imagesLoaded = new EventEmitter();
    this.enableLens = false;
    this.lensBorderRadius = 0;
    this.thumbWidth = 0;
    this.thumbHeight = 0;
    this.fullWidth = 0;
    this.fullHeight = 0;
    this.lensWidth = 100;
    this.lensHeight = 100;
    this.zoomMode = "hover";
    this.magnification = 1;
    this.enableScrollZoom = false;
    this.scrollStepSize = 0.1;
    this.circularLens = false;
    this.minZoomRatio = 1;
    this.maxZoomRatio = 2;
    this.xRatio = 0;
    this.yRatio = 0;
    this.zoomingEnabled = false;
    this.zoomFrozen = false;
    this.isReady = false;
    this.thumbImageLoaded = false;
    this.fullImageLoaded = false;
    this.latestMouseLeft = -1;
    this.latestMouseTop = -1;
    this.eventListeners = [];
    this.altText = "";
    this.titleText = "";
  }
  set setThumbImage(thumbImage) {
    this.thumbImageLoaded = false;
    this.setIsReady(false);
    this.thumbImage = thumbImage;
  }
  set setFullImage(fullImage) {
    this.fullImageLoaded = false;
    this.setIsReady(false);
    this.fullImage = fullImage;
  }
  set setZoomMode(zoomMode) {
    if (_NgxImageZoomComponent.validZoomModes.some((m) => m === zoomMode)) {
      this.zoomMode = zoomMode;
    }
  }
  set setMagnification(magnification) {
    this.magnification = Number(magnification) || this.magnification;
    this.zoomScroll.emit(this.magnification);
  }
  set setMinZoomRatio(minZoomRatio) {
    const ratio = Number(minZoomRatio) || this.minZoomRatio || this.baseRatio || 0;
    this.minZoomRatio = Math.max(ratio, this.baseRatio || 0);
  }
  set setMaxZoomRatio(maxZoomRatio) {
    this.maxZoomRatio = Number(maxZoomRatio) || this.maxZoomRatio;
  }
  set setScrollStepSize(stepSize) {
    this.scrollStepSize = Number(stepSize) || this.scrollStepSize;
  }
  set setEnableLens(enable) {
    this.enableLens = Boolean(enable);
  }
  set setLensWidth(width) {
    this.lensWidth = Number(width) || this.lensWidth;
  }
  set setLensHeight(height) {
    this.lensHeight = Number(height) || this.lensHeight;
  }
  set setCircularLens(enable) {
    this.circularLens = Boolean(enable);
  }
  set setEnableScrollZoom(enable) {
    this.enableScrollZoom = Boolean(enable);
  }
  ngOnInit() {
    this.setUpEventListeners();
  }
  ngOnChanges() {
    if (this.enableLens) {
      if (this.circularLens) {
        this.lensBorderRadius = this.lensWidth / 2;
      } else {
        this.lensBorderRadius = 0;
      }
    }
    this.calculateRatioAndOffset();
    this.calculateImageAndLensPosition();
  }
  ngOnDestroy() {
    this.eventListeners.forEach((destroyFn) => destroyFn());
  }
  /**
   * Template helper methods
   */
  onThumbImageLoaded() {
    this.thumbImageLoaded = true;
    this.checkImagesLoaded();
  }
  onFullImageLoaded() {
    this.fullImageLoaded = true;
    this.checkImagesLoaded();
  }
  setUpEventListeners() {
    const nativeElement = this.zoomContainer.nativeElement;
    switch (this.zoomMode) {
      case "hover":
        this.eventListeners.push(this.renderer.listen(nativeElement, "mouseenter", (event) => this.hoverMouseEnter(event)), this.renderer.listen(nativeElement, "mouseleave", () => this.hoverMouseLeave()), this.renderer.listen(nativeElement, "mousemove", (event) => this.hoverMouseMove(event)));
        break;
      case "toggle":
        this.eventListeners.push(this.renderer.listen(nativeElement, "click", (event) => this.toggleClick(event)));
        break;
      case "toggle-click":
        this.eventListeners.push(this.renderer.listen(nativeElement, "click", (event) => this.toggleClick(event)), this.renderer.listen(nativeElement, "mouseleave", () => this.clickMouseLeave()), this.renderer.listen(nativeElement, "mousemove", (event) => this.clickMouseMove(event)));
        break;
      case "click":
        this.eventListeners.push(this.renderer.listen(nativeElement, "click", (event) => this.clickStarter(event)), this.renderer.listen(nativeElement, "mouseleave", () => this.clickMouseLeave()), this.renderer.listen(nativeElement, "mousemove", (event) => this.clickMouseMove(event)));
        break;
      case "toggle-freeze":
        this.eventListeners.push(this.renderer.listen(nativeElement, "mouseleave", () => this.toggleFreezeMouseLeave()), this.renderer.listen(nativeElement, "mousemove", (event) => this.toggleFreezeMouseMove(event)), this.renderer.listen(nativeElement, "click", (event) => this.toggleFreezeClick(event)));
        break;
      case "hover-freeze":
        this.eventListeners.push(this.renderer.listen(nativeElement, "mouseenter", (event) => this.hoverFreezeMouseEnter(event)), this.renderer.listen(nativeElement, "mouseleave", () => this.toggleFreezeMouseLeave()), this.renderer.listen(nativeElement, "mousemove", (event) => this.toggleFreezeMouseMove(event)), this.renderer.listen(nativeElement, "click", (event) => this.hoverFreezeClick(event)));
        break;
    }
    if (this.enableScrollZoom) {
      this.eventListeners.push(this.renderer.listen(nativeElement, "mousewheel", (event) => this.onMouseWheel(event)), this.renderer.listen(nativeElement, "DOMMouseScroll", (event) => this.onMouseWheel(event)), this.renderer.listen(nativeElement, "onmousewheel", (event) => this.onMouseWheel(event)));
    }
    if (this.enableLens && this.circularLens) {
      this.lensBorderRadius = this.lensWidth / 2;
    }
  }
  checkImagesLoaded() {
    this.calculateRatioAndOffset();
    if (this.thumbImageLoaded && this.fullImageLoaded) {
      this.calculateImageAndLensPosition();
      this.setIsReady(true);
    }
  }
  setIsReady(value) {
    this.isReady = value;
    this.imagesLoaded.emit(value);
  }
  /**
   * Zoom position setters
   */
  setZoomPosition(left, top) {
    this.latestMouseLeft = Number(left) || this.latestMouseLeft;
    this.latestMouseTop = Number(top) || this.latestMouseTop;
    const c = {
      x: this.latestMouseLeft,
      y: this.latestMouseTop
    };
    this.zoomPosition.emit(c);
  }
  /**
   * Mouse wheel event
   */
  onMouseWheel(event) {
    if (!this.zoomingEnabled || this.zoomFrozen) {
      return;
    }
    event = window.event || event;
    const direction = Math.max(Math.min(event.wheelDelta || -event.detail, 1), -1);
    if (direction > 0) {
      this.setMagnification = Math.min(this.magnification + this.scrollStepSize, this.maxZoomRatio);
    } else {
      this.setMagnification = Math.max(this.magnification - this.scrollStepSize, this.minZoomRatio);
    }
    this.calculateRatio();
    this.calculateZoomPosition(event);
    event.returnValue = false;
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
  /**
   * Hover mode
   */
  hoverMouseEnter(event) {
    this.zoomOn(event);
  }
  hoverMouseLeave() {
    this.zoomOff();
  }
  hoverMouseMove(event) {
    this.calculateZoomPosition(event);
  }
  /**
   * Toggle mode
   */
  toggleClick(event) {
    if (this.zoomingEnabled) {
      this.zoomOff();
    } else {
      this.zoomOn(event);
    }
  }
  /**
   * Click mode
   */
  clickStarter(event) {
    if (this.zoomingEnabled === false) {
      this.zoomOn(event);
    }
  }
  clickMouseLeave() {
    this.zoomOff();
  }
  clickMouseMove(event) {
    if (this.zoomingEnabled) {
      this.calculateZoomPosition(event);
    }
  }
  /**
   * Toggle freeze mode
   */
  toggleFreezeMouseEnter(event) {
    if (this.zoomingEnabled && !this.zoomFrozen) {
      this.zoomOn(event);
    }
  }
  hoverFreezeMouseEnter(event) {
    if (!this.zoomFrozen) {
      this.zoomOn(event);
    }
  }
  toggleFreezeMouseLeave() {
    if (this.zoomingEnabled && !this.zoomFrozen) {
      this.zoomOff();
    }
  }
  toggleFreezeMouseMove(event) {
    if (this.zoomingEnabled && !this.zoomFrozen) {
      this.calculateZoomPosition(event);
    }
  }
  toggleFreezeClick(event) {
    if (this.zoomingEnabled && this.zoomFrozen) {
      this.zoomFrozen = false;
      this.zoomOff();
    } else if (this.zoomingEnabled) {
      this.zoomFrozen = true;
      this.changeDetectorRef.markForCheck();
    } else {
      this.zoomOn(event);
    }
  }
  hoverFreezeClick(event) {
    if (this.zoomingEnabled && this.zoomFrozen) {
      this.zoomFrozen = false;
    } else if (this.zoomingEnabled) {
      this.zoomFrozen = true;
      this.changeDetectorRef.markForCheck();
    } else {
      this.zoomOn(event);
    }
  }
  /**
   * Private helper methods
   */
  zoomOn(event) {
    if (this.isReady) {
      this.zoomingEnabled = true;
      this.calculateRatioAndOffset();
      this.display = "block";
      this.calculateZoomPosition(event);
      this.changeDetectorRef.markForCheck();
    }
  }
  zoomOff() {
    this.zoomingEnabled = false;
    this.display = "none";
    this.changeDetectorRef.markForCheck();
  }
  calculateZoomPosition(event) {
    const newLeft = Math.max(Math.min(event.offsetX, this.thumbWidth), 0);
    const newTop = Math.max(Math.min(event.offsetY, this.thumbHeight), 0);
    this.setZoomPosition(newLeft, newTop);
    this.calculateImageAndLensPosition();
    this.changeDetectorRef.markForCheck();
  }
  calculateImageAndLensPosition() {
    let lensLeftMod = 0;
    let lensTopMod = 0;
    if (this.enableLens && this.latestMouseLeft > 0) {
      lensLeftMod = this.lensLeft = this.latestMouseLeft - this.lensWidth / 2;
      lensTopMod = this.lensTop = this.latestMouseTop - this.lensHeight / 2;
    }
    this.fullImageLeft = this.latestMouseLeft * -this.xRatio - lensLeftMod;
    this.fullImageTop = this.latestMouseTop * -this.yRatio - lensTopMod;
  }
  calculateRatioAndOffset() {
    this.thumbWidth = this.imageThumbnail.nativeElement.width;
    this.thumbHeight = this.imageThumbnail.nativeElement.height;
    if (!this.enableLens) {
      this.lensWidth = this.thumbWidth;
      this.lensHeight = this.thumbHeight;
      this.lensLeft = 0;
      this.lensTop = 0;
    }
    this.offsetTop = this.imageThumbnail.nativeElement.getBoundingClientRect().top;
    this.offsetLeft = this.imageThumbnail.nativeElement.getBoundingClientRect().left;
    if (this.fullImage === void 0) {
      this.fullImage = this.thumbImage;
    }
    if (this.fullImageLoaded) {
      this.fullWidth = this.fullSizeImage.nativeElement.naturalWidth;
      this.fullHeight = this.fullSizeImage.nativeElement.naturalHeight;
      this.baseRatio = Math.max(this.thumbWidth / this.fullWidth, this.thumbHeight / this.fullHeight);
      this.minZoomRatio = Math.max(this.minZoomRatio || 0, this.baseRatio || 0);
      this.calculateRatio();
    }
  }
  calculateRatio() {
    this.magnifiedWidth = this.fullWidth * this.magnification;
    this.magnifiedHeight = this.fullHeight * this.magnification;
    this.xRatio = (this.magnifiedWidth - this.thumbWidth) / this.thumbWidth;
    this.yRatio = (this.magnifiedHeight - this.thumbHeight) / this.thumbHeight;
  }
};
NgxImageZoomComponent.validZoomModes = ["hover", "toggle", "click", "toggle-click", "toggle-freeze", "hover-freeze"];
NgxImageZoomComponent.ɵfac = function NgxImageZoomComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxImageZoomComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ChangeDetectorRef));
};
NgxImageZoomComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxImageZoomComponent,
  selectors: [["lib-ngx-image-zoom"]],
  viewQuery: function NgxImageZoomComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7);
      ɵɵviewQuery(_c1, 7);
      ɵɵviewQuery(_c2, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.zoomContainer = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.imageThumbnail = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.fullSizeImage = _t.first);
    }
  },
  inputs: {
    setThumbImage: [0, "thumbImage", "setThumbImage"],
    setFullImage: [0, "fullImage", "setFullImage"],
    setZoomMode: [0, "zoomMode", "setZoomMode"],
    setMagnification: [0, "magnification", "setMagnification"],
    setMinZoomRatio: [0, "minZoomRatio", "setMinZoomRatio"],
    setMaxZoomRatio: [0, "maxZoomRatio", "setMaxZoomRatio"],
    setScrollStepSize: [0, "scrollStepSize", "setScrollStepSize"],
    setEnableLens: [0, "enableLens", "setEnableLens"],
    setLensWidth: [0, "lensWidth", "setLensWidth"],
    setLensHeight: [0, "lensHeight", "setLensHeight"],
    setCircularLens: [0, "circularLens", "setCircularLens"],
    setEnableScrollZoom: [0, "enableScrollZoom", "setEnableScrollZoom"],
    altText: "altText",
    titleText: "titleText"
  },
  outputs: {
    zoomScroll: "zoomScroll",
    zoomPosition: "zoomPosition",
    imagesLoaded: "imagesLoaded"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature],
  decls: 7,
  vars: 35,
  consts: [["zoomContainer", ""], ["imageThumbnail", ""], ["fullSizeImage", ""], [1, "ngxImageZoomContainer"], [1, "ngxImageZoomThumbnail", 3, "load", "alt", "title", "src"], [3, "ngClass"], [1, "ngxImageZoomFull", 3, "load", "alt", "title", "src"]],
  template: function NgxImageZoomComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 3, 0)(2, "img", 4, 1);
      ɵɵlistener("load", function NgxImageZoomComponent_Template_img_load_2_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onThumbImageLoaded());
      });
      ɵɵelementEnd();
      ɵɵelementStart(4, "div", 5)(5, "img", 6, 2);
      ɵɵlistener("load", function NgxImageZoomComponent_Template_img_load_5_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onFullImageLoaded());
      });
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵstyleProp("width", ctx.thumbWidth, "px")("height", ctx.thumbHeight, "px");
      ɵɵadvance(2);
      ɵɵproperty("alt", ctx.altText)("title", ctx.titleText)("src", ctx.thumbImage, ɵɵsanitizeUrl);
      ɵɵadvance(2);
      ɵɵstyleProp("display", ctx.display)("top", ctx.lensTop, "px")("left", ctx.lensLeft, "px")("width", ctx.lensWidth, "px")("height", ctx.lensHeight, "px")("border-radius", ctx.lensBorderRadius, "px");
      ɵɵproperty("ngClass", ɵɵpureFunction1(33, _c3, ctx.enableLens));
      ɵɵadvance();
      ɵɵstyleProp("display", ctx.display)("top", ctx.fullImageTop, "px")("left", ctx.fullImageLeft, "px")("width", ctx.magnifiedWidth, "px")("height", ctx.magnifiedHeight, "px");
      ɵɵproperty("alt", ctx.altText)("title", ctx.titleText)("src", ctx.fullImage, ɵɵsanitizeUrl);
    }
  },
  dependencies: [NgClass],
  styles: [".ngxImageZoomContainer[_ngcontent-%COMP%]{position:relative;margin:auto;overflow:hidden;pointer-events:none}.ngxImageZoomThumbnail[_ngcontent-%COMP%]{pointer-events:all}.ngxImageZoomFull[_ngcontent-%COMP%]{position:absolute;max-width:none;max-height:none;display:none;pointer-events:none}.ngxImageZoomFullContainer[_ngcontent-%COMP%]{position:absolute;overflow:hidden;pointer-events:none}.ngxImageZoomFullContainer.ngxImageZoomLensEnabled[_ngcontent-%COMP%]{border:2px solid red;cursor:crosshair;pointer-events:none}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxImageZoomComponent, [{
    type: Component,
    args: [{
      selector: "lib-ngx-image-zoom",
      template: '<div\n    #zoomContainer\n    class="ngxImageZoomContainer"\n    [style.width.px]="this.thumbWidth"\n    [style.height.px]="this.thumbHeight"\n>\n    <img\n        #imageThumbnail\n        class="ngxImageZoomThumbnail"\n        [alt]="altText"\n        [title]="titleText"\n        [src]="thumbImage"\n        (load)="onThumbImageLoaded()"\n    />\n\n    <div\n        [ngClass]="{\n            ngxImageZoomFullContainer: true,\n            ngxImageZoomLensEnabled: this.enableLens\n        }"\n        [style.display]="this.display"\n        [style.top.px]="this.lensTop"\n        [style.left.px]="this.lensLeft"\n        [style.width.px]="this.lensWidth"\n        [style.height.px]="this.lensHeight"\n        [style.border-radius.px]="this.lensBorderRadius"\n    >\n        <img\n            #fullSizeImage\n            class="ngxImageZoomFull"\n            [alt]="altText"\n            [title]="titleText"\n            [src]="fullImage"\n            (load)="onFullImageLoaded()"\n            [style.display]="this.display"\n            [style.top.px]="this.fullImageTop"\n            [style.left.px]="this.fullImageLeft"\n            [style.width.px]="this.magnifiedWidth"\n            [style.height.px]="this.magnifiedHeight"\n        />\n    </div>\n</div>\n',
      styles: [".ngxImageZoomContainer{position:relative;margin:auto;overflow:hidden;pointer-events:none}.ngxImageZoomThumbnail{pointer-events:all}.ngxImageZoomFull{position:absolute;max-width:none;max-height:none;display:none;pointer-events:none}.ngxImageZoomFullContainer{position:absolute;overflow:hidden;pointer-events:none}.ngxImageZoomFullContainer.ngxImageZoomLensEnabled{border:2px solid red;cursor:crosshair;pointer-events:none}\n"]
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    zoomContainer: [{
      type: ViewChild,
      args: ["zoomContainer", {
        static: true
      }]
    }],
    imageThumbnail: [{
      type: ViewChild,
      args: ["imageThumbnail", {
        static: true
      }]
    }],
    fullSizeImage: [{
      type: ViewChild,
      args: ["fullSizeImage", {
        static: true
      }]
    }],
    zoomScroll: [{
      type: Output
    }],
    zoomPosition: [{
      type: Output
    }],
    imagesLoaded: [{
      type: Output
    }],
    setThumbImage: [{
      type: Input,
      args: ["thumbImage"]
    }],
    setFullImage: [{
      type: Input,
      args: ["fullImage"]
    }],
    setZoomMode: [{
      type: Input,
      args: ["zoomMode"]
    }],
    setMagnification: [{
      type: Input,
      args: ["magnification"]
    }],
    setMinZoomRatio: [{
      type: Input,
      args: ["minZoomRatio"]
    }],
    setMaxZoomRatio: [{
      type: Input,
      args: ["maxZoomRatio"]
    }],
    setScrollStepSize: [{
      type: Input,
      args: ["scrollStepSize"]
    }],
    setEnableLens: [{
      type: Input,
      args: ["enableLens"]
    }],
    setLensWidth: [{
      type: Input,
      args: ["lensWidth"]
    }],
    setLensHeight: [{
      type: Input,
      args: ["lensHeight"]
    }],
    setCircularLens: [{
      type: Input,
      args: ["circularLens"]
    }],
    setEnableScrollZoom: [{
      type: Input,
      args: ["enableScrollZoom"]
    }],
    altText: [{
      type: Input
    }],
    titleText: [{
      type: Input
    }]
  });
})();
var NgxImageZoomModule = class {
};
NgxImageZoomModule.ɵfac = function NgxImageZoomModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxImageZoomModule)();
};
NgxImageZoomModule.ɵmod = ɵɵdefineNgModule({
  type: NgxImageZoomModule,
  declarations: [NgxImageZoomComponent],
  imports: [CommonModule],
  exports: [NgxImageZoomComponent]
});
NgxImageZoomModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxImageZoomModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxImageZoomComponent],
      imports: [CommonModule],
      exports: [NgxImageZoomComponent]
    }]
  }], null, null);
})();
export {
  NgxImageZoomComponent,
  NgxImageZoomModule
};
//# sourceMappingURL=ngx-image-zoom.js.map
