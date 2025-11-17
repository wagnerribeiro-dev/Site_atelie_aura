// Inicializa Lucide icons
        lucide.createIcons();

        // ------------------------------------
        // 1. JS GERAL & ANIMAÇÕES
        // ------------------------------------

        // Efeito Fade-In (Animações sutis ao entrar na viewport)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-4');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-fade-in').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700', 'ease-out');
            observer.observe(el);
        });
        
        // Esconde loader após carregar
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });

        // ------------------------------------
        // 2. NAVEGAÇÃO E SCROLL
        // ------------------------------------

        // Toggle do Menu Mobile
        document.getElementById('mobile-menu-button').addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        // Simulação do Contador Regressivo (Estático no HTML, mas com JS para efeito)
        function updateCounter() {
            // Este contador é meramente ilustrativo para simular urgência
            let s = parseInt(document.getElementById('seconds').textContent);
            s = (s - 1 + 60) % 60;
            document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
        }
        setInterval(updateCounter, 1000);


        // ------------------------------------
        // 3. CARROSSÉIS
        // ------------------------------------

        function setupCarousel(id, autoplay = false) {
            const container = document.getElementById(id);
            const items = container.querySelectorAll('.carousel-item');
            const prevButton = document.getElementById(`prev-${id.split('-')[1]}`);
            const nextButton = document.getElementById(`next-${id.split('-')[1]}`);
            let currentIndex = 0;
            let autoplayInterval;

            if (items.length === 0) return;

            const updateCarousel = (index) => {
                // Calcula a largura de um item mais o padding para rolagem
                const itemWidth = items[0].offsetWidth;
                container.scrollLeft = itemWidth * index;
                currentIndex = index;
            };

            const goToNext = () => {
                let itemsPerView = 1;
                if (window.innerWidth >= 1024) itemsPerView = 3; // lg breakpoint
                else if (window.innerWidth >= 768) itemsPerView = 2; // md breakpoint

                // Calcula o próximo índice. Se for o último, volta ao 0 (loop infinito simulado)
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel(currentIndex);
            };

            const goToPrev = () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel(currentIndex);
            };

            prevButton.addEventListener('click', goToPrev);
            nextButton.addEventListener('click', goToNext);

            // Autoplay (apenas para o Carrossel 1)
            if (autoplay) {
                const startAutoplay = () => {
                    autoplayInterval = setInterval(goToNext, 4000); // Rola a cada 4 segundos
                };
                
                const stopAutoplay = () => {
                    clearInterval(autoplayInterval);
                };
                
                startAutoplay();
                
                // Pausa ao passar o mouse
                container.addEventListener('mouseenter', stopAutoplay);
                container.addEventListener('mouseleave', startAutoplay);
            }
        }

        // Configura Carrossel 1 (Coleção) - Autoplay ON
        setupCarousel('carousel-1', true);

        // Configura Carrossel 2 (Galeria) - Autoplay OFF
        setupCarousel('carousel-2', false);


        // ------------------------------------
        // 4. LIGHTBOX (Galeria)
        // ------------------------------------

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const galleryItems = document.querySelectorAll('#carousel-2 .carousel-item');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imageUrl = item.getAttribute('data-img-url');
                const altText = item.querySelector('p').textContent;

                lightboxImg.src = imageUrl;
                lightboxImg.alt = altText;
                lightbox.style.display = 'flex';
                lightbox.setAttribute('aria-hidden', 'false');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                lightbox.setAttribute('aria-hidden', 'true');
            }
        });

        // ------------------------------------
        // 5. FAQ (Accordion)
        // ------------------------------------
        document.querySelectorAll('.faq-button').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('i');
                const isExpanded = button.getAttribute('aria-expanded') === 'true';

                // Fecha todos os outros
                document.querySelectorAll('.faq-button').forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.setAttribute('aria-expanded', 'false');
                        otherButton.nextElementSibling.style.maxHeight = '0';
                        otherButton.querySelector('i').classList.remove('rotate-180');
                    }
                });

                // Abre ou fecha o item clicado
                if (!isExpanded) {
                    button.setAttribute('aria-expanded', 'true');
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.classList.add('rotate-180');
                } else {
                    button.setAttribute('aria-expanded', 'false');
                    content.style.maxHeight = '0';
                    icon.classList.remove('rotate-180');
                }
            });
        });
        //menu principal fixo ao rolar a pagina
        window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    const logo = document.getElementById('logo-img');

    if (window.scrollY > 80) {
        // Aplica fundo mais escuro e logo branca translúcida
        header.classList.add('bg-fundo-aura/95', 'shadow-md');
        logo.src = 'src/imagens/logo_loja_branco.png'; // 🔁 versão branca do logo
    } else {
        // Volta ao original
        header.classList.remove('bg-fundo-aura/95', 'shadow-md');
        logo.src = 'src/imagens/logo_loja.jpg'; // 🌸 versão original
    }
    });