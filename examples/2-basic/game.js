/**
* 
* This Box gameobject, is a custom gameobject we will use for creating basic box objects.
* This gameobject has attached the ChipmunkPhysics Component, which is provided with the Chipmunk Physics Plugin to easily add physics to shapes.
* 
* The Chipmunk Physics component allows you to easily add shapes (collision areas) to your objects.
*
*/
var Box = function(state, x, y) {

	//Randomly choose a scale.
	var scale = Math.max( Math.min(Math.random(), 0.7), 0.4 ) * 0.5;
	var texture = state.textures.rectangles;

	//Call the super.
	Kiwi.GameObjects.StaticImage.call(this, state, texture, x, y);

	//Set the scale of the box.
	this.transform.scale = scale;

	//Choose a random cell for each box
	this.cellIndex = Math.floor( Math.random() * 8 );

	//The params object is how you configure the Component, and you can add a wide variety of different options.

	// For this example we will give it the type box (for basic rectangle collisions) 
	// and the Component defaults will work perfectly for us.
	var params = {
		//You don't even need to define the type, as this is the default.
		type: 'box'
	};
	this.physics = this.components.add( new Kiwi.Plugins.ChipmunkPhysics.Component( this, params ) );

}

Kiwi.extend( Box, Kiwi.GameObjects.StaticImage );



var State = new Kiwi.State('GameState');


//Preload the box graphics we are going to use. 
// You could use primitives instead.
// but this example is used to show it working with sprites. 
State.preload = function() {
	this.addSpriteSheet('rectangles', '../../assets/rectangles.png', 200, 200);
}


State.create = function() {

	this.toggleDebug();
	
	//Create some Boxes and maintain a reference to the middle one we spawn.
	//We want to maintin a reference to the middle one as that is the one the user can control
	var numrects = 5;
	var spacing = 100;
	var choosenOne = null;
	var choosenOneIndex = Math.floor(numrects * 0.5);

	for(var i = 0; i < numrects; i++) {
		for(var j = 0; j < numrects; j++) {

			var rectangle = new Box(this, 100 * i, 100 * j);
			this.addChild(rectangle);

			if(i == choosenOneIndex && j == choosenOneIndex) {
				choosenOne = rectangle;
			}

		}
	}

	//Apply some damping to the space. 
	// This will mean that objects will slow to a halt and not go slide as if they are on ice.
	this.game.chipmunk.space.damping = 0.9; 

	// Add the keys and disable the default actions 
	// in the case of arrow keys, we are disabling the scrolling of the webpage
	this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.LEFT, true );
	this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.RIGHT, true );
	this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.UP, true );
	this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.DOWN, true );


	//When a key is pressed, the increase the choosen boxes velocity in that direction.
	this.game.input.keyboard.onKeyDown.add(function(key) {

		var speed = 20;

		if(key == Kiwi.Input.Keycodes.LEFT) {
			choosenOne.physics.velocityX -= speed; 
		}
		if(key == Kiwi.Input.Keycodes.RIGHT) {
			choosenOne.physics.velocityX += speed;
		}

		if(key == Kiwi.Input.Keycodes.UP) {
			choosenOne.physics.velocityY -= speed;
		}
		if(key == Kiwi.Input.Keycodes.DOWN) {
			choosenOne.physics.velocityY += speed;
		}

	}, this);

}

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
	width: 600,
	height: 600,
	plugins: ['ChipmunkPhysics', 'ChipmunkPhysicsDebug']
};


var game = new Kiwi.Game('game-container', 'KiwimunkPhysics', State, gameoptions);
