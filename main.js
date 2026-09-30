document.addEventListener('DOMContentLoaded', () => {
    const anthemAudio = document.getElementById('anthem-player');
    const aboutAudio = document.getElementById('about-player');
    const wavesTrigger = document.getElementById('waves-trigger');
    const aboutBtn = document.getElementById('about-btn');

    let wasAnthemPlaying = false;

    // تشغيل النشيد الوطني التلقائي
    function startAnthem() {
        anthemAudio.play().then(() => {
            wavesTrigger.classList.add('playing');
        }).catch(() => {
            const onFirstClick = () => {
                anthemAudio.play();
                wavesTrigger.classList.add('playing');
                document.removeEventListener('click', onFirstClick);
            };
            document.addEventListener('click', onFirstClick, { once: true });
        });
    }

    startAnthem();

    // التحكم بالنشيد عبر الضغط على الأمواج
    wavesTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (anthemAudio.paused) {
            anthemAudio.play();
            wavesTrigger.classList.add('playing');
        } else {
            anthemAudio.pause();
            wavesTrigger.classList.remove('playing');
        }
    });

    // التحكم بملف "حول التطبيق" الصوتي
    aboutBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (aboutAudio.paused) {
            // حفظ حالة النشيد وإيقافه لسماع الشرح
            wasAnthemPlaying = !anthemAudio.paused;
            if (wasAnthemPlaying) {
                anthemAudio.pause();
                wavesTrigger.classList.remove('playing');
            }

            aboutAudio.play();
            aboutBtn.classList.add('active');
        } else {
            aboutAudio.pause();
            aboutAudio.currentTime = 0;
            aboutBtn.classList.remove('active');

            // إعادة تشغيل النشيد إذا كان يعمل سابقاً
            if (wasAnthemPlaying) {
                anthemAudio.play();
                wavesTrigger.classList.add('playing');
            }
        }
    });

    // عند انتهاء تسجيل "حول التطبيق"
    aboutAudio.addEventListener('ended', () => {
        aboutBtn.classList.remove('active');
        if (wasAnthemPlaying) {
            anthemAudio.play();
            wavesTrigger.classList.add('playing');
        }
    });
});