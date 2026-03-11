// Sample Station Data
const stations = [
    { id: 1, name: "City Center Hub", type: "CCS", speed: 50, price: 15, idleFee: 5, available: true },
    { id: 2, name: "Highway Fast Charge", type: "Tesla", speed: 250, price: 22, idleFee: 10, available: false },
    { id: 3, name: "Mall Parking B2", type: "CCS", speed: 22, price: 12, idleFee: 2, available: true },
    { id: 4, name: "Tech Park Station", type: "Tesla", speed: 120, price: 18, idleFee: 8, available: true }
];
function displayStations(filteredStations) {
    const container = document.getElementById('station-list');
    container.innerHTML = '';

    filteredStations.forEach(station => {
        const statusClass = station.available ? 'available' : 'in-use';
        const statusText = station.available ? 'Available' : 'Out of Service';

        container.innerHTML += `
            <div class="station-card" onclick="viewDetails(${station.id})">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <span class="badge ${statusClass}">${statusText}</span>
                    <span style="font-size: 12px; color: #888;">#${station.id}</span>
                </div>
                
                <h3 style="margin: 0 0 5px 0; font-size: 1.1rem;">${station.name}</h3>
                <p style="color:#666; font-size:0.85rem; margin-bottom:15px;">${station.type} Connector</p>

                <div style="display:flex; align-items:center; gap:10px;">
                    <div class="speed-tag">${station.speed} kW</div>
                    <span style="font-size:0.8rem; color:#888;">Fast Charging</span>
                </div>

                <div class="progress-bar">
                    <div class="fill" style="width: ${(station.speed/250)*100}%"></div>
                </div>
                
                <p style="font-size: 0.8rem; color: #00d1b2; font-weight: bold; margin-top: 10px;">
                    View Station Details →
                </p>
            </div>
        `;
    });
}
// Requirement: JS Availability Filter
function filterStations() {
    const isChecked = document.getElementById('available-only').checked;
    const filtered = isChecked ? stations.filter(s => s.available) : stations;
    displayStations(filtered);
}

function viewDetails(id) {
    localStorage.setItem('selectedStation', JSON.stringify(stations.find(s => s.id === id)));
    window.location.href = 'details.html';
}

// Initial Load
if(document.getElementById('station-list')) displayStations(stations);


function toggleMenu() {
    const menu = document.getElementById('menu-overlay');
    menu.classList.toggle('active');
    
    // Prevent scrolling of the main page when menu is open
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function toggleSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    searchOverlay.classList.toggle('active');
    
    // Auto-focus the input box when opened
    if (searchOverlay.classList.contains('active')) {
        setTimeout(() => {
            document.getElementById('search-box').focus();
        }, 400);
    }
}


// Add this to your script.js
document.querySelectorAll('.search-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const searchBox = document.getElementById('search-box');
        searchBox.value = pill.innerText; // Puts pill text into search bar
        searchBox.focus();
        
        // Optional: Trigger your filter logic automatically
        console.log("Searching for: " + pill.innerText);
    });
});





// Add this at the bottom of your script.js
function loadStationDetails() {
    const data = JSON.parse(localStorage.getItem('selectedStation'));

    if (data && document.getElementById('st-name')) {
        document.getElementById('st-name').innerText = data.name;
        document.getElementById('st-price').innerText = `₹${data.price}`;
        document.getElementById('st-type').innerText = `${data.type} (Ultra Fast)`;
        document.getElementById('st-speed').innerText = `${data.speed} kW`;
        document.getElementById('st-idle').innerText = data.idleFee;
        
        // Dynamic Status Badge
        const badge = document.getElementById('st-status-badge');
        badge.innerText = data.available ? 'Available' : 'Out of Service';
        badge.className = `badge ${data.available ? 'available' : 'in-use'}`;

        // NEW: Pulling Parking Fee from data (adding 50 as default if not in array)
        document.getElementById('st-parking').innerText = data.parkingFee ? `₹${data.parkingFee}/hr` : "₹50/hr";

        // Reserve Button Logic
        const reserveBtn = document.getElementById('reserve-btn');
        if (!data.available) {
            reserveBtn.innerText = "Unavailable";
            reserveBtn.style.background = "#ccc";
            reserveBtn.disabled = true;
        } else {
            reserveBtn.onclick = () => alert(`Success! Charging spot reserved at ${data.name}.`);
        }
    }
}



