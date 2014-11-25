/**
*
* @module cp
*
*/

/**
* Basic Unit of Simulation in Chipmunk
* 
* @namespace cp
* @class Space
* @constructor
* @public
*
*/ 


/**
* Gravity to pass to rigid bodies when integrating velocity.
* @property gravity
* @type Object
* @default {x:0,y:0}
* @public
*/ 


/**
* Damping rate expressed as the fraction of velocity bodies retain each second.
* A value of 0.9 would mean that each body's velocity will drop 10% per second.
*
* @property damping
* @type Number
* @default 1
* @public
*/


/**
* The number of iterations that the space property should update each frame.
* The higher this is the more accurate the physics will be, but the more processor intensive it will be.
*
* @property iterations
* @type Number
* @default 10
* @public
*/


/**
* Amount of encouraged penetration between colliding shapes..
* Used to reduce oscillating contacts and keep the collision cache warm.
* Defaults to 0.1. If you have poor simulation quality,
* increase this number as much as possible without allowing visible amounts of overlap.
*
* @property collisionSlop
* @type Number
* @default 0.1
* @public
*/

/**
* Determines how fast overlapping shapes are pushed apart.
* Expressed as a fraction of the error remaining after each second.
* Defaults to pow(1.0 - 0.1, 60.0) meaning that Chipmunk fixes 10% of overlap each frame at 60Hz.
*
* @property collisionBias
* @type Number
* @default 1
* @public
*/

/**
* Number of frames that contact information should persist.
* Defaults to 3. There is probably never a reason to change this value.
*
* @property collisionPersistence
* @type Number
* @default 3
* @public
*/

/**
* Speed threshold for a body to be considered idle.
* The default value of 0 means to let the space guess a good threshold based on gravity.
*
* @property idleSpeedThreshold
* @type Number
* @default 0
* @public
*/



/**
* Another way to sets the number of iterations this space should have.
*
* @method setIterations
* @params iter {Number} The new number of iterations
* @public
*/


/**
* Add a collision shape to the simulation.
* If the shape is attached to a static body, it will be added as a static shape.
* 
* @method addShape
* @param shape {cp.Shape}
* @return {cp.Shape}
* @public
*/


/**
* Explicity add a shape as a static shape to the simulation.
* Can be either the extended kiwi ones, or the native chipmunk classes.
* 
* @method addStaticShape
* @param shape {cp.Shape}
* @return {cp.Shape}
* @public
*/


/**
* Add a rigid body to the simulation.
* Can be either the extended kiwi ones, or the native chipmunk classes.
*
* @method addBody
* @param body {cp.Body}
* @return {cp.Body}
* @public
*/


/**
* Add a constraint to the simulation. 
* Can be either the extended kiwi ones, or the native chipmunk classes.
*
* @method addConstraint
* @param constraint {cp.Constraint}
* @return {cp.Constraint}
* @public
* 
*/


/**
* Remove a collision shape from the simulation.
* 
* @method removeShape
* @param shape {cp.Shape}
* @public
*/


/**
* Remove a collision shape added using addStaticShape() from the simulation.
* 
* @method removeStaticShape
* @param shape {cp.Shape}
* @public
*/


/**
* Remove a rigid body from the simulation.
*
* @method removeBody
* @param body {cp.Body}
* @public
*/


/**
* Remove a constraint from the simulation.
*
* @method removeConstraint
* @param constraint {cp.Constraint}
* @public
* 
*/


/**
* Test if a collision shape has been added to the space.
*
* @method containsShape
* @param shape {cp.Shape}
* @return {Boolean} If the space contains this object or not.
* @public
*
*/


/**
* Test if a rigid body has been added to the space.
*
* @method containsBody
* @param body {cp.Body}
* @return {Boolean} If the space contains this object or not.
* @public
*
*/


/**
* Test if a constraint has been added to the space.
*
* @method containsConstraint
* @param constraint {cp.Constraint}
* @return {Boolean} If the space contains this object or not.
* @public
*
*/


/**
* Calls the function passed for each shape in the space.
* 
* @method eachShape
* @param func {Function} Function to execute for each shape in the space. Will contain a single parameter to the current shape. 
* @public
*/ 


/**
* Calls the function passed for each body in the space.
* 
* @method eachBody
* @param func {Function} Function to execute for each body in the space. Will contain a single parameter to the current body. 
* @public
*/ 


/**
* Calls the function passed for each constraint in the space.
* 
* @method eachConstraint
* @param func {Function} Function to execute for each constraint in the space. Will contain a single parameter to the current constraint. 
* @public
*/ 


