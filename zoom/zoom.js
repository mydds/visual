var currentZoomLevel = 5;
var maxZoomLevel = 15; // Adjust this value as needed
var isTransitioning = false;
var totalImages = 105; // Replace with the actual total number of images
var filteredImages = []; // Array to store the filtered images

function zoomIn() {
  if (isTransitioning) {
    return;
  }

  currentZoomLevel--;
  if (currentZoomLevel > maxZoomLevel) {
    currentZoomLevel = maxZoomLevel;
  }
  updateGrid("zoom-in");
  scrollToGrid();
}

function zoomOut() {
  if (isTransitioning) {
    return;
  }

  currentZoomLevel++;
  if (currentZoomLevel < 1) {
    currentZoomLevel = 1;
  }
  updateGrid("zoom-out");
  scrollToGrid();
}

// Rest of your code...

function updateGrid(zoomClass) {
  isTransitioning = true;

  var imageGrid = document.getElementById("image-grid");
  imageGrid.innerHTML = "";

  var imagesToDisplay = filteredImages.length > 0 ? filteredImages : generateAllImages();

  var gridSize = currentZoomLevel * currentZoomLevel;
  var gridTemplateColumns = "repeat(" + currentZoomLevel + ", 1fr)";

  // Apply zooming transition effect
  imageGrid.style.opacity = "0";
  imageGrid.style.transform = "scale(0.8)";
  imageGrid.style.transition = "opacity 0.3s ease, transform 0.3s ease";

  for (var i = 0; i < imagesToDisplay.length; i++) {
    var imageContainer = document.createElement("div");
    imageContainer.className = "image-container " + zoomClass; // Add zoom class
    var image = document.createElement("img");
    image.src = imagesToDisplay[i].src;
    image.alt = "Image " + (i + 1);
    image.dataset.tags = imagesToDisplay[i].tags;

    image.addEventListener("click", function () {
      openLightbox(this.src);
    });
    imageContainer.appendChild(image);
    imageGrid.appendChild(imageContainer);
  }

  // Trigger reflow
  void imageGrid.offsetWidth;

  // Reveal the grid with the zooming effect
  imageGrid.style.opacity = "1";
  imageGrid.style.transform = "scale(1)";

  imageGrid.style.gridTemplateColumns = gridTemplateColumns;

  setTimeout(function() {
    isTransitioning = false;
    scrollToGrid();
  }, 300);
}

function scrollToGrid() {
  var imageGrid = document.getElementById("image-grid");
  imageGrid.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function openLightbox(imageSrc) {
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  lightboxImage.src = imageSrc;
  lightbox.style.display = "block";
}

function closeLightbox() {
  var lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

function filterImages(tag) {
  console.log("Filtering images with tag: " + tag);
  var images = generateAllImages();
  filteredImages = [];

  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    var tags = image.tags.split(",");
    if (tags.includes(tag)) {
      filteredImages.push(image);
    }
  }
console.log("Filtered images count: " + filteredImages.length);

  updateGrid();
}

function generateAllImages() {
  var images = [];

  // Generate all the images with their respective tags
  for (var i = 1; i <= totalImages; i++) {
    var image = {
      src: "zoom/images/image" + i + ".jpg",
      tags: getImageTags(i),
    };
    images.push(image);
  }

  return images;
}

function getImageTags(index) {
  // Assign tags to each image based on their index
  if (
    index === 18 || index === 19 || index === 30 || index === 35 || index === 36 || index === 37 || index === 38 || index === 39 || index === 40 || index === 41 || index === 42 || index === 43 || index === 44 || index === 46 || index === 47 || index === 48 || index === 49 || index === 51 || index === 52 || index === 53 || index === 54 || index === 55 || index === 56 || index === 57 || index === 58 || index === 59 || index === 60 || index === 62 || index === 63 || index === 64 || index === 65 || index === 69 || index === 90 || index === 91 || index === 93 || index === 75 || index === 81 || index === 97 ||
    index === 89 || index === 101 || index === 102 || index === 103 || index === 82 || index === 85 || index === 86 || index === 61 || index === 45
  ) {
    return "Project X,";
  }
  if (
    index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 ||
    index === 7 || index === 8 || index === 9 || index === 10 || index === 11 || index === 12 ||
    index === 13  || index === 14  || index === 15 ||index === 16 || index === 17 ||  index === 87 || index === 94 || index === 95 || index === 96 || index === 98 || index === 105|| index === 66 || index === 67 || index === 76 || index === 77 || index === 21 || index === 27 || index === 73
  ) {
    return "Earth,";
  }
  if (index === 24 || index === 26 || index === 28 || index === 29 || 
      index === 30 || index === 41 || index === 20 || index === 42 || index === 45 || index === 46 || 
      index === 68 || index === 84 || index === 85 || index === 86 || index === 92   || index === 31 || 
      index === 32 || index === 33 || index === 34 || index === 51 || index === 99 
     ) {
    return "Portraits,";
  } 
  if (
    index === 3 || index === 6 || index === 11 || index === 13 || index === 14 ||
    index === 31 || index === 32 || index === 33 || index === 34 || index === 45 || index === 49 ||
    index === 50 || index === 51
  ) {
    return "The Office,";
  }

  return "";
}

function showAllImages() {
  filteredImages = generateAllImages();
  updateGrid();
}

window.addEventListener("DOMContentLoaded", function() {
  // Initialize the grid with all images
  filteredImages = generateAllImages();
  console.log(filteredImages); // Check if images are generated correctly
  updateGrid();

    
  var hamburgerMenu = document.getElementById("filter-button");
  var dropdownContainer = document.getElementById("filter-dropdown-container");

  hamburgerMenu.addEventListener("click", function() {
    dropdownContainer.classList.toggle("show");
  });

// Paste this starting around line 56

const filterDropdown = document.getElementById('filter-dropdown-container');

filterDropdown.addEventListener('click', e => {
console.log(e.target); 
  if(e.target.matches('.filter-option')) {

    if (e.target.innerHTML === "All") {
      showAllImages();
    } else {
      filterImages(e.target.innerHTML);
    }

    dropdownContainer.classList.remove('show');

  }

});
     /*    console.log("Filter option clicked: " + this.innerHTML); // Add this line
        if (this.innerHTML === "All") {
        showAllImages();
      } else {
        var selectedTag = this.innerHTML;
        filterImages(selectedTag);
      }
      dropdownContainer.classList.remove("show");
    });
  }*/

  var zoomInButton = document.getElementById("zoom-in-button");
  var zoomOutButton = document.getElementById("zoom-out-button");

  zoomInButton.addEventListener("click", zoomIn);
  zoomOutButton.addEventListener("click", zoomOut);

  var closeButton = document.getElementById("lightbox-close");
  closeButton.addEventListener("click", closeLightbox);
});


// Add the zoom button highlights here
var zoomInButton = document.getElementById('zoom-in-icon');
var zoomOutButton = document.getElementById('zoom-out-icon');
zoomInButton.classList.add('highlight');
zoomOutButton.classList.add('highlight');


document.addEventListener('DOMContentLoaded', function() {
// Add the auto-filter "Project X" script here
window.addEventListener('load', function() {
  filterImages("Project X");
});
    });
