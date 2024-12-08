document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((carousel, index) => {
        const track = carousel.querySelector(".carousel-track");
        const items = carousel.querySelectorAll(".carousel-item");
        const prevButton = carousel.querySelector(".prev-btn");
        const nextButton = carousel.querySelector(".next-btn");

        let visibleItems;
        let itemWidth;

        const calculateSizes = () => {
            const screenWidth = window.innerWidth;
            
            if (screenWidth <= 768) {
                visibleItems = 1; // Um item em dispositivos móveis
            } else if (screenWidth <= 1024) {
                visibleItems = 2; // Dois itens em tablets
            } else {
                visibleItems = 3; // Três itens em desktops
            }
            itemWidth = carousel.getBoundingClientRect().width / visibleItems;

            items.forEach((item) => {
                item.style.width = `${itemWidth}px`;
            });

            maxIndex = Math.max(0, items.length - visibleItems);
        };

        let currentIndex = 0;

        const setPosition = () => {
            items.forEach((item, index) => {
                item.style.left = `${itemWidth * index}px`;
            });
        };

        const moveToSlide = (index) => {
            // Calcula o número total de páginas
            const maxIndex = Math.max(0, items.length - visibleItems); // Último índice permitível
            const newIndex = Math.max(0, Math.min(index, maxIndex)); // Mantém o índice dentro dos limites
            const amountToMove = -itemWidth * newIndex;
            track.style.transform = `translateX(${amountToMove}px)`;
            currentIndex = newIndex;
        };
        
        const updateButtons = () => {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= maxIndex;
        };

        prevButton.addEventListener("click", () => {
            moveToSlide(currentIndex - 1);
            updateButtons();
        });

        nextButton.addEventListener("click", () => {
            moveToSlide(currentIndex + 1);
            updateButtons();
        });

        window.addEventListener("resize", () => {
            calculateSizes();
            setPosition();
            moveToSlide(currentIndex);
            updateButtons();
        });

        calculateSizes();
        setPosition();
        updateButtons();
    });











});
