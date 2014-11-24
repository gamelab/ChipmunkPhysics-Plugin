/**
*
* @module Plugins
* @submodule ChipmunkPhysics
*
*/

/**
* An extended version of the Chipmunk Body class.
* This object has been designed to function with Kiwi Transform Objects and the transformation hierarchy associated with them.
*
* Nice aliases have also been attached :)
*
* Note: Scale on transforms are not taken into account for an objects shape (hitbox). 
* But position due to scale is taken into account.         
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Body
* @extends cp.Body
* @constructor
* @param [params] {Object}
*	@param params.mass {Number} The mass of this body. 
* 	@param params.i {Number} Moment of inertia. Used to resolve collisions.
*   @param [params.transform] {Kiwi.Geom.Transform} The transform that this body will use to position itself by. 
*       If not passed, one is created.
*   @param [params.center] {Object} The location of the bodies centeroid from the transform top left corner. You must either assign both or neither.
* 		@param [params.center.x] {Number} The X location of the centeroid. Defaults to the transforms anchorPointX. 
* 		@param [params.center.y] {Number} The Y location of the centeroid. Defaults to the transforms anchorPointY/
*	@param [params.owner=null] {Any} The owner of this body. Generally assigned to a sprite.
*	@param [params.velocity] {Object} Velocity of the body.
*		@param [params.velocity.x=0] {Number} Velocity of the body on the x-axis.
*		@param [params.velocity.y=0] {Number} Velocity of the body on the y-axis.
*	@param [params.maxVelocity=Infinity] {Number} Maximum velocity of the body. 
*	@param [params.angVelo=0] {Number} Angular velocity of the body.
*	@param [params.maxAngVelo=Infinity] {Number} Maximum angular velocity of the body.
*
*/
Kiwi.Plugins.ChipmunkPhysics.Body = function( params ) {

	params = Kiwi.Plugins.ChipmunkPhysics.Body.parseParams( params );

	/**
	* The transform object that this body will use for positioning.
	* @property transform
	* @type Kiwi.Geom.Transform
	* @public
	*/
	this.transform = params.transform;


	/**
	* The center of the body. From the top left corner of the body.
	* @property center
	* @type Kiwi.Geom.Point
	* @public
	*/ 
	this.center = new Kiwi.Geom.Point( params.center.x, params.center.y );


	/**
	* The owner of this body. Generally is assigned to a GameObject.
	* @property owner
	* @type Any
	* @default null
	* @public
	*/
	this.owner = params.owner;


	cp.Body.call( this, params.mass, params.i );


	if( typeof params.maxVelocity !== "undefined" ) {
		this.maxVelocity = params.maxVelocity;
	}


	if( typeof params.maxAngVelo !== "undefined" ) {
		this.maxAngVelo = params.maxAngVelo;
	}


	if( typeof params.angVelo !== "undefined" ) {
		this.setAngVel( params.angle );
	}


	if( typeof params.velocity !== "undefined" ) {
		this.setVelocity( params.velocity );
	}

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Body, cp.Body );


