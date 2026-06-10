document.addEventListener("DOMContentLoaded", () => {

    const animatedElements = document.querySelectorAll(
        ".card, .contact-content, form"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach((element) => {
        revealObserver.observe(element);
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    const navbar = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(10,15,25,0.95)";
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.3)";
        } else {
            navbar.style.background = "rgba(10,15,25,.35)";
            navbar.style.boxShadow = "none";
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    const counters = document.querySelectorAll(".statistics h1");

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const originalText = counter.innerText;

                let target = parseInt(originalText);

                if (isNaN(target)) return;

                let count = 0;
                const increment = target / 50;

                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count) + "+";
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = originalText;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            });
        },
        {
            threshold: 0.5
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });

    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.querySelector('input[type="text"]');
            const email = form.querySelector('input[type="email"]');
            const message = form.querySelector("textarea");

            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
            ) {
                alert("Please fill all fields.");
                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert("Message sent successfully!");
            form.reset();
        });
    }

    const topButton = document.createElement("button");

    topButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    topButton.classList.add("btn", "btn-primary");

    topButton.style.position = "fixed";
    topButton.style.bottom = "20px";
    topButton.style.right = "20px";
    topButton.style.width = "50px";
    topButton.style.height = "50px";
    topButton.style.borderRadius = "50%";
    topButton.style.display = "none";
    topButton.style.zIndex = "999";

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});