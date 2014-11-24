/**
* The main namespace for this plugin. All classes that are to be used will be accessable under this main namespace.
* 
* @module Plugins
* @submodule ChipmunkPhysics
* @main
*/

/**
* Create for each Kiwi game using the Chipmunk Physics Plugin.
* In charge of creating new spaces for the game, and updating them each frame.
*
* A default space is included and is used by default by components.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Manager
* @constructor
* @param game {Kiwi.Game} The game that this manager is attached to.
* @param cp {Any} The root namespace which holds the Chipmunk JS functionality. (Usually is 'cp') 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager = function( game, cp ) {


  /**
  * The game that this manager is a part of.
  * @property game
  * @type Kiwi.Game
  * @public
  */
  this.game = game;


  /**
  * The main chipmunk namespace.
  * @property cp
  * @type Any
  * @public
  */  
  this.cp = cp; 


  /**
  * Speed at which all spaces managed by this object are to be updated by each frame.
  * @property updateSpeed
  * @type Number
  * @default 1/60
  * @public
  */
  this.updateSpeed = 1 / 60; 

}; 

/**
* Creates the initial default space.
* Internal use only.
*
* @method boot
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager.prototype.boot = function() {


  /**
  * A list of all the chipmunk spaces manager for this game. 
  * @property spaces
  * @type Array
  * @public
  */
  this.spaces = [];


  /**
  * The default space created at boot time.
  * @property defaultSpace
  * @type Kiwi.Plugins.ChipmunkPhysics.Space
  * @public
  */

  /**
  * The 'main' space which new Components will use when one has not been passed. 
  * By default this is the same as the 'defaultSpace' this can be reassigned.
  * @property space
  * @type Kiwi.Plugins.ChipmunkPhysics.Space
  * @public
  */
  this.defaultSpace = this.space = this.createNewSpace();


  /**
  * If the spaces managed by this plugin should update or not. 
  * @property active
  * @default true
  * @type Boolean
  * @public
  */
  this.active = true;

};


/**
* Creates a new Space Object. 
* Passing a boolean determines whether or not the Space object created is managed by this class
* or not. 
*
* @method createNewSpace
* @param [managed=true] {Boolean} If the space object is to be managed by this class or not.
* @param [spaceConfig] {Object} Default values for the space. See the 'Kiwi.Plugins.ChipmunkPhysics.Space' constructor.
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager.prototype.createNewSpace = function( managed, spaceConfig ) {

  var managed = managed || true;
  var space = new Kiwi.Plugins.ChipmunkPhysics.Space( spaceConfig );

  if(managed) this.spaces.push(space);
  
  return space;

};


/**
* The number of iterations that the space property should update each frame.
* The higher this is the more accurate the physics will be, but the more process intensive it will be also.
*
* @property iterations
* @type Number
* @default 10
* @public
*/
Object.defineProperty(Kiwi.Plugins.ChipmunkPhysics.Manager.prototype, "iterations", {
    get: function () {
      return this.space.iterations;
    },
    set: function(val) {
      this.space.iterations = val;
    },
    enumerable: true,
    configurable: true
});


//Doesn't currently work! :(
Object.defineProperty(Kiwi.Plugins.ChipmunkPhysics.Manager.prototype, "gravity", {
    get: function () {
      return this.space.gravity;
    },

    enumerable: true,

    configurable: true
});



/**
* Update loop which is executed each frame. Updates the space
*
* @method update
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager.prototype.update = function() {

  //Update all the spaces each frame...
  var len = this.spaces.length;


  if( this.active ) {
    
    while( len-- ) {
      this.spaces[ len ].step( this.updateSpeed );
    }

  }

}
