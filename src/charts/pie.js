var d3 = require('d3');
var c3 = require('c3');
var _ =  require('bilby');
var hoseC3Chart = require('../c3-chart');
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
    return hoseC3Chart({
        element: element,
        hose: hose,
        on: {
            enter: function(element) {
                // Chart options
                var chartOpts = {
                    data: {
                        type: 'pie',
                        json: [],
                        onclick: function(d, element) {
                            var filter = {};
                            filter[group.name] = d.id;
                            hose.filter(filter);
                        },
                    },
                };

                return chartOpts;
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
                // Old data which should be removed
                var oldData = chart.chart.data()
                  .map(function(d) { return d.id; })
                  .filter(function(d) { return data.every(function(da) { return d !== da.name; }); })

                // Load options for loading new data into chart
                var loadOpts = {
                    columns: data.map(function(d) {
                        return [d.name, d.aggregate];
                    }),
                    unload: oldData,
                };

                return loadOpts;
            },
        },
    });
};

pie.fields = [{
    name: 'group',
}, {
    name: 'size',
    type: 'aggregate',
}];

module.exports = pie;
