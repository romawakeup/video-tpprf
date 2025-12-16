document.addEventListener('DOMContentLoaded', function() {
    const calendarSwiper = new Swiper('.calendar-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 1000,
        effect: 'slide',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });

    // Функционал кнопки "Загрузить еще"
    const loadMoreBtn = document.querySelector('.btn-load-more');
    const newsList = document.querySelector('.news-page__list');
    
    if (loadMoreBtn && newsList) {
        const newsCards = newsList.querySelectorAll('.col-12.col-sm-6.col-md-3.py-3');
        const templateCards = Array.from(newsCards).slice(0, 4);
        
        loadMoreBtn.addEventListener('click', function() {
            templateCards.forEach(function(card, index) {
                const clonedCard = card.cloneNode(true);
                clonedCard.style.opacity = '0';
                clonedCard.style.transform = 'translateY(20px)';
                clonedCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                newsList.appendChild(clonedCard);
                
                setTimeout(function() {
                    clonedCard.style.opacity = '1';
                    clonedCard.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }

    // Функционал бургер-меню
    const burgerToggle = document.querySelector('.burger-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;

    if (burgerToggle && nav) {
        function closeMenu() {
            burgerToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }

        function openMenu() {
            burgerToggle.classList.add('active');
            nav.classList.add('active');
            body.classList.add('menu-open');
        }

        burgerToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active')) {
                if (!nav.contains(e.target) && !burgerToggle.contains(e.target)) {
                    closeMenu();
                }
            }
        });

        nav.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
            }
        });

        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 991.98) {
                    closeMenu();
                }
            }, 100);
        });
    }
});