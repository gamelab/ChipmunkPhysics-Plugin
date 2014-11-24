
// The cars body/chassy. 
// This car body is made up of multiple shapes; 
// One for the rectangle at the base which is connected to the wheels 
// The second being for the top of the car which is composed of a polygon.

var CarBody = function( state ) { 

	//Parameters for the polygon primitive.
	var params = {
		state: state,
		x: 0,
		y: 0,
		color: [ Math.random(), Math.random(), Math.random()  ],
		drawStroke: false,
		drawFill: true,
		//The various points of the car.
		vertices: [
			[ -130, 30 ],
			[ -130, 0 ],
			[ -100, 0 ],
			[ -70, -25 ],
			[ 50, -25 ],
			[ 90, 0 ],
			[ 130, 0 ],
			[ 130, 30 ]
		],
		//Order that the cars triangles should be rendered in.
		indices: [
			1, 6, 0, 7, 7, 3, 3, 4, 2, 5
		]
	};

	Kiwi.Plugins.Primitives.Polygon.call( this, params );

	//Parameters for the physics component.
	var params = {
		// For the body we are just going to use a default box configuration.
		// You could be a bit more specific which this than what I have,
		// But the car is stil relatively boxy. 
		body: {
			type: 'box',
			//Increased the mass slightly. 
			//Cars aren't light!
			mass: this.width * this.height / 800, 
		},
		shapes: [
			//This first shape is being used for the cars based. 
			//The giant rectangle at the bottom.
			{
				type: 'box',
				//Half the height of the shape
				height: 55 / 2, 
				//Move it on top of the renderable object
				offset: {
					x: 0,
					y: 13
				},
				//Assign the shape to the Car Group to stop collisions with any of the cars other parts.
				group: Car.GroupNumber
			},

			//Second shape is for the top of the car chassy.
			//Since this is not a simple box shape, we will use a polygon!
			{
				type: 'poly',
				// The various points need to be counter clockwise order 
				// and must not be concave
				verts: [ 90, 0, 50, -25, -70, -25, -100, 0 ],
				//Move it down ever so slightly
				offset: {
					x: 0,
					y: -2
				},
				//Assign the shape to the Car Group to stop collisions with any of the cars other parts.
				group: Car.GroupNumber
			}
		]
	};

	this.physics = this.components.add( new Kiwi.Plugins.ChipmunkPhysics.Component( this, params ) );
	
}

Kiwi.extend( CarBody, Kiwi.Plugins.Primitives.Polygon );