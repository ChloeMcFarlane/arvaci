
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRK_BRKSgKNoZnNateOsUWdIFjs0ph_mIR9Iv838DMHmP9GkDUJehb03EHg-3ABwfj_X8LRq_R0iZTK/pub?output=csv";

let rawMenuRows = [];
let activeTabGroup = 'drinks'; 

// Full runtime localized dataset mapping your exact sheet items explicitly
const fallbackMenuData = [
    {category: "Hot Drinks", item: "Espresso", size: "Single", price: "3.25"},
    {category: "Hot Drinks", item: "Espresso", size: "Double", price: "3.95"},
    {category: "Hot Drinks", item: "Macchiato", size: "Single", price: "3.20"},
    {category: "Hot Drinks", item: "Macchiato", size: "Double", price: "3.95"},
    {category: "Hot Drinks", item: "Cortado", size: "Single", price: "3.20"},
    {category: "Hot Drinks", item: "Cortado", size: "Double", price: "3.95"},
    {category: "Hot Drinks", item: "Flat White", size: "Single/Standard", price: "4.50"},
    {category: "Hot Drinks", item: "Cappuccino", size: "Small", price: "4.25"},
    {category: "Hot Drinks", item: "Cappuccino", size: "Large", price: "5.10"},
    {category: "Hot Drinks", item: "Latte", size: "Small", price: "4.25"},
    {category: "Hot Drinks", item: "Latte", size: "Large", price: "5.10"},
    {category: "Hot Drinks", item: "Mocha", size: "Small", price: "5.00"},
    {category: "Hot Drinks", item: "Mocha", size: "Large", price: "5.75"},
    {category: "Hot Drinks", item: "Americano", size: "Small", price: "3.95"},
    {category: "Hot Drinks", item: "Americano", size: "Large", price: "4.50"},
    {category: "Hot Drinks", item: "Drip Coffee", size: "10oz", price: "2.70"},
    {category: "Hot Drinks", item: "Drip Coffee", size: "12oz", price: "2.95"},
    {category: "Hot Drinks", item: "Drip Coffee", size: "16oz", price: "3.95"},
    {category: "Hot Drinks", item: "Chai Latte", size: "Small", price: "4.95"},
    {category: "Hot Drinks", item: "Chai Latte", size: "Large", price: "5.50"},
    {category: "Hot Drinks", item: "Matcha Latte", size: "Small", price: "5.20"},
    {category: "Hot Drinks", item: "Matcha Latte", size: "Large", price: "5.95"},
    {category: "Hot Drinks", item: "English Breakfast", size: "Tea", price: "3.95"},
    {category: "Hot Drinks", item: "Earl Grey", size: "Tea", price: "3.95"},
    {category: "Hot Drinks", item: "Green Tea", size: "Tea", price: "3.95"},
    {category: "Hot Drinks", item: "Hibiscus", size: "Tea", price: "3.95"},
    {category: "Hot Drinks", item: "Blend 333", size: "Tea", price: "3.95"},
    {category: "Hot Drinks", item: "Hot Chocolate", size: "Standard", price: "4.25"},
    {category: "Hot Drinks", item: "London Fog", size: "Standard", price: "4.25"},
    {category: "Iced Drinks", item: "Cold Brew", size: "Small", price: "4.25"},
    {category: "Iced Drinks", item: "Cold Brew", size: "Large", price: "4.95"},
    {category: "Iced Drinks", item: "Americano", size: "Small", price: "4.25"},
    {category: "Iced Drinks", item: "Americano", size: "Large", price: "4.95"},
    {category: "Iced Drinks", item: "Latte", size: "Small", price: "4.75"},
    {category: "Iced Drinks", item: "Latte", size: "Large", price: "5.50"},
    {category: "Iced Drinks", item: "Cappuccino", size: "Small", price: "4.75"},
    {category: "Iced Drinks", item: "Cappuccino", size: "Large", price: "5.50"},
    {category: "Iced Drinks", item: "Mocha", size: "Small", price: "5.20"},
    {category: "Iced Drinks", item: "Mocha", size: "Large", price: "5.95"},
    {category: "Iced Drinks", item: "Chai Latte", size: "Small", price: "5.50"},
    {category: "Iced Drinks", item: "Chai Latte", size: "Large", price: "5.95"},
    {category: "Iced Drinks", item: "Matcha Latte", size: "Small", price: "5.50"},
    {category: "Iced Drinks", item: "Matcha Latte", size: "Large", price: "6.25"},
    {category: "Iced Drinks", item: "Hot Chocolate", size: "Standard", price: "4.25"},
    {category: "Arvaci", item: "Hot", size: "Small", price: "4.75"},
    {category: "Arvaci", item: "Hot", size: "Large", price: "5.75"},
    {category: "Arvaci", item: "Iced", size: "Small", price: "5.20"},
    {category: "Arvaci", item: "Iced", size: "Large", price: "5.95"},
    {category: "Iced Tea", item: "Black", size: "Small", price: "3.95"},
    {category: "Iced Tea", item: "Black", size: "Large", price: "4.25"},
    {category: "Iced Tea", item: "Green", size: "Small", price: "3.95"},
    {category: "Iced Tea", item: "Green", size: "Large", price: "4.25"},
    {category: "Iced Tea", item: "Arnold Palmer", size: "Small", price: "4.40"},
    {category: "Iced Tea", item: "Arnold Palmer", size: "Large", price: "5.40"},
    {category: "Iced Tea", item: "Matcha", size: "Standard", price: "5.00"},
    {category: "Add Extra", item: "Shot", size: "Add-on", price: "1.00"},
    {category: "Add Extra", item: "Syrup", size: "Add-on", price: "0.75"},
    {category: "Milk", item: "Almond", size: "Add-on", price: "0.75"},
    {category: "Milk", item: "Oat", size: "Add-on", price: "0.75"},
    {category: "Food", item: "Salmon Sandwich", size: "Standard", price: "13.95"},
    {category: "Food", item: "Tomato Mozzarella Sandwich", size: "Standard", price: "9.75"},
    {category: "Food", item: "Tuna Sandwich", size: "Standard", price: "13.95"},
    {category: "Food", item: "Vegan Sandwich", size: "Standard", price: "12.75"},
    {category: "Food", item: "Turkey Sandwich", size: "Standard", price: "13.75"},
    {category: "Food", item: "Avocado Toast", size: "Standard", price: "11.95"},
    {category: "Add Extra", item: "Avocado", size: "Add-on", price: "1.50"},
    {category: "Add Extra", item: "Boiled Egg", size: "Add-on", price: "1.50"},
    {category: "Food", item: "Bacon Quiche", size: "Standard", price: "8.25"},
    {category: "Food", item: "Spinach and Feta Quiche", size: "Standard", price: "8.25"},
    {category: "Food", item: "Mushroom Quiche", size: "Standard", price: "8.25"},
    {category: "Food", item: "Broccoli Quiche", size: "Standard", price: "8.25"},
    {category: "Food", item: "Egg and Scallion Pirogie", size: "Standard", price: "6.15"},
    {category: "Food", item: "Chicken Pirogie", size: "Standard", price: "6.15"},
    {category: "Food", item: "Potato Pirogie", size: "Standard", price: "6.15"}
];

