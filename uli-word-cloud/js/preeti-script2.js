

let dragDiv = document.getElementById("drag-div");
let categoryDivs = document.querySelectorAll(".category-div");
let isDragging = false;
let offsetX, offsetY;
let currentDiv = null;

// -----------------Start dragging-------------------------------

dragDiv.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - dragDiv.offsetLeft;
  offsetY = e.clientY - dragDiv.offsetTop;
  dragDiv.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const X = e.clientX;
    const Y = e.clientY;

    dragDiv.style.left = `${X - offsetX}px`;
    dragDiv.style.top = `${Y - offsetY}px`;

    currentDiv = null; // Reset currentDiv for each move

    categoryDivs.forEach((categoryDiv) => {
      const dragRect = dragDiv.getBoundingClientRect();
      const categoryDivRect = categoryDiv.getBoundingClientRect();

      const overlay = !(
        dragRect.right < categoryDivRect.left ||
        dragRect.left > categoryDivRect.right ||
        dragRect.bottom < categoryDivRect.top ||
        dragRect.top > categoryDivRect.bottom
      );

      if (overlay) {
        categoryDiv.style.backgroundColor = "yellow";
        currentDiv = categoryDiv;
      } else {
        categoryDiv.style.backgroundColor = ""; // Reset background
      }
    });
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    if (currentDiv) {
      // Calculate center of the currentDiv
      const currentDivRect = currentDiv.getBoundingClientRect();
      const centerX =
        currentDivRect.left +
        currentDivRect.width / 2 -
        dragDiv.offsetWidth / 2;
      const centerY =
        currentDivRect.top +
        currentDivRect.height / 2 -
        dragDiv.offsetHeight / 2;

      // Set dragDiv position to the center of the selected categoryDiv
      dragDiv.style.position = "absolute";
      dragDiv.style.left = `${centerX}px`;
      dragDiv.style.top = `${centerY}px`;

      // Append dragDiv to the selected categoryDiv
      currentDiv.appendChild(dragDiv);
    }
    dragDiv.style.cursor = "grab";
    isDragging = false;
  }
});
