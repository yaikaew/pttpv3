tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Custom colors defined for easy use
                'primary-blue': '#3b82f6', // blue-500
                'secondary-blue': '#bfdbfe', // blue-200
                'accent-light': '#eff6ff', // blue-50
            },
            fontFamily: {
                sans: ['Bai Jamjuree', 'sans-serif'],
            }
        }
    }
}

// เปิดลิ้งค์
function openLink(url) {
    window.open(url, "_blank");
}

// ---------------------------------------------------------------------
// DOM Ready Logic
// ---------------------------------------------------------------------

// Function to replace lucide-icon tags with actual SVG elements
function replaceIcons() {
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    replaceIcons(); // Call to render icons after DOM content is loaded
    
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    button.addEventListener('click', () => {
        const isExpanded = menu.classList.contains('hidden');
        
        // Toggle visibility of the mobile menu
        menu.classList.toggle('hidden');
        
        // Toggle icons and aria-expanded attribute
        if (isExpanded) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            button.setAttribute('aria-expanded', 'true');
        } else {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
        }
    });

    // Re-render icons after DOM updates (like when toggling the menu, though not strictly needed here)
});

// Function to close the mobile menu when a link is clicked
function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const button = document.getElementById('mobile-menu-button');

    menu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
}


// popup
let currentMediaIndex = 0;
let mediaArray = [];

function openPopup(media) {
    mediaArray = media; // Store the array of media
    currentMediaIndex = 0; // Reset the index
    showMedia(currentMediaIndex);
    document.getElementById("popup").style.display = "flex"; // Open the popup
}

function showMedia(index) {
    const imgElement = document.getElementById("popup-img");
    const videoElement = document.getElementById("popup-video");
    const videoSource = document.getElementById("video-source");
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    // Pause the video if it is playing
    videoElement.pause(); 
    videoElement.currentTime = 0; // Reset video time to start

    // Check if the current media is an image or a video
    if (mediaArray[index].endsWith('.mp4')) {
        imgElement.style.display = "none"; // Hide image
        videoElement.style.display = "block"; // Show video
        videoSource.src = mediaArray[index];
        videoElement.load(); // Load the video
        videoElement.play(); // Automatically play video if desired
    } else {
        imgElement.style.display = "block"; // Show image
        videoElement.style.display = "none"; // Hide video
        imgElement.src = mediaArray[index];
    }

    // Show or hide navigation buttons based on media count and current index
    prevButton.style.display = index === 0 ? "none" : "block"; // Hide previous button for the first media
    nextButton.style.display = index === mediaArray.length - 1 ? "none" : "block"; // Hide next button for the last media
}

function closePopup() {
    const videoElement = document.getElementById("popup-video");
    videoElement.pause(); // Pause the video if playing
    videoElement.currentTime = 0; // Reset video time to start
    document.getElementById("popup").style.display = "none"; // Close the popup
}

function prevMedia() {
    if (currentMediaIndex > 0) {
        currentMediaIndex--;
        showMedia(currentMediaIndex);
    }
}

function nextMedia() {
    if (currentMediaIndex < mediaArray.length - 1) {
        currentMediaIndex++;
        showMedia(currentMediaIndex);
    }
}