async function fetchMenuData() {
    if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL.includes("YOUR_GOOGLE_SHEETS")) {
        rawMenuRows = fallbackMenuData;
        displayMenu();
        return;
    }
    try {
        const res = await fetch(GOOGLE_SHEET_CSV_URL);
        const textData = await res.text();
        rawMenuRows = parseDataFormat(textData);
        displayMenu();
    } catch (err) {
        console.error("Connection failed with Google Sheets:", err);
        rawMenuRows = fallbackMenuData;
        displayMenu();
    }
}

function parseDataFormat(text) {
    const lines = text.replace(/\r/g, '').split('\n');
    const parsed = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        if (!currentLine) continue;

        let columns = currentLine.split('\t');
        if (columns.length < 4) {
            columns = currentLine.split(',');
        }

        if (columns.length >= 4) {
            parsed.push({
                category: columns[0].trim(),
                item: columns[1].trim(),
                size: columns[2].trim(),
                price: columns[3].trim()
            });
        }
    }
    return parsed;
}

function displayMenu() {
    const leftColumn = document.getElementById('left-menu-col');
    const rightColumn = document.getElementById('right-menu-col');
    const leftTitle = document.getElementById('left-column-title');
    const rightTitle = document.getElementById('right-column-title');
    
    if (!leftColumn || !rightColumn || !leftTitle || !rightTitle) return;

    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    if (activeTabGroup === 'drinks') {
        leftTitle.textContent = "Hot Drinks";
        rightTitle.textContent = "Iced Drinks";

        const hotItems = {};
        const icedItems = {};

        rawMenuRows.forEach(row => {
            const cat = row.category.toLowerCase();
            let name = row.item;

            // Handle house blend formatting variants
            if (cat === "arvaci") {
                name = row.item.toLowerCase() === "hot" ? "Arvaci House Blend (Hot)" : "Arvaci House Blend (Iced)";
            }

            // Routing for Hot Drinks & Hot Teas
            if (cat === "hot drinks") {
                if (row.size.toLowerCase() === "tea") {
                    const teaName = name.toLowerCase().includes("tea") ? name : name + " Tea";
                    // Add tea variant to Hot list
                    if (!hotItems[teaName]) hotItems[teaName] = [];
                    hotItems[teaName].push(row);

                    // Map matching variation over to Iced list automatically
                    const icedTeaName = teaName.replace(/tea/i, "Iced Tea").trim();
                    if (!icedItems[icedTeaName]) icedItems[icedTeaName] = [];
                    icedItems[icedTeaName].push({ ...row, size: "Standard" });
                } else {
                    if (!hotItems[name]) hotItems[name] = [];
                    hotItems[name].push(row);
                }
            }

            // Routing for native Iced Drinks & Iced Teas
            if (cat === "iced drinks") {
                if (!icedItems[name]) icedItems[name] = [];
                icedItems[name].push(row);
            }
            if (cat === "iced tea") {
                const normalizedIcedTea = name.toLowerCase().includes("iced") ? name : "Iced " + name;
                const finalIcedTea = normalizedIcedTea.toLowerCase().includes("tea") ? normalizedIcedTea : normalizedIcedTea + " Tea";
                if (!icedItems[finalIcedTea]) icedItems[finalIcedTea] = [];
                icedItems[finalIcedTea].push(row);
            }
            if (cat === "arvaci") {
                if (name.includes("(Hot)")) {
                    if (!hotItems[name]) hotItems[name] = [];
                    hotItems[name].push(row);
                } else {
                    if (!icedItems[name]) icedItems[name] = [];
                    icedItems[name].push(row);
                }
            }
        });

        // Generate Hot Drinks list
        for (const [name, variations] of Object.entries(hotItems)) {
            leftColumn.appendChild(generateMenuRowHTML(name, variations));
        }
        // Generate Iced Drinks list
        for (const [name, variations] of Object.entries(icedItems)) {
            rightColumn.appendChild(generateMenuRowHTML(name, variations));
        }

    } else {
        leftTitle.textContent = "Food & Plates";
        rightTitle.textContent = "Add-Ons & Modifiers";

        const foodItems = {};
        const extraItems = {};

        rawMenuRows.forEach(row => {
            const cat = row.category.toLowerCase();
            const name = row.item;

            if (cat === "food") {
                if (!foodItems[name]) foodItems[name] = [];
                foodItems[name].push(row);
            }
            if (cat === "add extra" || cat === "milk" || cat === "extras") {
                if (!extraItems[name]) extraItems[name] = [];
                extraItems[name].push(row);
            }
        });

        for (const [name, variations] of Object.entries(foodItems)) {
            leftColumn.appendChild(generateMenuRowHTML(name, variations));
        }
        for (const [name, variations] of Object.entries(extraItems)) {
            rightColumn.appendChild(generateMenuRowHTML(name, variations));
        }
    }
}

