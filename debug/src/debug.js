/**
* 
* @module Plugins
* @submodule ChipmunkPhysicsDebug
* 
*/


/**
* Handles the configuration and display of a useful debug overlay that can be used with the ChipmunkPhysics Plugin. 
* This class should not be directly created, as it will be created for you when this plugin is attached to a game.
*
* The debug overlay requires the "cp.extra.js" file in order to render. 
* The "cp.extra.js" attaches drawing methods to the shapes/constraints.   
*
* @class Manager
* @constructor
* @param game {Kiwi.Game} The game that this is to be attached to.
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.Manager = function( game ) {

	/**
	* The game that this has been attached to.
	* @property game
	* @type Kiwi.Game
	* @public
	*/
	this.game = game;

	return this;
};


/**
* Executed when the game this manager is attached to boots.
* 
* @method boot
* @public
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.Manager.prototype.boot = function() {

	if( typeof this.game.chipmunk === "undefined" ) {
		console.error( "ChipmunkPhysics manager not found." );
		return;
	}

	/** 
	* The Chipmunk Physics Plugin which is attached to this game.
	* @property chipmunk
	* @type Kiwi.Plugins.ChipmunkPhysics.Manager
	* @public
	*/
	this.chipmunk = this.game.chipmunk;

	/**
	* The core chipmunk object. 
	* @property cp
	* @type Object
	* @private
	*/
	this.cp = this.chipmunk.cp;

	/**
	* The space on which we are going to be debugging.
	* Update this property to change change the space which is being debugged.
	* Only needed to be updated if you have multiple different spaces. 
	* @property debugSpace
	* @type Kiwi.Plugins.ChipmunkPhysics.Space
	* @public
	*/
	this.debugSpace = this.chipmunk.space;

	/**
	* The camera which is to be taken into account when rendering. 
	* Defaults to the defaultcamera. 
	* @property camera
	* @type Kiwi.Camera
	* @public
	*/
	this.camera = this.game.cameras.defaultCamera;

	/**
	* If the debug overlay should be rendering or not. 
	* @property active
	* @type Boolean
	* @public
	*/
	this.active = false;

	/**
	* The rendering context of the canvas we are rendering to.
	* @property ctx
	* @type Object
	* @public
	*/
	this.ctx = null;


	/**
	* If the shapes should be rendered or not.
	* @property renderShapes
	* @type boolean
	* @default true
	* @public
	*/
	this.renderShapes = true;


	/**
	* If the constraints should be rendered or not.
	* @property renderConstraints
	* @type boolean
	* @default true
	* @public
	*/
	this.renderConstraints = true;


	/**
	* If the bodies should be rendered or not.
	* @property renderBodies
	* @type boolean
	* @default true
	* @public
	*/
	this.renderBodies = true;

};

/**
* Creates the debug canvas, gets the rendering context and sets it to active. 
* @method init
* @public
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.Manager.prototype.init = function( config ) {

	this.game.stage.createDebugCanvas();

	this.ctx = this.game.stage.dctx;

	this.start();
};

/**
* Stops rendering to the debug overlay. Does not hide the debug canvas. 
* @method stop
* @public
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.Manager.prototype.stop = function() {
	this.active = false;
	this.game.stage.clearDebugCanvas();
};

/**
* Starts rendering to the debug overlay. Does not create/show the debug overlay!
* @method start
* @public
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.Manager.prototype.start = function() {
	this.active = true;
};

/**
* Update method. Used to draw the debug shapes when activated.
* @method update
* @public
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.Manager.prototype.update = function() {

	//Cannot continue if not active or no context
	if( !this.active || !this.ctx ) return;

	//Clear the Debug Canvas
	this.game.stage.clearDebugCanvas();


	var self = this,
		cm = this.camera.transform.getConcatenatedMatrix(),
		ct = this.camera.transform;

	//Apply the camera transform
	this.ctx.save();
	this.ctx.setTransform(cm.a, cm.b, cm.c, cm.d, cm.tx, cm.ty);
	this.ctx.transform( 1,0,0,1, -ct.rotPointX, -ct.rotPointY );


	//Loop Over each shape and draw them
	if( this.renderShapes ) {
		this.debugSpace.eachShape( function(s) {

			if(s.draw) s.draw.call(s, self.ctx);

		} );
	}


	//Loop over each constraint and draw them
	if( this.renderConstraints ) {
		this.debugSpace.eachConstraint(function(c) {

			if(c.draw)  c.draw( self.ctx );

		} );
	}


	//Draw vectors to indicate velocity 
	if( this.renderBodies ) {
		this.debugSpace.eachBody(function(c) {

			self._drawBodyVelo( self.ctx, c );

		} );
	}


	this.ctx.restore();

};


/**
* Renders the body position and the velocity vectors of it.
* Would be nice to add in velocity 
* @method _drawBodyVelo
* @param body {Kiwi.Plugins.ChipmunkPhysics.Body} The b
* @private
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.Manager.prototype._drawBodyVelo = function( ctx, body ) {

	if( !Math.round(body.vx) || !Math.round(body.vy) ) {
		return;
	}

	//Stroke / Fill information
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgb(200, 25, 25)";
	ctx.fillStyle = "rgb(200, 25, 25)";

	//Line
	ctx.beginPath();
	ctx.moveTo( body.p.x, body.p.y );
	ctx.lineTo( body.p.x + body.vx , body.p.y + body.vy );
	ctx.closePath();
	ctx.stroke();

	//ArrowHead
	ctx.save();
	ctx.translate( body.p.x + body.vx, body.p.y + body.vy );

	var rot = Math.atan( body.vy / body.vx );
	rot += ( ( body.vx < 0 ) ? -90 : 90 ) * Math.PI / 180 ;
	ctx.rotate( rot );

	ctx.beginPath();
	ctx.moveTo( 0, 0 );
	ctx.lineTo( 2 , 5 );
	ctx.lineTo( -2 , 5 );
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

	ctx.restore();

};
