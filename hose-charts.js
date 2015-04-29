var chart = require('./src/chart');
var counter = require('./src/charts/counter');
var timeline = require('./src/charts/timeline');
var scatter = require('./src/charts/scatter');
var pie = require('./src/charts/pie');

module.exports = {
    chart: chart,
    charts: {
        counter: counter,
        timeline: timeline,
        scatter: scatter,
        pie: pie,
    },
};
