var d3 = require('d3');
var c3 = require('c3');
var hoseChart = require('../chart');
var trans = require('../transformers');

var scatter = function(opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;
    var fields = opts.fields;
    
    // Make the chart
    return hoseChart({
        element: element,
        hose: hose,
        on: {
            enter: function(element) {
                // Create elements
                var main = element.append('div');

                // Create chart
                var chart = c3.generate({
                    bindto: main,
                    data: {
                        type: 'scatter',
                        json: [],
                    },
                });

                return {
                    main: main,
                    chart: chart,
                };
            },
            select: function(chart, selection) {
            },
            transform: trans.random({ x: fields.x.name, y: fields.y.name }, 400),
            update: function(chart, data) {
                // Load new data into chart
                chart.chart.load({
                    json: data,
                    keys: {
                        x: 'x',
                        value: ['y'],
                    },
                });
            },
            exit: function(chart) {
                chart.main.remove();
            },
        },
    });
};

module.exports = scatter;
