function loadingBar(element, overlay) {
	var width = element.node().offsetWidth;
	var height = element.node().offsetHeight;

	var bar = element.append('svg')
		.classed('loading-bar', true)
		.style('width', width);
	
	if (overlay)
		bar
			.style('position', 'relative')
			.style('top', '-'+bar.style('height'));

	var progress = bar.append('rect')
		.classed('loading-progress', true)
		.attr('height', height);

	function update(amount) {
		return function(progressBar) {
			progressBar
				.attr('x', (width*amount)/2)
				.attr('width', width - width*amount);
		}
	};

	bar.countdown = function(millis) {
		progress
			.call(update(0));

		progress.transition()
			.duration(millis)
			.ease('cubic-out')
			.call(update(0.90));
	};

	bar.finish = function() {
		progress.transition()
			.duration(800)
			.ease('linear')
			.call(update(0.90))
		.transition()
			.duration(1200)
			.ease('bounce-in')
			.call(update(1));
	};

	return bar;
}

module.exports = loadingBar;
