document.addEventListener("DOMContentLoaded", () => {
    anime
        .timeline({})
        .add({
            targets: ".cover",
            height: ["60%", "200%"],
            top: ["-90%", "100%"],
            easing: "easeOutCubic",
            duration: 1200
        })
        .add({
            targets: ".welcome_text h1",
            top: ["-150%", "50%"],
            easing: "easeOutQuad",
            offset: "-=600",
            duration: "700"
        })
        .add({
            targets: ".welcome_text h1",
            top: ["50%", "150%"],
            easing: "easeOutQuad",
            offset: "+=1000",
            duration: "700"
        })
        .add({
            targets: ".cover",
            height: ["60%", "200%"],
            top: ["-90%", "100%"],
            easing: "easeOutCubic",
            duration: "1200",
            offset: "-=400",
            complete: (anim) => {
                document.querySelector('.welcome_text')
                    .style
                    .display = 'none';
                document.querySelector('.main_content')
                    .style
                    .display = 'block';
            }
        })
        .add({
            targets: '.main_content h1,p',
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            delay: (el, i) => i * 150
        })
})