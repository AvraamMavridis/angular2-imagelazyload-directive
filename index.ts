import { OnInit, OnDestroy, Directive, ElementRef, Input } from 'angular2/core';

@Directive({ selector: '[imagelazyload]' })
export class ImageLazyLoadDirective implements OnInit, OnDestroy
{
    constructor( public el : ElementRef ){}

    public displayed : boolean = false;
    public displayImageBinded;

    @Input() threshold: number = 300;
    @Input() fadeIn: boolean = true;
    @Input() fadeInDuration: number = 1;

    /**
     *  Checks if the element is inside the viewport
     *  @param { Image element }
     *  @param { Number }
     *  @return { Boolean }
     */
    isInsideViewport(element, threshold = +this.threshold )
    {
        let ownerDocument, documentTop, documentLeft;

        ownerDocument = element.ownerDocument;
        documentTop = window.pageYOffset || ownerDocument.body.scrollTop;
        documentLeft = window.pageXOffset || ownerDocument.body.scrollLeft;

        const documentWidth = window.innerWidth || (ownerDocument.documentElement.clientWidth || document.body.clientWidth);
        const documentHeight = window.innerHeight || (ownerDocument.documentElement.clientHeight || document.body.clientHeight);
        const topOffset = element.getBoundingClientRect().top + documentTop - ownerDocument.documentElement.clientTop;
        const leftOffset = element.getBoundingClientRect().left + documentLeft - ownerDocument.documentElement.clientLeft;

        const isBelowViewport = documentHeight + documentTop <= topOffset - threshold;
        const isAtRightOfViewport = documentWidth + window.pageXOffset <= leftOffset - threshold;
        const isAboveViewport = documentTop >= topOffset + threshold + element.offsetHeight;
        const isAtLeftOfViewport = documentLeft >= leftOffset + threshold + element.offsetWidth;

        return !isBelowViewport && !isAboveViewport && !isAtRightOfViewport && !isAtLeftOfViewport;
    }

    /**
     *  Checks if the element is hidden to avoid loading an image for a hidden image
     *  @param { Image element }
     *  @return { Boolean }
     */
    isHidden( element )
    {
      return window.getComputedStyle( element ).display === 'none';
    }

    /**
     *  Animate image opacity
     *  @param { Image element }
     * @param { Number }
     *  @return { Boolean }
     */
    animateFadeIn( element, time = +this.fadeInDuration )
    {
        const start = new Date().getTime(),
        timer = setInterval(function() {
            let step = Math.min(1,(new Date().getTime()-start)/time);
            element.style.opacity = step * 1;
            if( step == 1) clearInterval(timer);
        },25);
        element.style.opacity = 0;
    }

    /**
     *  Display the image
     *  @param { Image element }
     *  @return { Boolean }
     */
    displayImage()
    {
      const nativeElement = this.el.nativeElement;

      nativeElement.onload = () => {
        this.displayed  = true;
        if( this.fadeIn )
        {
          this.animateFadeIn( nativeElement )
        }
        nativeElement.classList.remove( 'loading' );
        nativeElement.classList.add( 'loaded' );
        window.removeEventListener( 'scroll', this.displayImageBinded );
        window.removeEventListener( 'resize', this.displayImageBinded );
      }

      if( this.displayed ) return;
      if( this.isHidden( nativeElement ) ) return;

      if( this.isInsideViewport(  nativeElement ) )
      {
        let source = nativeElement.getAttribute( "data-src" );

        nativeElement.classList.add( 'loading' );
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

      this.displayImageBinded = this.displayImage.bind(this)

      window.addEventListener( 'scroll', this.displayImageBinded );
      window.addEventListener( 'resize', this.displayImageBinded );
    }

    ngOnDestroy() {
      window.removeEventListener( 'scroll', this.displayImageBinded );
      window.removeEventListener( 'resize', this.displayImageBinded );
    }
};
