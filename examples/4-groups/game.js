
// Custom Physics gameobject 

var PhysicsGO = function(state, textureName, x, y, config) {

	Kiwi.GameObjects.StaticImage.call(this, state, state.textures[textureName], x, y);

	this.physics = this.components.add( new Kiwi.Plugins.ChipmunkPhysics.Component( this, config ) );
	
}

Kiwi.extend( PhysicsGO, Kiwi.GameObjects.StaticImage );


var State = new Kiwi.State('GameState');


//Load in the game assets.
State.preload = function() {

	//kiwi.js
	this.addSpriteSheet('k', '../../assets/kiwi-text/k.png', 130 / 2, 71);
	this.addSpriteSheet('i', '../../assets/kiwi-text/i.png', 70 / 2, 71);
	this.addSpriteSheet('w', '../../assets/kiwi-text/w.png', 156 / 2, 71);
	this.addSpriteSheet('dot', '../../assets/kiwi-text/dot.png', 66 / 2, 32);
	this.addSpriteSheet('j', '../../assets/kiwi-text/j.png', 108 / 2, 71);
	this.addSpriteSheet('s', '../../assets/kiwi-text/s.png', 114 / 2, 71);
	this.addSpriteSheet('underline', '../../assets/kiwi-text/underline.png', 482 / 2, 33);

}

  
State.create = function() {

	this.toggleDebug();

	//Create a new group. 
	//Purely as an example to show how gameobjects with physics inside of groups work.
	this.groupA = new Kiwi.Group(this);
	this.groupA.transform.x = -200;
	this.groupA.transform.y = 20;
	this.groupA.rotation = -(Math.PI / 8);
	this.addChild(this.groupA);


	//Create another group.
	//Purely as an example to show how gameobjects with physics inside of groups work.
	this.groupB = new Kiwi.Group(this);
	this.groupB.x = -50;
	this.groupB.y = -25;
	this.addChild(this.groupB);

	//Note: Neither of the groups have been scaled. 
	// This is because whilst the coordinates would be alright, the shapes will NOT update.
	// that support is not planned.

	//Create the kiwi assets.
	this.createKiwi();

	//Create the boundaries
	this.space = this.game.chipmunk.space;

	this.floor = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody,
		start: {
			x: 0,
			y: this.game.stage.height
		},
		end: {
			x: this.game.stage.width,
			y: this.game.stage.height
		},
		friction: 1,
		elasticity: 0.8
	} );
	this.space.addShape( this.floor );

	//Roof
	this.roof =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody,
		start: {
			x: 0,
			y: 0
		},
		end: {
			x: this.game.stage.width,
			y: 0
		},
		friction: 1,
		elasticity: 0.8
	} );
	this.space.addShape( this.roof );


	//Walls
	//Left
	this.leftWall =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody,
		start: {
			x: 0,
			y: 0
		},
		end: {
			x: 0,
			y: this.game.stage.height
		},
		friction: 1,
		elasticity: 0.8
	} );
	this.space.addShape( this.leftWall );

	//Right
	this.rightWall =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody,
		start: {
			x: this.game.stage.width,
			y: 0
		},
		end: {
			x: this.game.stage.width,
			y: this.game.stage.height
		},
		friction: 1,
		elasticity: 0.8
	} );
	this.space.addShape( this.rightWall );

	// Used when calculating which shape to move.
	this.currentPointer = null;
	this.selectedObject = null;

	this.game.input.onDown.add( this.processPress, this);
	this.game.input.onUp.add( this.processRelease, this);

}

//When the user clicks down.
State.processPress = function(x, y, tu, td, duration, pointer) {

	//Only continue if we are not already tracking a pointer.
	if( !this.currentPointer ) {

		//Query via Chipmunk!!!!
		// Check to see if the pointer is on top of a shape.
		// -1 is the default layer which all shapes have by default
		var shape = this.space.pointQueryFirst( { x: x, y: y }, -1 );

		//If we have a shape, and the shapes body has an owner (which means it is attached to a sprite)
		if( shape && shape.body.owner ) {

			//Change the cell of the sprite. and assign the selected object.
			this.selectedObject = shape.body.owner;
			this.selectedObject.cellIndex = 1;

			//assign the pointer to this current one. 
			this.currentPointer = pointer;
		}


	}

};


