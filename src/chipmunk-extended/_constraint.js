/**
* Namespace containing all the Joints (constraints) which can be used.
* 
* @module ChipmunkPhysics
* @submodule Joints
*
*/
Kiwi.Plugins.ChipmunkPhysics.Joints =  {};



/**
* Used to apply default parameters which function on each constraint (joint).
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @method ParamConstruct
* @param [params] {Object}
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct = function( params ) {

	if( params.maxForce ) {
		this.maxForce = params.maxForce;
	}

	if( params.errorBias ) {
		this.maxForce = params.errorBias;
	}

	if( params.maxBias ) {
		this.maxBias = params.maxBias;
	}

};