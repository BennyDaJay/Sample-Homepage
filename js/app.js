document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navbarList = document.getElementById('navbar__list');
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.classList.add('menu__link');
        navLink.href = `#${section.id}`;
        navLink.textContent = section.dataset.nav;
        navItem.appendChild(navLink);
        fragment.appendChild(navItem);

        // Scroll into view and set active class on click
        navLink.addEventListener('click', function(e) {
            e.preventDefault();
            sections.forEach(sec => sec.classList.remove('active'));
            section.classList.add('active');
            document.querySelectorAll('.menu__link').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
            section.scrollIntoView({ behavior: "smooth" });
        });
    });

    navbarList.appendChild(fragment);

    // Highlight active section and corresponding nav item on scroll
    window.addEventListener('scroll', () => {
        let currentSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                currentSection = section;
            }
        });

        if (currentSection) {
            sections.forEach(section => section.classList.remove('active'));
            currentSection.classList.add('active');

            document.querySelectorAll('.menu__link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentSection.id)) {
                    link.classList.add('active');
                }
            });
        }
    });
});
