import { Component, OnInit, OnDestroy, Directive, ElementRef,  Renderer, Input, Output, EventEmitter } from 'angular2/core';

@Directive({ selector: '[imagelazyload]' })
export class ImageLazyLoadDirective implements OnInit, OnDestroy
{
    constructor( public el : ElementRef ){}

    public displayed : boolean = false;

    isImageInViewPort( el )
    {
      let top = el.offsetTop;
      let left = el.offsetLeft;
      let width = el.offsetWidth;
      let height = el.offsetHeight;

      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
      );
    }

    displayImage()
    {
      const nativeElement = this.el.nativeElement;

      if( this.displayed ) return;
      if( nativeElement.is( ":hidden" ) ) return;

      if( this.isImageInViewPort(  nativeElement ) )
      {
        let source = nativeElement.getAttribute( "data-src" );
        nativeElement.setAttribute( "src", source );
      }
    }

    ngOnInit(){
      if ( !(this.el.nativeElement.nodeName.toLowerCase() === 'img')  )
      {
        console.warn( 'imagelazyload directive applied to a non Image element' );
        return;
      }
      else
      {
        this.displayImage();
      }

      window.addEventListener( 'scroll', this.displayImage );
    }

    ngOnDestroy() {
      window.removeEventListener( 'scroll', this.displayImage );
    }
};
