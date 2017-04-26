angular.module('starter.controllers')

.controller('LibertyCtrl', function($scope, SignalProvider)
{
	$warningThresh = 75
	$alarmThresh = 90

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.pulseDisplay = {};
	$scope.pulse = "--"
	$scope.pulseDisplay.bgcol = "";
	$scope.pulseDisplay.fgcol = "";
	$scope.pulseDisplay.weigth = "";
	$scope.pulseDisplay.pulseFgCol = "#080";
	$scope.pulseDisplay.message = "Activity not started";

	$scope.chronoHour = "--"
	$scope.chronoMinute = "--"
	$scope.chronoSeconds = "--"

	$scope.activityStarted = false
	$scope.activityMode = {};
	$scope.activityMode.message = 'Start the activity'
	$scope.activityMode.bgcol = "green"
	$scope.activityMode.secondsElapsed = 0


	//var graph1 = new CanvasChart($("#graph1"));

	var areaChartData = undefined;
	var aChart = undefined;

	var eseries = [];
	var myChart = undefined;

	var series = [{x:0,y:40},{x:1,y:30},{x:2,y:60} ];
	var seriesIndex = series.length+1;

	var chartInstance = $('#pulseGraph').epoch(
	{
		type: 'time.line',
		data: [{
			label: "Pulse",
			range: [50, 100],
			axes: ['top', 'right', 'bottom', 'left'],
			ticks: { top: 10, right: 5, bottom: 20, left: 5 },
			values: []
		}]
	});

	var graph = undefined;
	function addData(pulse)
	{
		$scope.data.push(pulse);
		while($scope.data.length > 100)
		{
			$scope.data.shift();
		}

		var newBarChartData = [{time: new Date().getTime(), y: Math.floor(pulse)}];
		console.log("New data", JSON.stringify(newBarChartData));
		chartInstance.push(newBarChartData);
	}

	function fetch()
	{
		var data = SignalProvider.getData();

		if ($scope.activityStarted === false)
		{
			return;
		}

		$scope.activityMode.secondsElapsed += 1
		$scope.chronoHour = Math.floor(($scope.activityMode.secondsElapsed / 3600))
		$scope.chronoMinute = Math.floor(($scope.activityMode.secondsElapsed / 60) % 60)
		$scope.chronoSeconds = ($scope.activityMode.secondsElapsed % 60)

		console.log("secondsElapsed " + $scope.activityMode.secondsElapsed)
		console.log("chronoHour " + $scope.chronoHour)
		console.log("chronoMinute " + $scope.chronoMinute)
		console.log("chronoSeconds " + $scope.chronoSeconds)

		if (data)
		{
			$scope.pulse = data.pulse;
			console.log("pulse", data);
			addData(data.pulse);

			if (data.pulse > $alarmThresh)
			{
				$scope.pulseDisplay.bgcol = "red";
				$scope.pulseDisplay.fgcol = "white";
				$scope.pulseDisplay.weigth = "bold";
				$scope.pulseDisplay.pulseFgCol = "red";
				$scope.pulseDisplay.message = "Your pulse is too high!";
			} else if (data.pulse > $warningThresh)
			{
				$scope.pulseDisplay.bgcol = "orange";
				$scope.pulseDisplay.fgcol = "white";
				$scope.pulseDisplay.weigth = "";
				$scope.pulseDisplay.pulseFgCol = "orange";
				$scope.pulseDisplay.message = "Your pulse is above average";
			} else
			{
				$scope.pulseDisplay.bgcol = "";
				$scope.pulseDisplay.fgcol = "";
				$scope.pulseDisplay.weigth = "";
				$scope.pulseDisplay.pulseFgCol = "#080";
				$scope.pulseDisplay.message = "Your pulse is normal";
			}
			$scope.$digest();
		}
	}

	$scope.startLiberty = function()
	{
		if($scope.activityStarted === false)
		{
			setInterval(fetch, 1000);

			$scope.activityStarted = true
			$scope.activityMode.message = 'Stop the activity'
			$scope.activityMode.bgcol = "red"

			if ($scope.chronoHour === "--")
			{
				$scope.chronoHour = ($scope.activityMode.secondsElapsed / 3600)
				$scope.chronoMinute = ($scope.activityMode.secondsElapsed / 60) % 60
				$scope.chronoSeconds = ($scope.activityMode.secondsElapsed % 60)
			}
		}
		else
		{
			$scope.activityStarted = false
			$scope.activityMode.message = 'Start the activity'
			$scope.activityMode.bgcol = "green"

			$scope.pulse = "--"
			$scope.pulseDisplay.bgcol = "";
			$scope.pulseDisplay.fgcol = "";
			$scope.pulseDisplay.weigth = "";
			$scope.pulseDisplay.pulseFgCol = "#080";
			$scope.pulseDisplay.message = "Activity paused";
		}
	}

	Highcharts.setOptions(
	{
		global:
		{
			useUTC: false
		}
	});

	$('#container').highcharts(
	{
		chart:
		{
			type: 'spline',
			animation: Highcharts.svg, // don't animate in old IE
			marginRight: 10,
			events:
			{
				load: function ()
				{
					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function ()
					{
						if($scope.activityStarted === true)
						{
							var data = SignalProvider.getData();
							if (data)
							{
								var x = (new Date()).getTime(), // current time
								y = data.pulse;
								series.addPoint([x, y], true, true);
							}
						}
					}, 1000);
				}
			}
		},
		title:
		{
			text: ''
		},
		xAxis:
		{
			type: 'datetime',
			tickPixelInterval: 150
		},
		yAxis:
		{
			title:
			{
				text: 'Pulse'
			},
			min: 40,
			max: 120,

			plotLines: [
			{
				value: $warningThresh,
				color: 'orange',
				dashStyle: 'shortdash',
				width: 2,
				label:
				{
					text: "Warning threshold"
				}
			}, {
				value: $alarmThresh,
				color: 'red',
				dashStyle: 'shortdash',
				width: 2,
				label:
				{
					text: "Alarm threshold"
				}
			}]
		},

		tooltip:
		{
			formatter: function ()
			{
				return '<b>' + this.series.name + '</b><br/>' +
				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
				Highcharts.numberFormat(this.y, 2);
			}
		},
		legend:
		{
			enabled: false
		},
		exporting:
		{
			enabled: false
		},
		series: [
		{
			name: 'Heart rate data',
			data: (function ()
			{
				var data = [],
				time = (new Date()).getTime(),
				i;

				for (i = -19; i <= 0; i += 1)
				{
					data.push(
					{
					x: time + i * 1000,
					y: 0
					});
				}
				
				return data;
			}())
		}]
	});
});
