// Mobil menü için toggle fonksiyonu
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.innerHTML = '☰';
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.insertBefore(menuButton, navLinks);

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Aktif sayfayı işaretle
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Sayfa yüklendiğinde animasyon
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }

    // Grup butonları için işlevsellik
    const joinButtons = document.querySelectorAll('.join-button');
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const groupName = this.closest('.group-card').querySelector('h3').textContent;
            showNotification(`${groupName} qrupuna qoşulma müraciətiniz göndərildi!`, 'success');
        });
    });

    // Not yükleme formu için işlevsellik
    const uploadForm = document.querySelector('.upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fileInput = this.querySelector('.file-input');
            if (fileInput.files.length > 0) {
                showNotification('Fayl uğurla yükləndi!', 'success');
                fileInput.value = '';
            } else {
                showNotification('Zəhmət olmasa fayl seçin!', 'error');
            }
        });
    }

    // Not indirme ve paylaşma butonları için işlevsellik
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const noteTitle = this.closest('.note-card').querySelector('h3').textContent;
            showNotification(`${noteTitle} yüklənir...`, 'info');
        });
    });

    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const noteTitle = this.closest('.note-card').querySelector('h3').textContent;
            showNotification(`${noteTitle} paylaşım linki kopyalandı!`, 'success');
        });
    });

    // Etkinlik kayıt butonları için işlevsellik
    const registerButtons = document.querySelectorAll('.register-button');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventTitle = this.closest('.event-card').querySelector('.event-title').textContent;
            showNotification(`${eventTitle} tədbirinə qeydiyyatınız uğurla tamamlandı!`, 'success');
        });
    });

    // İndirim butonları için işlevsellik
    const discountButtons = document.querySelectorAll('.get-discount-button');
    discountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const discountTitle = this.closest('.discount-card').querySelector('.discount-title').textContent;
            const discountBadge = this.closest('.discount-card').querySelector('.discount-badge').textContent;
            showNotification(`${discountTitle} - ${discountBadge} endirimi uğurla aktivləşdirildi!`, 'success');
        });
    });

    // Bildiriş sistemi
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Səhifə yüklənmə animasiyası
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll effekti
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);

// Səhifə yüklənməsi
document.addEventListener('DOMContentLoaded', () => {
    // Scroll effektini başlat
    scrollReveal();
    
    // Səhifə keçid animasiyası
    document.body.classList.add('page-transition');
    
    // Kartlar üçün hover effekti
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Form validasiyası
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    showNotification('Bütün məcburi sahələri doldurun!', 'error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                showNotification('Məlumatlar uğurla göndərildi!', 'success');
                form.reset();
            }
        });
    });
    
    // Axtarış funksionallığı
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.searchable-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Filtrləmə funksionallığı
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            const items = document.querySelectorAll('.filterable-item');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Sıralama funksionallığı
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            const container = document.querySelector('.sortable-container');
            const items = Array.from(container.children);
            
            items.sort((a, b) => {
                const aValue = a.dataset[sortBy];
                const bValue = b.dataset[sortBy];
                
                if (sortBy === 'date') {
                    return new Date(bValue) - new Date(aValue);
                }
                
                return aValue.localeCompare(bValue);
            });
            
            items.forEach(item => container.appendChild(item));
        });
    }
}); 