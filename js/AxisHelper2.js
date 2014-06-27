THREE.AxisHelper2 = function ( size, right ) {

	size = size || 1;

	var geometry = new THREE.Geometry();
	var zvec;
	if(right) zvec = new THREE.Vector3( 0, 0, -size )
	else zvec = new THREE.Vector3( 0, 0, size );
	geometry.vertices.push(
		new THREE.Vector3(), new THREE.Vector3( size, 0, 0 ),
		new THREE.Vector3(), new THREE.Vector3( 0, size, 0 ),
		new THREE.Vector3(), zvec
	);

	geometry.colors.push(
		new THREE.Color( 0xff0000 ), new THREE.Color( 0xffaa00 ),
		new THREE.Color( 0x00ff00 ), new THREE.Color( 0xaaff00 ),
		new THREE.Color( 0x0000ff ), new THREE.Color( 0x00aaff )
	);

	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	THREE.Line.call( this, geometry, material, THREE.LinePieces );

};

THREE.AxisHelper2.prototype = Object.create( THREE.Line.prototype );