function toggleDropdown() {
    let dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".dropdown")) {
        document.getElementById("dropdownMenu").style.display = "none";
    }
});

const form = document.getElementById("form");
const messageBox = document.getElementById("form-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    messageBox.innerHTML = "<p class='error'>All fields are required.</p>";
    return;
  }

  // Simulated submission logic (replace with actual backend call)
  setTimeout(() => {
    messageBox.innerHTML = "<p class='success'>Thank you! Your message has been sent.</p>";
    form.reset();
  }, 500);
});


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 4000); // Change every 4 seconds
}

// gallery

document.addEventListener('DOMContentLoaded', () => {
    // --- Gallery Filtering ---
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const filterValue = button.dataset.filter; // Get data-filter value

            galleryItems.forEach(item => {
                const itemCategory = item.dataset.category;
                // Show/hide items based on filter
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let filteredItems = Array.from(galleryItems); // Start with all items

    // Function to update filtered items based on current filter
    const updateFilteredItems = () => {
        const activeFilter = document.querySelector('.filter-button.active').dataset.filter;
        if (activeFilter === 'all') {
            filteredItems = Array.from(galleryItems);
        } else {
            filteredItems = Array.from(galleryItems).filter(item => item.dataset.category === activeFilter);
        }
    };

    // Open Lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateFilteredItems(); // Ensure filteredItems is up-to-date
            currentImageIndex = filteredItems.indexOf(item); // Get index in the *filtered* list

            if (currentImageIndex === -1) { // If the clicked item is not in the current filtered view
                // This can happen if you click an item that was *just* filtered out.
                // Re-evaluate or simply don't open lightbox if not in filtered view.
                // For this basic example, we'll find its index in the full list if it wasn't in filtered.
                currentImageIndex = Array.from(galleryItems).indexOf(item);
                filteredItems = Array.from(galleryItems); // Show all in lightbox if not in filtered view
            }

            if (filteredItems.length === 0) return; // No items to show

            updateLightboxContent(currentImageIndex);
            lightbox.style.display = 'flex'; // Show lightbox
            document.body.style.overflow = 'hidden'; // Prevent body scrolling
        });
    });

    // Update Lightbox Content
    const updateLightboxContent = (index) => {
        if (filteredItems.length === 0) return;

        const item = filteredItems[index];
        if (item) {
            lightboxImage.src = item.querySelector('img').src;
            lightboxImage.alt = item.querySelector('img').alt;
            lightboxCaption.textContent = item.querySelector('.gallery-item-title').textContent;

            // Update navigation button visibility
            lightboxPrev.style.display = (filteredItems.length > 1) ? 'flex' : 'none';
            lightboxNext.style.display = (filteredItems.length > 1) ? 'flex' : 'none';

            if (filteredItems.length === 1) { // Hide both if only one item
                lightboxPrev.style.display = 'none';
                lightboxNext.style.display = 'none';
            } else {
                lightboxPrev.disabled = (currentImageIndex === 0);
                lightboxNext.disabled = (currentImageIndex === filteredItems.length - 1);
            }
        }
    };

    // Close Lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore body scrolling
    });

    // Close Lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Navigate Lightbox
    lightboxPrev.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxContent(currentImageIndex);
        }
    });

    lightboxNext.addEventListener('click', () => {
        if (currentImageIndex < filteredItems.length - 1) {
            currentImageIndex++;
            updateLightboxContent(currentImageIndex);
        }
    });

    // Keyboard navigation (optional)
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            } else if (e.key === 'Escape') {
                lightboxClose.click();
            }
        }
    });

    // Re-filter when a filter button is clicked, to update `filteredItems` array
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Re-select active filter and update the filteredItems array
            updateFilteredItems();
            // Optional: close lightbox if it was open during filter change
            if (lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});