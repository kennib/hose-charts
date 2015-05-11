var d3 = require('d3');
var c3 = require('c3');
var _ =  require('bilby');
var hoseC3Chart = require('../c3-chart');
var trans = require('../transformers');

var scatter = function(opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;
    var fields = opts.fields;
    
    // Make the chart
    return hoseC3Chart({
        element: element,
        hose: hose,
        fields: [{
            name: 'x',
        }, {
            name: 'y',
        }],
        on: {
            enter: function(element) {
                // Chart options
                var chartOpts = {
                    data: {
                        type: 'scatter',
                        json: [],
                        names: {
                            x: fields.x.label,
                            y: fields.y.label,
                        },
                    },
                    legend: {
                        show: false,
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
                };

                return chartOpts;
            },
            select: function(chart, selection) {
            },
            transform: _.compose(function(selection) {
                selection.filters = {};
                selection.filters['('+fields.x.name+' IS NOT NULL AND '+fields.y.name+' IS NOT NULL) or 1'] = '0';
                return selection;
            }, trans.random({ x: fields.x.name, y: fields.y.name }, 400)),
            update: function(chart, data) {
                // Loading options for new data
                var loadOpts = {
                    json: data,
                    keys: {
                        x: 'x',
                        value: ['y'],
                    },
                };

                return loadOpts;
            },
        },
    });
};

module.exports = scatter;
