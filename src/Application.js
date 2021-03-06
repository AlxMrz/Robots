import Scene from "./Scene";
import Level from "./Level";


export default class Application {
  constructor( scene, eventRegister ) {
    if ( !( scene instanceof Scene ) ) {
      throw new Error( 'Scene is not provided!' );
    }
    this.scene = scene;
    this.eventRegister = eventRegister;
  }

  main() {
    this.eventRegister.registerAllEvents();

    this.scene.setLevel( new Level( this.scene, this.scene.factory ) );
    this.scene.init();

    this.game();
  }

  game() {
    this.scene.show( this.eventRegister );
    this.eventRegister.resetMouseEventsCoords();
    window.requestAnimationFrame( this.game.bind( this ) );
  }

  getScene() {
    return this.scene;
  }

  getEventRegister() {
    return this.eventRegister;
  }
}


