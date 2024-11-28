let dragDiv = document.getElementById("drag-div");
let isDragging = false;
let offsetX, offsetY
dragDiv.addEventListener("mousedown", (e) => {  //start dragging 
  isDragging = true;
  offsetX = e.clientX - dragDiv.offsetLeft
  offsetY = e.clientY - dragDiv.offsetTop
  dragDiv.style.cursor = 'dragging'

  dragDiv.addEventListener("mousemove", (e) => { // move container while the mouse help down
    if (isDragging) {
      const X = e.clientX;
      const Y = e.clientY;
      dragDiv.style.left = `${X - offsetX}px`; // change position of div
      dragDiv.style.top = `${Y - offsetY}px`
      // console.log("Hello")

      dragDiv.addEventListener("mouseup", () => { //end dragging
        isDragging = false;
        dragDiv.style.cursor = 'grab'
      })
    }
  })

})









