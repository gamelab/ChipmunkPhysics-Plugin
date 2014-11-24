/**
* 
* @module ChipmunkPhysics
* @submodule Joints
*
*/

/**
* Pivot joints hold two points on two bodies together allowing them to rotate freely around the pivot.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Pivot
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Pivot = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	if( params.pivot ) {
		cp.PivotJoint.call( this, params.a, params.b, params.pivot );
	
	} else {
		params.anchorA = params.anchorA || { x: 0, y: 0 };
		params.anchorB = params.anchorB || { x: 0, y: 0 };

		cp.PivotJoint.call( this, params.a, params.b, params.anchorA, params.anchorB );
	} 

	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Pivot, cp.PivotJoint );



/**
* Pin joints hold a set distance between points on two bodies.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Pin
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Pin = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.anchorA = params.anchorA || { x: 0, y: 0 };
	params.anchorB = params.anchorB || { x: 0, y: 0 };

	cp.PinJoint.call( this, params.a, params.b, params.anchorA, params.anchorB );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Pin, cp.PinJoint );



/**
* Groove joints hold a pivot point on one body to line along a line segment on another like a pin in a groove. 
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Groove
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param params.grooveA {Object} The start point of the groove on the first body.
* 		@param params.grooveA.x {Number} The grooves position on the x-axis 
* 		@param params.grooveA.y {Number} The grooves position on the y-axis
* 	@param params.grooveB {Object} The end point of the groove on the first body.
* 		@param params.grooveB.x {Number} The grooves position on the x-axis
* 		@param params.grooveB.y {Number} The grooves position on the y-axis
* 	@param [params.anchor] {Object} The anchor point on the second body.
* 		@param [params.anchor.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchor.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Groove = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	if( !params.grooveA || !params.grooveB ) {
		console.error('You need to pass both groves.');
		return;
	}

	params.anchor = params.anchor || { x: 0, y: 0 };

	cp.GrooveJoint.call( this, params.a, params.b, params.grooveA, params.grooveB, params.anchor );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The start point of the groove on the first body.
	* @property grv_a
	* @type Object
	* @private
	*/ 	

	/**
	* The end point of the groove on the first body.
	* @property grv_b
	* @type Object
	* @private
	*/ 	

	/**
	* Sets the start point of the groove on the first body.
	* @method setGrooveA
	* @param value {Object}
	* @public
	*/ 	

	/**
	* Sets the end point of the groove on the first body.
	* @method setGrooveB
	* @param value {Object}
	* @public
	*/ 	
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Groove, cp.GrooveJoint );


/**
* Gear joints constrain the rotational speed of one body to another. 
* A ratio of 1.0 will lock the rotation of two bodies together, 
* and negative ratios will cause them to spin in opposite directions.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Gear
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.phase=10] {Number} The angular offset in radians.
* 	@param [params.ratio=1] {Number} The ratio of the rotational speeds.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Gear = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.phase = params.phase || 10;
	params.ratio = params.ratio || 1;

	cp.GearJoint.call( this, params.a, params.b, params.phase, params.ratio );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The angular offset in radians.
	* @property phase
	* @type Number
	* @public
	*/ 

	/**
	* Sets the ratio of the rotational speeds.
	* @method setRatio
	* @param value {Number}
	* @public
	*/ 
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Gear, cp.GearJoint );


/**
* A spring with a damper.
* 
* While a spring is not technically a constraint, the damper is. 
* The spring forces are simply a convenience.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class DampedSpring
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.restLength=10] {Number} The length the spring wants to contract or expand to. 
* 	@param [params.stiffness=1] {Number} The young's modulus of the spring. 
*	@param [params.damping=1] {Number} The amount of viscous damping to apply. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.DampedSpring = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.anchorA = params.anchorA || { x: 0, y: 0 };
	params.anchorB = params.anchorB || { x: 0, y: 0 };
	params.restLength = params.restLength || 100;
	params.stiffness = params.stiffness || 50;
	params.damping = params.damping || 1;

	cp.DampedSpring.call( this, 
		params.a, 
		params.b, 
		params.anchorA,
		params.anchorB,
		params.restLength,
		params.stiffness,
		params.damping );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );

	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	

	/**
	* The length the spring wants to contract or expand to. 
	* @property restLength
	* @type Number
	* @public
	*/

	/**
	* The young's modulus of the spring. 
	* @property stiffness
	* @type Number
	* @public
	*/

	/**
	* The amount of viscous damping to apply. 
	* @property damping
	* @type Number
	* @public
	*/

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.DampedSpring, cp.DampedSpring );


