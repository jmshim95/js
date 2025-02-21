function smoothScrollToTop(duration = 500) {
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress); // 부드러운 감속 효과

        window.scrollTo(0, start * (1 - easeOutQuad));

        if (elapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);
}
