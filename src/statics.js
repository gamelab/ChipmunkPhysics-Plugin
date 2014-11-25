/**
* 
* @module Plugins
* @submodule ChipmunkPhysics
* @namespace Kiwi.Plugins.ChipmunkPhysics
*
*/


/*
* Static method to help quickly and easily create a new body that would be for a box/rectangle.
* Parameters passed are also used as the parameters for the body.
*
* @method createBoxBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.width {Number} Width of the box.
*   @param params.height {Number} Height of the box.
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
*
*/
Kiwi.Plugins.ChipmunkPhysics.createBoxBody = function( params ) {

	if ( !params && !params.mass && !params.width && !params.height ) {
		console.warn( "Not all parameters required passed." );
		return null;
	}

	params.i = cp.momentForBox(
			params.mass,
			params.width,
			params.height );

	return new Kiwi.Plugins.ChipmunkPhysics.Body( params );

};



/**
* Static method to help quickly and easily create a new body that would be for a circle.
* Parameters passed are also used as the parameters for the body.
* 
* @method createCircleBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.radius {Number} Radius of the circle.
*   @param [params.offset] {Object} The offset. 
*     @param [params.offset.x=0] {Number} The offset of this on the x-axis.
*     @param [params.offset.y=0] {Number} The offset of this on the y-axis.
*   @param [params.innerRadius=0] {Number} 
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
*
*/
Kiwi.Plugins.ChipmunkPhysics.createCircleBody = function( params ) {

	if ( !params && !params.mass && !params.radius ) {
		console.warn( "Not all parameters required passed." );
		return null;
	}


	params.innerRadius = params.innerRadius || 0;
	params.offset = params.offset || { x: 0, y: 0 };

	params.i = cp.momentForCircle(
			params.mass,
			params.innerRadius,
			params.radius,
			params.offset
			);

	return new Kiwi.Plugins.ChipmunkPhysics.Body( params );

};


/**
* Static method to help quickly and easily create a new body that would be for a segment/line.
* Parameters passed are also used as the parameters for the body.
* 
* @method createSegmentBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.start {Object} The starting location of the segment. 
*     @param params.start.x {Number} The starting location of the segment on the x-axis.
*     @param params.start.y {Number} The starting location of the segment on the y-axis.
*   @param params.end {Object} The end location of the segment. 
*     @param params.end.x {Number} The end location of the segment on the x-axis.
*     @param params.end.y {Number} The end location of the segment on the y-axis.
*   @param [params.innerRadius=0] {Number} 
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
*
*/
Kiwi.Plugins.ChipmunkPhysics.createSegmentBody = function( params ) {

	if ( !params && !params.mass && !params.start && !params.end ) {
		console.warn( "Not all parameters required passed." );
		return null;
	}

	params.i = cp.momentForSegment(
			params.mass,
			params.start,
			params.end
			);

	return new Kiwi.Plugins.ChipmunkPhysics.Body( params );
};


/**
* Static method to help quickly and easily create a new body that would be used for a polygon.
* Parameters passed are also used as the parameters for the body.
* 
* @method createPolyBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.verts {Number} Vertices for the body.
*   @param [params.offset] {Object} The offset. 
*     @param [params.offset.x=0] {Number} The offset of this on the x-axis.
*     @param [params.offset.y=0] {Number} The offset of this on the y-axis.
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
*
*/
Kiwi.Plugins.ChipmunkPhysics.createPolyBody = function( params ) {

	if ( !params && !params.mass && !params.verts ) {
		console.warn( "Not all parameters required passed." );
		return null;
	}

	params.offset = params.offset || { x: 0, y: 0 };

	params.i = cp.momentForPoly(
			params.mass,
			params.verts,
			params.offset
			);

	return new Kiwi.Plugins.ChipmunkPhysics.Body( params );
};
