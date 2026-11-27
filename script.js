/**
 * Wedding Invitation Script - Rana & Mohab
 * Date: 4 December 2026 | 7:00 PM - 11:00 PM
 * Venue: Laura Venue, Artillery Club, Sheraton, Cairo
 */

// Target Wedding Date: December 4, 2026 at 19:00:00 (7:00 PM)
const WEDDING_DATE = new Date('2026-12-04T19:00:00');

// Initial Wishes Seed Data
const DEFAULT_WISHES = [
  {
    name: "عائلة المحمدي",
    date: "منذ قليل",
    message: "ألف ألف مبروك لأجمل عروسين رنا ومهاب! بارك الله لكما وبارك عليكما وجمع بينكما في خير وسعادة دائمة يا رب 💍✨"
  },
  {
    name: "م/ كريم عبد العزيز",
    date: "أمس",
    message: "فرحة العمر يا غاليين! ربنا يسعدكم ويهنيكم ويجعل كل أيامكم أفراح ومودة 🤍💐"
  },
  {
    name: "سارة وخالد",
    date: "منذ يومين",
    message: "متحمسين جداً لليوم ده! ننتظر مشاركتكم أحلى لحظات العمر بأمر الله في قاعة لورا 💖"
  },
  {
    name: "د. هبة الشريف",
    date: "منذ يومين",
    message: "أرق التهاني القلبية لرنا الجميلة والمهندس مهاب، ليلة مميزة تليق بيكم وبقلوبكم الطيبة ✨"
  }
];

// ==========================================
// ⏳ 1. COUNTDOWN TIMER ENGINE
// ==========================================
function updateCountdown() {
  const now = new Date().getTime();
  const target = WEDDING_DATE.getTime();
  const difference = target - now;

  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');
  const timerEndedEl = document.getElementById('timer-ended');
  const countdownGrid = document.getElementById('countdown-grid');

  if (difference <= 0) {
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';
    if (timerEndedEl) timerEndedEl.classList.remove('hidden');
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================================
// 💌 2. ENVELOPE OPENING & REVEAL
// ==========================================
function openInvitation() {
  const overlay = document.getElementById('envelope-overlay');
  
  // Fire romantic celebration confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FAF4E1', '#D97D91', '#ffffff']
    });
  }

  // Fade out envelope modal
  if (overlay) {
    overlay.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 900);
  }

  // Start peaceful background melody
  startRomanticAudio();
}

// ==========================================
// 🎶 3. AUDIO PLAYER & MUSIC CONTROLLER
// ==========================================
let audioPlayer = null;
let isPlayingAudio = false;

function initAudioPlayer() {
  if (!audioPlayer) {
    audioPlayer = document.getElementById('wedding-audio');
    if (!audioPlayer) {
      audioPlayer = new Audio('wedding-song.mp3');
      audioPlayer.loop = true;
    }

    audioPlayer.addEventListener('play', () => {
      isPlayingAudio = true;
      updateAudioUI(true);
    });

    audioPlayer.addEventListener('pause', () => {
      isPlayingAudio = false;
      updateAudioUI(false);
    });

    audioPlayer.addEventListener('ended', () => {
      isPlayingAudio = false;
      updateAudioUI(false);
    });
  }
  return audioPlayer;
}

function startRomanticAudio() {
  const player = initAudioPlayer();
  if (player) {
    player.play().then(() => {
      isPlayingAudio = true;
      updateAudioUI(true);
    }).catch(err => {
      console.warn("Autoplay prevented by browser, waiting for user click:", err);
      updateAudioUI(false);
    });
  }
}

function toggleAudio() {
  const player = initAudioPlayer();
  if (!player) return;

  if (player.paused) {
    player.play().then(() => {
      isPlayingAudio = true;
      updateAudioUI(true);
    }).catch(err => {
      console.error("Playback error:", err);
    });
  } else {
    player.pause();
    isPlayingAudio = false;
    updateAudioUI(false);
  }
}

function updateAudioUI(playing) {
  const icon = document.getElementById('music-icon');
  const wave = document.getElementById('music-wave');
  if (playing) {
    if (icon) icon.className = 'fa-solid fa-volume-high text-lg text-gold-600 animate-pulse';
    if (wave) wave.classList.add('active');
  } else {
    if (icon) icon.className = 'fa-solid fa-volume-xmark text-lg text-stone-400';
    if (wave) wave.classList.remove('active');
  }
}

