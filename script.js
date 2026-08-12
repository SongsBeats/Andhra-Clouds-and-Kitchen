/* ==========================================================================
   INTERACTIVE SCRIPT - ANDHRA FRUIT BOWLS & RYTHU BAZAR
   HANDLES: Floating headers, Scroll reveals, Mobile Drawer,
            Category Filters & Direct WhatsApp Item Booking.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Floating Header & Sticky CTA Bar
       ========================================== */
    const header = document.querySelector('.floating-header');
    const floatingFabGroup = document.querySelector('.floating-fab-group');
    
    window.addEventListener('scroll', () => {
        // Shrink floating header on scroll
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        // Reveal Floating Action Buttons on scroll
        if (window.scrollY > 280) {
            floatingFabGroup?.classList.add('visible');
        } else {
            floatingFabGroup?.classList.remove('visible');
        }
    });

    /* ==========================================
       2. Mobile Menu Overlay & Drawer
       ========================================== */
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        hamburgerBtn?.classList.toggle('active');
        mobileMenu?.classList.toggle('active');
        
        if (mobileMenu?.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    hamburgerBtn?.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu?.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================
       3. Intersection Observer (Scroll Fade Reveals)
       ========================================== */
    const revealElements = document.querySelectorAll('.fade-up-element');

    const observerOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    revealElements.forEach(element => {
        observer.observe(element);
    });

    /* ==========================================
       4. Menu Category Filtering Tabs
       ========================================== */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const menuCards = document.querySelectorAll('.menu-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            e.currentTarget.classList.add('active');
            
            const selectedFilter = e.currentTarget.getAttribute('data-filter');

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                    card.classList.remove('hidden');
                    // Re-trigger animation
                    card.classList.add('revealed');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================================
       5. Direct Item Booking via WhatsApp
       ========================================== */
    const bookItemButtons = document.querySelectorAll('.btn-book-item');
    const targetPhoneNumber = '918639121227';

    bookItemButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const itemName = btn.getAttribute('data-item-name') || 'Fresh Product';
            const itemCategory = btn.getAttribute('data-item-category') || 'Healthy Product';

            // Construct clean, polite WhatsApp message
            let messageText = `Hello Andhra Fruit Bowls & Rythu Bazar!\n\n`;
            messageText += `I am visiting your website and would like to order the following item:\n\n`;
            messageText += `*Item:* ${itemName}\n`;
            messageText += `*Category:* ${itemCategory}\n\n`;
            messageText += `Please confirm availability and delivery details. Thank you!`;

            const encodedMessage = encodeURIComponent(messageText);
            const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedMessage}`;

            // Visual feedback on button tap
            btn.style.transform = 'scale(0.96)';
            setTimeout(() => {
                btn.style.transform = '';
                window.open(whatsappUrl, '_blank');
            }, 150);
        });
    });

});
