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