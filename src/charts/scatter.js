var d3 = require('d3');
var c3 = require('c3');
var _ =  require('bilby');
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

                // Temporary: stop data leaking through from parent element
                main.data([1]);

                // Create chart
                var chart = c3.generate({
                    bindto: main,
                    data: {
                        type: 'scatter',
                        json: [],
                    },
                    axis: {
                        x: {
                            tick: {
                                format: fields.x.format,
                                fit: false,
                            },
                        },
                        y: {
                            tick: {
                                format: fields.y.format,
                                fit: false,
                            }
                        },
                    },
                });

                return {
                    element: element,
                    main: main,
                    chart: chart,
                };
            },
            select: function(chart, selection) {
            },
            transform: _.compose(function(selection) {
                selection.filters = {};
                selection.filters['('+fields.x.name+' IS NOT NULL AND '+fields.y.name+' IS NOT NULL) or 1'] = '0';
                return selection;
            }, trans.random({ x: fields.x.name, y: fields.y.name }, 400)),
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
            resize: function(chart, opts) {
                opts = opts || {};
                opts.height = opts.height || chart.element.node().offsetHeight;
                opts.width = opts.height || chart.element.node().offsetWidth;
                chart.chart.resize(opts);
            },
        },
    });
};

module.exports = scatter;
