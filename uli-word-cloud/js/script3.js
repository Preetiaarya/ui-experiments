const dragingDiv = document.querySelector("#dragingDiv");
const categoryDivs = document.querySelectorAll(".category");

let isDragging = false;
let currentCategory = null; 

// Initial dimensions of the dragging div
let width = parseInt(dragingDiv.style.width);
let height = parseInt(dragingDiv.style.height);

dragingDiv.addEventListener("mousedown", (e) => {
    isDragging = true;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        // Move the dragging div with the cursor
        dragingDiv.style.position = "absolute";
        const x = e.clientX;
        const y = e.clientY;

        dragingDiv.style.left = `${x - width / 2}px`;
        dragingDiv.style.top = `${y - height / 2}px`;

        currentCategory = null; // Reset current category
        categoryDivs.forEach((categoryDiv) => {
            const categoryRect = categoryDiv.getBoundingClientRect();
            const draggingRect = dragingDiv.getBoundingClientRect();

            // Check for overlap
            const isOverlap = !(
                draggingRect.right < categoryRect.left ||
                draggingRect.left > categoryRect.right ||
                draggingRect.bottom < categoryRect.top ||
                draggingRect.top > categoryRect.bottom
            );

            if (isOverlap) {
                categoryDiv.style.backgroundColor = "yellow";
                currentCategory = categoryDiv; 
            } else {
                categoryDiv.style.backgroundColor = "";
            }
        });
    }
});

document.addEventListener("mouseup", () => {
    if (isDragging && currentCategory) {
        const categoryRect = currentCategory.getBoundingClientRect();
        const parentRect = currentCategory.offsetParent.getBoundingClientRect(); 

        const centerX = categoryRect.left - parentRect.left + categoryRect.width / 2;
        const centerY = categoryRect.top - parentRect.top + categoryRect.height / 2;
        console.log(currentCategory);
        
        dragingDiv.style.left = `${centerX - width / 2}px`;
        dragingDiv.style.top = `${centerY - height / 2}px`;
        currentCategory.appendChild(dragingDiv);
    }

    isDragging = false;
});
