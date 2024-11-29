let dragDiv = document.querySelector("#dragg-div");
let categoriesDiv = document.querySelectorAll(".category-div");

let isDragging = false;
let offsetX, offsetY;  // Store mouse position 
let selectedCategoryDiv = null;  // Store the currently selected category div

// Mouse down event to start dragging
dragDiv.addEventListener('mousedown', (e) => {
    isDragging = true;  // Start dragging

    offsetX = e.clientX - dragDiv.offsetLeft;
    offsetY = e.clientY - dragDiv.offsetTop;

    dragDiv.style.cursor = 'grabbing';  // Change cursor to grabbing when dragging
});

// Mouse move event to move the div, only if dragging is true
dragDiv.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const X = e.clientX;
        const Y = e.clientY;

        dragDiv.style.left = `${X - offsetX}px`;  // Update left position
        dragDiv.style.top = `${Y - offsetY}px`;  // Update top position

        let hoveredCategory = null;

        categoriesDiv.forEach(categoryDiv => {
            const div1 = dragDiv.getBoundingClientRect();
            const div2 = categoryDiv.getBoundingClientRect();

            const overlay = !(
                div1.right < div2.left ||
                div1.left > div2.right ||
                div1.bottom < div2.top ||
                div1.top > div2.bottom
            );

            if (overlay) {
                console.log(categoryDiv);
                categoryDiv.style.backgroundColor = "yellow";  // Highlight hovered category
                hoveredCategory = categoryDiv;  // Store the currently hovered category
            } else {
                categoryDiv.style.backgroundColor = "white";  // Reset background if not hovered
            }
        });

        // If a category is hovered, store it as the selected one
        if (hoveredCategory) {
            selectedCategoryDiv = hoveredCategory;
        }
    }
});

// Mouse up event to stop dragging and place the dragDiv at the center of the selected category
dragDiv.addEventListener('mouseup', () => {
    if (selectedCategoryDiv) {
        // Get the bounding box of the selected category div
        const categoryRect = selectedCategoryDiv.getBoundingClientRect();

        // Calculate the center of the category div
        const categoryCenterX = categoryRect.left + categoryRect.width / 2;
        const categoryCenterY = categoryRect.top + categoryRect.height / 2;

        // Move the dragDiv to the center of the selected category div
        dragDiv.style.left = `${categoryCenterX - dragDiv.offsetWidth / 2}px`;
        dragDiv.style.top = `${categoryCenterY - dragDiv.offsetHeight / 2}px`;

        // Reset cursor and stop dragging
        dragDiv.style.cursor = 'pointer';  
    }

    isDragging = false;  // Stop dragging
});
