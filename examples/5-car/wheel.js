
// A Wheel which is used on the 'car' group.
// The wheel extends the Ellipse Primitive and thus the same radius can be applied to the physics.

var CarWheel = function( state, x, y, carBody ) {

	//Create the parameters used for the primitive.
	var params = {
		state: state, 
		x: x,
		y: y,
		radius: 15,
		drawStroke: false
	};

	Kiwi.Plugins.Primitives.Ellipse.call( this, params );

	//Parameters for the physic compenent
	var config = {
		body: {
			type: 'circle',
			mass: this.width * this.height / 400,
			radius: 15
		},
		shape: {
			type: 'circle',
			radius: 15,
			//Set friction on the wheels to get them to rotate like actual wheels
			friction: 0.7,
			//Assign the shape to the Car Group to stop collisions with any of the cars other parts.
			group: Car.GroupNumber
		}
	};

	this.physics = this.components.add( new Kiwi.Plugins.ChipmunkPhysics.Component( this, config ) );
};

Kiwi.extend( CarWheel, Kiwi.Plugins.Primitives.Ellipse );
