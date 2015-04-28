var d3 = require('d3');
var hoseChart = require('../chart');
var trans = require('../transformers');

var counter = function (opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;
    var fields = opts.fields;
    
    // Get fields
    var count = fields.count;

    // Make the chart
    return hoseChart({
        element: element,
        hose: hose,
        on: {
            enter: function(element) {
                // Create elements
                var main = element.append('div'),
                    title = main.append('h3'),
                    data = main.append('p');

                // Add label for data
                title.text(count.field.label);

                // Add placeholder for data
                data.text('-');

                return {
                    main: main,
                    title: title,
                    data: data,
                };
            },
            select: function(chart, selection) {
            },
            transform: trans.aggregate(count.aggregate, count.field.name),
            update: function(chart, data) {
                // Update chart data
                chart.data.data(data)
                    .text(function(d) { return d.aggregate; });
            },
            exit: function(chart) {
                chart.main.remove();
            },
        },
    });
};

module.exports = counter;
