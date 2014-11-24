/**
*
* @module cp
*
*/

/**
* Contains the core functionality that is required by constraints used in Chipmunk.
* 
* @namespace cp
* @class Constraint
* @constructor
* @public
*
*/

/**
* The first body that this constraint is linked to.
* @property a 
* @type cp.Body
* @public
*/

/**
* The second body that this constraint is linked to.
* @property b 
* @type cp.Body
* @public
*/

/**
* The space that this constraint has been attached to.
* @property space 
* @type cp.Space
* @public
*/

/**
* The maximum force that this constraint is allowed to use.
* @property maxForce 
* @type Number
* @public
*/

/**
* The rate at which joint error is corrected.
* Defaults to pow(1 - 0.1, 60) meaning that it will
* correct 10% of the error every 1/60th of a second.
*
* @property errorBias 
* @type Number
* @public
*/

/**
* The maximum rate at which joint error is corrected.
* @property maxBias
* @type Number
* @default Infinity
* @public
*/