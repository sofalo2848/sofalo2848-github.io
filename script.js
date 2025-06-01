// mobile menu functionality
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

// mobile menu with animation
const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('menu-open');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    menuButton.classList.toggle('rotate-180', isMenuOpen);
};

menuButton.addEventListener('click', toggleMenu);

// close menu when clicking on mobile links
const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
Array.from(mobileMenuLinks).forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// parallax scrolling effect
const parallaxElements = document.querySelectorAll('.parallax');
let ticking = false;
let scrollPosition = 0;

// update parallax positions on scroll
const updateParallax = () => {
    const currentScroll = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const movement = (currentScroll * speed);
        element.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
    
    scrollPosition = currentScroll;
    ticking = false;
};

// optimize scroll performance with requestAnimationFrame
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
        });
        ticking = true;
    }
});

// intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// add animation when elements come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// gallery image data
const galleryImages = [
    { url: 'images/image-11.png', caption: 'Modern Library Interior', category: 'Academic' },
    { url: 'images/image-12.png', caption: 'Computer Lab Facilities', category: 'Technology' },
    { url: 'images/image-13.png', caption: 'Rooftop Campus View', category: 'Campus' },
    { url: 'images/image-14.png', caption: 'Tree-lined Student Walkway', category: 'Campus Life' },
    { url: 'images/image-15.png', caption: 'East Plaza Entrance', category: 'Campus' },
    { url: 'images/image-16.png', caption: 'Exhibition Hall', category: 'Events' }
];

// initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    // create and append gallery slides
    galleryImages.forEach(image => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img src="${image.url}" alt="${image.caption}" class="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div class="text-white">
                        <span class="text-emerald-400 uppercase tracking-wider text-xs font-medium block mb-2">${image.category}</span>
                        <h3 class="text-xl font-medium">${image.caption}</h3>
                    </div>
                </div>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });

    // initialize Swiper carousel with custom config
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        }
    });
});

// smooth scroll functionality for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// header scroll behavior
const header = document.querySelector('header');
let lastScroll = 0;
const scrollThreshold = 100;

// udate header appearance on scroll
const updateHeader = () => {
    const currentScroll = window.pageYOffset;
    const scrollingDown = currentScroll > lastScroll;
    
    if (currentScroll > scrollThreshold) {
        header.classList.add('shadow-md');
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        
        if (scrollingDown) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.classList.remove('shadow-md');
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
};

let headerTicking = false;
window.addEventListener('scroll', () => {
    if (!headerTicking) {
        window.requestAnimationFrame(() => {
            updateHeader();
            headerTicking = false;
        });
        headerTicking = true;
    }
});

// initialize animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}); 