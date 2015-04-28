var hoseClient = require('hose-client'),
    hoseCharts = require('../hose-charts');

var hose = new hoseClient.Hose('ws://'+window.location.hostname+':8000');

hoseCharts.charts.counter({
    element: d3.select('body'),
    hose: hose,
    fields: {
        count: {
            field: {
                label: 'Weight',
                name: 'weight',
            },
            aggregate: 'AVG',
        }
    },
});

setTimeout(function() {
    hose.select({ selection: '*', from: 'freight' });
}, 2000);