/**
* Like a DampedSpring, but operates in a rotational fashion.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class DampedRotarySpring
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.restAngle=10] {Number} The angular offset the spring attempts to keep between the two bodies. 
* 	@param [params.stiffness=1] {Number} The young's modulus of the spring. 
*	@param [params.damping=1] {Number} The amount of viscous damping to apply. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.DampedRotarySpring = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.restAngle = params.restAngle || 100;
	params.stiffness = params.stiffness || 50;
	params.damping = params.damping || 1;

	cp.DampedRotarySpring.call( this, 
		params.a, 
		params.b, 
		params.restAngle,
		params.stiffness,
		params.damping );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	

	/**
	* The angular offset the spring attempts to keep between the two bodies.
	* @property restAngle
	* @type Number
	* @public
	*/

	/**
	* The young's modulus of the spring. 
	* @property stiffness
	* @type Number
	* @public
	*/

	/**
	* The amount of viscous damping to apply. 
	* @property damping
	* @type Number
	* @public
	*/
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.DampedRotarySpring, cp.DampedRotarySpring );


/**
* Ratchet joints create rotary ratches similar to a socket wrench.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Ratchet
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.phase=10] {Number} The angular offset of the ratchet positions in radians. 
* 	@param [params.ratchet=1] {Number} The angle in radians of each ratchet position. Negative values cause the ratchet to operate in the opposite direction.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Ratchet = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.phase = params.phase || 10;
	params.ratchet = params.ratchet || 1;

	cp.RatchetJoint.call( this, params.a, params.b, params.phase, params.ratchet );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The angular offset of the ratchet positions in radians. 
	* @property phase
	* @type Number
	* @public
	*/ 

	/**
	* The angle in radians of each ratchet position. Negative values cause the ratchet to operate in the opposite direction.
	* @property ratchet
	* @type Number
	* @public
	*/ 

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Ratchet, cp.RatchetJoint );


/**
* Constrains the angle between two bodies.
*
* This joint is often used in conjuction with a separate PivotJoint in order to limit the rotation around the pivot.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class RotaryLimit
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param params.min {Number} The minimum angular delta of the joint in radians. 
* 	@param params.max {Number} The maximum angular delta of the joint in radians.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.RotaryLimit = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	cp.RotaryLimitJoint.call( this, params.a, params.b, params.min, params.max );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The minimum angular delta of the joint in radians. 
	* @property min
	* @type Number
	* @public
	*/ 

	/**
	* The maximum angular delta of the joint in radians.
	* @property max
	* @type Number
	* @public
	*/ 
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.RotaryLimit, cp.RotaryLimitJoint );


/**
* Simple motors make two objects spin relative to each other.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class SimpleMotor
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param params.rate {Number} The relative rotation speed of the two bodies in radians per second.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.SimpleMotor = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.rate = params.rate;

	cp.SimpleMotor.call( this, params.a, params.b, params.rate );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The relative rotation speed of the two bodies in radians per second.
	* @property rate
	* @type Number
	* @public
	*/ 

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.SimpleMotor, cp.SimpleMotor );


/**
* Simple motors make two objects spin relative to each other.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Slide
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.min=100] {Number} The minimum allowed distance between anchor points. 
* 	@param [params.max=1] {Number} The maximum allowed distance between anchor points. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Slide = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.anchorA = params.anchorA || { x: 0, y: 0 };
	params.anchorB = params.anchorB || { x: 0, y: 0 };
	params.max = params.max || 100;
	params.min = params.min || 1;

	cp.SlideJoint.call( this, 
		params.a, 
		params.b, 
		params.anchorA,
		params.anchorB,
		params.min,
		params.max );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	
	
	/**
	* The minimum angular delta of the joint in radians. 
	* @property min
	* @type Number
	* @public
	*/ 

	/**
	* The maximum angular delta of the joint in radians.
	* @property max
	* @type Number
	* @public
	*/ 
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Slide, cp.SlideJoint );
