var loadingBar = require('./loadingBar.js');

hoseChart = function(opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;

    // Event callbacks
    var enter = opts.on.enter,
        select = opts.on.select,
        transform = opts.on.transform,
        update = opts.on.update,
        exit = opts.on.exit,
        resize = opts.on.resize;
    
    // Draw chart
    var chart = enter(element);
    var bar = loadingBar(element);

    // Define remove method
    var remove = function() {
        exit(chart);
        bar.remove();
    };

    // Define resize method
    var _resize = function(opts) {
        resize(chart, opts);
    };

    // Connect hose to chart
    hose.connect(transform, function(data) {
        update(chart, data);
        bar.finish();
    }, function(reply) {
        bar.countdown(reply.timing);
    });
    hose.onSelect(function(selection) {
        select(chart, selection);
    });

    // Return object
    return Object.freeze({
        chart: chart,
        remove: remove,
        resize: _resize,
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
