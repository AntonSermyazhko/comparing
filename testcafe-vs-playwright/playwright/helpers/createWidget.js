window.createWidget = (widgetName, options, selector, disableAnimation) => {
    const widgetOptions = typeof options === 'function'
        ? options()
        : options;

    const widgetSelector = selector || '#container';
    window.widget = $(`${widgetSelector}`)[widgetName](widgetOptions)[widgetName]('instance');
    if (disableAnimation) {
        window.DevExpress.fx.off = true;
    }
};
