(() => {
    const cfg = window.siteConfigData;
    if (!cfg) return;

    const page = document.body.dataset.page || 'Home';
    document.title = `${page} | ${cfg.siteName}`;

    const mainLinks = [
        { label: 'Home', href: 'index.html', icon: 'home' },
        { label: 'About', href: 'index.html#about', icon: 'leaf' },
        { label: 'Residential Pest Control', href: 'residential-pest-control.html', icon: 'house' },
        { label: 'Commercial Pest Control', href: 'commercial-pest-control.html', icon: 'building-2' },
        { label: 'Contact', href: 'index.html#contact', icon: 'send' }
    ];
    const policyLinks = [
        { label: 'Privacy Policy', href: 'privacy-policy.html' },
        { label: 'Terms of Service', href: 'terms-of-service.html' },
        { label: 'Cookie Policy', href: 'cookie-policy.html' }
    ];
    const footerNav = '<a href="index.html">Home</a><a href="index.html#about">About</a><a href="residential-pest-control.html">Residential</a><a href="commercial-pest-control.html">Commercial</a><a href="index.html#contact">Contact</a>';
    const desktopNav = '<a href="index.html">Home</a><a href="index.html#about">About Us</a><div class="nav-dropdown"><button type="button">Pages <i data-lucide="chevron-down"></i></button><div class="dropdown-menu"><a href="residential-pest-control.html">Residential Pest Control</a><a href="commercial-pest-control.html">Commercial Pest Control</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-service.html">Terms of Service</a><a href="cookie-policy.html">Cookie Policy</a></div></div><a href="index.html#contact">Contact</a>';
    const mobilePrimaryNav = mainLinks.map((link, index) => `<a href="${link.href}" style="--item-index:${index}"><span class="mobile-menu-link-icon"><i data-lucide="${link.icon}"></i></span><span class="mobile-menu-link-label">${link.label}</span><i class="mobile-menu-link-arrow" data-lucide="arrow-up-right"></i></a>`).join('');
    const mobilePolicyNav = policyLinks.map(link => `<a href="${link.href}">${link.label}</a>`).join('');

    const hydrateBranding = () => {
        document.querySelectorAll('[data-site-name]').forEach(el => {
            el.textContent = cfg.siteName;
        });
        document.querySelectorAll('[data-site-logo]').forEach(el => {
            el.src = cfg.logo;
            if (!el.alt) el.alt = `${cfg.siteName} logo`;
        });
        document.querySelectorAll('[data-site-email]').forEach(el => {
            el.textContent = cfg.email;
            el.href = `mailto:${cfg.email}`;
        });
        document.querySelectorAll('[data-site-phone]').forEach(el => {
            el.textContent = cfg.phone;
            el.removeAttribute('href');
        });
        document.querySelectorAll('[data-site-location]').forEach(el => {
            el.textContent = cfg.location;
        });
        document.querySelectorAll('[data-disclaimer]').forEach(el => {
            el.textContent = cfg.disclaimer;
        });
        document.querySelectorAll('link[data-favicon]').forEach(el => {
            el.href = cfg.favicon;
        });
    };

    document.querySelectorAll('[data-header]').forEach(el => {
        el.innerHTML = `<div class="header-top"><div class="site-container header-top-inner"><a class="site-logo" href="index.html"><img data-site-logo alt=""><span data-site-name></span></a><div class="header-info"><div class="info-item"><span class="info-icon"><i data-lucide="mail"></i></span><div class="info-text"><span class="info-label">Mail Us :</span><strong class="info-value" data-site-email></strong></div></div><div class="info-item"><span class="info-icon"><i data-lucide="message-circle"></i></span><div class="info-text"><span class="info-label">Message Us :</span><strong class="info-value" data-site-phone></strong></div></div><div class="info-item"><span class="info-icon"><i data-lucide="map-pin"></i></span><div class="info-text"><span class="info-label">Location :</span><strong class="info-value" data-site-location></strong></div></div></div><a class="btn btn-primary header-cta" href="index.html#contact">Get Matched</a></div></div><div class="header-nav"><div class="site-container header-nav-inner"><nav class="main-nav">${desktopNav}</nav><div class="header-social"><a href="index.html" aria-label="Home"><i data-lucide="home"></i></a><a href="index.html#about" aria-label="About"><i data-lucide="info"></i></a><a href="index.html#services" aria-label="Services"><i data-lucide="bug"></i></a><a href="residential-pest-control.html" aria-label="Residential Pest Control"><i data-lucide="house"></i></a><a href="commercial-pest-control.html" aria-label="Commercial Pest Control"><i data-lucide="building-2"></i></a><a href="index.html#contact" aria-label="Contact"><i data-lucide="send"></i></a></div><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><i data-lucide="menu"></i></button></div></div><div class="mobile-menu" id="mobile-menu" aria-hidden="true"><div class="mobile-menu-header site-container"><a class="site-logo" href="index.html"><img data-site-logo alt=""><span data-site-name></span></a><button class="mobile-menu-close" type="button" aria-label="Close menu"><span>Close</span><i data-lucide="x"></i></button></div><div class="mobile-menu-body site-container"><nav class="mobile-menu-links" aria-label="Primary mobile navigation">${mobilePrimaryNav}</nav><div class="mobile-menu-footer"><nav class="mobile-policy-links" aria-label="Policy navigation">${mobilePolicyNav}</nav><a class="mobile-menu-email" data-site-email></a></div></div></div>`;
    });
    document.querySelectorAll('[data-footer]').forEach(el => {
        el.innerHTML = `<div class="site-container"><div class="footer-grid"><div><a class="site-logo" href="index.html"><img data-site-logo alt=""><span data-site-name></span></a><p data-disclaimer style="max-width:440px"></p></div><div><h4>Explore</h4><nav class="footer-links">${footerNav}</nav></div><div><h4>Connect</h4><p>Questions about comparing options? Write to us.</p><a data-site-email></a><h4 style="margin-top:23px">Policies</h4><nav class="footer-links">${mobilePolicyNav}</nav></div></div><div class="footer-bottom">&copy; ${new Date().getFullYear()} <span data-site-name></span>. Independent provider matching platform.</div></div>`;
    });

    hydrateBranding();

    const setupMobileMenu = () => {
        const menu = document.getElementById('mobile-menu');
        const toggles = document.querySelectorAll('.menu-toggle');
        const closeButtons = document.querySelectorAll('.mobile-menu-close');
        if (!menu || !toggles.length) return;

        let lockedScrollY = 0;
        const lockScroll = () => {
            lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
            document.body.style.top = `-${lockedScrollY}px`;
            document.body.classList.add('menu-open');
        };
        const unlockScroll = () => {
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            window.scrollTo(0, lockedScrollY);
        };
        const openMenu = () => {
            lockScroll();
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            toggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'true');
            });
            const closeButton = menu.querySelector('.mobile-menu-close');
            if (closeButton) closeButton.focus({ preventScroll: true });
        };
        const closeMenu = ({ restoreScroll = true } = {}) => {
            if (!menu.classList.contains('is-open')) return;
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            toggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
            });
            if (restoreScroll) {
                unlockScroll();
            } else {
                document.body.classList.remove('menu-open');
                document.body.style.top = '';
            }
        };
        const samePageTarget = href => {
            const url = new URL(href, window.location.href);
            return url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash;
        };

        toggles.forEach(toggle => {
            toggle.addEventListener('click', openMenu);
        });
        closeButtons.forEach(button => {
            button.addEventListener('click', () => closeMenu());
        });
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', event => {
                const currentHash = samePageTarget(link.href);
                if (!currentHash) {
                    closeMenu({ restoreScroll: false });
                    return;
                }

                event.preventDefault();
                const target = document.querySelector(currentHash);
                closeMenu({ restoreScroll: false });
                window.scrollTo(0, lockedScrollY);
                window.setTimeout(() => {
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', currentHash);
                }, 280);
            });
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeMenu();
        });
    };

    setupMobileMenu();

    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const status = form.querySelector('.success');
            const button = form.querySelector('[type=submit]');
            button.disabled = true;
            try {
                const res = await fetch('contact.php', { method: 'POST', body: new FormData(form) });
                const d = await res.json();
                if (!d.success) throw Error(d.message);
                status.textContent = cfg.formSuccessMessage;
                status.style.display = 'block';
                form.reset();
            } catch (err) {
                status.textContent = err.message || 'Unable to send your request. Please try again.';
                status.style.display = 'block';
            } finally {
                button.disabled = false;
            }
        });
    });

    const cookie = document.querySelector('.cookie');
    if (cookie && !localStorage.getItem('pestora-cookie')) {
        cookie.classList.add('show');
        cookie.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                localStorage.setItem('pestora-cookie', button.dataset.choice);
                cookie.classList.remove('show');
            };
        });
    }

    if (window.AOS) AOS.init({ duration: 420, offset: 40, once: true, easing: 'ease-out' });
    if (window.Swiper) {
        document.querySelectorAll('.service-showcase-swiper').forEach(swiper => new Swiper(swiper, {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 18,
            slideToClickedSlide: true,
            grabCursor: true,
            keyboard: { enabled: true },
            autoplay: { delay: 3200, disableOnInteraction: false },
            breakpoints: { 900: { spaceBetween: 22 } }
        }));
        document.querySelectorAll('.service-photo-swiper').forEach(swiper => new Swiper(swiper, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 18,
            grabCursor: true,
            keyboard: { enabled: true },
            navigation: {
                prevEl: swiper.querySelector('.service-photo-prev'),
                nextEl: swiper.querySelector('.service-photo-next')
            },
            pagination: { el: swiper.querySelector('.swiper-pagination'), clickable: true },
            breakpoints: {
                720: { slidesPerView: 2, spaceBetween: 22 },
                1100: { slidesPerView: 2, spaceBetween: 28 }
            }
        }));
    }
    if (window.lucide) lucide.createIcons();
})();
