var loadingBar = require('./loadingBar.js');

hoseChart = function(opts) {
    // Get options
    opts = opts || opts;
    var element = opts.element;
    var hose = opts.hose;

    // Event callbacks
    var enter = opts.on.enter,
        select = opts.on.select,
        transform = opts.on.transform,
        update = opts.on.update,
        exit = opts.on.exit,
        resize = opts.on.resize;
    
    if (element !== undefined) {
        // Draw chart
        var chart = enter(element);
        var bar = loadingBar(element);

        // Define remove method
        var remove = function() {
            exit(chart);
            bar.remove();
            hose.disconnect(this.connection);
        };

        // Define resize method
        var _resize = function(opts) {
            resize(chart, opts);
        };

        // Connect hose to chart
        var connection = hose.connect(transform,
        function(data) {
            update(chart, data);
            bar.finish();
        }, function(reply) {
            bar.countdown(reply.timing);
        });
        hose.onSelect(function(selection) {
            select(chart, selection);
        });
    }

    // Return object
    return Object.freeze({
        chart: chart,
        connection: connection,
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
