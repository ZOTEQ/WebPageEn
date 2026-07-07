document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let currentIndex = 0;
    let autoPlayInterval = null;
    const AUTO_PLAY_DELAY = 5000;
    
    function updateSlide(index, direction) {
        const prevIndex = currentIndex;

        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev-slide');

            if (i === index) {
                if (direction === 'prev') {
                    slide.classList.add('prev-slide');
                }
                setTimeout(() => {
                    slide.classList.add('active');
                }, 20);
            }
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });

        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        updateSlide(nextIndex, 'next');
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(prevIndex, 'prev');
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            const direction = index > currentIndex ? 'next' : 'prev';
            updateSlide(index, direction);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    const carousel = document.querySelector('.ff-hub-carousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const SWIPE_THRESHOLD = 50;
        const diff = touchStartX - touchEndX;
        
        if (diff > SWIPE_THRESHOLD) {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (diff < -SWIPE_THRESHOLD) {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    startAutoPlay();
});

document.addEventListener('DOMContentLoaded', () => {
    const seriesData = [
        {
            name: 'Floropale',
            nameEn: 'Fruity, green',
            meta: 'CAS no. 5182-36-5 | FEMA no. -',
            color: '#2d5a3d',
            bg: 'images/Home_floropale_800x800.jpg',
            desc: 'Fresh green-floral with hints of rhubarb, grapefruit, chrysanthemum, cypress, and gardenia',
            icon: 'images/Icon_odor_Florol.svg'
        },
        {
            name: 'Melonal',
            nameEn: 'Melon, Fruity',
            meta: 'CAS no. 106-72-9 | FEMA no. 2389',
            color: '#c76a3f',
            bg: 'images/Home_Melonal_800x800.jpg',
            desc: 'Sweet green notes, reminiscent of melon rind, accented by subtle florals',
            icon: 'images/Icon_odor_Fruity.svg'
        },
        {
            name: 'Magnolene',
            nameEn: 'Floral, Green',
            meta: 'CAS no. 27606-09-3 | FEMA no. -',
            color: '#4a3728',
            bg: 'images/Home_Magnolene_800x800.jpg',
            desc: 'Floral-green: magnolia, peony, geranium, grapefruit, lychee, with a hint of indole',
            icon: 'images/Icon_odor_Florol.svg'
        },
        {
            name: 'Boisambrane Forte',
            nameEn: 'Amber, Woody',
            meta: 'CAS no. 58567-11-6 | FEMA no. -',
            color: '#8b5a6b',
            bg: 'images/Home_Boisambrane_800x800.jpg',
            desc: 'A classic amber note harmoniously intertwined with a refined woody element.',
            icon: 'images/Icon_odor_Woody.svg'
        }
    ];

    let activeIndex = null;
    let isMobile = window.innerWidth <= 768;

    function getIconSVG(iconPath) {
        return `<div class="icon-image" style="width: 48px; height: 48px; background-color: #ffffff; -webkit-mask-image: url('${iconPath}'); mask-image: url('${iconPath}'); -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center;"></div>`;
    }

    function preloadImages() {
        seriesData.forEach(series => {
            const img = new Image();
            img.src = series.bg;
        });
    }

    function buildDesktop() {
        const container = document.getElementById('desktopAccordion');
        if (!container) return;

        container.innerHTML = '';

        seriesData.forEach((series, index) => {
            const panel = document.createElement('div');
            panel.className = 'accordion-panel';
            panel.setAttribute('role', 'button');
            panel.setAttribute('tabindex', '0');
            panel.setAttribute('aria-label', `View ${series.name} series`);

            panel.innerHTML = `
                <div class="panel-bg" style="background-image: url('${series.bg}');"></div>
                <div class="panel-overlay" style="background-color: ${series.color}; opacity: 0.65"></div>
                <div class="icon-badge">${getIconSVG(series.icon)}</div>
                <div class="panel-content">
                    <span class="panel-title-vertical">${series.name}</span>
                </div>
                <div class="panel-expanded">
                    <span class="name-en">${series.nameEn}</span>
                    <h3 class="name">${series.name}</h3>
                    <div class="name-meta">${series.meta}</div>
                    <p class="desc">${series.desc}</p>
                    <button class="btn" aria-label="Explore ${series.name}">
                        <span>Learn More</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            `;

            panel.addEventListener('mouseenter', () => {
                if (isMobile) return;
                setActiveDesktop(index);
            });

            panel.addEventListener('mouseleave', () => {
                if (isMobile) return;
                setActiveDesktop(null);
            });

            panel.addEventListener('focus', () => {
                if (isMobile) return;
                setActiveDesktop(index);
            });

            panel.addEventListener('blur', () => {
                if (isMobile) return;
                setActiveDesktop(null);
            });

            panel.addEventListener('keydown', (e) => {
                if (isMobile) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveDesktop(activeIndex === index ? null : index);
                }
            });

            container.appendChild(panel);
        });
    }

    function setActiveDesktop(index) {
        const panels = document.querySelectorAll('.accordion-panel');

        panels.forEach((panel, i) => {
            const bg = panel.querySelector('.panel-bg');
            const overlay = panel.querySelector('.panel-overlay');
            const title = panel.querySelector('.panel-title-vertical');
            const expanded = panel.querySelector('.panel-expanded');

            const isActive = index !== null && i === index;

            panel.style.width = index === null ? '25%' : (isActive ? '45%' : '18.33%');
            overlay.style.opacity = isActive ? '0.25' : '0.65';
            title.style.opacity = isActive ? '0' : '1';
            expanded.classList.toggle('active', isActive);
            panel.classList.toggle('active', isActive);

            panel.setAttribute('aria-expanded', isActive.toString());
        });

        activeIndex = index;
    }

    function buildMobile() {
        const container = document.getElementById('mobileAccordion');
        if (!container) return;

        container.innerHTML = '';

        seriesData.forEach((series, index) => {
            const panel = document.createElement('div');
            panel.className = 'mobile-panel';
            panel.setAttribute('role', 'button');
            panel.setAttribute('tabindex', '0');
            panel.setAttribute('aria-label', `View ${series.name} series`);
            panel.setAttribute('aria-expanded', 'false');

            panel.innerHTML = `
                <div class="panel-bg" style="background-image: url('${series.bg}')"></div>
                <div class="panel-overlay" style="background-color: ${series.color}; opacity: 0.65"></div>
                <div class="mobile-content">
                    <div class="icon-badge">${getIconSVG(series.icon)}</div>
                    <span class="mobile-name-en">${series.nameEn}</span>
                    <h3 class="mobile-name">${series.name}</h3>
                    <div class="mobile-meta">${series.meta}</div>
                    <p class="mobile-desc">${series.desc}</p>
                    <button class="mobile-btn" aria-label="Learn more about ${series.name}">
                        <span>Learn More</span>
                    </button>
                </div>
            `;

            panel.addEventListener('click', () => {
                if (!isMobile) return;
                toggleMobilePanel(index);
            });

            panel.addEventListener('keydown', (e) => {
                if (!isMobile) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMobilePanel(index);
                }
            });

            container.appendChild(panel);
        });
    }

    function toggleMobilePanel(index) {
        const panels = document.querySelectorAll('.mobile-panel');
        const isActive = activeIndex === index;

        panels.forEach((panel, i) => {
            const isTarget = i === index;

            if (isTarget && !isActive) {
                panel.classList.add('active');
                panel.setAttribute('aria-expanded', 'true');
                panel.querySelector('.panel-overlay').style.opacity = '0.3';
            } else {
                panel.classList.remove('active');
                panel.setAttribute('aria-expanded', 'false');
                panel.querySelector('.panel-overlay').style.opacity = '0.65';
            }
        });

        activeIndex = isActive ? null : index;
    }

    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        if (wasMobile !== isMobile) {
            activeIndex = null;
            buildDesktop();
            buildMobile();
        }
    });

    preloadImages();
    buildDesktop();
    buildMobile();
});

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const navbar = document.getElementById('navbar');
    const hoverElements = document.querySelectorAll('a, button, .new-launch-card, .explore-zoteq-card, .ff-hub-card, .brief-operational-card, .our-partner-logo, .timeline-item');

    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateCursor() {
        cursorX += (targetX - cursorX) * 0.12;
        cursorY += (targetY - cursorY) * 0.12;
        cursor.style.left = cursorX - 6 + 'px';
        cursor.style.top = cursorY - 6 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-open');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    const reveals = document.querySelectorAll('.reveal, .reveal-scale');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => observer.observe(reveal));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const floatingElements = document.querySelectorAll('.floating-element');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 0.03;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    function animateNumbers() {
        const cards = document.querySelectorAll('.modern-card');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const target = parseFloat(card.dataset.target);
                    const numberEl = card.querySelector('.counter');
                    const suffixEl = card.querySelector('.suffix');
                    const suffix = suffixEl ? suffixEl.textContent : '';
                    
                    if (target && numberEl && !card.classList.contains('animated')) {
                        setTimeout(() => {
                            card.classList.add('animated');
                            
                            const duration = 2000;
                            const startTime = performance.now();
                            
                            function updateNumber(currentTime) {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                                let currentValue = target * easeOutCubic;
                                
                                let displayValue;
                                if (suffix === 'K+') {
                                    displayValue = Math.floor(currentValue / 1000);
                                } else if (target >= 1000) {
                                    displayValue = Math.floor(currentValue).toLocaleString();
                                } else if (Number.isInteger(target)) {
                                    displayValue = Math.floor(currentValue);
                                } else {
                                    displayValue = currentValue.toFixed(1);
                                }
                                
                                numberEl.textContent = displayValue;
                                
                                if (progress < 1) {
                                    requestAnimationFrame(updateNumber);
                                }
                            }
                            
                            requestAnimationFrame(updateNumber);
                        }, index * 80);
                    }
                }
            });
        }, observerOptions);

        cards.forEach(card => observer.observe(card));
    }

    animateNumbers();

    const ffHubCards = document.querySelectorAll('.ff-hub-card');
    
    ffHubCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('ff-hub-card--front')) return;
            
            const frontCard = document.querySelector('.ff-hub-card--front');
            const topCard = document.querySelector('.ff-hub-card--back.ff-hub-card--top');
            const bottomCard = document.querySelector('.ff-hub-card--back.ff-hub-card--bottom');
            
            frontCard.classList.remove('ff-hub-card--front');
            
            if (card.classList.contains('ff-hub-card--top')) {
                card.classList.remove('ff-hub-card--back', 'ff-hub-card--top');
                card.classList.add('ff-hub-card--front');
                frontCard.classList.add('ff-hub-card--back', 'ff-hub-card--bottom');
            } else if (card.classList.contains('ff-hub-card--bottom')) {
                card.classList.remove('ff-hub-card--back', 'ff-hub-card--bottom');
                card.classList.add('ff-hub-card--front');
                frontCard.classList.add('ff-hub-card--back', 'ff-hub-card--top');
            }
        });
    });
});