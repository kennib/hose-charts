var d3 = require('d3');
var c3 = require('c3');
var _ =  require('bilby');
var hoseChart = require('../chart');
var trans = require('../transformers');

var pie = function(opts) {
    // Get options
    var element = opts.element;
    var hose = opts.hose;
    var fields = opts.fields;
    var items = opts.items || 15;

    // Get fields
    var size = fields.size;
    var group = fields.group;
    
    // Make the chart
    return hoseChart({
        element: element,
        hose: hose,
        on: {
            enter: function(element) {
                // Create elements
                var main = element.append('div');

                // Temporary: stop data leaking through from parent element
                if (element.datum())
                    main.data([1]);

                // Create chart
                var chart = c3.generate({
                    bindto: main,
                    data: {
                        type: 'pie',
                        json: [],
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
                selection.selection.name = group.name;
                selection.group = group.name;
                selection.order = {
                    key: 'aggregate',
                    order: 'DESC NULLS LAST',
                };
                selection.limit = items;
                return selection;
            }, trans.aggregate(size.aggregate, size.field.name)),
            update: function(chart, data) {
                // Load new data into chart
                chart.chart.load({
                    columns: data.map(function(d) {
                        return [d.name, d.aggregate];
                    }),
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

module.exports = pie;
