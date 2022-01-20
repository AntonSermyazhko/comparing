window.disposeWidgets = () => {
    const widgetSelector = '.dx-widget';
    const $elements = $(widgetSelector)
        .filter((_, element) => $(element).parents(widgetSelector).length === 0);
    $elements.each((_, element) => {
        const $widgetElement = $(element);
        const widgetNames = $widgetElement.data().dxComponents;
        widgetNames?.forEach((name) => {
            if ($widgetElement.hasClass('dx-widget')) {
                $widgetElement[name]('dispose');
            }
        });
        $widgetElement.empty();
    });
};
