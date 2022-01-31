export const useInViewport = module => {
    const io = new IntersectionObserver(
        entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                if ('onEnterView' in module) module.onEnterView(entry);
            }
            else {
                if ('onLeaveView' in module) module.onLeaveView(entry);
            }
        }),
        {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        },
    );
    io.observe(module.el);
};
