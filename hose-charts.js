var chart = require('./src/chart');
var counter = require('./src/charts/counter');
var scatter = require('./src/charts/scatter');

module.exports = {
    chart: chart,
    charts: {
        counter: counter,
        scatter: scatter,
    },
};