/**
* Used each time a new Body is created to assign default values to the params object passed.
* Returns the same params object passed but with defaults assigned.
* @method _parseParams
* @param [params] {Object}
* @return {Object}
* @static
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Body.parseParams = function( params ) {

	params = params || {};

	params.transform = params.transform || new Kiwi.Geom.Transform( 0, 0 ); 

	params.center = params.center || { x: params.transform.anchorPointX, y: params.transform.anchorPointY };

	params.owner = params.owner || null;

	if( typeof params.m !== "undefined" ) {
		params.mass = params.m;

	} else if( typeof params.mass == "undefined" ) {
		console.warn('No mass passed. Assigning default.');
		params.mass = 100; 
	
	}

	if( typeof params.i == "undefined" ) {
		console.warn('No moment of inertia passed. Assigning default.');
		params.i = 100;
	}

	return params;
};


/**
* Sets the position of transform that this body is attached to. 
* These values are in WORLD coordinates. See the x/y propreties for more information.
* @method setPos
* @param x {Number}
* @param y {Number}
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Body.prototype.setPos = function( x, y ) {

	this.x = x;
	this.y = y;

};


/**
* The location of the body in the world space on the x-axis. 
* Assigning a value adjusts the transform assigned to position the body at the cooridnates specified.
* @property x
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'x', {

	get: function () {
		return this.transform.worldX + this.center.x;
	},

	set: function (val) {
		this.activate();

		if( this.transform.parent ) {
			var parentRot =  Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent );
			val -= this.x;

			this.transform.x += val * Math.cos( parentRot );
			this.transform.y += val * Math.sin( parentRot * -1 );
		
		} else {
			this.transform.x = val;
		}

		this.p.x = this.x;

	},

	enumerable: true,

	configurable: true

});



/**
* The location of the body in the world space on the y-axis. 
* Assigning a value adjusts the transform assigned to position the body at the cooridnates specified.
* @property y
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'y', {

	get: function () {
		return this.transform.worldY + this.center.y;
	},

	set: function ( val ) {
		this.activate();

		if( this.transform.parent ) {
			var parentRot =  Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent );
			val -= this.y;

			this.transform.x += val * Math.sin( parentRot );
			this.transform.y += val * Math.cos( parentRot );

		} else {
			this.transform.y = val;
		}
		
		this.p.y = this.y;

	},

	enumerable: true,

	configurable: true

});


/**
* Sets the angle (rotation) of the transform attached.
* Value is in worldRotation coordinates.
* @method setAngle
* @param angle {Number}
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Body.prototype.setAngle = function( angle ) {

	this.activate();

	if( this.transform.parent ) {
		var pRot = Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent );
	} else {
		var pRot = 0;
	}

	this.transform.rotation = angle - pRot;

};



/**
* The rotation of the body (and thus the transform) in world coordinates.
* @property rotation
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'rotation', {

	get: function () {
		return Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform );
	},

	set: function ( val ) {
		this.setAngle( val );
	},

	enumerable: true,

	configurable: true

});



/**
* Returns the worldRotation of a transformation passed.
* @method getWorldRotation
* @param transform {Kiwi.Geom.Transform}
* @return {Number} The rotation of the transformation.
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation = function( trans ) {

	var rot = trans.rotation;

	if( trans.parent ) {
		return rot + Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( trans.parent );
	}

	return rot;
};




/**
* The mass of this body.
* @property mass
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'mass', {

	get: function () {
		return this.m;
	},

	set: function (val) {
		this.setMass(val);
	},

	enumerable: true,
	configurable: true

});


/**
* The velocity of this body on the X axis.
* @property velocityX
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'velocityX', {

	get: function () {
		return this.vx;
	},

	set: function ( val ) {
		this.activate();
		this.vx = val;
	},

	enumerable: true,
	configurable: true

});



/**
* The velocity of this body on the Y axis.
* @property velocityY
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'velocityY', {

	get: function () {
		return this.vy;
	},

	set: function ( val ) {
		this.activate();
		this.vy = val;
	},

	enumerable: true,
	configurable: true

});


/**
* The angular velocity of this body.
* @property angularVelo
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'angularVelo', {

	get: function () {
		return this.w;
	},

	set: function ( val ) {
		this.setAngVel( val );
	},

	enumerable: true,
	configurable: true

});


/**
* The maximum velocity of this object.
* @property maxVelocity
* @type Number
* @default Infinity
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'maxVelocity', {

	get: function () {
		return this.v_limit;
	},

	set: function ( val ) {
		this.v_limit = val;
	},

	enumerable: true,

	configurable: true

});



/**
* The maximum angular velocity of this object.
* @property maxAngVelo
* @type Number
* @default Infinity
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'maxAngVelo', {

	get: function () {
		return this.w_limit;
	},

	set: function ( val ) {
		this.w_limit = val;
	},

	enumerable: true,

	configurable: true

});



/**
* Overriden version of the function which handles adjusting objects position/rotation after collisions. 
* @method position_func
* @param dt {Number}
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Body.prototype.position_func = function( dt ) {

	var matrix = this.transform.getConcatenatedMatrix(),
		parentRot =  Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent ),
		ix = matrix.tx - this.transform.anchorPointX + this.center.x,
		iy = matrix.ty - this.transform.anchorPointY + this.center.y;


	//Set the position of the bodies center.
	this.p.x = ix;
	this.p.y = iy;

	this.a = this.transform.rotation + parentRot; 

	//Update the position as per chipmunk norm
	cp.Body.prototype.position_func.call( this, dt );


	//Calculate the changes in position
	ix = this.p.x - ix;
	iy = this.p.y - iy;


	//Update the transformation information...
	this.transform.rotation += this.a - ( this.transform.rotation + parentRot );
	this.transform.x += ix * Math.cos( parentRot ) + iy * Math.sin( parentRot );
	this.transform.y += ix * Math.sin( parentRot * -1 ) + iy * Math.cos( parentRot );

};