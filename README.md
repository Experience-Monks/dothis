dothis
======

[![browser support](https://ci.testling.com/jam3/dothis.png)
](https://ci.testling.com/jam3/dothis)

You can use `dothis` to be able to call functions after a certain period of time (kind of like `setTimeout`) or on a specific date.

## Example
```javascript
var dothis = require( 'dothis' );

// Using with a time
dothis( function( offBy, percentage ) {  
	console.log( 'Finished with time:', offBy, 'milliseconds late.' ); 
})
.in( 1000 ) // in one second
.update( function( offBy, percentage ) { 
	console.log( 'We\'re', percentage, 'done. Using time.' ) 
});

// Using with a date
dothis( function( offBy, percentage ) {  
	console.log( 'Finished with date:', offBy, 'milliseconds late.' ); 
})
.at( new Date( Date.now() + 1000 ) ) // use a date to represent in one second
.update( function( offBy, percentage ) { 
	console.log( 'We\'re', percentage, 'done. Using date.' ) 
});
```