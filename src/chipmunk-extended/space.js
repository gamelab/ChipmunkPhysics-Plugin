/**
*
* @module Plugins
* @submodule ChipmunkPhysics
*
*/

/**
* An extended version of the Chipmunk Space class.
* This has only been extended to add some nice getters/setters to make it function more Kiwi like :)
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Space
* @extends cp.Space
* @constructor
* @param [params] {Object}
*	@param [params.gravity] {Object}
*		@param [params.gravity.x] {Number}
*		@param [params.gravity.y] {Number}
*	@param [params.damping] {Number}
*	@param [params.iterations] {Number}
*	@param [params.collisionSlop] {Number}
*	@param [params.collisionBias] {Number}
*	@param [params.collisionPersistence] {Number}
*	@param [params.idleSpeedThreshold] {Number}
*
*/
Kiwi.Plugins.ChipmunkPhysics.Space = function( params ) {

	cp.Space.call(this);

	params = params || {};

	if( params.gravity ) {
		this.gravity = params.gravity;
	}

	if( params.damping ) {
		this.damping = params.damping;
	}

	if( params.iterations ) {
		this.iterations = params.iterations;
	}

	if( params.collisionSlop ) {
		this.collisionSlop = params.collisionSlop;
	}

	if( params.collisionBias ) {
		this.collisionBias = params.collisionBias;
	}

	if( params.collisionPersistence ) {
		this.collisionPersistence = params.collisionPersistence;
	}

	if( params.idleSpeedThreshold ) {
		this.idleSpeedThreshold = params.idleSpeedThreshold;
	}

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Space, cp.Space );


/**
* Gravity to pass to rigid bodies when integrating velocity on the x-axis.
* 
* @property gravityX
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Space.prototype, "gravityX", {

	get: function () {
		return this.gravity.x;
	},

	set: function ( val ) {
		this.gravity = {
			x: val,
			y: this.gravity.y 
		};
	},

	enumerable: true,
	configurable: true

});


/**
* Gravity to pass to rigid bodies when integrating velocity on the y-axis.
* 
* @property gravityY
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Space.prototype, "gravityY", {

	get: function () {
		return this.gravity.y;
	},

	set: function ( val ) {
		this.gravity = {
			x: this.gravity.x,
			y: val
		};
	},

	enumerable: true,
	configurable: true

});
