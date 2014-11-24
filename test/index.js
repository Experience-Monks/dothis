var dothis = require( './..' ),
	test = require( 'tape' );

test( 'testing in', function( t ) {

	var testDuration = 100,
		didUpdate = false,
		startTime = Date.now();

	t.plan( 5 );

	dothis( function( offBy, percentage ) {

		var duration = Date.now() - startTime;

		t.ok( offBy >= 0, 'offBy is not negative: ' + offBy );
		t.ok( percentage == 1, 'percentage is 1: ' + percentage );
		t.ok( duration >= testDuration && duration - testDuration < 33, 'Took an appropriate amount of time: ' +  duration );
	})
	.in( testDuration )
	.update( function( offBy, percentage ) {

		if( !didUpdate ) {

			didUpdate = true;

			t.ok( offBy < 0, 'offBy is negative: ' + offBy );
			t.ok( typeof percentage == 'number', 'we have a percentage value: ' + percentage );
		}
	});
});


test( 'testing at', function( t ) {

	var testDuration = 100,
		didUpdate = false,
		startTime = Date.now();

	t.plan( 5 );

	dothis( function( offBy, percentage ) {

		var duration = Date.now() - startTime;

		t.ok( offBy >= 0, 'offBy is not negative: ' + offBy );
		t.ok( percentage == 1, 'percentage is 1: ' + percentage );
		t.ok( duration >= testDuration && duration - testDuration < 33, 'Took an appropriate amount of time: ' +  duration );
	})
	.at( new Date( Date.now() + testDuration ) )
	.update( function( offBy, percentage ) {

		if( !didUpdate ) {

			didUpdate = true;

			t.ok( offBy < 0, 'offBy is negative: ' + offBy );
			t.ok( typeof percentage == 'number', 'we have a percentage value: ' + percentage );
		}
	});
});