// ==========================================
// 🌸 4. FLOATING PETALS CANVAS ENGINE
// ==========================================
const canvas = document.getElementById('petals-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let petals = [];
const PETAL_COUNT = 24;

class Petal {
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, randomY = false) {
    this.x = Math.random() * w;
    this.y = randomY ? Math.random() * h : -20;
    this.size = Math.random() * 8 + 6;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 0.9 + 0.6;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 1.2 - 0.6;
    this.opacity = Math.random() * 0.45 + 0.25;
    this.color = Math.random() > 0.4 ? '#EAA2B0' : '#D4AF37'; // Rose gold or soft gold
  }

  update(w, h) {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.015) * 0.5;
    this.rotation += this.rotationSpeed;

    if (this.y > h + 20 || this.x < -20 || this.x > w + 20) {
      this.reset(w, h);
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.globalAlpha = this.opacity;
    context.fillStyle = this.color;

    // Draw elegant petal shape
    context.beginPath();
    context.moveTo(0, 0);
    context.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
    context.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
    context.fill();

    context.restore();
  }
}

function initPetals() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  petals = [];
  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal(canvas.width, canvas.height));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of petals) {
      p.update(canvas.width, canvas.height);
      p.draw(ctx);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

window.addEventListener('resize', () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
initPetals();

// ==========================================
// 📅 5. CALENDAR INTEGRATION (.ICS & GOOGLE)
// ==========================================
function addToGoogleCalendar() {
  const title = encodeURIComponent("حفل زفاف رنا & مهاب 💍✨");
  const details = encodeURIComponent("نتشرف بحضوركم لمشاركتنا فرحة العمر في حفل زفاف رنا ومهاب بقاعة لورا - حديقة المدفعية.");
  const location = encodeURIComponent("Laura venue، ممرات داخل الهيئة العربية، شيراتون المطار، قسم النزهة، محافظة القاهرة");
  // 4 Dec 2026 19:00 Cairo is 17:00 UTC (GMT+2)
  const dates = "20261204T170000Z/20261204T210000Z";

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  window.open(googleUrl, '_blank');
}

function downloadICSFile() {
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rana and Mohab Wedding//AR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "SUMMARY:حفل زفاف رنا & مهاب 💍✨",
    "DESCRIPTION:نتشرف بدعوتكم لمشاركتنا فرحة العمر في حفل زفاف رنا ومهاب بقاعة لورا - حديقة المدفعية.",
    "LOCATION:Laura venue\\, شيراتون المطار\\, قسم النزهة\\, القاهرة",
    "DTSTART:20261204T170000Z",
    "DTEND:20261204T210000Z",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "wedding-rana-mohab.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("تم تحميل ملف تذكير التقويم بنجاح!");
}

// ==========================================
// 📋 6. COPY ADDRESS & TOAST
// ==========================================
function copyAddress() {
  const address = "قاعة لورا (Laura venue) - ممرات داخل الهيئة العربية، شيراتون المطار، قسم النزهة، حديقة المدفعية، القاهرة";
  navigator.clipboard.writeText(address).then(() => {
    showToast("تم نسخ عنوان القاعة إلى الحافظة!");
    const btnText = document.getElementById('copy-text-btn');
    if (btnText) {
      btnText.textContent = "تم النسخ بنجاح ✓";
      setTimeout(() => {
        btnText.textContent = "نسخ عنوان القاعة";
      }, 2500);
    }
  }).catch(() => {
    showToast("تعذر النسخ تلقائياً، يمكنك نسخه يدوياً");
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msgSpan = document.getElementById('toast-message');
  if (toast && msgSpan) {
    msgSpan.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');
    setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0', 'pointer-events-none');
    }, 3000);
  }
}

// ==========================================
// ✍️ 7. RSVP FORM & WHATSAPP INTEGRATION
// ==========================================
function getRSVPFormData() {
  const name = document.getElementById('guest-name')?.value.trim() || '';
  const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'حاضر';
  const count = document.getElementById('guest-count')?.value || '1';
  const message = document.getElementById('guest-message')?.value.trim() || '';
  return { name, attendance, count, message };
}

function handleRSVPSubmit(event) {
  event.preventDefault();
  const data = getRSVPFormData();

  if (!data.name) {
    showToast("يرجى كتابة الاسم الكريم");
    return;
  }

  // Save to Local Storage
  const existingGuests = JSON.parse(localStorage.getItem('wedding_rsvp') || '[]');
  existingGuests.push({
    ...data,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('wedding_rsvp', JSON.stringify(existingGuests));

  // Add to guestbook if they wrote a sweet message
  if (data.message) {
    addWishToBoard(data.name, data.message, "الآن");
  }

  // Show Success UI
  const form = document.getElementById('rsvp-form');
  const successCard = document.getElementById('rsvp-success');
  const summary = document.getElementById('rsvp-guest-summary');

  if (form) form.classList.add('hidden');
  if (successCard) {
    successCard.classList.remove('hidden');
    if (summary) {
      if (data.attendance === 'حاضر') {
        summary.innerHTML = `أهلاً وسهلاً بك <strong>${data.name}</strong>، تم تأكيد حضورك بعدد (<strong>${data.count}</strong>) فرد. نسعد جداً بتشريفكم!`;
      } else {
        summary.innerHTML = `شكراً لك <strong>${data.name}</strong>، نشكرك على لطفك ونتمنى لقاءك في مناسبات قادمة بكل خير.`;
      }
    }
  }

  // Launch celebratory confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  }

  showToast("تم تسجيل وتأكيد حضوركم بنجاح!");
}

function sendRSVPViaWhatsApp() {
  const data = getRSVPFormData();
  const guestName = data.name || "أحد الضيوف الكرام";
  const state = data.attendance === 'حاضر' ? 'بكل سرور سأحضر إن شاء الله 💖' : 'أعتذر بكل أسف لظروف خاصة 🤍';
  
  let msg = `*دعوة زفاف رنا & مهاب* 💍✨%0A`;
  msg += `-----------------------------%0A`;
  msg += `*الاسم:* ${encodeURIComponent(guestName)}%0A`;
  msg += `*حالة الحضور:* ${encodeURIComponent(state)}%0A`;
  if (data.attendance === 'حاضر') {
    msg += `*عدد الحضور:* ${encodeURIComponent(data.count)}%0A`;
  }
  if (data.message) {
    msg += `*كلمة تهنئة:* ${encodeURIComponent(data.message)}%0A`;
  }
  msg += `-----------------------------%0A`;
  msg += `موعدنا الجمعة ٤ ديسمبر ٢٠٢٦ - قاعة لورا، حديقة المدفعية 🕊️`;

  const waUrl = `https://wa.me/?text=${msg}`;
  window.open(waUrl, '_blank');
}

// ==========================================
// 💬 8. WISHES / GUESTBOOK BOARD
// ==========================================
function renderWishes() {
  const container = document.getElementById('wishes-container');
  if (!container) return;

  const storedWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
  const allWishes = [...storedWishes, ...DEFAULT_WISHES];

  container.innerHTML = '';
  allWishes.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80 hover:border-gold-300 transition-all hover:shadow-md";
    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold text-xs">
            ${item.name.charAt(0)}
          </div>
          <h4 class="font-bold text-stone-800 text-sm">${escapeHTML(item.name)}</h4>
        </div>
        <span class="text-[11px] text-stone-400">${escapeHTML(item.date)}</span>
      </div>
      <p class="text-stone-600 text-xs sm:text-sm leading-relaxed">${escapeHTML(item.message)}</p>
    `;
    container.appendChild(card);
  });
}

function addWishToBoard(name, message, dateText) {
  const storedWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
  storedWishes.unshift({
    name,
    message,
    date: dateText
  });
  localStorage.setItem('wedding_wishes', JSON.stringify(storedWishes));
  renderWishes();
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// ==========================================
// 🚀 9. SCROLL LISTENER FOR BACK TO TOP
// ==========================================
window.addEventListener('scroll', () => {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (scrollBtn) {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollBtn.classList.add('opacity-100');
    } else {
      scrollBtn.classList.remove('opacity-100');
      scrollBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  }
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  renderWishes();
});
