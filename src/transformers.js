module.exports = {
    aggregate:  function(aggregate, field) {
        aggregate = aggregate || 'COUNT';
        field = field || '*';

        return function(selection) {
            return {
                selection: {
                    aggregate: aggregate+'('+field+')',
                },
                from: selection,
            };
        };
    },
    random: function(fields, n) {
        var n = n || 100;
        var randomFields = {
            _random: 'random()',
        };

        d3.entries(fields).forEach(function(d) {
            randomFields[d.key] = d.value;
        });

        return function(selection) {
            return {
                selection: randomFields,
                from: selection,
                order: {
                    key: '_random',
                    order: 'DESC',
                },
                limit: n,
            };
        };
    },
};
