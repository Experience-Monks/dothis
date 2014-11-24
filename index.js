module.exports = dothis;

var raf = require( 'raf' );

var cbs = [],
	doingRaf = false;

function loop() {

	var now, s, e, amount, elapsed, cbUpdate;

	// check all callbacks to see if we should call
	for( var i = cbs.length - 1; i >= 0; i-- ) {

		s = cbs[ i ].s;
		e = cbs[ i ].e;
		amount = cbs[ i ].amount;
		cbUpdate = cbs[ i ].cbUpdate;

		now = Date.now();
		if( now >= e ) {

			cbs[ i ].cb( now - e, 1 );

			cbs.splice( i, 1 );
		} else if( cbUpdate ) {

			now = Date.now();
			elapsed = now - s;

			cbUpdate( now - e, elapsed / amount );
		}
	}

	// see if we should continue looping
	if( cbs.length > 0 )
		raf( loop );
	else
		doingRaf = false;
}

function dothis( cb ) {

	return {

		in: function( amount ) {

			var now = Date.now(),
				cbData = {

					s: now,
					e: now + amount,
					amount: amount,
					cb: cb
				};

			cbs.push( cbData );

			if( !doingRaf )
				loop();

			return {

				update: function( cbUpdate ) {

					cbData.cbUpdate = cbUpdate;
				}
			};
		},

		inSeconds: function( amount ) {

			return this.in( amount * 1000 );
		},

		inMinutes: function( amount ) {

			return this.inSeconds( amount * 60 );	
		},

		inHours: function( amount ) {

			return this.inMinutes( amount * 60 );	
		},

		inDays: function( amount ) {

			return this.inHours( amount * 24 );
		},

		inWeeks: function( amount ) {

			return this.inDays( amount * 7 );
		},

		at: function( date, current ) {

			if( !current )
				current = new Date();

			return this.in( date.getTime() - current.getTime() );
		}
	};
}