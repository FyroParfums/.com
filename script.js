// 1. DATABASE UNTUK PENCARIAN & NAVIGASI
const searchData = [
    // Data Parfum
    { id: 'whitegoddess', name: 'White Goddess', brand: 'Musky', type: 'perfume' },
    { id: 'thequeen', name: 'The Queen', brand: 'Sweet', type: 'perfume' },
    { id: 'enchantress', name: 'Enchantress', brand: 'Fruity', type: 'perfume' },
    { id: 'angele', name: 'Angele', brand: 'Floral', type: 'perfume' },
    
    // Data News & Halaman (DITAMBAHKAN TENTANG KAMI)
    { id: 'Tentang Kami.html', name: 'Tentang Kami', brand: 'Fyro', type: 'page' },
    { id: 'artikel2.html', name: 'Hari Valentine Masih Belum Ketemu Aroma Parfum yang Cocok Untuk Pasangan? Disini Solusinya!', brand: 'Tips', type: 'news' },
    { id: 'artikel1.html', name: 'Cara Mencari Aroma Parfum Terbaik', brand: 'Tips', type: 'news' },
    { id: 'news.html', name: 'Koleksi Terbaru 2026', brand: 'News', type: 'news' }
];

// 2. FUNGSI TOAST BUBBLE
function showToast(message) {
    const oldToast = document.getElementById('search-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'search-toast';
    toast.className = `
        fixed bottom-10 left-1/2 -translate-x-1/2 
        bg-[#800000] text-white px-6 py-3 rounded-full 
        text-xs font-bold uppercase tracking-widest shadow-2xl 
        z-[999] transition-all duration-500 opacity-0 translate-y-5
    `;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => { toast.classList.remove('opacity-0', 'translate-y-5'); }, 100);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-5');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 3. FUNGSI NAVIGASI UTAMA
function processNavigation(itemName) {
    const item = searchData.find(s => s.name === itemName);
    
    // Jika tipe 'news' atau 'page', langsung pindah link
    if (item && (item.type === 'news' || item.type === 'page')) {
        window.location.href = item.id;
    } else if (item) {
        // Jika parfum, simpan untuk auto-scroll
        localStorage.setItem('scrollToPerfume', itemName.toLowerCase());
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        } else {
            executeAutoScroll();
        }
    }
}

// 4. FUNGSI AUTOCOMPLETE
function showSuggestions() {
    const input = document.getElementById('mainSearch');
    let box = document.getElementById('searchSuggestions');
    
    if (!box) {
        const container = input.parentElement;
        box = document.createElement('div');
        box.id = 'searchSuggestions';
        box.className = 'absolute top-full left-0 w-full bg-white shadow-xl rounded-b-md z-[200] border border-gray-200';
        container.appendChild(box);
    }

    const query = input.value.toLowerCase().trim();
    if (query.length < 1) { box.classList.add('hidden'); return; }

    const matches = searchData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.brand.toLowerCase().includes(query)
    );

    box.classList.remove('hidden');

    if (matches.length > 0) {
        box.innerHTML = matches.map(item => `
            <div onclick="processNavigation('${item.name}')" 
                class="px-5 py-3 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-center text-black">
                <div>
                    <span class="text-sm font-bold text-gray-800">${item.name}</span>
                    <p class="text-[10px] text-gray-400 uppercase">${item.brand}</p>
                </div>
                <span class="text-[9px] font-black px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase">${item.type}</span>
            </div>
        `).join('');
    } else {
        box.innerHTML = `<div class="px-5 py-4 text-center text-gray-500 italic text-sm">tidak ada dalam penelusuran</div>`;
    }
}

// 5. FUNGSI SEARCH UTAMA
function performSearch() {
    const input = document.getElementById('mainSearch');
    const query = input.value.toLowerCase().trim();

    if (query === "") {
        showToast("ketik untuk menelusuri");
        input.focus();
        return;
    }

    const match = searchData.find(item => 
        item.name.toLowerCase().includes(query) || 
        item.brand.toLowerCase().includes(query)
    );

    if (match) {
        processNavigation(match.name);
    } else {
        showToast("tidak ditemukan");
    }
}

// 6. FUNGSI SCANNER UNTUK AUTO-SCROLL
function executeAutoScroll() {
    const targetName = localStorage.getItem('scrollToPerfume');
    if (!targetName) return;

    const headers = document.querySelectorAll('h2');
    let foundElement = null;

    headers.forEach(h2 => {
        if (h2.innerText.toLowerCase().includes(targetName)) {
            foundElement = h2;
        }
    });

    if (foundElement) {
        setTimeout(() => {
            foundElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            foundElement.classList.add('text-red-900');
            setTimeout(() => { foundElement.classList.remove('text-red-900'); }, 2000);
            localStorage.removeItem('scrollToPerfume');
        }, 600);
    }
}

// 7. LOAD KONTEN BERANDA
const homeData = {
    newArrivals: [
        { name: "Angele", brand: "FYRO", img: "AG1.png" },
        { name: "Enchantress", brand: "FYRO", img: "EN1.png" },
        { name: "The Queen", brand: "FYRO", img: "TQ1.png" },
        { name: "White Goddess", brand: "FYRO", img: "WG1.png" }
    ],
    bestSellers: [
        { name: "Angele", brand: "Floral" }, { name: "White Goddess", brand: "Musky" },
        { name: "Enchantress", brand: "Fruity" }, { name: "The Queen", brand: "Sweet" }
    ]
};

function loadHomeContent() {
    const newGrid = document.getElementById('newPerfumesGrid');
    if (newGrid) {
        newGrid.innerHTML = homeData.newArrivals.map(p => `
            <div class="perfume-card-mini cursor-pointer group" onclick="processNavigation('${p.name}')">
                <div class="overflow-hidden rounded-md mb-2">
                    <img src="${p.img}" class="group-hover:scale-110 transition duration-500 w-full h-auto">
                </div>
                <p class="text-[10px] font-bold text-red-900 uppercase">${p.brand}</p>
                <p class="text-[11px] font-medium text-gray-700 truncate">${p.name}</p>
            </div>
        `).join('');
    }

    const bestList = document.getElementById('bestSellerList');
    if (bestList) {
        bestList.innerHTML = homeData.bestSellers.map((p, index) => `
            <div class="best-item hover:bg-gray-50 cursor-pointer flex items-center p-3 gap-4" onclick="processNavigation('${p.name}')">
                <span class="text-lg font-black text-gray-300">#${index + 1}</span>
                <div><p class="text-[11px] font-bold text-gray-800">${p.name}</p><p class="text-[9px] text-gray-500 uppercase">${p.brand}</p></div>
            </div>
        `).join('');
    }
}

// 8. INISIALISASI
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('mainSearch');
    if (input) {
        input.addEventListener('input', showSuggestions);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
    }
    document.addEventListener('click', (e) => {
        const box = document.getElementById('searchSuggestions');
        if (box && e.target.id !== 'mainSearch') box.classList.add('hidden');
    });
    loadHomeContent();
    executeAutoScroll();
});
