import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"; // D3.js library import

// Word array jo cards ke liye use hoga
const word = [
    "Grass", "Tree", "Mango", "Papaya", "Banana", "Apple", "Orange",
    "Orange", "Grass", "Tree", "Cat", "Rat", "Car", "Bike", "Papaya",
    "Cat", "Grass", "Tree", "Mango", "Papaya", "Banana", "Apple",
    "Grass", "Tree", "Mango", "Papaya", "Banana", "Apple", "Orange",
    "Orange", "Grass", "Tree", "Cat", "Rat", "Car", "Bike", "Papaya",
    "Cat", "Grass", "Tree", "Mango", "Papaya", "Banana"
];

// SVG canvas ki width aur height define karne ke liye
const svgWidth = 800;
const svgHeight = 600;

// `#word-cloud` div ke andar ek SVG element create karne ke liye
const svg = d3.select("#word-cloud")
    .append("svg") 
    .attr("width", svgWidth) 
    .attr("height", svgHeight)
    .style("border", "1px solid black");

// Rectangle cards ka width aur height define karne ke liye
const cardWidth = 100;
const cardHeight = 50;

// Data ko bind karke `<g>` elements create karte hain
svg.selectAll(".word-card")
    .data(word) // Word array ko data ke roop mein bind karte hain
    .enter() // DOM elements ka enter selection handle karte hain
    .append("g") 
    .attr("class", "word-card") 
    .attr("transform", (d, i) => 
        `translate(${(i % 6) * 120 + 10}, ${Math.floor(i / 6) * 60 + 10})`
    ) // Har word ko grid mein position karte hain
    .call(d3.drag() // Drag-and-drop functionality add karte hain
        .on("start", dragstart) // Jab dragging start hoti hai, toh yeh function call hota hai
        .on("drag", dragging) // Jab dragging ho rahi hoti hai, toh yeh function call hota hai
        .on("end", dragend) // Jab dragging khatam hoti hai, toh yeh function call hota hai
    )
    .each(function(d) { // Har `<g>` element ke andar rectangle aur text add karte hain
        const group = d3.select(this); // Current group element select karte hain
        
        group.append("rect") // Rectangle add karte hain
            .attr("width", cardWidth) // Rectangle ki width set karte hain
            .attr("height", cardHeight) // Rectangle ki height set karte hain
            .attr("rx", 10) // Rectangle ke corners rounded banate hain (horizontal)
            .attr("ry", 10) // Rectangle ke corners rounded banate hain (vertical)
            .style("fill", "lightblue") 
            .style("stroke", "darkblue") 
            .style("stroke-width", 2); 
        
        group.append("text") 
            .attr("x", cardWidth / 2) // Text ko horizontally center align karte hain
            .attr("y", cardHeight / 2) // Text ko vertically center align karte hain
            .attr("dy", ".35em") // Vertical alignment thoda adjust karte hain
            .attr("text-anchor", "middle") 
            .text(d) // Current word ko text ke roop mein set karte hain
            .style("font-family", "Arial, sans-serif") 
            .style("font-size", "14px"); 
    });

// Dragging functionality ke liye functions define karte hain
function dragstart(event, d) {
    d3.select(this) // Current dragged element select karne ke liye
        .raise() // Element ko top layer par le jate hain
        .select("rect") // Rectangle select karne ke liye
        .style("stroke", "red");
}

function dragging(event, d) {
    d3.select(this)
        .attr("transform", 
            `translate(${event.x - cardWidth / 2}, ${event.y - cardHeight / 2})`
        ); // Rectangle ko mouse ke saath move karte hain
}

function dragend(event, d) {
    d3.select(this) // Current dragged element select karne ke liye
        .select("rect") 
        .style("stroke", "darkblue");
}



