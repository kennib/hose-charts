var d3 = require('d3');
var c3 = require('c3');
var _ =  require('bilby');
var hoseChart = require('../chart');
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
    return hoseChart({
        element: element,
        hose: hose,
        on: {
            enter: function(element) {
                // Create elements
                var main = element.append('div');

                // Temporary: stop data leaking through from parent element
                delete main[0][0]['__data__'];

                // Create chart
                var chart = c3.generate({
                    bindto: main,
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
                selection.selection.date = date.name;
                selection.group = date.name;
                selection.order = {
                    key: 'date',
                    order: 'ASC',
                };
                return selection;
            }, trans.aggregate(size.aggregate, size.field.name)),
            update: function(chart, data) {
                // Load new data into chart
                chart.chart.load({
                    json: data.map(function(d) {
                        d.date = new Date(d.date);
                        return d;
                    }),
                    keys: {
                        x: 'date',
                        value: ['aggregate'],
                    },
                });

                chart.main
                    .selectAll('.c3-event-rect')
                    .on('click', function(d, i) {
                        var filter = {};
                        filter[fields.date.name] = data[i].date;
                        hose.filter(filter);
                    });
            },
            exit: function(chart) {
                chart.main.remove();
            },
            resize: function(chart, opts) {
                opts = opts || {};
                opts.height = opts.height || chart.element.node().offsetHeight;
                opts.width = opts.width || chart.element.node().offsetWidth;
                chart.chart.resize(opts);
            },
        },
    });
};

module.exports = timeline;
