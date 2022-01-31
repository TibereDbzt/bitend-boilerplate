export const defaultRO = module => {
    const ro = new ResizeObserver(entries => {
        for (let entry of entries) {
            if ('onResize' in module) module.onResize(entry);
            if (entry.contentBoxSize) {
                console.log("ok");
            }
        }
    });
    ro.observe(module.el);
};
