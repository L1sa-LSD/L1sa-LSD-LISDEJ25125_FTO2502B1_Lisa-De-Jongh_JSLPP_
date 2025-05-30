
function simulateLoading() {
            let progress = 0;
            const progressBar = document.getElementById('progress-bar');
            const loadingText = document.getElementById('loading-text');
            const loadingScreen = document.getElementById('loading-screen');
            
            // Update progress every 30ms
            const interval = setInterval(() => {
                progress += Math.random() * 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Hide loading screen and show content
                    loadingScreen.style.opacity = '0';
                    document.body.classList.add('loaded');
                    
                    // Remove loading screen after fade out
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
                
                // Update progress bar and text
                progressBar.style.width = progress + '%';
                loadingText.textContent = `Loading ${Math.floor(progress)}%`;
            }, 30);
        }

        // Start loading simulation when DOM is ready
        document.addEventListener('DOMContentLoaded', simulateLoading);