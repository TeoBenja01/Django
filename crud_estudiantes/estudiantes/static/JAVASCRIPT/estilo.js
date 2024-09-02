var scene, 
    camera, 
    renderer,  
    light;



init();
render();



function init() {

    // S C E N E
    scene = new THREE.Scene();


    // C A M E R A
    camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 0.0001, 1000 );
    camera.lookAt( scene.position );
    camera.position.set( 0, 0, 150 );
    scene.add( camera );


    // R E N D E R E R
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.querySelector('[data-js="stage"]').appendChild(renderer.domElement);

    debugControls();

}








// ______________ L I G H T

var bulp = new THREE.PointLight( 0xff0000, 1, 10000 );
  bulp.position.set( 0, 0, 5 );
  scene.add( bulp );





// ______________ M E S H

// SYSTEM wraps gem and points
var system = new THREE.Group();
scene.add( system );



// GEM
var gemMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0xff0000,
  transparent: true,
  opacity: 0.2
});

var gem = new THREE.Mesh(
  new THREE.OctahedronGeometry(8, 1),
  gemMaterial
);

system.add( gem );



// P O I N T S
var numPoints = gem.geometry.vertices.length;

var pointMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});

for ( i = 0; i < numPoints; i++ ) {

  var point = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.5, 1),
    pointMaterial
  );
  
  point.position.set(
    gem.geometry.vertices[i].x,
    gem.geometry.vertices[i].y,
    gem.geometry.vertices[i].z
  );

  system.add( point );
  
}




// ______________ A N I M A T I O N


// rotate the system
turn();

function turn() {

    TweenMax.to( system.rotation, 10, {
       ease: Power0.easeNone,
       x: Math.PI * 2,
       y: Math.PI * 2,
       repeat: -1
    });

 }



// glow effect
glow();


function glow() {

    TweenMax.to( bulp, 2, {
      ease: Power0.easeNone,
      intensity: 0.1,
      repeat: -1,
      yoyo: true
    });
  
  TweenMax.to( gem.material, 2, {
      ease: Power0.easeNone,
      opacity: 0.03,
      repeat: -1,
      yoyo: true
    });

}





// ______________ C O N T R O L S

function debugControls() {

    controls = new THREE.OrbitControls( camera );
    controls.enableKeys = false;

}




window.addEventListener('resize', resizeHandler);





// ______________ R E N D E R

function render() {

    requestAnimationFrame(render);
    renderer.render(scene, camera);

}




// ______________ R E S I Z E   F  U N C T I O N

function resizeHandler() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
