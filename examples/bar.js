var hoseClient = require('hose-client'),
    hoseCharts = require('../hose-charts');

var hose = new hoseClient.Hose('ws://'+window.location.hostname+':8000');

hoseCharts.charts.bar({
    element: d3.select('body'),
    hose: hose,
    fields: {
        group: {
            label: 'Port of Origin',
            name: 'origin_port',
            type: 'categorical'
        },
        size: {
            field: {
                label: 'Value',
                name: 'value',
            },
            aggregate: 'avg',
        }
    },
});

setTimeout(function() {
    hose.select({ selection: '*', from: 'freight', limit: 200 });
}, 2000);
