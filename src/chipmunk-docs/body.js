/**
*
* @module cp
*
*/

/**
* Chipmunk's rigid body type. Rigid bodies hold the physical properties of an object like
* it's mass, and position and velocity of it's center of gravity. They don't have an shape on their own.
* They are given a shape by creating collision shapes (cpShape) that point to the body.
* Documented so that the Kiwi counter parts will have their documented code also.
* 
* @namespace cp
* @class Body
* @constructor
* @public
*
*/


/**
* The mass of the body
* @property m
* @type Number
* @public
*/


/**
* Mass inverse
* @property m_inv
* @type Number
* @public
*/

/**
* Moment of inertia of the body.
* Must agree with cpBody.i_inv! Use body.setMoment() when changing the moment for this reason.
*
* @property i
* @type Number
* @public
*/


/**
* Position of the rigid body's center of gravity.
*
* @property p
* @type Object
* @default {x:0,y:0}
* @public
*/


/**
* Velocity of the rigid body's center of gravity.
*
* @property vx
* @type Object
* @default {x:0,y:0}
* @public
*/


/**
* Force acting on the rigid body's center of gravity.
*
* @property f
* @type Object
* @default {x:0,y:0}
* @public
*/

/**
* Angular velocity of the body around it's center of gravity in radians/second.
*
* @property w
* @type Number
* @default 0
* @public
*/

/**
* Torque applied to the body around it's center of gravity.
*
* @property t
* @type Number
* @default 0
* @public
*/


/**
* Maximum velocity allowed when updating the velocity.
*
* @property v_limit
* @type Number
* @default Infinity
* @public
*/

/**
* Maximum rotational rate (in radians/second) allowed when updating the angular velocity.
*
* @property w_limit
* @type Number
* @default Infinity
* @public
*/



/**
* Returns true if the body is sleeping.
*
* @method isSleeping
* @return {Boolean}
* @public
*/

/**
* Returns true if the body is static.
*
* @method isStatic
* @return {Boolean}
* @public
*/

/**
* Returns true if the body has not been added to a space.
*
* @method isRogue
* @return {Boolean}
* @public
*/


/**
* Sets the mass of this body.
*
* @method setMass
* @param mass {Number}
* @public
*/

/**
* Sets the moment of inertia of this body.
*
* @method setMoment
* @param moment {Number}
* @public
*/

/**
* Sets the position of this body.
* @method setPos
* @param pos {Object} New position of the body.
* @public
*/

/**
* Sets the velocity of this body.
* @method setVel
* @param vel {Object} New velocity of the body.
* @public
*/

/**
* Sets the angular velocity of this body.
* @method setAngVel
* @param anglesVelocity {Number} 
* @public
*/

/**
* Sets the angle of this body.
* @method setAngle
* @param angle {Number}
* @public
*/

/**
* Resets all the forces being applied
* @method resetForces
* @public
*/

/**
* Applies a force to this body constantly. Both parameters need to be vectors (Objects with both x/y parameters).
*
* @method applyForce
* @param force {Object} The vector of the force to apply.
* @param r {Object} The offset of the force from the body's position. 
* @public
*/


/**
* Applies a impulse to this body. Both parameters need to be vectors (Objects with both x/y parameters).
*
* @method applyImpulse
* @param j {Object} The vector of the force to apply.
* @param r {Object} The offset of the force from the body's position. 
* @public
*/



/**
* Get the velocity on a body at a point.
*
* @method getVelAtPoint
* @param r {Object} 
* @public
*/

/**
* Get the velocity on a body (in world units) at a point on the body in world coordinates.
*
* @method getVelAtWorldPoint
* @param point {Object} The location in world coordinates Needs to contain both x/y properties.
* @public
*/

/**
* Get the velocity on a body (in world units) at a point on the body in local coordinates.
*
* @method getVelAtLocalPoint
* @param point {Object} The location in world coordinates Needs to contain both x/y properties.
* @public
*/