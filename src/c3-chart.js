var c3 = require('c3');
var hoseChart = require('./chart');

hoseC3Chart = function(opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;
    var fields = opts.fields;
    var items = opts.items || 15;
 
    // Event callbacks
    var enter = opts.on.enter,
        select = opts.on.select,
        transform = opts.on.transform,
        update = opts.on.update,
        exit = opts.on.exit,
        resize = opts.on.resize;
    
    // Make the chart
    return hoseChart({
        element: element,
        hose: hose,
        on: {
            enter: function(element) {
                // Create elements
                var main = element.append('div');

                // Temporary: stop data leaking through from parent element
                delete main[0][0]['__data__'];

                // Get chart options
                var chartOpts = enter(element);
                if (chartOpts.bindto === undefined)
                    chartOpts.bindto = main;

                // Create chart
                var chart = c3.generate(chartOpts);

                return {
                    element: element,
                    main: main,
                    chart: chart,
                };
            },
            select: function(chart, selection) {
                if (select) {
                    select();
                } else {
                }
            },
            transform: transform,
            update: function(chart, data) {
                var loadOpts = update(chart, data);
                chart.chart.load(loadOpts);
            },
            exit: function(chart) {
                if (exit) {
                    exit(chart);
                } else {
                    chart.main.remove();
                }
            },
            resize: function(chart, opts) {
                if (resize) {
                    resize(chart, opts)
                } else {
                    opts = opts || {};
                    opts.height = opts.height || chart.element.node().offsetHeight;
                    opts.width = opts.width || chart.element.node().offsetWidth;
                    chart.chart.resize(opts);
                }
            },
        },
    });
};

module.exports = hoseC3Chart;
