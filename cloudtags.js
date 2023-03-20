var words = [];

fetch('words.txt')
  .then(response => response.text())
  .then(data => {
    words = data.split('\n');
    createCloudTags();
  });

function createCloudTags() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 500;

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.SphereGeometry(200, 32, 32);

  for (var i = 0; i < words.length; i++) {
    var material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 400 - 200;
    mesh.position.y = Math.random() * 400 - 200;
    mesh.position.z = Math.random() * 400 - 200;
    mesh.word = words[i];
    scene.add(mesh);
  }

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  document.addEventListener('mousemove', onMouseMove, false);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < scene.children.length; i++) {
      var mesh = scene.children[i];
      if (intersects.length > 0 && mesh === intersects[0].object) {
        mesh.scale.x += 0.1;
        mesh.scale.y += 0.1;
        mesh.scale.z += 0.1;
      } else {
        mesh.scale.x -= 0.1;
        mesh.scale.y -= 0.1;
        mesh.scale.z -= 0.1;
      }
      mesh.position.x += Math.random() * 2 - 1;
      mesh.position.y += Math.random() * 2 - 1;
      mesh.position.z += Math.random() * 2 - 1;
    }
  }

  animate();
}