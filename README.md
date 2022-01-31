**bitend boilerplate**

> Frontend boilerplate that tends to be low-level with home-made modules: ScrollController, SmoothScrolling, TextSplitting, LoaderController, Ajax page transitions, etc. and the use of modern native APIs (IntersectionObserver and ResizeObserver).

- [x] Components Factory
    - [x] Use ModularJS
    - [ ] Refactor binders + modular instance into one file
- [ ] Ajax page transitions
- [ ] ScrollController
    - [x] Use VirtualScroll to normalize events
    - [x] Smooth option
    - [x] Bind components scroll triggers (for both smooth or not)
- [x] ScrollParallax component
- [ ] Use Intersection Observer API
    - [x] To trigger in view components
    - [ ] Use polyfill for browers support
- [ ] Use Resize Observer API
    - [ ] To trigger onResize components callbacks
- [ ] Text animation module
    - [ ] Text splitting
- [ ] PostCSS
- [ ] CSSNext
- [ ] View templating
- [x] Import path alias
- [x] LazyLoad images
- [ ] Loader
    - [ ] Images load event detection
    
**Dependencies:**

- Sass
- ViteJS
- VirtualScroll
- ModularJS
- Events Emitter
