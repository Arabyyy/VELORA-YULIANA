document.addEventListener("DOMContentLoaded", () => {
    // 1. Animasi tombol hero saat halaman dibuka
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.5s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });

    // 2. Smooth Scroll untuk tombol yang menggunakan link (#daftar, #produk)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Pastikan link tidak kosong (hanya berisi '#')
            if (href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });

    // 3. Animasi saat scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Logika untuk animasi berurutan (staggered)
                const parent = entry.target.parentElement;
                
                // Cek jika element berada di dalam grid
                if (parent && (parent.classList.contains('grid-4') || parent.classList.contains('grid-products'))) {
                    const children = Array.from(parent.children);
                    const index = children.indexOf(entry.target);
                    // Memberi jeda 0.1 detik untuk setiap kartu
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stop mengamati setelah dimunculkan agar tidak berulang-ulang
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 }); // Muncul saat 15% elemen terlihat di layar

    // 4. Daftar elemen yang akan dianimasikan saat scroll
    const animatedElements = document.querySelectorAll(
        '.card-problem, .card-solution, .card-why, .section-title, .section-desc, .prod-card, .legal-card, .founder-img, .founder-text, .highlight-text, .highlight-img'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});