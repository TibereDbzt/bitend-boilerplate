import { module as Module } from 'modujs';
import '@modulesStyles/section.scss';
import bindAll from '@utils/bindAll';

export class Section extends Module {

    constructor(m) {
        super(m);

        bindAll(this, 'onScroll');

        this._isVisible = false;
    }

    init() {

    }

    onEnterView(entry) {
        entry.target.classList.add('is-visible');
        this._isVisible = true;
    }

    onLeaveView(entry) {
        entry.target.classList.remove('is-visible');
        this._isVisible = false;
    }

    onScroll(e) {
        if (!this._isVisible) return;
    }

    onResize() {
        console.log(this.el);
    }

}
