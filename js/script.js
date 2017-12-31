// The scene is rendered with camera.
var scene = new THREE.Scene();
// The first attribute is the field of view in degrees, the second is the aspect ratio,
// the third and fourth are near and far clipping plane.
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Create renderer and set the size in which we want the app to be rendered.
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Updating the app when resized.
window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var loader = new THREE.TextureLoader();
//allow cross origin loading
loader.crossOrigin = '';
var texture1 = loader.load('0156337a.png');


// Christmas balls.
var geometry1 = new THREE.SphereGeometry(1.2, 32, 32);
// immediately use the texture for material creation
var material1 = new THREE.MeshPhongMaterial( { map: texture1, shininess: 150 } );
var mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.set(-3, 1, 0);

var texture2 = loader.load('img/d80b27ab.png');
var geometry2 = new THREE.SphereGeometry(2, 32, 32);
var material2 = new THREE.MeshPhongMaterial({map: texture2, shininess: 150});
var mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(3, 2, 0);

var texture3 = loader.load('img/76c4481a.png');
var geometry3 = new THREE.SphereGeometry(1.3, 32, 32);
var material3 = new THREE.MeshPhongMaterial({map: texture3, shininess: 150});
var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0.2, -3.2, -1);

var texture4 = loader.load('img/b1a749af.png');
var geometry4 = new THREE.SphereGeometry(1.8, 32, 32);
var material4 = new THREE.MeshPhongMaterial({map: texture4, shininess: 150});
var mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(-7.2, 4.2, 1);

var texture5 = loader.load('img/435d6d93.png');
var geometry5 = new THREE.SphereGeometry(1, 32, 32);
var material5 = new THREE.MeshPhongMaterial({map: texture5, shininess: 150});
var mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.set(-5.2, -4.2, 1);

var texture6 = loader.load('img/b1a749af.png');
var geometry6 = new THREE.SphereGeometry(1.4, 32, 32);
var material6 = new THREE.MeshPhongMaterial({map: texture6, shininess: 150});
var mesh6 = new THREE.Mesh(geometry6, material6);
mesh6.position.set(10.5, -3.2, 1);

var texture7 = loader.load('img/435d6d93.png');
var geometry7 = new THREE.SphereGeometry(1.9, 32, 32);
var material7 = new THREE.MeshPhongMaterial({map: texture7, shininess: 150});
var mesh7 = new THREE.Mesh(geometry7, material7);
mesh7.position.set(7.5, 3.5, 1);

var texture8 = loader.load('img/165cd273.png');
var geometry8 = new THREE.SphereGeometry(1.4, 32, 32);
var material8 = new THREE.MeshPhongMaterial({map: texture8, shininess: 150});
var mesh8 = new THREE.Mesh(geometry8, material8);
mesh8.position.set(-10.7, -0.4, 1);

var texture9 = loader.load('img/165cd273.png');
var geometry9 = new THREE.SphereGeometry(1.1, 32, 32);
var material9 = new THREE.MeshPhongMaterial({map: texture9, shininess: 150});
var mesh9 = new THREE.Mesh(geometry9, material9);
mesh9.position.set(6.4, -3.8, 1);

//create a group and add the spheres.
var group = new THREE.Group();
group.add( mesh1 );
group.add( mesh2 );
group.add( mesh3 );
group.add( mesh4 );
group.add( mesh5 );
group.add( mesh6 );
group.add( mesh7 );
group.add( mesh8 );
group.add( mesh9 );
scene.add( group );

directionalLight = new THREE.DirectionalLight(0xfbd29d);
directionalLight.position.x = 70;
directionalLight.position.y = 50;
directionalLight.position.z = 30;
scene.add(directionalLight);

ambientLight = new THREE.AmbientLight(0x547bed, 0.5);
scene.add(ambientLight);

camera.position.z = 23;

// Create snowflakes.
var snowflakeGeometry = new THREE.Geometry();
var snowflake = new THREE.TextureLoader().load('img/snowflake.png');

for (i = 0; i < 2000; i++) {
  var snowflake1 = new THREE.Vector3();
  snowflake1.x = 60 * Math.random() - 30;
  snowflake1.y = 80 * Math.random() - 40;
  snowflake1.z = 20 * Math.random() - 10;

  snowflakeGeometry.vertices.push(snowflake1);
}
material = new THREE.PointsMaterial( { map: snowflake, depthWrite: false, transparent: true, blending: THREE.AdditiveBlending} );

snowflakeParticles = new THREE.Points(snowflakeGeometry, material);
scene.add(snowflakeParticles);

var render = function () {
    requestAnimationFrame(render);

    mesh1.rotation.y = 0.4 * Math.sin(0.001 * Date.now());
    mesh2.rotation.y += 0.012;
    mesh3.rotation.y = 1 / 1.3 * Math.sin(0.002 * Date.now());
    mesh4.rotation.y = 0.3 * Math.sin(-0.002 * Date.now());
    mesh5.rotation.y -= 0.02;
    mesh6.rotation.y = 0.2 * Math.sin(0.002 * Date.now());
    mesh7.rotation.y -= 0.03;
    mesh8.rotation.y = 1 / 1.2 * Math.sin(0.0015 * Date.now());
    mesh9.rotation.y -= 0.025;

    for (i = 0; i < snowflakeGeometry.vertices.length; i++) {

      snowflakeGeometry.vertices[i].y -= 0.01;
      snowflakeGeometry.vertices[i].x += Math.sin(snowflakeGeometry.vertices[i].y * 0.1 + i) * 0.01;
      if (snowflakeGeometry.vertices[i].y < -40) {
        snowflakeGeometry.vertices[i].y = 40;
      }
      snowflakeGeometry.verticesNeedUpdate = true;
    }

    renderer.render(scene, camera);
};

render();
