import Modular from 'modujs';
import * as Modules from '@modules/_index';

import '@styles/index.scss';
import ScrollController from '@controllers/ScrollController';
import { useInViewport } from '@constants/IntersectionObservers';
import { defaultRO } from '@constants/ResizeObservers';

const bindScrollTriggers = modules => {
    modules.map(module => {
        if ('onScroll' in module) ScrollController.add(module.onScroll);
    });
};

const bindUseInViewport = modules => {
    modules.map(module => {
        if ('onEnterView' in module || 'onLeaveView' in module) useInViewport(module);
    });
};

const bindResizeHandlers = modules => {
    modules.map(module => {
        if ('onResize' in module) defaultRO(module);
    });
    defaultRO({
        el: ScrollController.getContainer(),
        onResize: ScrollController.onResize,
    });
};

const loadImages = async images => {
    const promises = [];
    images.map(image => {
        promises.push(
            new Promise(resolve => {
                image.onload = () => resolve();
            })
        );
    });
    return Promise.all(promises);
};

const onLoad = async e => {
    const images = document.querySelectorAll('img');
    // await loadImages([...images]).then(() => {
    //
    // });
    const app = new Modular({
        modules: Modules
    });
    app.init(app);

    const modules = Object.values(app.currentModules);
    bindScrollTriggers(modules);
    bindUseInViewport(modules);
    bindResizeHandlers(modules);
};

window.addEventListener('load', onLoad);
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
