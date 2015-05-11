var d3 = require('d3');
var _ =  require('bilby');
var hoseC3Chart = require('../c3-chart');
var trans = require('../transformers');

var timeline = function(opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;
    var fields = opts.fields;

    // Get fields
    var date = fields.date;
    var size = fields.size;
    
    // Make the chart
    return hoseC3Chart({
        element: element,
        hose: hose,
        on: {
            enter: function(element) {
                // Chart options
                var chartOpts = {
                    data: {
                        type: 'bar',
                        json: [],
                        names: {
                            aggregate: fields.size.field.label,
                        },
                    },
                    bar: {
                        width: 1.5,
                    },
                    legend: {
                        show: false,
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: fields.date.format
                                    ? function(d) { return fields.date.format(new Date(d)); }
                                    : undefined,
                                fit: false,
                            },
                        },
                        y: {
                            tick: {
                                format: fields.size.field.format,
                                fit: false,
                            }
                        },
                    },
                    onrendered: function() {
                        // Select date on bar click
                        element
                            .selectAll('.c3-event-rect')
                            .on('click', function(d, i) {
                                var filter = {};
                                filter[fields.date.name] = d.x;
                                hose.filter(filter);
                            });
                    },
                };

                return chartOpts;
            },
            select: function(chart, selection) {
            },
            transform: _.compose(function(selection) {
                selection.selection.date = date.name;
                selection.group = date.name;
                selection.order = {
                    key: 'date',
                    order: 'ASC',
                };
                return selection;
            }, trans.aggregate(size.aggregate, size.field.name)),
            update: function(chart, data) {
                // Data loading options
                var loadOpts = {
                    json: data.map(function(d) {
                        d.date = new Date(d.date);
                        return d;
                    }),
                    keys: {
                        x: 'date',
                        value: ['aggregate'],
                    },
                };

                return loadOpts;
            },
        },
    });
};

timeline.fields = [{
    name: 'date',
}, {
    name: 'size',
}];

module.exports = timeline;
