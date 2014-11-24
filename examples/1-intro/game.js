var DEBUG = true;
var State = new Kiwi.State('GameState');

State.preload = function() {

	this.addSpriteSheet('circles', '../../assets/circles.png', 200, 200);
	this.addSpriteSheet('rectangles', '../../assets/circles.png', 200, 200);

}


State.create = function() {	


	//Create a debug canvas, this is just so we can see specifically where everything is.
	this.game.stage.createDebugCanvas();
	this.ctx = this.game.stage.dctx;


	//Physics Space
	this.cp = cp;


	// https://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/interface_chipmunk_space.html
	// The first step is to create a space object. 
	// Space is where all the simulation happens.
	// "Simulating" means that the space will update all body’s (which have been added to the space) position/velocity, apply forces to it, affect it by gravity, etc, as the space is updated over time.
	this.space = new cp.Space();
	

	// 10 Iterations per update
	// Iterations are the number of solver passes the space should use when resolving collisions.
	// The higher the number, the more cpu used, the more accurate the physics
	this.space.iterations = 10;


	// The Mouse 


	// cp.v is a quick way to create new Chipmunk Vector Objects.
	// Vector Objects are used for all x/y based values. (positions, velocity, e.t.c)

	// In this case we are creating one, which will be used for our mouse.
	// So that when the user clicks on an object, they can move it with their mouse
	this.mousePointVector = cp.v( this.game.input.mouse.cursor.point.x, this.game.input.mouse.cursor.point.y);


	//Body - Mass, Moment of interia

	
	// https://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/structcp_body.html#a93996dfeb1565b8433b7d96773f7300c
	// Bodies in chipmunk contain all positional/rotational data for shapes. 
	
	// If you want the body to be affected by gravity (and other space things), then you will need to add the body to that space. (as stated above) 
	// This can be done through the 'addBody' method, on the space you want to add it too.
	
	// Otherwise you can leave them not added. When not added they are called 'rogue' bodies, because they are not simulated.
	
	// Some of the properties on bodies are:
	//  mass - number
	//  velocity - v - CPVect
	//  position - p - CPVect
	//  angle - a - number
	//  angularVelo - w - number
	//  max velocity - v_limit - number
	//  max angular velo - w_limit - number
	

	
	// In this case, we are going to create a body for the mouse cursor. 
	// It will be a 'rogue' body. We want it to be one, as we don't want the mouse effected by gravity.
	this.mouseBody = new cp.Body(Infinity, Infinity);
	this.mouseJoint = null;



	// Layer Types
	// Explained below. 
	this.grabbable = 1;
	this.notGrabbable = 2;


	// Invisible Walls / Boundaries

	
	// For the roof/walls/floors we are creating whats called a 'static body'. 
	// These bodies cannot be moved, or changed at all once created. 
	// Thus only use them for invisible wall type tasks
	
	// See this forum post for more info about rogue vs static: http://chipmunk-physics.net/forum/viewtopic.php?f=1&t=1955	


	// Shapes 
	// All collisions are done by shapes. 
	// Shapes define collidable areas and there are many different types.
	// Each shape needs to have a 'body', which defines its position, velocity, e.t.c and if it updates with a space. 
	 
	// Shapes then need to be added to a particular 'space', and that space handles the collisions between the shapes on that space.
	
	// Params
	// 1 - The Body
	// 2 - Start Coordinate
	// 3 - End Coordinate
	// 4 - Beveled Radius  
	this.roofSegment = new cp.SegmentShape( this.space.staticBody, cp.v(50, 50), cp.v(650, 50), 1);
	this.roof = this.space.addShape( this.roofSegment );

	// Setting the elasticity/friction of the roof
	this.roof.setElasticity(1);
	this.roof.setFriction(1);


	//Layers

	// A 'layer' is a pane in space, upon which collisions with other shapes will happen.
	// Shapes on the same layer will collide with one another, but not with shapes assigned to a different layer.
	// By default shapes do not have a layer, and because of that all shapes will collide with each other.
	
	// Example: If you have two shapes, A and B (ignore the type for this example) and they are coming at each other. By default they will meet eventually and collide. 
	// Now if you assign Shape A to a layer, the same result as above will happen. This is because shape B doesn't have an assigned layer and thus it will collide with objects on ALL other layers.
	// But if you assigned Shape B to a DIFFERENT layer, then they wouldn't collide. Because they result there collisions in different layers.
	

	//We will set out walls layers, to 'notGrabbable' so that the user will not be able to move these shapes
	this.roof.setLayers(this.notGrabbable); 


	//Floors - Similar to the roof also
	this.floorSegment = new cp.SegmentShape( this.space.staticBody, cp.v(50, 650), cp.v(650, 650), 0);
	this.floor = this.space.addShape(this.floorSegment);
	this.floor.setElasticity(1);
	this.floor.setFriction(1);
	this.floor.setLayers(this.notGrabbable); 


	//Walls - Similar to the roof also
	this.wall1Segment = new cp.SegmentShape(this.space.staticBody, cp.v(50, 50), cp.v(50, 650), 0);
	this.wall1 = this.space.addShape(this.wall1Segment);
	this.wall1.setElasticity(1);
	this.wall1.setFriction(1);
	this.wall1.setLayers(this.notGrabbable);

	this.wall2Segment = new cp.SegmentShape(this.space.staticBody, cp.v(650, 50), cp.v(650, 650), 0);
	this.wall2 = this.space.addShape(this.wall2Segment);
	this.wall2.setElasticity(1);
	this.wall2.setFriction(1);
	this.wall2.setLayers(this.notGrabbable);



	// Circles / Balls 

	//Create the Kiwi Objects

	//Note: Make sure you add all the collidable objects to the same parent! 
	this.circle = new Kiwi.GameObjects.StaticImage(this, this.textures.circles, 0, 0 );
	this.circle.x = (this.game.stage.width - this.circle.width) * 0.5;
	this.circle.y = (this.game.stage.height - this.circle.height) * 0.5 + this.circle.height * 0.25;
	this.addChild(this.circle); 


	//Properties that are needed for the objects
	var mass = 100,
		radius = 100,
		momentForCircle = cp.momentForCircle( mass, 0, radius, cp.v(0, 0) );

	// 1 - Create a new Body for the circle. Make sure to add it to the space as well.
	this.circle.body = this.space.addBody(new cp.Body(mass, momentForCircle)); 

	// 2 - Set the bodies position to centeral point of the circle
	this.circle.body.setPos( cp.v(this.circle.x + this.circle.width * 0.5, this.circle.y + this.circle.height * 0.5) );

	// 3 - Create the collision shape, add it to the space and set its properties 
	this.circle.shape = this.space.addShape( new cp.CircleShape( this.circle.body, radius, cp.v(0, 0) ) );
	this.circle.shape.setElasticity(0.8);
	this.circle.shape.setFriction(1);


	//Will hold the smaller circles
	this.circles = [];
	this.numCircles = 5;

	var scale = 0.5;

	for(var i = 1; i < this.numCircles; i++) {


		var circle = new Kiwi.GameObjects.StaticImage(this, this.textures.circles, 50 + 100 * i, 150 );
		circle.scale = scale;
		var radius = circle.width * 0.5 * scale;
		this.addChild(circle);
		this.circles.push(circle);

		var momentForCircle = cp.momentForCircle( mass, 0, radius, cp.v(0, 0) );
		circle.body = this.space.addBody(new cp.Body(mass, momentForCircle)); 
		circle.body.setPos( cp.v(circle.x + circle.box.bounds.width * 0.5, circle.y + circle.height * 0.5) );
		circle.shape = this.space.addShape( new cp.CircleShape( circle.body, radius, cp.v(0, 0) ) );
		circle.shape.setElasticity(0.8);
		circle.shape.setFriction(1);

	}


	//Gravity can be set by going through the "space"
	this.gravityX = 0;
	this.gravityY = 200;
	this.space.gravity = cp.v(this.gravityX, this.gravityY);


	//This input event handles the movement of a shape when it is clicked on.
	this.game.input.onDown.add(function() {

		//Update the position of the mouse first.
		this.updateMouseVector();


		//Gets the grabbable objects on the stage based on the 'point'
		// 1 - The point at which to query the space
		// 2 - The layer upon which we are wanting to get a shape from. 
		//     This cannot be 'null' but shapes without an assigned layer will be returned by any layer query.
		var shape = this.space.pointQueryFirst(this.mousePointVector, this.grabbable );


		//If there is a shape/the query returned a grabbable shape
		if( shape ){

			//Get the body of that shape
			var body = shape.body;

			// Create a pivot joint

			// https://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/interface_chipmunk_pivot_joint.html#details
			// 1 - The body of the first shape you want to create a pivot joint on.
			// 2 - The body of the second shape you want to create a pivot joint on.
			// 3 - The anchor point of the first body/shape. 0,0 indicates that we will have it at the center of the body. 
			// 4 - The anchor point of the second body/shape. 

			//Switch these variables around to really see what is ment by an anchor point!
			var secondPivot = body.world2Local( this.mousePointVector ); // Sets the anchor point to where the mouse clicked on the shape
			//var secondPivot = cp.v(0,0);	// Sets the anchor point to the center of the body.
			
			this.mouseJoint = new cp.PivotJoint(this.mouseBody, body, cp.v(0,0),  secondPivot );

			//Maximum force before the joint actually 'breaks'. Default is infinity.
			this.mouseJoint.maxForce = 50000;				
			this.mouseJoint.errorBias = Math.pow(1 - 0.15, 60); 
			
			//Add this mouse joint to the constraints list. 

			// Constraints connect two bodies together to create advanced physics behaviours.
			// These are generally done via 'joints'. 
			
			// You can create a lot of different joint types to connect bodies together. (pin, grove, e.t.c)
			// But once you have created one, you will always need to add it to the space,  so that the simulations will account for it.
			this.space.addConstraint( this.mouseJoint );			
		
		}

	}, this);
	

	//Event which is executed each time the user releases the mouse.
	this.game.input.onUp.add(function() {

		//Update the mouses vector location
		this.updateMouseVector();


		//If we have a mouse joint, then we will need to remove it.
		if( this.mouseJoint ) {

			//If the user releases the mouse, we will remove the mouse joint from the simulation
			this.space.removeConstraint(this.mouseJoint);		
			this.mouseJoint = null;

		}

	}, this);


	//When a key is pressed, then increase gravity in the choosen direction
	this.game.input.keyboard.onKeyDown.add(function(key) {

		var change = 50;

		if(key == Kiwi.Input.Keycodes.LEFT) {
			this.gravityX -= change;
		}
		if(key == Kiwi.Input.Keycodes.RIGHT) {
			this.gravityX += change;
		}

		if(key == Kiwi.Input.Keycodes.UP) {
			this.gravityY -= change;
		}
		if(key == Kiwi.Input.Keycodes.DOWN) {
			this.gravityY += change;
		}

		//Set the gravity
		this.space.gravity = cp.v(this.gravityX, this.gravityY);

	}, this);

}


