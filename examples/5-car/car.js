
// Contains the code needed for a singular car instance.  
// Uses the 'wheel' and 'body' scripts.

var Car = function( state, x, y ) {

	Kiwi.Group.call(this, state);
	
	//Location of the car as a whole.
	this.x = x;
	this.y = y;

	//Create a new body / chassy for the car.
	this.carBody = new CarBody( this.state );

	//Create some slick wheels.
	this.backWheel = new CarWheel( this.state, -90, 25 );
	this.frontWheel = new CarWheel( this.state, 50, 25 );

	// To make the wheels and the chassy not collide, we assign each shape they use 
	// to a group. This number needs to be unique, otherwise cars will be able to collide with each other.
	// So we will increment this number now.
	Car.GroupNumber ++;

	//Add the children to the group.
	this.addChild( this.backWheel );
	this.addChild( this.frontWheel );
	this.addChild( this.carBody );

	//Connect the wheels to the car. 
	this.connectWheel( this.frontWheel );
	this.connectWheel( this.backWheel );
}

//Group number for the car.
Car.GroupNumber = 1;

Kiwi.extend( Car, Kiwi.Group );

//Accelerates the cars front and back wheels.
Car.prototype.accelerate = function() {
	// This force acts as an acceleration.
	this.backWheel.physics.body.applyForce( { x: 30, y: 0 }, { x: 0, y: 0} );
	this.frontWheel.physics.body.applyForce( { x: 30, y: 0 }, { x: 0, y: 0} );
};

//Stops the acceleration the cars front and back wheels.
Car.prototype.removeAcceleration = function(){
	// Reset the force.
	this.backWheel.physics.body.resetForces();
	this.frontWheel.physics.body.resetForces();
};

//Reverses the cars front and back wheels. Also acts as brakes for the car
//Same concept as accelerating.
Car.prototype.reverse = function() {
	this.backWheel.physics.body.applyForce( { x: -15, y: 0 }, { x: 0, y: 0} );
	this.frontWheel.physics.body.applyForce( { x: -15, y: 0 }, { x: 0, y: 0} );
};

//Stops the car from reversing
Car.prototype.stopReversing = function(){
	this.backWheel.physics.body.resetForces();
	this.frontWheel.physics.body.resetForces();
};

//This method connects the wheels to the body of the car. 
//This is accomplished by adding two joints (constraints) to each wheel.
Car.prototype.connectWheel = function( wheel, increaseLength ) {

	//Calculate the difference in position of the two bodies.
	var x = wheel.physics.body.x - this.carBody.physics.body.x ;

	// Create a new Groove joint.
	// This is used to keep the wheels locked in place on the x-axis.
	// So that when the chassy of the car falls on top of them, the wheels won't roll away,
	// and the spring which we add won't make them go in weird directions. 
	var jointA = new Kiwi.Plugins.ChipmunkPhysics.Joints.Groove({
			bodyA: this.carBody.physics.body,
			bodyB: wheel.physics.body,
			
			// Assign the grove x locations to the difference in the position of the two bodies.
			// This will position the grove to the wheels location. 

			// Assign different y values to allow the wheel to go up and down. 
			grooveA: { 
				x: x, 
				y: 40 
			},
			grooveB: {
				x: x,
				y: 20
			}
		});

	// Add the new constraint to the space so that it will be simulated
	this.state.space.addConstraint( jointA );

	// Create a new DampedSpring
	// The damped spring in our scenario acts as suspension for the car. 
	var jointB = new Kiwi.Plugins.ChipmunkPhysics.Joints.DampedSpring({
			bodyA: this.carBody.physics.body,
			bodyB: wheel.physics.body,
			//Set the anchor point on the car to directly above the wheel.  
			anchorA: {  
				x: x, 
				y: 0
			},
			//Set the anchor point on the wheel to its centeral position. 
			anchorB: {
				x: 0,
				y: 0
			},
			//Give some values to make it the suspension seem alright.
			restLength: 50,
			//Lower the stiffness to have the rear grind on the ground.
			stiffness: 100,
			damping: 10
		});

	//Add the new constraint to the space so that it will be simulated
	this.state.space.addConstraint( jointB );

};