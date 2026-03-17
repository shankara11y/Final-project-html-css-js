 const stations = [
    { id: 1, name: "City Center Hub, Thane", type: "CCS", speed: 50, price: 18, idleFee: 5, available: true, parkingFee: 40 },
    { id: 2, name: "Highway Fast Charge, NH-8", type: "Tesla", speed: 250, price: 24, idleFee: 10, available: false, parkingFee: 60 },
    { id: 3, name: "Viviana Mall B2", type: "CCS", speed: 22, price: 12, idleFee: 2, available: true, parkingFee: 50 },
    { id: 4, name: "Mindspace Tech Park", type: "Tesla", speed: 120, price: 20, idleFee: 8, available: true, parkingFee: 30 },
    { id: 5, name: "Aerocity Gateway, Delhi", type: "CCS2", speed: 60, price: 22, idleFee: 7, available: true, parkingFee: 80 },
    { id: 6, name: "Marina Beach Hub, Chennai", type: "Type 2", speed: 22, price: 10, idleFee: 3, available: true, parkingFee: 20 },
    { id: 7, name: "Whitefield Fast DC, Bengaluru", type: "CCS", speed: 100, price: 21, idleFee: 6, available: false, parkingFee: 40 },
    { id: 8, name: "Park Street Plaza, Kolkata", type: "Type 2", speed: 22, price: 15, idleFee: 4, available: true, parkingFee: 30 },
    { id: 9, name: "Planet Hollywood, Thane City", type: "CCS2", speed: 60, price: 20, idleFee: 5, available: true, parkingFee: 50 },
    { id: 10, name: "EV Dock Charging Station", type: "DC Fast", speed: 30, price: 15, idleFee: 3, available: true, parkingFee: 20 },
    { id: 11, name: "Kazam Charging Station", type: "Type 2", speed: 22, price: 12, idleFee: 2, available: true, parkingFee: 30 },
    { id: 12, name: "Fortum Charging Station", type: "CCS", speed: 50, price: 18, idleFee: 5, available: false, parkingFee: 40 },
    { id: 13, name: "Adani Charging Station", type: "CCS2", speed: 80, price: 22, idleFee: 6, available: true, parkingFee: 50 }
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
                    <div class="fill" style="width: ${(station.speed / 250) * 100}%"></div>
                </div>
                
                <p style="font-size: 0.8rem; color: #00d1b2; font-weight: bold; margin-top: 10px;">
                    View Station Details →
                </p>
            </div>
        `;
    });
}
 function filterStations() {
    const isChecked = document.getElementById('available-only').checked;
    const filtered = isChecked ? stations.filter(s => s.available) : stations;
    displayStations(filtered);
}

function viewDetails(id) {
    localStorage.setItem('selectedStation', JSON.stringify(stations.find(s => s.id === id)));
    window.location.href = 'details.html';
}

 if (document.getElementById('station-list')) displayStations(stations);


function toggleMenu() {
    const menu = document.getElementById('menu-overlay');
    menu.classList.toggle('active');

     if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function toggleSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    searchOverlay.classList.toggle('active');

     if (searchOverlay.classList.contains('active')) {
        setTimeout(() => {
            document.getElementById('search-box').focus();
        }, 400);
    }
}




 document.querySelectorAll('.search-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const searchBox = document.getElementById('search-box');
        searchBox.value = pill.innerText; // Puts pill text into search bar
        searchBox.focus();

         console.log("Searching for: " + pill.innerText);
    });
});





 function loadStationDetails() {
    const data = JSON.parse(localStorage.getItem('selectedStation'));

    if (data && document.getElementById('st-name')) {
        document.getElementById('st-name').innerText = data.name;
        document.getElementById('st-price').innerText = `₹${data.price}`;
        document.getElementById('st-type').innerText = `${data.type} (Ultra Fast)`;
        document.getElementById('st-speed').innerText = `${data.speed} kW`;
        document.getElementById('st-idle').innerText = data.idleFee;

         const badge = document.getElementById('st-status-badge');
        badge.innerText = data.available ? 'Available' : 'Out of Service';
        badge.className = `badge ${data.available ? 'available' : 'in-use'}`;

         document.getElementById('st-parking').innerText = data.parkingFee ? `₹${data.parkingFee}/hr` : "₹50/hr";

         const reserveBtn = document.getElementById('reserve-btn');

        reserveBtn.addEventListener('click', function () {
             this.innerHTML = 'Processing...';
            this.style.opacity = '0.7';
            this.disabled = true;

             setTimeout(() => {
                 this.innerHTML = 'RESERVED ✓';
                this.style.background = '#00d1b2'; // Brand Teal
                this.style.color = '#1a1a1a';      // Dark text for contrast
                this.style.opacity = '1';

                 showToast("Success! Spot reserved at City Center Hub.");
            }, 1500);
        });
    }
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }
    toast.innerHTML = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

 function initRealMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

             const mapUrl = `https://www.google.com/maps?q=Tata+Power+EV+Charging+Station&ll=${lat},${lng}&z=14&output=embed`;

            document.getElementById("mapFrame").src = mapUrl;
        }, function () {
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


function reserveCharger() {
    const btn = document.querySelector('.reserve-btn');
    btn.innerHTML = "RESERVING...";

    setTimeout(() => {
        btn.style.backgroundColor = "#00d1b2";
        btn.innerHTML = "RESERVED ✓";
        btn.disabled = true; // Prevent double booking
    }, 1000);
}

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


 };

// 2. Function to open Modal
function openChargerInfo(key) {
    const data = chargerData[key];
    if (!data) return;

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




window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

let currentPosition = 0;

function moveSlider(direction) {
    const track = document.getElementById('sliderTrack');
    const cards = document.querySelectorAll('.info-card');

     const cardWidth = cards[0].offsetWidth + 30;
    const totalCards = cards.length;

     if (!window.sliderIndex) window.sliderIndex = 0;

    window.sliderIndex += direction;

  
    if (window.sliderIndex > totalCards - 3) {
        window.sliderIndex = 0;
    }
     else if (window.sliderIndex < 0) {
        window.sliderIndex = totalCards - 3;
    }

    const moveDistance = -(window.sliderIndex * cardWidth);
    track.style.transform = `translateX(${moveDistance}px)`;
}

let currentIndex = 0;
const track = document.getElementById('goTrack');
const cards = document.querySelectorAll('.go-card');
const totalCards = cards.length;

function moveGoSlider(direction) {
    currentIndex += direction;

    // The Infinite Logic
    if (currentIndex >= totalCards) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalCards - 1;
    }

    updateSlider();
}

function updateSlider() {
    const card = cards[0];
    const cardWidth = card.offsetWidth;
    const gap = 40; 

    // Calculate movement
    const moveDistance = (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${moveDistance}px)`;

    // Update active state for opacity/scale
    cards.forEach((c, index) => {
        if (index === currentIndex) {
            c.classList.add('active');
        } else {
            c.classList.remove('active');
        }
    });
}

setInterval(() => moveGoSlider(1), 5000);