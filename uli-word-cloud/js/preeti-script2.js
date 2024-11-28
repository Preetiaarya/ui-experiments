let dragDiv = document.getElementById("drag-div");
const ctDiv = document.querySelectorAll(".ct-div")
let isDragging = false;
let offsetX, offsetY;

// Start dragging
dragDiv.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - dragDiv.offsetLeft;
  offsetY = e.clientY - dragDiv.offsetTop;
  dragDiv.style.cursor = 'grabbing';
});

// Move container while the mouse is held down
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    dragDiv.style.position = "abousult"
    const X = e.clientX;
    const Y = e.clientY;
    dragDiv.style.left = `${X - offsetX}px`; // Update position of dragDiv
    dragDiv.style.top = `${Y - offsetY}px`;

    ctDiv.forEach(categoryDiv=> {
        const div1 = dragDiv.getBoundingClientRect();
        const div2 = categoryDiv.getBoundingClientRect();
    
        const overlay = !(
          div1.right < div2.left ||
          div1.left > div2.right ||
          div1.bottom < div2.top ||
          div1.top > div2.bottom
        );
      // Check for overlap and change color accordingly
      if (overlay) {
        console.log(categoryDiv);
        
        categoryDiv.style.backgroundColor = "yellow";
      }else {
        categoryDiv.style.backgroundColor = "white";
      }
      })

  }});

// End dragging
document.addEventListener("mouseup", () => {
  isDragging = false;
  dragDiv.style.cursor = 'grab';
})

