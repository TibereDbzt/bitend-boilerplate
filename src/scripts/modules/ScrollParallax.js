import { module as Module } from 'modujs';
import '../../styles/modules/scroll-parallax.scss';
import bindAll from '../utils/bindAll';

export class ScrollParallax extends Module {

    constructor(m) {
        super(m);

        bindAll(this, 'onScroll', 'onEnterView', 'onLeaveView');

        this.amount = this.getData('amount') || 1.2;
        this.reverse = this.getData('reverse') || false;
        this.isVisible = false;
    }

    init() {
        this.totalScrollY = window.innerHeight + this.el.getBoundingClientRect().height;
        this.setStyles();
    }

    setStyles() {
        this.el.style.height = `${this.amount * 100}%`;
        this.el.style.willChange= 'transform';
        this.reverse ? this.el.style.top = '0' : this.el.style.bottom = '0';
    }

    onScroll(e) {
        if (!this.isVisible) return;

        if (!this.baseScrollY) {
            this.baseScrollY = e.totalY;
        }

        let diffY = e.totalY - this.baseScrollY;

        const factor = Math.sign(diffY) * Math.min(Math.max(Math.abs(diffY), 0), this.totalScrollY) / this.totalScrollY;
        let tY = factor * (this.amount * 100 - 100);
        if (this.reverse) tY *= -1;
        this.el.style.transform = `translate3d(0, ${tY}%, 0)`;
    }

    onEnterView(bounds) {
        this.isVisible = true;
        this.el.classList.add('is-visible');
    }

    onLeaveView(bounds) {
        this.el.classList.remove('is-visible');
        this.isVisible = false;
    }
}