// Geolocation Logic for Real Map
function initRealMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            // This URL creates a search specifically for Tata Power chargers near your lat/lng
            const mapUrl = `https://www.google.com/maps?q=Tata+Power+EV+Charging+Station&ll=${lat},${lng}&z=14&output=embed`;
            
            document.getElementById("mapFrame").src = mapUrl;
        }, function () {
            // Fallback if user denies location
            document.getElementById("mapFrame").src = 
                "https://www.google.com/maps?q=Tata+Power+EV+Charging+Stations+India&output=embed";
        });
    }
}

// Call this when the window loads
window.addEventListener('load', () => {
    initRealMap();
    loadStationDetails(); // This only runs if we are on details.html
    if (document.getElementById('station-list')) {
        displayStations(stations);
    }
});




// 1. Data for the Charger Solutions
const chargerData = {
    "dc-60": {
        title: "50/60 kW DC Charger",
        desc: "Designed for high-traffic public spaces. Provides a 0-80% charge in under 60 minutes for most modern EVs.",
        specs: ["Input: 415V AC", "Output: 200V-750V DC", "Efficiency: >94%", "Protection: IP54 Rated"],
        img: "https://www.tatapower.com/adobe/dynamicmedia/deliver/dm-aid--e514d005-6a16-4820-a61c-bebf4b36b5ee/Frame1321316902.webp"
    },
    "ac-charger": {
        title: "AC Home/Office Charger",
        desc: "The perfect solution for overnight charging. Compact, smart-enabled, and easy to install.",
        specs: ["Power: 7.4kW / 22kW", "Connector: Type 2", "Connectivity: Wi-Fi / Bluetooth", "Safety: In-built RCD"],
        img: "https://www.tatapower.com/adobe/dynamicmedia/deliver/dm-aid--e4ee41d9-83de-4111-8641-e7161a7dcb87/Group1321316441.webp"
    },

    "e-bus": {
        title: "High-Capacity e-Bus Charger",
        desc: "Ultra-high power solution specifically engineered for electric public transport and heavy-duty logistics.",
        specs: ["Power Output: 150kW - 240kW", "Cooling: Liquid Cooled Cables", "Protocol: OCPP 1.6J / 2.0.1", "Standard: CCS Type 2 / Pantograph"],
        img: "https://www.tatapower.com/adobe/dynamicmedia/deliver/dm-aid--15c84b57-98c5-40ec-a3a7-c7b6050363bb/Group1321316442.webp"
    },
    "fleet": {
        title: "30kW DC Fleet Charger",
        desc: "Optimized for commercial fleets and delivery hubs. Balances fast charging speed with grid efficiency.",
        specs: ["Power: 30kW Fast DC", "Dual Charging: Simultaneous Support", "Access: RFID / Mobile App", "Build: Rugged Anti-Corrosion"],
        img: "https://www.tatapower.com/adobe/dynamicmedia/deliver/dm-aid--0efea2f0-b229-4808-8883-1827bea57d4c/Frame13213169023.webp"
    }


    // Add data for 'e-bus' and 'fleet' here similarly
};

// 2. Function to open Modal
function openChargerInfo(key) {
    const data = chargerData[key];
    if(!data) return;

    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-img').src = data.img;
    
    const specsList = document.getElementById('modal-specs');
    specsList.innerHTML = data.specs.map(s => `<li>${s}</li>`).join('');

    document.getElementById('charger-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('charger-modal').style.display = 'none';
}




window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});