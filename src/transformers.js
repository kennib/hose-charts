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
};
