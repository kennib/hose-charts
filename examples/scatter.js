var hoseClient = require('hose-client'),
    hoseCharts = require('../hose-charts');

var hose = new hoseClient.Hose('ws://'+window.location.hostname+':8000');

hoseCharts.charts.scatter({
    element: d3.select('body'),
    hose: hose,
    fields: {
        x: {
            label: 'Weight',
            name: 'weight',
        },
        y: {
            label: 'Value',
            name: 'value',
        }
    },
});

setTimeout(function() {
    hose.select({ selection: '*', from: 'freight' });
}, 2000);
