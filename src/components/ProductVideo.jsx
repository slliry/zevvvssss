import { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProductVideo() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Получаем URL видео для текущего языка
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:4000');
    const currentLang = i18n.language || 'ru';
    setVideoUrl(`${apiUrl}/api/videos/${currentLang}`);
  }, [i18n.language]);

  const startPlayback = async () => {
    setIsStarted(true);
    setPlaybackError(false);

    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch {
        setPlaybackError(true);
      }
    }
  };

  return (
    <section className="py-20 md:py-28" id="product-video">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl text-[#004aad]">{t('video.title')}</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-700 md:text-xl">{t('video.subtitle')}</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-[#DCE9FA] bg-white p-3 shadow-[0_22px_60px_rgba(0,74,173,0.16)] md:p-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#031B45]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              controls={isStarted}
              preload="none"
              playsInline
              poster="/RiskManagement.png"
              onError={() => setPlaybackError(true)}
              key={videoUrl}
            >
              {videoUrl && <source src={videoUrl} type="video/mp4" />}
              {t('video.fallback')}
            </video>

            {!isStarted ? (
              <button
                type="button"
                onClick={startPlayback}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#003A8F]/25 via-transparent to-[#00245D]/45 transition hover:bg-[#003A8F]/35"
                aria-label={t('video.play')}
              >
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-[#004aad] shadow-2xl transition hover:scale-105">
                  <Play size={30} className="ml-1" />
                </span>
              </button>
            ) : null}

            {playbackError ? (
              <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/95 px-4 py-3 text-sm text-[#1A1A1A] shadow-xl">
                <p className="mb-2">{t('video.fallback')}</p>
                {videoUrl && (
                  <a href={videoUrl} className="font-semibold text-[#004aad] hover:underline" download>
                    {t('video.download')}
                  </a>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <a
            href="#modules"
            className="inline-flex items-center rounded-full border border-[#004aad]/30 px-7 py-3 text-[#004aad] transition hover:bg-[#EAF3FF]"
          >
            {t('video.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