State.updateMouseVector = function() {
	this.mousePointVector.x = this.game.input.mouse.cursor.point.x;
	this.mousePointVector.y = this.game.input.mouse.cursor.point.y;
}


//Update loop! Executed each frame
State.update = function() {

	this.game.stage.clearDebugCanvas();
	this.updateMouseVector();

	//Make the mouseBody position the same as the mouse point.
	this.mouseBody.setPos( this.mousePointVector );


	//Instead of doing of setting the position directly the same, you can do some fancy trickery like the Chipmunk guys did.
	
	/*
	var newPoint = cp.v.lerp(this.mouseBody.p, this.mousePointVector, 0.25);
	this.mouseBody.v = cp.v.mult( cp.v.sub(newPoint, this.mouseBody.p), 60);
	this.mouseBody.p = newPoint;
	*/
	

	//Loop through each shape and draw any segment.
	this.space.eachShape(function(shape) {
		
		if(shape.type == "segment") {

			this.ctx.strokeStyle = 'black';
			this.ctx.lineWidth = 5;
			this.ctx.beginPath();
			this.ctx.moveTo(shape.ta.x, shape.ta.y);
			this.ctx.lineTo(shape.tb.x, shape.tb.y);
			this.ctx.stroke();

		}

	}.bind(this) );


	//Loop through each constraint and draw each one.
	this.space.eachConstraint(function(c) {

		var a = c.a.local2World(c.anchr1);
		var b = c.b.local2World(c.anchr2);
		this.ctx.strokeStyle = "grey";
		this.ctx.fillStyle = "grey";
		
		this.ctx.beginPath();
		this.ctx.arc(a.x, a.y, 10, 0, 2*Math.PI, false);
		this.ctx.fill();
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.arc(b.x, b.y, 10, 0, 2*Math.PI, false);
		this.ctx.fill();
		this.ctx.stroke();


	}.bind(this) );


	//In this case the radius is the same as half the circles width
	this.circle.x = this.circle.shape.tc.x - this.circle.width * 0.5;
	this.circle.y = this.circle.shape.tc.y - this.circle.height * 0.5;

	//Set the rotation of the circle
	this.circle.rotation = this.circle.body.a;


	for(var i = 0; i < this.circles.length; i++) {
		var circle = this.circles[i];
		circle.x = circle.shape.tc.x - circle.width * 0.5;
		circle.y = circle.shape.tc.y - circle.height * 0.5;

		circle.rotation = circle.body.a;
	}


	if (this.mouseJoint) {
		this.ctx.strokeStyle = 'black';
		this.ctx.beginPath();
		var c = this.mouseBody.p;
		this.ctx.arc(c.x, c.y, 10, 0, 2*Math.PI, false);
		this.ctx.fill();
		this.ctx.stroke();
	}

	
	//Advances the timeline of the space forward by the amount passed. Use a 'speed' govenor.
	this.space.step( (1 / 60) * Math.min(this.game.time.rate, 4) );
}



var gameoptions = {
	width: 700,
	height: 700
};

var game = new Kiwi.Game('game-container', 'KiwimunkPhysicsTest', State, gameoptions);