/**
* Set a collision handler to be used whenever the two shapes with the given collision types collide.
* You can pass null for any function you don't want to implement.
*
* @method addCollisionHandler
* @param a {Number} Collision type of the first shape. This value should be set on the shapes.
* @param b {Number} Collision type of the first shape. This value should be set on the shapes.
* @param [begin=null] {Function} 
* @param [preSolve=null] {Function} 
* @param [postSolve=null] {Function} 
* @param [separate=null] {Function} 
* @public
*/


/**
* Removes a collision handler for the collision types passed.
*
* @method removeCollisionHandler
* @param a {Number} Collision type of the first shape. This value should be set on the shapes.
* @param b {Number} Collision type of the first shape. This value should be set on the shapes.
* @public
*/


/**
* Set a default collision handler for this space.
* The default collision handler is invoked for each colliding pair of shapes
* that isn't explicitly handled by a specific collision handler.
* You can pass null for any function you don't want to implement.
*
* @method setDefaultCollisionHandler
* @param [begin=null] {Function} 
* @param [preSolve=null] {Function} 
* @param [postSolve=null] {Function} 
* @param [separate=null] {Function} 
* @public
*/


/**
* Schedule a post-step callback to be called when spaceStep() finishes.
* 
* @method addPostStepCallback
* @param func {Function} Function to call when the spaceStep finishes.
* @public
* 
*/

/**
* Step the space forward in time by the amount passed.
* @method step
* @param dt {Number} The amount to step the space forward in. Should be positive.
* @public
*/

/**
* Query the space at a point and call func for each shape found.
* You have to pass a layer and group.
* Default layer for shapes are -1 and group is 0.
*
* @method pointQuery
* @param point {Object} Location that you are looking to query. Object should contain x/y coords.
* @param layer {Number} Layer number that the shapes returned must match.
* @param group {Number} The group that the shapes returned must match.
* @param func {Function} The function to execute on each shape found.
* @public
*/

/**
* Returns the shape which is nearest a point passed.
* 
* @method nearestPointQuery
* @param point {Object} Location that you are looking to query. Object should contain x/y coords.
* @param maxDistance {Number} Maximum distance that the shape must be within.
* @param layer {Number} Layer number that the shapes returned must match.
* @param group {Number} The group that the shapes returned must match.
* @param func {Function} The function to execute on each shape found.
* @public
*/


/**
* Unlike the version in chipmunk, this returns a NearestPointQueryInfo object. Use its .shape
* property to get the actual shape.
*
* @method nearestPointQueryNearest
* @param point {Object} Location that you are looking to query. Object should contain x/y coords.
* @param maxDistance {Number} Maximum distance that the shape must be within.
* @param layer {Number} Layer number that the shapes returned must match.
* @param group {Number} The group that the shapes returned must match.
* @return {Object} 
* @public
*/


/**
* Perform a directed line segment query (like a raycast) against the space calling function passed for each shape intersected.
* 
* @method segmentQuery
* @param start {Object} The starting location of the line. Object passed must contain x/y coords.
* @param end {Object} The end location of the line. Object passed must contain x/y coords.
* @param layer {Number} Layer number that the shapes returned must match.
* @param group {Number} The group that the shapes returned must match.
* @param func {Function} The function to execute on each shape found.
* @public
*/


/**
* Perform a directed line segment query (like a raycast) against the space and return the first shape hit.
* Returns null if no shapes were hit.
* 
* @method segmentQueryFirst
* @param start {Object} The starting location of the line. Object passed must contain x/y coords.
* @param end {Object} The end location of the line. Object passed must contain x/y coords.
* @param layer {Number} Layer number that the shapes returned must match.
* @param group {Number} The group that the shapes returned must match.
* @public
*/


/**
* Perform a fast rectangle query on the space calling the function passed for each shape found.
* Only the shape's bounding boxes are checked for overlap, not their full shape.
* 
* @method bbQuery
* @param bb {cp.BB} Bounding box to for overlaps to check against. See the 'cp.BB' object in the Chipmunk repo.
* @param layer {Number} Layer number that the shapes returned must match.
* @param group {Number} The group that the shapes returned must match.
* @param func {Function} The function to execute on each shape found.
* @public
*/


/**
* Query a space for any shapes overlapping the given shape and call the function passed for each shape found.
* 
* @method shape
* @param shape {cp.Shape} The shape that you are using to query.
* @param func {Function} The function to execute on each shape found.
* @public
*/
