let dragDiv = document.getElementById("drag-div");
const categoryDivs = document.querySelectorAll(".category-div");
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
        categoryDiv.style.backgroundColor = "";
      }
    });
  }
});
document.addEventListener("mouseup", () => {
  if (isDragging && currentDiv) {
    const currentDivRect = currentDiv.getBoundingClientRect();
    const centerX = currentDivRect.width / 2 - dragDiv.offsetWidth / 2;
    const centerY = currentDivRect.height / 2 - dragDiv.offsetHeight / 2;
    dragDiv.style.position = "absolute"; 
    dragDiv.style.left = `${centerX}px`;
    dragDiv.style.top = `${centerY}px`;
    currentDiv.appendChild(dragDiv);
  }

  isDragging = false;
  dragDiv.style.cursor = "grab";
});
