import VirtualScroll from 'virtual-scroll';
import bindAll from '@utils/bindAll';
import { clamp, lerp } from '@utils/maths';

class ScrollController {

    constructor(options) {
        bindAll(this, 'onResize', '_scrollHandler', '_translateContainer');

        this._container = options.container || window;
        this._speedMultiplier = options.speedMultiplier || 1;
        this._smooth = options.smooth || false;
        if (this._smooth) this._smoothAmount = options.smoothAmount || 0.2;

        this._triggers = [];

        this.setup();
    }

    setup() {
        if (this._smooth) {
            this._setupSmooth();
        }
        this._scroller = new VirtualScroll({
            el: this._container,
            mouseMultiplier: this._speedMultiplier,
        });
        this._setupEventListeners();
    }

    add(trigger) {
        this._triggers.push(trigger);
    }

    getContainer() {
        return this._container;
    }

    onResize() {
        this._removeEventListeners();
        this.setup();
    }

    _setupSmooth() {
        const htmlElement = document.querySelector('html');
        htmlElement.classList.add('smooth-scroll-root');
        this._container.classList.add('smooth-scroll-container');
        this._scrollBoundaries = {
            top: 0,
            bottom: this._container.getBoundingClientRect().height - window.innerHeight,
        }
        this.scrollY = 0;
        this.lerpedScrollY = 0;
        requestAnimationFrame(this._translateContainer);
    }

    _scrollHandler(e) {
        if (this._smooth) {
            this.scrollY = clamp(this.scrollY - e.deltaY, this._scrollBoundaries.top, this._scrollBoundaries.bottom);
        } else {
            this._triggers.map(trigger => {
                trigger(e);
            });
        }
    }

    _translateContainer() {
        this.lerpedScrollY = lerp(this.lerpedScrollY, this.scrollY, this._smoothAmount);
        if (this.lerpedScrollY < this._scrollBoundaries.top + 0.001) this.lerpedScrollY = this._scrollBoundaries.top;
        if (this.lerpedScrollY > this._scrollBoundaries.bottom - 0.001) this.lerpedScrollY = this._scrollBoundaries.bottom;
        this._container.style.transform = `translate3D(0, ${-this.lerpedScrollY}px, 0)`;

        this._triggers.map(trigger => {
            trigger({
                totalY: this.lerpedScrollY,
            });
        });
        requestAnimationFrame(this._translateContainer);
    }

    _setupEventListeners() {
        this._scroller.on(this._scrollHandler);
    }

    _removeEventListeners() {
        this._scroller.off(this._scrollHandler);
    }

}

export default new ScrollController({
    container: document.querySelector('.app'),
    speedMultiplier: 1.2,
    smooth: true,
    smoothAmount: 0.1,
});
