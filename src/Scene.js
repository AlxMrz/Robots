import SceneGrid from './SceneGrid';
import Builder from './Builder';
import ObjectFactory from './ObjectFactory';
import Point from './Point';

export default class Scene
{
  constructor( factory ) {
    this.factory = factory;
    this.sceneObjects = { 'builders': [ ] };
    this.canvas = this.factory.getElementById( "canvas" );
    this.ctx = this.canvas.getContext( "2d" );
    this.sceneGrid = this.factory.getSceneGrid();
  }

  init() {
    this.sceneGrid.printGrid();

    this.level.init();
  }

  show( eventRegister ) {

    this.clearCanvas();

    this.level.playLevelScenario( eventRegister );
  }

  clearCanvas() {
    this.ctx.clearRect( 0, 0, this.canvas.clientWidth, this.canvas.clientHeight );
  }

  selectObjectIfClicked( clickCoords, coords, object ) {
    if ( clickCoords !== undefined ) {
      let clickedX = clickCoords.getX();
      let clickedY = clickCoords.getY();
      let objectX = coords.getX();
      let objectY = coords.getY();
      if ( ( clickedX >= objectX && clickedX <= objectX + object.width )
              && clickedY >= objectY && clickedY <= objectY + object.height
              ) {
        console.log( 'check' );
        object.chosen = true;
        this.setLogObjectInfo( object );
      } else if ( object.chosen ) {
        object.chosen = false;
      }
    }
  }

  setLogObjectInfo( object ) {
    const getCircularReplacer = () => {
      const seen = new WeakSet;
      return ( key, value ) => {
        if ( typeof value === "object" && value !== null ) {
          if ( seen.has( value ) ) {
            return;
          }
          seen.add( value );
        }
        return value;
      };
    };
    let objectInfo = document.getElementById( "objectInfo" );
    objectInfo.innerHTML = JSON.stringify( object, getCircularReplacer(), ' ' );
  }

  setNewCoordsToSelectedObject( newCoords, object ) {
    object.setCoords( newCoords );
  }
  moveSelectedObjectToSpecialCoords( spCoords, object ) {

  }

  getFactory() {
    return this.factory;
  }
  getSceneObjects() {
    return this.sceneObjects;
  }
  getCanvas() {
    return this.canvas;
  }
  getContext() {
    return this.ctx;
  }
  getSceneGrid() {
    return this.sceneGrid;
  }
  setLevel( level ) {
    this.level = level;
  }
}

