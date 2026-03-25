document.addEventListener('DOMContentLoaded', function() {
    // 时间轴动画
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.add('visible'));
    }, { threshold: 0.1 });
    document.querySelectorAll('.timeline-item').forEach(i => observer.observe(i));

    // 背景颜色切换
    document.querySelectorAll('.stage-color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.style.backgroundColor = btn.dataset.color;
        });
    });

    window.resetBgColor = () => {
        document.body.style.backgroundColor = '#fff';
    };

    // 音色播放
    let waveTimer = null;
    window.playWave = function(type) {
        stopWave();
        document.querySelectorAll('.wave-bar').forEach(b => b.classList.add(`active-${type}`));
        const audio = new Audio(`sounds/${type}.mp3`);
        audio.volume = 0.5;
        audio.loop = true;
        audio.play().catch(() => {});
        waveTimer = audio;
    };

    window.stopWave = function() {
        document.querySelectorAll('.wave-bar').forEach(b => b.classList.remove('active-tuba', 'active-bass'));
        if (waveTimer) waveTimer.pause();
    };

    // 兴趣点击
    window.showInterest = (skill) => {
        document.getElementById('interest-tip').classList.remove('d-none');
    };

    // ====================== MBTI 终极修复版 ======================
    let mbti = { IE: '', SN: '', TF: '', JP: '' };
    const btns = document.querySelectorAll('.mbti-btn');
    const result = document.querySelector('.mbti-result');

    // 16 种人格全部绑定乐器 + 职业
    const instrument = {
        ISTJ: "bass",      ISFJ: "bass",      INFJ: "doublebass", INTJ: "doublebass",
        ISTP: "cello",     ISFP: "cello",     INFP: "doublebass", INTP: "doublebass",
        ESTP: "tuba",      ESFP: "tuba",      ENFP: "cello",      ENTP: "cello",
        ESTJ: "tuba",      ESFJ: "tuba",      ENFJ: "bass",       ENTJ: "bass"
    };

    const career = {
        ISTJ: "arts-manager", ISFJ: "arts-manager", INFJ: "music-producer", INTJ: "sound-designer",
        ISTP: "sound-designer",ISFP: "designer",INFP: "designer",INTP: "sound-designer",
        ESTP: "designer",ESFP: "music-producer",ENFP: "music-producer",ENTP: "designer",
        ESTJ: "arts-manager",ESFJ: "arts-manager",ENFJ: "music-producer",ENTJ: "sound-designer"
    };

    // 乐器中文名 → 图片名
    const instrumentImage = {
        bass: "instrument-bass.jpg",
        tuba: "instrument-tuba.jpg",
        cello: "instrument-cello.jpg",
        doublebass: "instrument-doublebass.jpg"
    };

    // 职业中文名 → 图片名
    const careerImage = {
        "arts-manager": "career-arts-manager.jpg",
        "designer": "career-designer.jpg",
        "music-producer": "career-music-producer.jpg",
        "sound-designer": "career-sound-designer.jpg"
    };

    // 点击互斥逻辑
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const d = btn.dataset.dimension;
            document.querySelectorAll(`[data-dimension="${d}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mbti[d] = btn.dataset.type;

            // 4个维度选满 → 立刻出结果
            if (mbti.IE && mbti.SN && mbti.TF && mbti.JP) {
                const code = mbti.IE + mbti.SN + mbti.TF + mbti.JP;
                const inst = instrument[code];
                const care = career[code];

                document.getElementById("mbti-title").innerText = code + " Matching Result";
                document.getElementById("mbti-desc").innerText = "Your perfect instrument & career is here!";

                // ✅ 强制写死图片路径，绝对能显示
                document.getElementById("instrument-img").src = "images/" + instrumentImage[inst];
                document.getElementById("instrument-desc").innerText = "Your instrument: " + inst;

                document.getElementById("career-img").src = "images/" + careerImage[care];
                document.getElementById("career-desc").innerText = "Your career: " + care;

                result.classList.remove("d-none");
            }
        });
    });

    window.resetMbti = () => {
        mbti = { IE: '', SN: '', TF: '', JP: '' };
        btns.forEach(b => b.classList.remove('active'));
        result.classList.add('d-none');
    };
});