// --- Fun CSS Confetti Generator ---
const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#ff6b81', '#ffffff'];
const container = document.getElementById('confetti-container');

function createConfetti() {
    for (let i = 0; i < 70; i++) {
        const conf = document.createElement('div');
        conf.classList.add('confetti');
        
        // Randomize style
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2s to 5s
        conf.style.animationDelay = Math.random() * 2 + 's';
        
        // Randomize shape (squares and circles)
        if (Math.random() > 0.5) conf.style.borderRadius = '50%';
        
        container.appendChild(conf);
    }
}
createConfetti();

// --- Navigation & Slide Logic ---
function nextSlide(num) {
    // Hide current slide by pushing it up
    const currentActive = document.querySelector('.slide.active');
    if (currentActive) {
        currentActive.style.transform = 'translateY(-100%)'; // Slides Up
        setTimeout(() => {
            currentActive.classList.remove('active');
        }, 600);
    }

    // Bring in new slide from bottom
    const nextScreen = document.getElementById("slide" + num);
    if (nextScreen) {
        nextScreen.classList.add("active");
        nextScreen.style.transform = 'translateY(0)'; // Slides into view
    }

    // --- Final Screen Video Logic ---
    if (num === 4) {
        const video = document.getElementById("bdayVideo");
        const endContent = document.getElementById("endContent");

        video.play().catch(e => console.log("Click required to play video"));

        video.onended = () => {
            // Fade out video
            video.style.opacity = "0";

            setTimeout(() => {
                video.style.display = "none";
                
                // Show final polaroid card
                endContent.style.display = "block";
                
                setTimeout(() => {
                    endContent.style.opacity = "1";
                    
                    // Change background to an even brighter party color!
                    document.body.style.background = "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)";
                    
                    // Add more confetti for the finale!
                    createConfetti();
                }, 50);
            }, 800);
        };
    }
}