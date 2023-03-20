var words = [];

fetch('./tag-cloud/words.txt')
  .then(response => response.text())
  .then(data => {
    words = data.split('\n');
    createCloudTags();
  });

function createCloudTags() {
  var container = document.getElementById('tag-cloud');

  for (var i = 0; i < words.length; i++) {
    var tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = words[i];
    container.appendChild(tag);
  }

  var tags = document.getElementsByClassName('tag');
  var containerRect = container.getBoundingClientRect();

  container.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX - containerRect.left;
    var mouseY = event.clientY - containerRect.top;

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      var tagRect = tag.getBoundingClientRect();

      var dx = tagRect.left + tagRect.width / 2 - mouseX;
      var dy = tagRect.top + tagRect.height / 2 - mouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);

      var scale = 1 - dist / 200;
      if (scale < 0.5) {
        scale = 0.5;
      }

      tag.style.transform = 'scale(' + scale + ')';
    }
  });

  var toggleThemeButton = document.getElementById('toggle-theme');
  var body = document.body;

  toggleThemeButton.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
  });
}