var hoseClient = require('hose-client'),
    hoseCharts = require('../hose-charts');

var hose = new hoseClient.Hose('ws://'+window.location.hostname+':8000');

hoseCharts.charts.timeline({
    element: d3.select('body'),
    hose: hose,
    fields: {
        date: {
            label: 'Arrival Date',
            name: 'arrival_date',
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
    hose.select({ selection: '*', from: 'freight' });
}, 2000);
