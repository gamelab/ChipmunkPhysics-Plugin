/**
* Description about the main namespace that the plugin is in.
*
* @module Plugins
* @submodule ChipmunkPhysics
* @namespace Kiwi
*/
Kiwi.Plugins.ChipmunkPhysics = {
  
  /**
  * The name of this plugin.
  * @property name
  * @type String
  * @default 'ChipmunkPhysics'
  * @public
  * @static
  */
  name:'ChipmunkPhysics',

  /**
  * The version of this plugin.
  * @property version
  * @type String
  * @public
  * @static
  */
  version:'0.8.0',

  /**
  * The minimum version of Kiwi.js required to run this plugin in semver (semantic versioning) format
  * @property minimumKiwiVersion
  * @type String
  * @public
  * @static
  */
  minimumKiwiVersion:'1.1.1'

};

/**
* Registers this plugin with the Global Kiwi Plugins Manager if it is avaiable.
* 
*/
Kiwi.PluginManager.register(Kiwi.Plugins.ChipmunkPhysics);


/**
* Checks to see if the core Chipmunk Physics has been included by this stage or not.
* If chipmunk is not found, then we quit at this stage. 
* @method create
* @param game {Kiwi.Game} The game that is current in the boot stage.
* @private 
*/
Kiwi.Plugins.ChipmunkPhysics.create = function(game) {


  //Does the chipmunk physics exists
  if(typeof cp == "undefined") {
    console.error('You need to include the chipmunk library in-order for this plugin to work.');
    return false;
  } 


  // Create the Manager.
  game.chipmunk = new Kiwi.Plugins.ChipmunkPhysics.Manager(game, cp);


  return game.chipmunk;
}
 
