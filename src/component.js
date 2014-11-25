/**
*
*
* @module Plugins
* @submodule ChipmunkPhysics
*/

/**
* A Component which is easily configurable upon creation and attaches to Entities to make adding
* Bodies and Shapes to Kiwi Objects easy as. 
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Component
* @constructor
* @extends Kiwi.Component
* @param owner {Kiwi.Entity} The owner of this Component.
* @param [config] {Object} Configuration information about the body/shapes that are to be generated.
*	@param [config.space] {Kiwi.Plugins.ChipmunkPhysics.Space} The space that the objects should be added to.
*	@param [config.transform] {Kiwi.Geom.Transform} The transform object that the body should use when created.
*	@param [config.defaultBody] {Kiwi.Plugins.ChipmunkPhysics.Body} The body to use instead of creating a new one. 
*		If defined, then the "body" param is ignored.
*	@param [config.type="box"] {String} The default type of shape/body that should be created. 
*		Only used if a type is not passed to the "body" or "shape" configs below.  
*	@param [config.body] {Object} Contains the settings for the body to be generated. See the "createBody" static method for more details.
*	@param [config.shape] {Object} Contains settings for a singular shape to be generatated. See "createShape" static method for more details.
*	@param [config.shapes] {Array} Contains an array of settings for shapes to be generatated. See "createShape" static method for more details.
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Component = function(owner, config) {

	//Extend the Kiwi Components
	Kiwi.Component.call( this, owner, "ChipmunkPhysics" );

	//Check to see that the plugin manager exists
	if ( typeof this.game.chipmunk == "undefined" ) {
		console.error("Could not find the chipmunk manager attached to the game."); 
		return;
	}

	/**
	* The Chipmunk Physics manager which should be attached to this game.
	* @property manager
	* @type Kiwi.Plugins.ChipmunkPhysics.Manager
	* @public
	*/
	this.manager = this.game.chipmunk;

	/**
	* A list of all the shapes (hitboxes) attached to this component.
	* @property shapes
	* @type Array
	* @public
	*/
	this.shapes = [];

	this._create( config );

	this._applyVeloDefaults( config );

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Component, Kiwi.Component );


/**
* Calculate the default mass based on a sprites width * height / 1000
* You can override this method to set your own default for physics components.
* 
* @method getDefaultMass
* @param sprite []
* @return {Number}
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.getDefaultMass = function( sprite ) {
	return sprite.width * sprite.height / 1000; 
};


/**
* Executed when the Component is created. 
* Is passed a config parameter and then creates a body/shapes depending on the parameters passed. 
*
* @method _create
* @param params {Object}
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Component.prototype._create = function( config ) {

	config = config || {};

	/**
	* The transformation that the body is using to position itself.
	* 
	* @property transform
	* @type Kiwi.Geom.Transform
	* @public
	*/
	this.transform = config.transform || this.owner.transform;


	/**
	* The space which the shapes/body have been attached to.
	* 
	* @property space
	* @type Any
	* @public
	*/
	this.space = config.space || this.manager.space;

	/**
	* The default type of shapes/body that should be created if a type is not passed.
	* 
	* @property defaultType
	* @type String
	* @default "box"
	* @private
	*/
	this.defaultType = config.type || "box";


	/**
	* The body of this Component. 
	* 
	* @property body
	* @type Kiwi.Plugins.ChipmunkPhysics.Body
	* @public
	*/ 
	if ( typeof config.defaultBody !== "undefined" ) {
		this.body = config.defaultBody;
	} else {
		this.body = Kiwi.Plugins.ChipmunkPhysics.Component.createBody( this, config.body );
	}


	if ( typeof config.shapes !== "undefined" ) {
		this.shapes.concat( Kiwi.Plugins.ChipmunkPhysics.Component.createShapes( this, config.shapes, config.body ) );
	} else {
		this.shapes.push( Kiwi.Plugins.ChipmunkPhysics.Component.createShape( this, config.shape, config.body ) );
	}

};


