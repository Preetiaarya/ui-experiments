import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

let word = [
    "Grass", "Tree", "Mango", "Papaya", "Banana", "Apple", "Orange",
    "Orange", "Grass", "Tree", "Cat", "Rat", "Car", "Bike", "Papaya",
    "Cat", "Grass", "Tree", "Mango", "Papaya", "Banana", "Apple",
    "Grass", "Tree", "Mango", "Papaya", "Banana", "Apple", "Orange",
    "Orange", "Grass", "Tree", "Cat", "Rat", "Car", "Bike", "Papaya",
    "Cat", "Grass", "Tree", "Mango", "Papaya", "Banana"
];

// Grouping words into columns of 10 items
let columns = [];
let numItemsPerColumn = 10;
for (let i = 0; i < word.length; i += numItemsPerColumn) {
    columns.push(word.slice(i, i + numItemsPerColumn));
}

// Set up the SVG container
const svg = d3.select("body").append("svg")
    .attr("width", 1500)
    .attr("height", 300);

// Add a border to the container using a rectangle (rect)
svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1500)
    .attr("height", 300)
    .attr("stroke", "black")  // Border color
    .attr("stroke-width", 2)  // Border thickness
    .attr("fill", "none");  // No fill color for the border container

// Create columns of words
columns.forEach((column, i) => {
    const columnGroup = svg.append("g")
        .attr("transform", `translate(${i * 100}, 0)`);  // Adjust column spacing
    
    column.forEach((word, j) => {
        columnGroup.append("text")
            .attr("x", 0)
            .attr("y", j * 20 + 20)  // Adjusted row height to make the first word visible
            .text(word)
            .style("font-size", "14px")
            .style("fill", "black");
    });
});