//When a pointer is released
State.processRelease = function(x, y, tu, td, duration, pointer) {

	//Check to see if we are currently tracking a pointer, 
	// and if that pointer is the currently assigned one.
	if( this.currentPointer && pointer == this.currentPointer ) {

		//If we also have a selected object
		if( this.selectedObject ) {

			//Calculate the difference in position of the mouse,
			// and thus the force vector that we can apply to the selected object.
			var x = this.currentPointer.endPoint.x - this.currentPointer.startPoint.x;
			var y = this.currentPointer.endPoint.y - this.currentPointer.startPoint.y;

			//Apply the force to the selected object. Second set of parameters is the offset.
			this.selectedObject.physics.velocityX = x;
			this.selectedObject.physics.velocityY = y;

			//Dehighlight the object
			this.selectedObject.cellIndex = 0;
			this.selectedObject = null;
		}

		//Unassign the pointer so that we can select another one.
		this.currentPointer = null;

	}

};


//Create the kiwijs gameobjects. 
State.createKiwi = function() {

	// Note: With Polygons you have to make sure that they are convex not concave.
	// Also whilst creating make sure to create them in an anti-clockwise direction

	var x = 230;
	var y = 230;

	//Kiwi JS
	this.k = this.createObj('k', x, y, {
		type: 'poly',
		body: {
			verts: [20, -20, -20, -20, -20, 24, 20, 24],
		},
		shape: {
			e: 0.8
		}
	}, this.groupA);

	this.k.rotation = Math.PI / 2;

	this.i1 = this.createObj('i', x + 44, y, {
		type: 'poly',
		body: {
			verts: [5, -20, -5, -20, -5, 24, 5, 24],
		},
		shape: {
			e: 0.8
		}
	}, this.groupA);
	this.w = this.createObj('w', x + 63, y, {
		type: 'poly',
		body: {
			verts: [28, -20, -28, -20, -18, 24, 18, 24],
		},
		shape: {
			e: 0.8
		}
	}, this.groupA);
	
	this.i2 = this.createObj('i', x + 122, y, {
		type: 'poly',
		body: {
			verts: [5, -20, -5, -20, -5, 24, 5, 24],
		},
		shape: {
			e: 0.8
		}
	}, this.groupA);



	this.dot = this.createObj('dot', x + 138, y + 39,  {
		type: 'poly',
		body: {
			verts: [5, -5, -5, -5, -5, 5, 5, 5],
		},
		shape: {
			e: 0.8,
			u: 1
		}
	});
	this.underline = this.createObj('underline', x - 3, y + 57, {
		type: 'poly',
		body: {
			verts: [110, -5, -105, -5, -105, 5, 110, 5],
		},
		shape: {
			e: 0.8
		}
	});



	this.j = this.createObj('j', x + 150, y,  {
		type: 'poly',
		body: {
			verts: [8, -20, 0, -20, -20, 17, -13, 25, 7, 24],
			offset: {
				x: 3,
			 	y: 0
			}
		},
		shape: {
			e: 0.8,
			f: 1
		}
	}, this.groupB);
	this.s = this.createObj('s', x + 180, y,  {
		type: 'poly',
		body: {
			verts: [18, -18, 0, -24, -14, -20, -14, 18, 0, 24, 18, 18],
		},
		shape: {
			e: 0.8,
			f: 1
		}
	}, this.groupB);

}


// Handles the needed steps to create a singular physics gameobject 
// and attach it to the game.
State.createObj = function(texture, x, y, config, parent) {
	parent = parent || this;
	var obj = new PhysicsGO(this, texture, x, y, config);
	parent.addChild(obj);
	return obj;
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
	width: 700,
	height: 550,
	plugins: ['ChipmunkPhysics', 'ChipmunkPhysicsDebug']
};


var game = new Kiwi.Game('game-container', 'KiwimunkPhysics', State, gameoptions);