/**
* Applies any default velocities passed when this object is created.
* 
* @method _applyDefaults
* @param [params] {Object}
* 	@param [params.velocityX] {Number} Velocity on the x-axis
* 	@param [params.velocityY] {Number} Velocity on the y-axis
* 	@param [params.angularVelo] {Number} Angular velocity
* 	@param [params.maxVelo] {Number} Maximum velocity
* 	@param [params.maxAngularVelo] {Number} Maximum angular velocity
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Component.prototype._applyVeloDefaults = function( params ) {

	if ( params.velocityX ) {
		this.velocityX = params.velocityX;
	}

	if ( params.velocityY ) {
		this.velocityY = params.velocityY; 
	}

	if ( params.angularVelo ) {
		this.angularVelo = params.angularVelo;
	}

	if ( params.maxVelo ) {
		this.maxVelocity = params.maxVelo;
	}

	if ( params.maxAngularVelo ) {
		this.maxAngVelo = params.maxAngVelo;
	}

};


/**
* Creates a new body based on the configuration parameters passed and the sprite.
*
* A number of different "types" of bodies can be created and the type you choose changes the parameters you need to pass.
* Also look at "Kiwi.Plugins.ChipmunkPhysics.Body" for more parameters you can pass.
* 
* - "box" - Uses the "Kiwi.Plugins.ChipmunkPhysics.createBoxBody" function
* - "circle" - Uses the "Kiwi.Plugins.ChipmunkPhysics.createCircleBody"  function
* - "segment" - Uses the "Kiwi.Plugins.ChipmunkPhysics.createSegmentBody"  function
* - "poly" - Uses the "Kiwi.Plugins.ChipmunkPhysics.createPolyBody"  function
* - "static" - Gets the body from the space. 
* - "custom" - Directly creates a new Kiwi.Plugins.ChipmunkPhysics.Body.
* 
* @method createBody
* @param physComp {Kiwi.Plugins.ChipmunkPhysics.Component} The component which the body is being created for.
* @param [config] {Object}
* 	@param [config.transform] {Kiwi.Geom.Transform} The transform that the body should use. Defaults to the components owners transform. Usually this is as desired.
*	@param [config.mass] {Number} The mass of the body. If not passed, then one is generated by "getDefaultMass" method.
* 	@param [config.addToSpace=true] {Boolean} If the created body should be added to the space or not.
*	@param [config.owner] {Any} The owner of the body. If not passed then the owner is the components owner.
*	@param [config.type="box"] {String} The type of body that is to be created. This value affects the following parameters that you can pass. Defaults to box. 
*
*	@param [config.width=box.bounds.width] {Number} "box" types only. The width of the box. Defaults to box.bound.width if a box component is found. Otherwise 100.
*	@param [config.height=box.bounds.height] {Number} "box" types only. The height of the box. Defaults to box.bound.height if a box component is found. Otherwise 100.
*
*	@param [config.radius=box.bounds.height*0.5] {Number} "circle" types only. The circles radius. Defaults to half of the box.bounds.height if a box component is found. Otherwise 50.
*
*	@param [config.start] {Object} "segment" types only. The starting cooridnates of the line.
*		@param [config.start.x=-bounds.width * 0.5] {Number} The starting coordinate on the x-axis.
*		@param [config.start.y=0] {Number} The starting coordinate on the y-axis.
*	@param [config.end] {Object} "segment" types only. 
*		@param [config.end.x=bounds.width * 0.5] {Number} The end coordinate on the x-axis.
*		@param [config.end.y=0] {Number} The end coordinate on the y-axis.
*
*	@param [config.verts] {Object} "poly" types only. The vertices for the polygon shape that the body will be attached to.
*	
* @return {Kiwi.Plugins.ChipmunkPhysics.Body} The body
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.createBody = function( phyComp, config ) {

	var body, bounds,
		owner = phyComp.owner;

	if ( owner.components.hasComponent("Box") ) {
		bounds = owner.components.getComponent("Box").bounds;

	} else {
		bounds = {
			width: 100,
			height: 100
		};

	}

	config = config || {};


	//Defaults
	config.transform = config.transform || phyComp.transform;
	config.mass = config.mass || Kiwi.Plugins.ChipmunkPhysics.Component.getDefaultMass( owner );
	config.owner = config.owner || owner;
	config.type = config.type || phyComp.defaultType;


	switch( config.type.toLowerCase() ) {
		case "box":
		case "rectangle":
		case "square":

			//Default to the width/height of the owner if no dimensions passed
			config.width = config.width || bounds.width;
			config.height = config.height || bounds.height;

			body = Kiwi.Plugins.ChipmunkPhysics.createBoxBody( config );
			break;

		case "circle":

			// config.offset = config.offset; 
			config.radius = config.radius || bounds.height * 0.5;

			body = Kiwi.Plugins.ChipmunkPhysics.createCircleBody( config );
			break;

		case "segment":
		case "line":

			config.start = config.start || { x: -bounds.width * 0.5, y: 0 };
			config.end = config.end || { x: bounds.width * 0.5, y: 0 };

			body = Kiwi.Plugins.ChipmunkPhysics.createSegmentBody( config );
			break;

		case "poly":

			if ( typeof config.verts === "undefined" ) {
				config.verts = [
					0,
					0,
					bounds.width,
					0,
					bounds.width,
					bounds.height,
					0,
					bounds.height];
			}
			
			body = Kiwi.Plugins.ChipmunkPhysics.createPolyBody( config );
			break;

		case "static":
			body = config.space.staticBody;
			break;

		case "custom":
			config.i = config.i || Infinity;
			body = new Kiwi.Plugins.ChipmunkPhysics.Body( config );
			break;

	}

	//Add to space.
	if ( typeof config.addToSpace === "undefined" || config.addToSpace) {
		phyComp.space.addBody( body );
	}

	return body;
};


/**
* Creates new shapes based on the configuration parameters passed and the sprite.
* Essentually is a wrapper that calls the "createShape" method multiple times. 
* 
* @method createShapes
* @param physComp {Kiwi.Plugins.ChipmunkPhysics.Component} The component which the body is being created for.
* @param [config] {Array|Object}
* @param [bodyConfig] {Object} The bodies configuration object.
* @return {Array} An array of shapes that have been created.
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.createShapes = function( phyComp, config, bodyConfig ) {

	//Multiple shapes...
	var shape,
		shapes = [];

	// Config
	if ( typeof config === "undefined" ) {
		config = {};
	}

	// Array
	if ( ! Kiwi.Utils.Common.isArray( config ) ) {
		config = [ config ];
	}

	//Loop through the shapes
	for (var i = 0, len = config.length; i < len; i++) {
		
		shape = Kiwi.Plugins.ChipmunkPhysics.Component.createShape( phyComp, config[ i ], bodyConfig );

		if ( shape ) {
			shapes.push( shape );
		}

	}

	return shapes;
};



/**
* Creates a new shape based on the configuration parameters passed and the sprite.
*
* A number of different types of shapes can be created. The type choosen changes the parameters you need/can pass.
* Generally they are the same as the type you pass to the body, but they can be different. 
*
* - "none" - No shape will be created.
* - "box" - See the "Kiwi.Plugins.ChipmunkPhysics.Shapes.Box" 
* - "circle" - See the "Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle" 
* - "segment" - See the "Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment"
* - "poly" - See the "Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly"
* 
* @method createShapes
* @param physComp {Kiwi.Plugins.ChipmunkPhysics.Component} The component which the body is being created for.
* @param [config] {Object}
*	@param [config.body] {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape should be a part of.
*	@param [config.type] {String} The type of shape that should be created. Defaults to the bodies.
* 	@param [config.addToSpace=true] {Boolean} If the created shape should be added to the space or not.
*
*	@param [config.width] {Number} "box" types only. Width of the shape. Defaults to the value used for the body. 
*	@param [config.height] {Number} "box" types only. Height of the shape. Defaults to the value used for the body.
*
*	@param [config.radius] {Number} "circle" types only. The radius of the shape. Defaults to the value used for the body.
*	@param [config.offset] {Object} "circle" types only. Used to offset the shape from the body. 
*		@param [config.offset.x=0] {Number} Offset of the shape on the x-axis.
*		@param [config.offset.y=0] {Number} Offset of the shape on the y-axis.
*
*	@param [config.start] {Object} "segment" types only. The starting coordinates of the line.
*		@param [config.start.x=0] {Number} The starting coordinate on the x-axis.
*		@param [config.start.y=bounds.height*0.5] {Number} The starting coordinate on the y-axis.
*	@param [config.end] {Object} "segment" types only. The end coordinates of the line.
*		@param [config.end.x=bounds.width] {Number} The end coordinate on the x-axis.
*		@param [config.end.y=bounds.height*0.5] {Number} The end coordinate on the y-axis.
*	@param [config.radius] {Number} "segment" types only. The radius of the line.
*
*	@param [config.verts] {Array} "poly" types only. The vertices for the polygon shape.
*	@param [config.offset] {Object} "poly" types only. Used to offset the shape from the body. 
*		@param [config.offset.x=0] {Number} Offset of the shape on the x-axis.
*		@param [config.offset.y=0] {Number} Offset of the shape on the y-axis.
*
* @param [bodyConfig] {Object} The bodies configuration object. Used to assign defaults for values that are not defined on the "config" object.
* @return {Any} A shapes based on the type parameter passed.
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.createShape = function( phyComp, config, bodyConfig ) {

	config = config || {};

	var shape, bounds,
		owner = phyComp.owner;

	bodyConfig = bodyConfig || {};

	if ( owner.components.hasComponent("Box") ) {
		bounds = owner.components.getComponent("Box").bounds;

	} else {
		bounds = {
			width: 100,
			height: 100
		};

	}

	config.body = config.body || phyComp.body;
	config.type = config.type || bodyConfig.type || phyComp.defaultType;

	switch( config.type.toLowerCase() ) {

		case "none":
			return null;

		case "box":
		case "rectangle":
		case "square":
			//width
			//height
			config.width = config.width || bodyConfig.width || bounds.width;
			config.height = config.height || bodyConfig.width  || bounds.height;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Box( config );
			break;

		case "circle":
			
			//radius
			//offset - x / y
			config.radius = config.radius || bodyConfig.radius || bounds.height * 0.5;
			config.offset = config.offset || bodyConfig.offset;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle( config );
			break;

		case "segment":

			// a - x / y
			// b - x / y
			// r
			config.start = config.start || bodyConfig.start;
			config.end = config.end || bodyConfig.end;
			config.radius = config.radius || bodyConfig.radius || 1;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( config );
			break;

		case "poly":

			//verts
			//offset - x / y
			config.verts = config.verts || bodyConfig.verts;
			config.offset = config.offset || bodyConfig.offset;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly( config );
			break;

	}

	//Plus others..
	if ( typeof config.addToSpace === "undefined" || config.addToSpace ) {
		phyComp.space.addShape( shape );
	}

	return shape;
};


/**
* The mass of the body. 
* 
* @property mass
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, "mass", {

	get: function () {
		return this.body.mass;
	},

	set: function (val) {
		this.body.setMass(val);
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
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, "velocityX", {

	get: function () {
		return this.body.velocityX;
	},

	set: function (val) {
		this.body.velocityX = val;
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
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, "velocityY", {

	get: function () {
		return this.body.velocityY;
	},

	set: function (val) {
		this.body.velocityY = val;
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
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, "maxVelocity", {

	get: function () {
		return this.body.maxVelocity;
	},

	set: function (val) {
		this.body.maxVelocity = val;
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
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, "angularVelo", {

	get: function () {
		return this.body.angularVelo;
	},

	set: function (val) {
		this.body.angularVelo = val;
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
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, "maxAngVelo", {

	get: function () {
		return this.body.maxAngVelo;
	},

	set: function (val) {
		this.body.maxAngVelo = val;
	},


	enumerable: true,

	configurable: true

});


/**
* Update method. Not used.
* @method update
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Component.prototype.update = function() {};
