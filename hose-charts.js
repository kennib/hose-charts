var chart = require('./src/chart');
var counter = require('./src/charts/counter');
var bar = require('./src/charts/bar');
var timeline = require('./src/charts/timeline');
var scatter = require('./src/charts/scatter');
var pie = require('./src/charts/pie');

module.exports = {
    chart: chart,
    charts: {
        counter: counter,
        bar: bar,
        timeline: timeline,
        scatter: scatter,
        pie: pie,
    },
};
