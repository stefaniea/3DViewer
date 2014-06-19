/**
Creates an axis in the bottom left corner of the screen, 
which is actually another viewport with a camera that copies 
the rotation of the original scene's camera
**/


// Inset window with axes showing world orientation
// Useful with Trackball controls when zooming
// WestLangley

// three.js r.60

AxisViewer = (function(){
	"use strict";

	return {
        render: render,
        animate: animate,
        init: init,
   
    };


var container,
    container2,
    camera,
    scene,
    renderer,
    axes,
    camera2,
    scene2,
    renderer2,
    axes2,
    cube,
    controls,
    CANVAS_WIDTH = 200,
    CANVAS_HEIGHT = 200,
    CAM_DISTANCE = 300;

//based on given camera, initialize the inset viewport
function init(camera) {
    CANVAS_WIDTH = 200,
    CANVAS_HEIGHT = 200,
    CAM_DISTANCE = 300;
/*
// main canvas
// -----------------------------------------------
// dom
container = document.getElementById( 'container' );

// renderer
renderer = new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

// scene
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.y = 150;
camera.position.z = 500;

// controlls
controls = new THREE.TrackballControls( camera, renderer.domElement );

// cube
cube = new THREE.Mesh( 
    new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1 ), 
    new THREE.MeshBasicMaterial( { color : 0xff0000, wireframe: true } 
) );
scene.add( cube );

// axes
axes = new THREE.AxisHelper( 100 );
scene.add( axes );

// inset canvas
// -----------------------------------------------
*/
// dom
container2 = document.getElementById('inset');

// renderer
renderer2 = new THREE.CanvasRenderer();
renderer2.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
container2.appendChild( renderer2.domElement );

// scene
scene2 = new THREE.Scene();

// camera
camera2 = new THREE.PerspectiveCamera( 50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
camera2.up = camera.up; // important!

// axes
axes2 = new THREE.AxisHelper( 100 );
scene2.add( axes2 );

//X, Y, Z letters

//X
    var  textGeo = new THREE.TextGeometry('X', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });
var  color = new THREE.Color();
color.setRGB(255, 0, 0);
var  textMaterial = new THREE.MeshBasicMaterial({ color: color });
var  text = new THREE.Mesh(textGeo , textMaterial);

text.position.x = axes2.geometry.vertices[1].x;
text.position.y = axes2.geometry.vertices[1].y;
text.position.z = axes2.geometry.vertices[1].z;

scene2.add(text);

//Y
    var  textGeo = new THREE.TextGeometry('Y', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });
var  color = new THREE.Color();
color.setRGB(0, 255, 0);
var  textMaterial = new THREE.MeshBasicMaterial({ color: color });
var  text = new THREE.Mesh(textGeo , textMaterial);

text.position.x = axes2.geometry.vertices[3].x;
text.position.y = axes2.geometry.vertices[3].y;
text.position.z = axes2.geometry.vertices[3].z;
//text.rotation = camera.rotation;
scene2.add(text);

//Z
    var  textGeo = new THREE.TextGeometry('Z', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });
var  color = new THREE.Color();
color.setRGB(0, 0, 250);
var  textMaterial = new THREE.MeshBasicMaterial({ color: color });
var  text = new THREE.Mesh(textGeo , textMaterial);

text.position.x = axes2.geometry.vertices[5].x;
text.position.y = axes2.geometry.vertices[5].y;
text.position.z = axes2.geometry.vertices[5].z;
//text.rotation = camera.rotation;
scene2.add(text);
 



}

// animate
// -----------------------------------------------

function render() {
   // renderer.render( scene, camera );
    renderer2.render( scene2, camera2 );

}

//animate inset based on main camera and (trackball) controls
function animate(camera, controls) {

    requestAnimationFrame( animate );

   // controls.update();
    
	camera2.position.copy( camera.position );
	camera2.position.sub( controls.target ); // added by @libe
	camera2.position.setLength( CAM_DISTANCE );

    camera2.lookAt( scene2.position );
    render();

}

})();

