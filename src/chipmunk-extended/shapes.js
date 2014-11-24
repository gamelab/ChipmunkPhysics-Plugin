
/**
*
* @module ChipmunkPhysics
* @submodule Shapes 
*/

/**
* Circle shape. 
* Good to use for balls, wheels or any other circular collisions.
* Requires a body and radius to function.
* The body will be at the center of circle (unless you pass a offset).
* Technically extends 'cp.CircleShape' but modified it to keep docs nice.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Circle
* @constructor
* @extends cp.Shape
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
* 	@param params.radius {Number} The radius of the circle.
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* 	
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle = function( params ) {

	params = params || {};

	if( !params.offset ) {
		params.offset = { x: 0, y: 0 };
	}

	cp.CircleShape.call( this, params.body, params.radius, params.offset );

	Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct.call( this, params );
	
	/**
	* The type of shape this is.
	* 
	* @property type
	* @type String
	* @default 'circle' 
	* @public
	*/

	/**
	* The radius of this circle.
	* 
	* @property r
	* @type Number 
	* @public
	*/

	/**
	* The offset position of this shape from its attached body's position. 
	* 
	* @property offset
	* @type Object
	* @default {x:0,y:0} 
	* @public
	*/

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle, cp.CircleShape );


/**
* Segment or line shape. 
* Good to use for walls, floors, platforms. 
* Requires a body at least to function. You should specify the 'start' and 'end' points of the line. 
* Technically extends 'cp.SegmentShape' but modified it to keep docs nice.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Segment
* @constructor
* @extends cp.Shape
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
* 	@param [params.start] {Object} The starting location of the segment. 
* 		@param [params.start.x=0] {Number} The starting location of the segment on the x-axis.
* 		@param [params.start.y=0] {Number} The starting location of the segment on the y-axis.
* 	@param [params.end] {Object} The end location of the segment. 
* 		@param [params.end.x=0] {Number} The end location of the segment on the x-axis.
* 		@param [params.end.y=0] {Number} The end location of the segment on the y-axis.
* 	@param [params.radius=0] {Number} The radius of the segment.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
*
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment = function( params ) {

	params = params || {};

	if( !params.start ) {
		params.start = { x: 0, y: 0 };
	}

	if( !params.end ) {
		params.end = { x: 0, y: 0 };
	}

	params.r = params.r || 0;

	cp.SegmentShape.call( this, params.body, params.start, params.end, params.r );
	
	Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct.call( this, params );

	/**
	* The type of shape this is.
	* 
	* @property type
	* @type String
	* @default 'segment' 
	* @public
	*/

	/**
	* The radius of the segment.
	* 
	* @property r
	* @type Number 
	* @public
	*/

	/**
	* The starting point of the line segment. 
	* 
	* @property a
	* @type Object
	* @default {x:0,y:0} 
	* @public
	*/

	/**
	* The ending point of the line segment. 
	* 
	* @property b
	* @type Object
	* @default {x:0,y:0} 
	* @public
	*/

	/**
	* Sets the new locations for the line.
	*
	* @method setEndpoints
	* @param a {Object} The new starting location of the segment
	* @param b {Object} The ending location of segment
	*/
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment, cp.SegmentShape );


/**
* Used to create polygon hitboxes. 
* Polygons have to be convex NOT concave.
* Requires a body and a 1D array of vertice coordinates [x1, y1, x2, y2, e.t.c.] 
* The vertices need to be positioned around the body. 
* Technically extends 'cp.PolyShape' but modified it to keep docs nice.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Poly
* @constructor
* @extends cp.Shape
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
* 	@param params.verts {Array} An single dimensional array of vertices for this poly. E.g. [x1, y1, x2, y2, ... ]
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly = function( params ) {

	params = params || {};

	if( !params.offset ) {
		params.offset = { x: 0, y: 0 };
	}

	cp.PolyShape.call( this, params.body, params.verts, params.offset );

	Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct.call( this, params );

	/**
	* The type of shape this is.
	* 
	* @property type
	* @type String
	* @default 'poly' 
	* @public
	*/

	/**
	* The vertices of this shape.
	* 
	* @property verts
	* @type Array
	* @public
	*/

	/**
	* Sets the vertices for this shape.
	* 
	* @method setVerts
	* @param verts {Array}
	* @public
	*/

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly, cp.PolyShape );


/**
* Alternaive way of defining a box shaped collision area.
* Requires a body and a Chipmunk Bounding Box. 
* Extends the Poly shape.
* The bounding box needs to be positioned around the body. 
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Box2
* @constructor
* @extends Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
*	@param params.box {Object} The bounding box (Chipmunks @see cp.BB) of the box.
*		@param params.box.l {Number} The coordinate of the left most point. 
*		@param params.box.r {Number} The coordinate of the right most point.
*		@param params.box.t {Number} The coordinate of the top most point.
*		@param params.box.b {Number} The coordinate of the bottom most point.
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* 
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2 = function( params ) {

	params = params || {};

	params.verts = [
		params.box.l, params.box.b,
		params.box.l, params.box.t,
		params.box.r, params.box.t,
		params.box.r, params.box.b,
	];

	Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly.call( this, params );

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2, Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly );


/**
* Quick way to create a box based collision area. 
* Requires a body, width and height. 
* Since the body is positioned at the center of the box.
* Extends the Box2 shape which extends Poly.
* The box will be around the bodies position.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Box
* @constructor
* @extends Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
*	@param params.width {Number} The width of the shape.
*	@param params.height {Number} The height of the shape.
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* 
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Box = function( params ) {

	params = params || {};

	var hw = params.width / 2;
	var hh = params.height / 2;
	params.box = new cp.BB( -hw, -hh, hw, hh );

	Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2.call( this, params );

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Box, Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2 );
