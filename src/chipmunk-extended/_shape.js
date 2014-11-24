/**
* Namespace containing all the Shapes (hitboxes) which can be used.
* 
* @module ChipmunkPhysics
* @submodule Shapes
* @main
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes = {};


/**
* Function used by shapes to apply the parameters passed.   
* Only intended for internal use. 
*
* @method ParamConstruct
* @param [params] {Object}
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct = function( params ) {

	params = params || {};

	if( params.e ) {
		this.setElasticity( params.e );
	} else if( params.elasticity ) {
		this.setElasticity( params.elasticity );
	}

	if( params.u ) {
		this.setFriction( params.u );
	} else if( params.friction ) {
		this.setFriction( params.friction );
	}

	if( params.group ) {
		this.group = params.group;
	}

	if( params.layers ) {
		this.setLayers( params.layers );
	} 

	if( params.sensor ) {
		this.setSensor( params.sensor );
	}

	if( params.collisionType ) {
		this.setCollisionType( params.collisionType ); 
	}
		
};