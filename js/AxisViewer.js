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
        makeTextForAxis: makeTextForAxis,
   
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
//left is true then axis will be right handed, otherwise left handed
function init(camera, right) {
    CANVAS_WIDTH = 200,
    CANVAS_HEIGHT = 200,
    CAM_DISTANCE = 300;

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

if(right) rightHanded();
else leftHanded();
}

function leftHanded() {
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



function rightHanded() {
// axes
//axes2 = new THREE.AxisHelper( 100 );
var blue = new THREE.Color();
blue.setRGB(0, 0, 255);
var red = new THREE.Color();
red.setRGB(255, 0, 0);
var green = new THREE.Color();
green.setRGB(0, 255, 0);

var arrowlength = 100;

var directionX = new THREE.Vector3(1, 0, 0);
var originX = new THREE.Vector3(0, 0, 0);
var arrowHelperX = new THREE.ArrowHelper(directionX, originX, arrowlength, red, 0, 0); // 100 is length, 20 and 10 are head length and width
scene2.add(arrowHelperX);

var directionY = new THREE.Vector3(0, 1, 0);
var originY = new THREE.Vector3(0, 0, 0);
var arrowHelperY = new THREE.ArrowHelper(directionY, originY, arrowlength, green, 0, 0); // 100 is length, 20 and 10 are head length and width
scene2.add(arrowHelperY);

var directionZ = new THREE.Vector3(0, 0, -1);
var originZ = new THREE.Vector3(0, 0, 0);
var arrowHelperZ = new THREE.ArrowHelper(directionZ, originZ, arrowlength, blue, 0, 0); // 100 is length, 20 and 10 are head length and width
scene2.add(arrowHelperZ);

//X, Y, Z letters

//X
    var  textGeo = new THREE.TextGeometry('X', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });


var  textMaterial = new THREE.MeshBasicMaterial({ color: red });
var  text = new THREE.Mesh(textGeo , textMaterial);

text.position.x = arrowlength;
text.position.y = 0;
text.position.z = 0;

scene2.add(text);

//Y
    var  textGeo = new THREE.TextGeometry('Y', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });

var  textMaterial = new THREE.MeshBasicMaterial({ color: green });
var  text = new THREE.Mesh(textGeo , textMaterial);

text.position.x = 0;
text.position.y = arrowlength;
text.position.z = 0;
scene2.add(text);

//Z
    var  textGeo = new THREE.TextGeometry('Z', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });

var  textMaterial = new THREE.MeshBasicMaterial({ color: blue });
var  text = new THREE.Mesh(textGeo , textMaterial);

text.position.x = 0;
text.position.y = 0;
text.position.z = -arrowlength;
scene2.add(text);

}

//Given Axes and a Scene, create X, Y, Z text and add to scene
function makeTextForAxis(axes, scene) {
    // axes
    //axes2 = new THREE.AxisHelper( 100 );
    var blue = new THREE.Color();
    blue.setRGB(0, 0, 255);
    var red = new THREE.Color();
    red.setRGB(255, 0, 0);
    var green = new THREE.Color();
    green.setRGB(0, 255, 0);

    //X
    var  textGeo = new THREE.TextGeometry('X', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });


    var  textMaterial = new THREE.MeshBasicMaterial({ color: red });
    var  text = new THREE.Mesh(textGeo , textMaterial);

    text.position.x = axes.geometry.vertices[1].x;
    text.position.y = axes.geometry.vertices[1].y;
    text.position.z = axes.geometry.vertices[1].z;

    scene.add(text);

    //Y
    var  textGeo = new THREE.TextGeometry('Y', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });

    var  textMaterial = new THREE.MeshBasicMaterial({ color: green });
    var  text = new THREE.Mesh(textGeo , textMaterial);
    text.position.x = axes.geometry.vertices[3].x;
    text.position.y = axes.geometry.vertices[3].y;
    text.position.z = axes.geometry.vertices[3].z;
    scene.add(text);

    //Z
    var  textGeo = new THREE.TextGeometry('Z', {
        size: 10,
        height: 2,
        curveSegments: 4,
        font: "helvetiker",
        style: "normal"

    });

    var  textMaterial = new THREE.MeshBasicMaterial({ color: blue });
    var  text = new THREE.Mesh(textGeo , textMaterial);

    text.position.x = axes.geometry.vertices[5].x;
    text.position.y = axes.geometry.vertices[5].y;
    text.position.z = axes.geometry.vertices[5].z;
    scene.add(text);
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