function generateMenuRowHTML(name, variations) {
    const rowEl = document.createElement('div');
    rowEl.className = 'menu-item-row';

    const metaEl = document.createElement('div');
    metaEl.className = 'item-meta';
    metaEl.innerHTML = `<span class="item-name">${name}</span>`;

    const priceContainer = document.createElement('div');
    priceContainer.className = 'price-container';

    variations.forEach(v => {
        const parsedPrice = isNaN(parseFloat(v.price)) ? v.price : parseFloat(v.price).toFixed(2);
        
        const skipLabel = ['standard', 'add-on', 'single/standard', 'tea', 'none', ''];
        const currentSize = v.size ? v.size.trim() : '';
        const cleanSize = skipLabel.includes(currentSize.toLowerCase()) ? '' : currentSize;
        
        const sizeTag = cleanSize ? `<span class="size-label">${cleanSize}</span>` : '';
        
        priceContainer.innerHTML += `
            <div class="price-tier">
                ${sizeTag}
                <span class="item-price">$${parsedPrice}</span>
            </div>
        `;
    });

    rowEl.appendChild(metaEl);
    rowEl.appendChild(priceContainer);
    return rowEl;
}

window.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            activeTabGroup = button.getAttribute('data-tab');
            displayMenu();
        });
    });

    fetchMenuData();
});


// DRAG SCROLL

// Append this implementation directly into your DOMContentLoaded event block in menu-fetch.js
window.addEventListener('DOMContentLoaded', () => {
    // --- EXISTING TAB SYSTEM INITIALIZATION ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeTabGroup = button.getAttribute('data-tab');
            displayMenu();
        });
    });
    fetchMenuData();

    // --- NEW: SMOOTH DRAG-TO-SCROLL INTERACTION ---
    const track = document.querySelector('#best-sellers .grid-wrapper');
    if (track) {
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('active');
            // Disable native smooth scroll snapping during direct drag actions for immediate response
            track.style.scrollSnapType = 'none';
            track.style.scrollBehavior = 'auto';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            if (!isDown) return;
            isDown = false;
            // Restore snapping and smooth behaviors smoothly on drop
            track.style.scrollSnapType = 'x mandatory';
            track.style.scrollBehavior = 'smooth';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.scrollSnapType = 'x mandatory';
            track.style.scrollBehavior = 'smooth';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5; // Multiplier adjusts gesture speed
            track.scrollLeft = scrollLeft - walk;
        });
    }
});