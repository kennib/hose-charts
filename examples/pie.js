var hoseClient = require('hose-client'),
    hoseCharts = require('../hose-charts');

var hose = new hoseClient.Hose('ws://'+window.location.hostname+':8000');

hoseCharts.charts.pie({
    element: d3.select('body'),
    hose: hose,
    fields: {
        size: {
            field: {
                label: 'Value',
                name: 'value',
            },
            aggregate: 'sum',
        },
        group: {
            label: 'Port of Origin',
            name: 'origin_port',
        },
    },
});

setTimeout(function() {
    hose.select({ selection: '*', from: 'freight' });
}, 2000);
