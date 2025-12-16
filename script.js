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
    const navItems = document.querySelectorAll('.nav__item');
    const body = document.body;

    if (burgerToggle && nav) {
        function closeMenu() {
            burgerToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Сбрасываем задержки анимации для элементов при закрытии
            navItems.forEach(function(item) {
                item.style.transitionDelay = '0s';
            });
        }

        function openMenu() {
            burgerToggle.classList.add('active');
            nav.classList.add('active');
            body.classList.add('menu-open');
            
            // Восстанавливаем задержки анимации для элементов при открытии
            navItems.forEach(function(item, index) {
                item.style.transitionDelay = (0.1 + index * 0.05) + 's';
            });
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

    // Универсальное модальное окно
    const universalModal = document.getElementById('universalModal');
    const universalModalTitle = document.getElementById('universalModalLabel');
    const universalModalBody = document.getElementById('universalModalBody');
    
    // Шаблоны содержимого для модального окна
    const modalTemplates = {
        'auth': `
            <form id="authForm">
                <div class="mb-3">
                    <label for="authEmail" class="form-label">Email или логин</label>
                    <input type="text" class="form-control" id="authEmail" placeholder="Введите email или логин" required>
                </div>
                <div class="mb-3">
                    <label for="authPassword" class="form-label">Пароль</label>
                    <input type="password" class="form-control" id="authPassword" placeholder="Введите пароль" required>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="rememberMe">
                    <label class="form-check-label" for="rememberMe">
                        Запомнить меня
                    </label>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Войти</button>
                </div>
                <div class="text-center mt-3">
                    <a href="#" class="text-decoration-none">Забыли пароль?</a>
                </div>
            </form>
        `
    };

    // Обработчик открытия модального окна
    if (universalModal) {
        universalModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget; // Кнопка, которая открыла модальное окно
            const modalTitle = button.getAttribute('data-modal-title') || 'Заголовок';
            const modalContent = button.getAttribute('data-modal-content') || '';
            const modalBodyHtml = button.getAttribute('data-modal-body-html') || '';
            
            // Устанавливаем заголовок
            universalModalTitle.textContent = modalTitle;
            
            // Устанавливаем содержимое
            if (modalBodyHtml) {
                // Если указан HTML напрямую
                universalModalBody.innerHTML = modalBodyHtml;
            } else if (modalContent && modalTemplates[modalContent]) {
                // Если указан шаблон
                universalModalBody.innerHTML = modalTemplates[modalContent];
            } else if (modalContent) {
                // Если указан текст
                universalModalBody.textContent = modalContent;
            } else {
                universalModalBody.innerHTML = '<p>Содержимое модального окна</p>';
            }
        });

        // Обработка отправки формы авторизации
        universalModal.addEventListener('shown.bs.modal', function() {
            const authForm = document.getElementById('authForm');
            if (authForm) {
                authForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Здесь можно добавить логику авторизации
                    console.log('Форма авторизации отправлена');
                    // Пример: можно закрыть модальное окно после успешной авторизации
                    // const modalInstance = bootstrap.Modal.getInstance(universalModal);
                    // modalInstance.hide();
                });
            }
        });
    }

    // Функция для программного открытия модального окна
    window.openModal = function(title, content, bodyHtml) {
        if (!universalModal) return;
        
        const modalTitle = title || 'Заголовок';
        universalModalTitle.textContent = modalTitle;
        
        if (bodyHtml) {
            universalModalBody.innerHTML = bodyHtml;
        } else if (content && modalTemplates[content]) {
            universalModalBody.innerHTML = modalTemplates[content];
        } else if (content) {
            universalModalBody.textContent = content;
        } else {
            universalModalBody.innerHTML = '<p>Содержимое модального окна</p>';
        }
        
        const modal = new bootstrap.Modal(universalModal);
        modal.show();
    };
});