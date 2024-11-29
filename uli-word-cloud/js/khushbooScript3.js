let div = document.querySelector("#smallDiv")
 
let isDragging = false;  
let offsetX, offsetY;  // Store mouse position 

// Mouse down event to start dragging
smallDiv.addEventListener('mousedown', (e) => {
    isDragging = true;  // Start dragging

     offsetX = e.clientX - smallDiv.offsetLeft;
    offsetY = e.clientY - smallDiv.offsetTop;

    smallDiv.style.cursor = 'grabbing';  // Change cursor to grabbing when dragging
});

// Mouse move event to move the div, only if dragging is true
smallDiv.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const X = e.clientX;
        const Y = e.clientY;

        smallDiv.style.left = `${X - offsetX}px`;  // Update left position
        smallDiv.style.top = `${Y - offsetY}px`;  // Update top position
    }
});

// Mouse up event to stop dragging
smallDiv.addEventListener('mouseup', () => {
    isDragging = false;  // Stop dragging
    smallDiv.style.cursor = 'poiner';  // Reset cursor to normal pointer
});