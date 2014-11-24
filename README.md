Chipmunk Physics Plugin for Kiwi.JS - 0.8.0
=======================================

##Description:

This plugin helps to bring the advanced rigid body physics of [Chipmunk](chipmunk-physics.net) into Kiwi.

The plugin uses the [JavaScript port of Chipmunk Physics Library](https://github.com/josephg/Chipmunk-js). Many thanks to all the [contributors](https://github.com/josephg/Chipmunk-js/graphs/contributors) who made the port possible!
 

##Files / Folders
* assets/ - Assets used by the examples. 
* build/ - Final built version of the plugins.
* debug/ - Contains the `src` and `docs` for the debug portion of the plugin. 
* docs/ - Documentation of the main chipmunk plugin. Generated by yuidocs.
* examples/ - Examples of using Chipmunk physics. 
* lib/ - External libraries that this plugin requires. 
* src/ - Source files for the plugin. 

##Terminology notes: 
Some terms to take note just to make sure we are on the same page are: 

###Shape
A **Shape** is a term for a collidable area. Circles / Polygons / Lines are supported.

###Body
**Body** defines a position/rotation/mass/velocity/e.t.c of objects. 

###Space
**Space** is a section of the Chipmunk which simulates physics behaviours. Any **Body** or **Shape** that you want update due to gravity/collide with each other need to be attached to the same space.

##How to Include:  

Copy the  `lib/chipmunk-js/cp.js` file (or the minified version) into your project directory. We again recommend place them inside of a `lib` folder to easily manage all external libraries used.

Copy either the `chipmunk-physics-x.x.x.js` or the `chipmunk-physics-x.x.x.min.js` file (they are located in the `build` folder of this repo) into your project directory. We recommend that you save the files under a plugin directory that lives inside of your project directory so that you can easily manage all of the plugins but that is not required.

Then link in both of the javascript files that we copied above into your HTML file. Make sure to place the link to the plugin itself **underneath** the link to the `kiwi.js` file AND the `cp.js` file. 

Now we need to tell the game to use the plugin. To do so you need to add the name of the plugin ('ChipmunkPhysics') to the plugins section of the game options.

```
var game = new Kiwi.Game('domElementId', 'GameName', null, { plugins: ["ChipmunkPhysics"]});
```

Just make sure if you are wanting to use other plugins that you pass their names also.

Your game should now have access to the plugin. 

###Including the Debug:
To include the debug portion of the plugin as well you will need to copy and include a few more files.

Firstly make a copy of and link to the following files:
* `lib/chipmunk-js/cp.extra.js` 
* `build/chipmunk-physics-debug-x.x.x.js`

Be sure to include the `cp.extra.js` file first.

Tell the game to use the plugin. Add the `ChipmunkPhysicsDebug` (the name of the debug plugin) to the plugins section of the game options. Be sure to add it *after* the ChipmunkPhysics plugin.

```javascript
var game = new Kiwi.Game('domElementId', 'GameName', null, { plugins: ["ChipmunkPhysics", "ChipmunkPhysicsDebug"]});
```

##Note! Scale doesn't affect Shapes
One think to point out is that changing a Transform's Scale will not change any Shape which maybe attached to a Body which use that Transform. 

The main reason for this is that Chipmunk doesn't contain any scale properties. And us adding in support of it would mean us rewriting systems, which we certainly don't want to do. 

So if you do scale a Transform and want a Shape to update with the scale, we recommend updating the information defining that shape. An example is if it was polygon you would reset the vertices using the `setVerts` method.

##How to use.
Sections covered are listed below: 

* Using the Debug Plugin
* Physics Manager
* What can be done in Space
* Physics Component
* Bodies
* Creating Shape's
* Constraints

###Using the Debug Plugin
When you include the ChipmunkPhysicsDebug plugin into a game, that game will have access to a `chipmunkDebug` manager. It is this manager which handles the rendering of shapes/constraints/bodies and initalising the debug overlay.

```javascript
//Initalises the debug overlay
this.game.chipmunkDebug.init(); 
```

Executing the `init` method creates the stages debug canvas and starts rendering all the bodies/shapes/constraints on the defaultSpace.

The following is a list of rendering options.

```javascript
this.game.chipmunkDebug.renderConstraints = true;
this.game.chipmunkDebug.renderBodies  = true;
this.game.chipmunkDebug.renderShapes = true;
```

###Physics Manager
The physics manager is created and attached to a game at boot time. The manager is in charge of the creating and managing of spaces.

**Update Speed**
Speed at which all spaces managed by this object are to be updated by each frame.
```javascript
this.game.chipmunk.updateSpeed = 1 / 60
```

**Space**
The default space which is created at boot time. This is the default space which the `ChipmunkPhysic` Components will add the bodies/shapes they create to by default. 

This is also the object you access to change the direction/level of gravity, damping on all velocities, how accurate the physics is, plus much much more. 
```javascript
this.game.chipmunk.defaultSpace;
```

**Active**
If the spaces managed by this plugin should update or not. 
```javascript
this.game.chipmunk.active = false; 
```


###What can be done in Space
Space is used in chipmunk to contain a singular physics simulation and one is created by default by this plugin at boot time. Bodies, shapes and constraints which you want simulated need to be added to a space in order to function.

**Gravity**
```javascript
this.game.chipmunk.defaultSpace.gravityX = 100;
this.game.chipmunk.defaultSpace.gravityY = 100;
```

**Damping**
Amount of velocity that bodies retain each second. A value of 0.9 means that each bodies velocity will drop by 10%.
```javascript
this.game.chipmunk.defaultSpace.damping = 1;
```

View the docs for more information as to what you can do.

###Physics Component
The easiest way to use Chipmunk Physics with a GameObject is through the `ChipmunkPhysics` Component provided by this plugin. 

By simply attaching this Component to gameobjects without defining any options will create a Body and a Box Shape based on gameobjects texture atlas and attached them to the default space. 

```javascript
var gameobject = new Kiwi.GameObjects.StaticImage(this, x, y);
gameobject.physics = this.components.add( new Kiwi.Plugins.ChipmunkPhysics.Component( this, {} ) );
```

View the `2-basic` example to see this in action.

**Config Parameters**
When initially creating the Physics Component you can pass in a Object Literal which can containing information regarding the body/shapes it should generate. 

Below is a list of the options you are most likely to want to edit/pass when using the Component.

```javascript
var config = {
    //Change the space which the body/shapes will be added to.
    //This can be modified if you using multiple spaces in your game.
    space: newSpace,

    //The default type of body/shapes that will be generated...
    //if a type is not passed.
    //Valid types are box, poly, circle and line.
    defaultType: 'box',

    //Velocities
    velocityX: 0,
    velocityY: 0,
    angularVelo: 0,
    maxVelo: 0,
    maxAngularVelo: 0, 

    //Options regarding the body 
    body: {

        //The type of body to generate. 
        //Will fallback to the 'defaultType' if not passed.
        type: 'box',

        //The mass of the body. 
        //Default is:  width*height / 1000 
        mass: 100,

        //The owner of the body.
        //Useful to maintain a reference back when using...
        //callbacks which return a body/shape.
        //Defaults to the gameobject the component is...
        //attached to.
        owner: sprite,

        //Parameters for only 'box' types.
        width: 100,
        height: 100,

        //Center of the body from the top/left of the sprite.
        //Defaults to the anchorPoint location which is the center.
        center: {
            x: 100,
            y: 100
        },

        //If the body should be added to the space passed or not.
        //If false, you will need to manually add it to the space if wanted.
        addToSpace: true,

        //Parameters for only 'circle' types.

        //Radius of the line.
        radius: 100,
        offset: {
            x: 0,
            y: 0
        },


        //Parameters for only 'segment' types.

        //Starting location.
        start: {
            x: 0,
            y: 0
            },

        //End location.
        end: {
            x: 100,
            y: 0
        },


        //Parameters for only 'poly' types.

        //Vertices of the polygon.
        //Must be convex and have a clockwise winding
        verts: [x1, y1, x2, y2, x3, y3, ...],
        offset: {
            x: 0,
            y: 0
        },


        //Parameters for only 'custom' types.
        //Moment of inertia for the body.
        i: 125

    },

    shape: {
        // All shapes parameters will attempt to default to the
        // same as the bodies passed.

        //The type of shape to generate.
        type: 'box',

        //If the shape should be added to the space passed or not.
        addToSpace: true,

        //'box' type options
        width: 100,
        height: 100,

        //'circle' type options
        radius: 10,
        offset: {
            x: 0,
            y: 0
        },

        //'segment' type options
        start: {
            x: 0,
            y: 0
            },
        end: {
            x: 100,
            y: 0
        },
        radius: 1,

        //'poly' type options\
        verts: [x1, y1, x2, y2, x3, y3, ...],
        offset: {
            x: 0,
            y: 0
        }

    }
    
    //You can always define multiple shapes...
    //by passing an array of shape configs...
    //with the same accepted parameters as above.

    /*
    shapes: [
        {
            //Shape 1 Config
            //Same avaliable options as above
        },
        {
            //Shape 2 Config.
            //Same avaliable options as above
        }
    ]
    */

}  
```

Bodies and Shapes that have been created will be added to the component under their respective names.

```javascript
var body = penguin.physics.body;
var shapes = penguin.physics.shapes;
```

###Bodies
To create a new body for use in Kiwi you can use the `Kiwi.Plugins.ChipmunkPhysics.Body` class. This class requires that you pass it a mass and a moment of inertia.

You can also optionally pass it a transformation that the body should use to position itself by. This is how a body is fixed to a sprites location.

```javascript
var body = new Kiwi.Plugins.ChipmunkPhysics.Body({
        mass: 100,
        
        //Chipmunk contains a few useful methods to create...
        //inertia depending on use case of the body. 
        i: 25
    });
```

Alternatively you can use a few of the static methods to create a body based on information provided. View the `statics.js` file for a full list.

```javascript
    var boxbody = Kiwi.Plugins.ChipmunkPhysics.createBoxBody({
        mass: 100,
        width: 25,
        height: 25
        });

    var circlebody = Kiwi.Plugins.ChipmunkPhysics.createCircleBody({
        mass: 75,
        radius: 25
        });

    var segmentbody = Kiwi.Plugins.ChipmunkPhysics.createSegmentBody({
        mass: 100,
        start: {
            x: 0,
            y: 0
            },
        end: {
            x: 100,
            y: 0
            }
        });

    var polybody = Kiwi.Plugins.ChipmunkPhysics.createPolyBody({
        mass: 100,
        verts: [x1, y1, x2, y2, ...]
        });
```

**Adding to Space**
If a body is to take into account gravity and have a velocity of its own, then you need to add it to a space.

```javascript
this.game.chipmunk.defaultSpace.addBody( body );
```

**Moving Bodies**
You move a body in a number of ways. 

One way is to set the velocity of a body. One way is to use the `setVel` method.
```javascript
var x = 100;
var y = 0;
body.setVel( x, y );
```

Another way is to apply a force to the object. That force will then be constantly applied to the body.
```javascript
body.applyForce( 
    //The first parameter is the velocity vector
    {
        x: 100,
        y: 20,
    }, 
    //The second parameter is the offset of the vector...
    //from the bodies centeroid.
    { 
        x: 0,
        y: 0,
    });
```

View the docs for more information as to what you can do.

###Creating Shape's 
Shapes mainly define collision areas in Chipmunk and so there are few different types avaliable to you. 

*  Polygons - Must be convex. No concave support
*  Circles
*  Segments - Also known as lines

Each shape requires that you pass it a body. This will define its location, rotation, e.t.c. 

If shapes are to collide against other shapes you will need to add them to the same space. This should also be the same space the body is attached to. 

An example of creating a circle shape can be found below. 
```javascript
//It is assumed you have created a body above...

var circleshape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle({
    body: body,
    radius: 25
    });
this.game.chipmunk.space.addShape( circleshape );
```

If you are wanting a shape to not move when another shape collides with it (for example you would not want the ground to move when someone lands) then instead of creating a new body you should use what is called a *Static Body* instead. 

Spaces will have a reference to a `staticBody` you can use for your shapes. Shapes which use the `staticBody` can then be position by changing their offsets.

```javascript
var circleshape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle({
    body: this.game.chipmunk.space.staticBody,
    radius: 25,
    //Use the offset to position the shape...
    offset: {
        x: 100,
        y: 250
    }
    }); 

this.game.chipmunk.space.addShape( circleshape );
```
   

###Constraints
Constraints allow you to define how two bodies interact together. A good example of this can be found on the *joints* tab of the [chipmunk demos](https://dl.dropboxusercontent.com/u/2494815/demo/index.html).

All avaiable joints can be found under the `Kiwi.Plugins.ChipmunkPhysics.Joints` namespace.

Joints need to be added to a space to be simulated just like bodies/shapes. They also required a configuration object defining the two bodies they are joining and more information depending on the type of constraint created. 

```javascript
var joint = new Kiwi.Plugins.ChipmunkPhysics.Joints.DampedSpring({
        //First body we are joining
        bodyA: firstBody,

        //Second body we are joining
        bodyB: secondBody,

        //Location of the spring on the first body.
        //0,0 will be at the bodies centeral point. 
        anchorPointA: {
            x: 0,
            y: 0
        },

        //Location of the spring on the second body.
        //0,0, will be at the bodies centeral point.
        anchorPointB: {
            x: 0,
            y: 0
        },

        restLength: 100,
        stiffness: 50
    });
this.game.chipmunk.space.addConstraint( joint );
```

##More Documentation
Further examples can be found in the `examples` folder of this repo.

View the api documentation located in the `docs` folder for a more robust list of features located on each object. 

##Thanks
If you have further questions, suggestions or find any issues with the plugin, don't hesitate to contact us at [KiwiJS.](http:www.kiwijs.org)