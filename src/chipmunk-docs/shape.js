
/**
* Namespace used by chipmunk which contains it core functionality. 
* 
* @module cp
* @main
*/

/**
* Contains the base shape object which all others extend from. 
* The cpShape struct defines the shape of a rigid body.
* Opaque collision shape struct. Do not create directly - instead use
* PolyShape, CircleShape and SegmentShape.
* 
* Documented so that the Kiwi counter parts will have their documented code also.
* 
* @namespace cp
* @class Shape
* @constructor
* @param body {cp.Body} The body that this shape should be attached to.
* 
*/

/**
* The body that this shape is attached to.
*
* @property body
* @type cp.Body 
* @public
*/

/**
* The Sensor flag.
* Sensor shapes call collision callbacks but don't produce collisions.
*
* @property sensor
* @type Boolean
* @default false
* @public
*/

/**
* Coefficient of restitution. (elasticity)
*
* @property e
* @type Number
* @default 0
* @public
*/

/**
* Coefficient of friction.
*
* @property u
* @type Number
* @default 0
* @public
*/

/**
* Surface velocity used when solving for friction.
* You should reassign the all whole object and not just a singular value when editing.
*
* @property surface_v
* @type Object
* @default {x: 0, y: 0}
* @public
*/

/**
* Collision type of this shape used when picking collision handlers.
*
* @property collision_type
* @type Number
* @default 0
* @public
*/

/**
* Group of this shape. Shapes in the same group don't collide.
*
* @property group
* @type Number
* @default 0
* @public
*/

/**
* Layer bitmask for this shape. Shapes only collide if the bitwise and of their layers is non-zero.
*
* @property layers
* @type Number
* @default ~0
* @public
*/

/**
* The space that this shape is a part of. 
*
* @property space
* @type cp.Space
* @public
*/


/**
* Sets the elasiticity of this shape.
* 
* @method setElasticity
* @param e {Number} The new elasticity of the shape.
* @public
* 
*/

/**
* Sets the friction of this shape.
* 
* @method setFriction
* @param u {Number} The new friction of the shape.
* @public
* 
*/

/**
* Sets the layers of this shape.
* 
* @method setLayers
* @param layers {Number} The new layers of the shape.
* @public
* 
*/

/**
* Sets the sensor flag of this shape.
* 
* @method setSensor
* @param sensor {boolean} If the sensor flag is active or not.
* @public
* 
*/

/**
* Sets the collision type of this shape.
* 
* @method setCollisionType
* @param collision_type {Number} The new collision type of the shape.
* @public
* 
*/

/**
* Sets the body that this shape is attached to.
* 
* @method setBody
* @param body {cp.Body}
* @public
*
*/


/**
* The bounding boxes left point.
*
* @property bb_l
* @type Number
* @public
*/


/**
* The bounding boxes bottom point.
*
* @property bb_b
* @type Number
* @public
*/


/**
* The bounding boxes right point.
*
* @property bb_r
* @type Number
* @public
*/


/**
* The bounding boxes top point.
*
* @property bb_t
* @type Number
* @public
*/
