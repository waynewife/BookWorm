// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.querySelector('.theme-toggle').innerHTML = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.querySelector('.theme-toggle').innerHTML = '☀️';
    }
}

// Loading Icon Functions
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Reader Function to Redirect to Custom Reader
function readBook(id) {
    if (id) {
        window.location.href = `/reader.html?id=${id}`;
    } else {
        alert('Preview not available for this book.');
    }
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelector('.theme-toggle').innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';

    // Load content based on page
    if (window.location.pathname.includes('library.html')) {
        fetchLibraryStories();
    } else if (window.location.pathname.includes('reader.html')) {
        // Reader logic is handled in reader.html's inline script
    } else {
        fetchFeaturedStory();
        fetchTopPicks();
    }

    // Search functionality
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.location.href = `/library.html?q=${encodeURIComponent(e.target.value)}`;
        }
    });
});

// Fetch Featured Story for Homepage
async function fetchFeaturedStory() {
    showLoading();
    try {
        const response = await fetch('http://localhost:3000/api/books?q=title:to+kill+a+mockingbird');
        const books = await response.json();
        if (books.length > 0) {
            const book = books[0];
            const featuredStory = document.getElementById('featuredStory');
            featuredStory.innerHTML = `
                <div class="book-card">
                    <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${book.volumeInfo.title}">
                    <div class="text">
                        <h3>${book.volumeInfo.title}</h3>
                        <p>${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                        <p>Blurred lines deepen in a dance with the devil</p>
                        <button onclick="readBook('${book.id}')">Read Now</button>
                    </div>
                </div>
            `;
            console.log('Featured book ID:', book.id); // Debug log
        } else {
            console.warn('No books found for title:to+kill+a+mockingbird query');
        }
    } catch (error) {
        console.error('Error fetching featured story:', error);
    } finally {
        hideLoading();
    }
}

// Fetch Top Picks for Homepage
async function fetchTopPicks() {
    showLoading();
    try {
        const response = await fetch('http://localhost:3000/api/books?q=top+picks');
        const books = await response.json();
        const topPicks = document.getElementById('topPicks');
        topPicks.innerHTML = books.map(book => `
            <div class="book-card">
                <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${book.volumeInfo.title}">
                <h3>${book.volumeInfo.title}</h3>
                <p>${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                <button onclick="readBook('${book.id}')">Read</button>
            </div>
        `).join('');
        console.log('Top picks IDs:', books.map(b => b.id)); // Debug log
    } catch (error) {
        console.error('Error fetching top picks:', error);
    } finally {
        hideLoading();
    }
}

// Fetch Library Stories
async function fetchLibraryStories() {
    showLoading();
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || 'fiction';
    try {
        const response = await fetch(`http://localhost:3000/api/books?q=${query}`);
        const books = await response.json();
        const libraryStories = document.getElementById('libraryStories');
        libraryStories.innerHTML = books.map(book => `
            <div class="book-card">
                <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${book.volumeInfo.title}">
                <h3>${book.volumeInfo.title}</h3>
                <p>${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                <p>Reads: ${Math.floor(Math.random() * 1000)}K | Votes: ${Math.floor(Math.random() * 500)}K</p>
                <button onclick="readBook('${book.id}')">Read</button>
            </div>
        `).join('');
        console.log('Library story IDs:', books.map(b => b.id)); // Debug log
    } catch (error) {
        console.error('Error fetching library stories:', error);
    } finally {
        hideLoading();
    }
}