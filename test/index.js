var dothis = require( './..' );

dothis( onFinish )
.in( 1000 )
.update( onUpdate );

function onFinish( offBy, percentage ) {

	console.log( 'FINISHED', offBy, percentage );
}

function onUpdate( offBy, percentage ) {

	console.log( 'UPDATE', offBy, percentage );	
}