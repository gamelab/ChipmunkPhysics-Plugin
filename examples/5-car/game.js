var State = new Kiwi.State('GameState');

  
State.create = function() {

	this.toggleDebug();
	
	//Get the space that we are using.
	this.space = this.game.chipmunk.space;
	//Apply damping to the space to decelerate the car
	//this.space.damping = 0.5; 
	this.space.gravity = { x: 0, y: 200 };

	//Create the awesome backgrounds!
	this.createSky();
	this.createGround();

	//Create a car! Vroooom
	this.car = new Car(this, this.game.stage.width * 0.5, 100);
	this.addChild( this.car );


	//keyboard events for the car!
	this.game.input.keyboard.onKeyDown.add( this.pressed, this );
	this.game.input.keyboard.onKeyUp.add( this.released, this );

}

//Creates some nice sky!
State.createSky = function() {

	this.sky = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		x: 0,
		y: 0, 
		drawStroke: false,
		color: [ 0.1, 0.75, 1 ],
		width: this.game.stage.width,
		height: this.game.stage.height
	} );
	this.addChild( this.sky );

};

//Creates some nice ground!
State.createGround = function() {

	//The floor of the ground
	this.groundShape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody,
		start: {
			x: -this.game.stage.width,
			y: 250
		},
		end: {
			x: this.game.stage.width * 2,
			y: 250
		},
		friction: 0.7,
		elasticity: 0.8
	} );
	this.space.addShape( this.groundShape );

	//The ground rectangle
	this.ground = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		x: 0,
		y: 250, 
		drawStroke: false,
		color: [ 0.3, 0.7, 0.25],
		width: this.game.stage.width,
		height: this.game.stage.height - 150
	} );
	this.addChild( this.ground );

	this.createBump();

};

State.createBump = function() {

	var radius, bump, bumpShape, x, y, yOffset;

	yOffset = Math.random() * 20;
	radius = (10 + Math.random() * 10) + yOffset;
	x = Math.random() * this.game.stage.width;
	y = 250 - radius;
	
	bump = new Kiwi.Plugins.Primitives.Ellipse( {
		state: this, 
		x: x,
		y: y + yOffset,
		color: [ 0.3, 0.7, 0.25],
		radius: radius,
		drawStroke: false
	} );
	this.addChild( bump );

	bumpShape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle( {
		body: this.space.staticBody,
		offset: {
			x: x + radius,
			y: y + radius + yOffset
		},
		radius: radius
	} );
	this.space.addShape( bumpShape );

};

//When a key is pressed.
State.pressed = function( keyCode ) {
	
	//And the key is the right arrow key. Accelerate
	if( keyCode == Kiwi.Input.Keycodes.RIGHT ) {
		this.car.accelerate();
	}

	//And the key is the left arrow key. Reverse
	if( keyCode ==  Kiwi.Input.Keycodes.LEFT) {
		this.car.reverse();
	}

};

//When a key is released
State.released = function( keyCode ) {

	//And the key is the right arrow key. Stop accelerating
	if( keyCode == Kiwi.Input.Keycodes.RIGHT ) {
		this.car.removeAcceleration();
	}

	//And the key is the left arrow key. Stop reversing
	if( keyCode ==  Kiwi.Input.Keycodes.LEFT) {
		this.car.stopReversing();
	}

};

//Handles toggling the debug overlay on top of the game.
State.toggleDebug = function() {

	//Initialise the physics debugger
	this.game.chipmunkDebug.init();	

	//Hide the debug canvas by default
	this.game.stage.toggleDebugCanvas();

	//Create a hud button and add it.
	var button = new Kiwi.HUD.Widget.Button( this.game, 'Toggle Debug', 5, 5 );
	button.class = 'toggle-debug';
	this.game.huds.defaultHUD.addWidget( button );

	//When pressed execute the toggleDebugCanvas method on the stage.
	button.input.onUp.add( this.game.stage.toggleDebugCanvas, this.game.stage );

};

var gameoptions = {
	width: 700,
	height: 350,
	plugins: ['ChipmunkPhysics', 'ChipmunkPhysicsDebug', 'Primitives']
};


var game = new Kiwi.Game('game-container', 'KiwimunkPhysics', State, gameoptions);
