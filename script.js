// Inisialisasi musik background
let backgroundMusic = new Audio('./song.mp3'); // Ganti dengan URL lagu yang sesuai
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

// Kelas untuk mengelola kembang api dengan warna romantis
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ff8da1'];
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < 60; i++) {
            const angle = (Math.PI * 2 * i) / 60;
            const velocity = 2 + Math.random() * 4;
            const size = 1 + Math.random() * 2;
            
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                alpha: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                size: size,
                life: 100 + Math.random() * 50
            });
        }
    }

    update(ctx) {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.03;
            particle.alpha = particle.life / 100;
            particle.life--;

            if (particle.life > 0) {
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
                return true;
            }
            return false;
        });
    }
}

// Kelas untuk hati yang melayang
class FloatingHeart {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = 10 + Math.random() * 20;
        this.speedY = 1 + Math.random() * 2;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.03 + Math.random() * 0.02;
    }

    update() {
        this.y -= this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 2;
    }

    draw(ctx) {
        const heartPath = new Path2D();
        heartPath.moveTo(this.x, this.y + this.size / 2);
        heartPath.bezierCurveTo(
            this.x - this.size / 2, this.y,
            this.x - this.size, this.y + this.size / 2,
            this.x, this.y + this.size
        );
        heartPath.bezierCurveTo(
            this.x + this.size, this.y + this.size / 2,
            this.x + this.size / 2, this.y,
            this.x, this.y + this.size / 2
        );

        ctx.fillStyle = '#ff69b4';
        ctx.fill(heartPath);
    }
}

// Setup canvas dan animasi
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const fireworks = [];
const hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Fungsi animasi utama
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(10, 10, 42, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update kembang api
    fireworks.forEach((firework, index) => {
        firework.update(ctx);
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });

    // Update hati yang melayang
    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw(ctx);
        if (heart.y < -20) hearts.splice(index, 1);
    });

    // Tambah kembang api dan hati baru secara random
    if (Math.random() < 0.02) {
        const pos = getRandomPosition(canvas);
        fireworks.push(new Firework(pos.x, pos.y));
    }

    if (Math.random() < 0.03) {
        hearts.push(new FloatingHeart(canvas));
    }

    requestAnimationFrame(animate);
}

// Fungsi untuk posisi random
function getRandomPosition(canvas) {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height - (Math.random() * canvas.height * 0.6)
    };
}

// Fungsi untuk menampilkan surat panjang
function showLongLetter() {
    const longLetter = document.querySelector('.long-letter');
    longLetter.classList.remove('hidden');
    setTimeout(() => {
        longLetter.classList.add('visible');
        animateText();
    }, 50);
}

// Fungsi untuk menyembunyikan surat panjang
function hideLongLetter() {
    const longLetter = document.querySelector('.long-letter');
    longLetter.classList.remove('visible');
    setTimeout(() => {
        longLetter.classList.add('hidden');
    }, 300);
}

// Fungsi untuk animasi teks
function animateText() {
    const paragraphs = document.querySelectorAll('.message-content p');
    paragraphs.forEach((p, index) => {
        p.style.setProperty('--order', index);
    });
}

// Event listeners
document.querySelector('.close-button').addEventListener('click', hideLongLetter);

$(function(){
    if (!$('.envelope').hasClass('open')){
        $('.envelope').click(function(){
            $(this).removeClass('new').addClass('open');
            
            setTimeout(showLongLetter, 3000);
            
            for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const pos = getRandomPosition(canvas);
                    pos.y = canvas.height - (Math.random() * canvas.height * 0.4);
                    fireworks.push(new Firework(pos.x, pos.y));
                }, i * 300);
            }
        });
    }
});

// Tentukan tanggal dan waktu akhir (misalnya ulang tahun teman Anda)
const targetDate = new Date("2025-01-08T00:00:00").getTime();

// Fungsi hitungan mundur
const countdownElement = document.getElementById('timer');
const envelope = document.querySelector('.envelope');
const countdownContainer = document.getElementById('countdown');

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        clearInterval(countdownInterval);
        countdownContainer.style.display = 'none';
        envelope.classList.remove('disabled'); // Aktifkan amplop
    }
}

// Blokir amplop sebelum hitungan mundur selesai
envelope.classList.add('disabled');

// Jalankan hitungan mundur setiap detik
const countdownInterval = setInterval(updateCountdown, 1000);

// Mulai animasi
animate();