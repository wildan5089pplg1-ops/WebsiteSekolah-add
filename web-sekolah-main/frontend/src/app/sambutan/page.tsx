'use client';

import './SambutanYayasan.css';

const messages = {
    left: {
        eyebrow: 'Pesan Pimpinan',
        name: 'Dr. Wannen Pakpahan, MM.',
        role: 'Pimpinan Yayasan Prestasi Prima',
        image: '/images/yayasan.png',
        quote: 'Membangun generasi muda yang tidak hanya kompeten di bidangnya, tetapi juga siap menghadapi tantangan global dengan karakter dan etika yang kuat.',
        paragraphs: [
            'Asosiasi vokasi merupakan wadah strategis untuk memperkuat pendidikan yang relevan dengan kebutuhan industri dan perkembangan zaman.',
            'Kami percaya pendidikan adalah investasi jangka panjang yang harus mampu membekali peserta didik dengan kompetensi, karakter, dan keberanian untuk berinovasi.',
        ],
    },
    right: {
        eyebrow: 'Pesan Pimpinan',
        name: 'Flores Sagala, S.E.',
        role: 'Pimpinan Yayasan Prestasi Prima',
        image: '/images/kepala-sekolah.png',
        quote: 'Pendidikan adalah investasi untuk membangun generasi yang adaptif, inovatif, dan mampu memberikan dampak nyata bagi masyarakat.',
        paragraphs: [
            'Selamat menjalani berbagai proses belajar. Setiap langkah kecil adalah bagian dari perjalanan panjang untuk menjadi pribadi yang unggul dan berkarakter.',
            'Kami percaya bahwa pendidikan bukan hanya tentang pencapaian akademik, tetapi juga tentang membentuk manusia yang berintegritas dan siap menghadapi masa depan.',
        ],
    },
};

type GreetingCardProps = {
    side: 'left' | 'right';
    data: typeof messages.left;
};

function GreetingCard({ side, data }: GreetingCardProps) {
    return (
        <article className={`greeting-card greeting-card--${side}`} tabIndex={0}>
            <div className="portrait-wrap">
                <img className="portrait" src={data.image} alt={data.name} />
                <div className="portrait-overlay" />
                <div className="portrait-label">
                    <span>{data.eyebrow}</span>
                    <strong>{data.name}</strong>
                    <small>{data.role}</small>
                </div>
                <div className="hover-cue" aria-hidden="true">
                    {side === 'left' ? '→' : '←'}
                </div>
            </div>

            <div className="message-panel">
                <div className="message-topline">
                    <span>01 / 02</span>
                    <span className="orange-dot" />
                    <span>Sambutan Yayasan</span>
                </div>
                <blockquote>“{data.quote}”</blockquote>
                <div className="message-line" />
                {data.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="message-signature">
                    <strong>{data.name}</strong>
                    <span>{data.role}</span>
                </div>
            </div>
        </article>
    );
}

export default function SambutanYayasan() {
    return (
        <main className="sambutan-page">
            <header className="page-nav">
                <div className="brand">
                    <span className="brand-mark">PP</span>
                    <span>SMK PRESTASI PRIMA</span>
                </div>
                <span className="page-title">SAMBUTAN YAYASAN</span>
                <a href="#pesan" className="nav-link">Scroll untuk menjelajah ↓</a>
            </header>

            <section className="hero" id="pesan">
                <div className="network network--top-left" />
                <div className="network network--top-right" />
                <div className="network network--bottom-left" />

                <div className="hero-copy">
                    <span className="eyebrow">Pesan Pimpinan</span>
                    <h1>Inovasi <em>Tanpa Batas.</em></h1>
                    <p>
                        Membangun ekosistem pendidikan yang unggul, berkarakter, dan siap
                        menghadapi masa depan melalui dedikasi dan visi kolektif.
                    </p>
                </div>

                <div className="greetings-stage">
                    <GreetingCard side="left" data={messages.left} />
                    <GreetingCard side="right" data={messages.right} />
                </div>

                <div className="interaction-note">
                    <span className="interaction-dot" />
                    <span>Hover foto untuk membuka pesan</span>
                    <span className="interaction-arrows">← →</span>
                </div>
            </section>

            <section className="campus-section">
                <div className="campus-image-wrap">
                    <img src="/images/gedung.png" alt="Gedung SMK Prestasi Prima" />
                    <div className="campus-overlay">
                        <span>Bergabung &amp; Tunjukkan Bakatmu</span>
                        <a href="#">Jelajahi Prestasi Prima →</a>
                    </div>
                </div>
            </section>

            <footer className="page-footer">
                <div>
                    <strong>SMK Prestasi Prima</strong>
                    <span>Membangun generasi unggul untuk masa depan.</span>
                </div>
                <div className="footer-meta">
                    <span>© 2026 Prestasi Prima</span>
                    <span>Technology · Creativity · Character</span>
                </div>
            </footer>
        </main>
    );
}
