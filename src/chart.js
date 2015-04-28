hoseChart = function(opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;

    // Event callbacks
    var enter = opts.on.enter,
        select = opts.on.select,
        transform = opts.on.transform,
        update = opts.on.update,
        exit = opts.on.exit;
    
    // Draw chart
    var chart = enter(element);

    // Define remove method
    var remove = function() {
        exit(chart);
    };

    // Connect hose to chart
    hose.connect(transform, function(data) {
        update(chart, data);
    });
    hose.onSelect(function(selection) {
        select(chart, selection);
    });

    // Return object
    return Object.freeze({
        chart: chart,
        remove: remove,
        on: {
            enter: enter,
            select: select,
            transform: transform,
            update: update,
            exit: exit,
        },
    });
};

module.exports = hoseChart;
