/**
* Namespace containing the helpful methods for debugging 
* and visualising Chipmunk Physics.
* 
* @module Plugins
* @submodule ChipmunkPhysicsDebug
* @namespace Kiwi.Plugins.ChipmunkPhysicsDebug
* 
*/
Kiwi.Plugins.ChipmunkPhysicsDebug = {
  
  /**
  * The name of this Plugin. 
  * @property name 
  * @type String
  * @default 'ChipmunkPhysicsDebug'
  * @public
  */
  name:'ChipmunkPhysicsDebug',

  /**
  * The version of this Chipmunk Physics plugin.
  * @property version
  * @type String
  * @public
  */
  version:'0.8.0',

  /**
  * The minimum version of Kiwi needed for this plugin to execute.
  * @property minimumKiwiVersion
  * @type String
  * @public
  */
  minimumKiwiVersion:'1.1.1',

  /**
  * The dependencies that this plugin needs in order to function. 
  * Only dependency for this is the 'ChipmunkPhysics' plugin. 
  * @property pluginDependencies
  * @type Array
  * @public
  */
  pluginDependencies: [

    {
      name:'ChipmunkPhysics',
      minimumVersion:'0.8.0' //Needs to match.
    }

  ]

};


// Registers this plugin with the Global Kiwi Plugins Manager if it is avaiable.
Kiwi.PluginManager.register(Kiwi.Plugins.ChipmunkPhysicsDebug);

/**
* This create method is executed when Kiwi Game that has been told to use this plugin reaches the boot stage of the game loop.
* Should only be called internally by the Kiwi engine. 
* @method create
* @param game {Kiwi.Game} The game to add this plugin to.
* @public
*/
Kiwi.Plugins.ChipmunkPhysicsDebug.create = function( game ) {

  // Create the Manager.
  game.chipmunkDebug = new Kiwi.Plugins.ChipmunkPhysicsDebug.Manager(game);

  return game.chipmunkDebug;
}
