# angular2-imagelazyload-directive

[![npm version](https://badge.fury.io/js/angular2-imagelazyload-directive.svg)](https://badge.fury.io/js/angular2-clickoutside-directive)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

## Install

`npm i angular2-imagelazyload-directive --save`

### Import the directive to your project and use it in your images specifing a `data-src`, `width` and `height`

```typescript
import { ImageLazyLoadDirective } from 'angular2-imagelazyload-directive';

@Component({
  selector: 'my-app',
  template : `
  <img height="200" width="200" imagelazyload threshold="300" ></img>`,
  directives : [  ImageLazyLoadDirective ]
} )
class MyFirstComponent implements OnInit {
  constructor(){}
  ngOnInit(){}
}
```

By default the directive has a 300px threshold, meaning the image will be loaded 300px before it became visible in the viewport. You can change that by passing a threshold attribute to your `img` tag.

Also by default the images are fading-in in a duration of 1000ms, you can disable that with the `fadeIn` attribute or specify the duration using the `fadeInDuration` (default 1000ms)
### Contribute

Any pull-request is more than welcome :boom: :smile:

This project adheres to the Contributor Covenant [code of conduct](http://contributor-covenant.org/). By participating, you are expected to uphold this code.

### License

MIT
