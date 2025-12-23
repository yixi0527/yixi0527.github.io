/**
 * Main JavaScript file for personal page
 * Handles dynamic content loading from JSON data files
 */

// ========================================
// Configuration
// ========================================
const CONFIG = {
    dataPath: 'data/',
    files: {
        profile: 'profile.json',
        about: 'about.json',
        publications: 'publications.json'
    }
};

// ========================================
// Utility Functions
// ========================================

/**
 * Fetch JSON data from a file
 * @param {string} filename - Name of the JSON file
 * @returns {Promise<Object>} - Parsed JSON data
 */
async function fetchData(filename) {
    try {
        const response = await fetch(CONFIG.dataPath + filename);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

// ========================================
// Render Functions
// ========================================

/**
 * Render profile information (name, title, social links)
 */
async function renderProfile() {
    const data = await fetchData(CONFIG.files.profile);
    if (!data) return;

    // Update hero section
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    const heroAffiliation = document.getElementById('hero-affiliation');
    const avatar = document.getElementById('avatar');

    if (heroName) heroName.textContent = data.name;
    if (heroTitle) heroTitle.textContent = data.title;
    if (heroAffiliation) heroAffiliation.textContent = data.affiliation;
    if (avatar) avatar.src = data.avatar;

    // Render social links
    const socialLinksContainer = document.getElementById('social-links');
    if (socialLinksContainer && data.socialLinks) {
        socialLinksContainer.innerHTML = data.socialLinks.map(link => `
            <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="${link.icon}"></i>
                <span>${link.name}</span>
            </a>
        `).join('');
    }
}

/**
 * Render about section content
 */
async function renderAbout() {
    const data = await fetchData(CONFIG.files.about);
    if (!data) return;

    // Render about content
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        aboutContent.innerHTML = `
            <p class="intro">${data.intro}</p>
            <p class="description">${data.description}</p>
            <div class="academic-bg">
                <h3>${data.academicBackground.title}</h3>
                <p>${data.academicBackground.content}</p>
            </div>
        `;
    }

    // Render research interests
    const interestsGrid = document.getElementById('interests-grid');
    if (interestsGrid && data.researchInterests) {
        interestsGrid.innerHTML = data.researchInterests.map(interest => `
            <div class="interest-card">
                <div class="icon">
                    <i class="${interest.icon}"></i>
                </div>
                <h3>${interest.title}</h3>
                <p>${interest.description}</p>
            </div>
        `).join('');
    }

    // Render contact section
    const contactContent = document.getElementById('contact-content');
    if (contactContent) {
        const profile = await fetchData(CONFIG.files.profile);
        const emailLink = profile?.socialLinks?.find(link => link.name === 'Email');
        
        contactContent.innerHTML = `
            <p class="contact-intro">${data.contactIntro}</p>
            <div class="contact-info">
                ${emailLink ? `
                    <div class="contact-item">
                        <div class="icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <a href="${emailLink.url}">${emailLink.url.replace('mailto:', '')}</a>
                    </div>
                ` : ''}
                ${profile?.socialLinks?.filter(link => link.name !== 'Email').map(link => `
                    <div class="contact-item">
                        <div class="icon">
                            <i class="${link.icon}"></i>
                        </div>
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>
                    </div>
                `).join('') || ''}
            </div>
        `;
    }
}

/**
 * Render publications section
 */
async function renderPublications() {
    const data = await fetchData(CONFIG.files.publications);
    if (!data) return;

    const publicationsList = document.getElementById('publications-list');
    if (!publicationsList) return;

    if (!data.publications || data.publications.length === 0) {
        publicationsList.innerHTML = `
            <div class="no-publications">
                <p>Publications coming soon...</p>
            </div>
        `;
        return;
    }

    publicationsList.innerHTML = data.publications.map(pub => `
        <article class="publication-card">
            <span class="pub-year">${pub.year}</span>
            <h3 class="pub-title">
                ${pub.links?.paper ? 
                    `<a href="${pub.links.paper}" target="_blank" rel="noopener noreferrer">${pub.title}</a>` : 
                    pub.title
                }
            </h3>
            <p class="pub-authors">${pub.authors}</p>
            <p class="pub-venue">${pub.venue}</p>
            <p class="pub-abstract">${pub.abstract}</p>
            <div class="pub-links">
                ${pub.links?.paper ? `
                    <a href="${pub.links.paper}" class="pub-link primary" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Paper
                    </a>
                ` : ''}
                ${pub.links?.pdf ? `
                    <a href="${pub.links.pdf}" class="pub-link secondary" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-file-pdf"></i> PDF
                    </a>
                ` : ''}
                ${pub.links?.code ? `
                    <a href="${pub.links.code}" class="pub-link secondary" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Code
                    </a>
                ` : ''}
            </div>
        </article>
    `).join('');
}

/**
 * Update footer year
 */
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========================================
// Navigation scroll effect
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ========================================
// Smooth scroll for navigation links
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    // Load all content
    await Promise.all([
        renderProfile(),
        renderAbout(),
        renderPublications()
    ]);

    // Initialize UI features
    updateFooterYear();
    initNavbarScroll();
    initSmoothScroll();
});
