// Fungsi Utama Menampilkan Data ke Layar
function displayPerfume(perfume) {
    // Nama & Gambar
    document.getElementById('perfumeName').innerText = `${perfume.brand} - ${perfume.name}`;
    document.getElementById('perfumeImg').src = perfume.img;

    // Render Notes (Piramida)
    const renderIcons = (id, list) => {
        const el = document.getElementById(id);
        el.innerHTML = list.map(item => `
            <div class="note-circle">
                <i class="fa fa-spa"></i>
                <span style="text-align:center">${item}</span>
            </div>
        `).join('');
    };

    renderIcons('topNotes', perfume.top);
    renderIcons('midNotes', perfume.mid);
    renderIcons('baseNotes', perfume.base);

    // Render Accords (Samping Kiri)
    const accordsEl = document.getElementById('accordsList');
    accordsEl.innerHTML = Object.entries(perfume.accords).map(([key, val]) => `
        <div class="mb-2">
            <span class="text-xs font-bold uppercase">${key}</span>
            <div class="bar-bg"><div class="bar-fill" style="width: ${val}"></div></div>
        </div>
    `).join('');
}

// FUNGSI SEARCH (INI YANG KAMU MINTA)
function performSearch() {
    const query = document.getElementById('mainSearch').value.toLowerCase();
    
    // Cari di database yang namanya atau brandnya cocok
    const result = allPerfumes.find(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query)
    );

    if (result) {
        displayPerfume(result);
    } else {
        alert("Maaf, parfum '" + query + "' tidak ditemukan.");
    }
}

// Jalankan pencarian saat tekan ENTER
document.getElementById('mainSearch').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Load data pertama kali
window.onload = () => displayPerfume(allPerfumes[0]);

// Data Tambahan untuk Home
const homeData = {
    newArrivals: [
        { name: "Floral", brand: "ANGELE", img: "AG1.png" },
        { name: "Fruity", brand: "ENCHANTRESS", img: "EN1.png" },
        { name: "Sweet", brand: "THE QUEEN", img: "TQ1.png" },
        { name: "Musky", brand: "WHITE GODDESS", img: "WG1.png" }
    ],
    bestSellers: [
        { name: "Angele", brand: "Floral" },
        { name: "White Goddess", brand: "Musky" },
        { name: "Enchantress", brand: "Fruity" },
        { name: "The Queen", brand: "Sweet" }
    ]
};

function loadHomeContent() {
    // Load New Perfumes
    const newGrid = document.getElementById('newPerfumesGrid');
    newGrid.innerHTML = homeData.newArrivals.map(p => `
        <div class="perfume-card-mini cursor-pointer">
            <img src="${p.img}">
            <p class="text-[10px] font-bold text-red-900 uppercase">${p.brand}</p>
            <p class="text-[11px] font-medium text-gray-700 truncate">${p.name}</p>
        </div>
    `).join('');

    // Load Best Sellers
    const bestList = document.getElementById('bestSellerList');
    bestList.innerHTML = homeData.bestSellers.map((p, index) => `
        <div class="best-item hover:bg-gray-50 cursor-pointer">
            <span class="rank-num">${index + 1}</span>
            <div>
                <p class="text-[11px] font-bold text-gray-800">${p.name}</p>
                <p class="text-[9px] text-gray-500 uppercase">${p.brand}</p>
            </div>
        </div>
    `).join('');
}

// Panggil fungsi ini saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadHomeContent();
    // Panggil fungsi search/history yang lama juga di sini
});
