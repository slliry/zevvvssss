import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';

export default function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [sectionRef, isVisible] = useInView();

  const testimonials = [
    {
      name: t('testimonials.items.1.name'),
      position: t('testimonials.items.1.position'),
      company: t('testimonials.items.1.company'),
      text: t('testimonials.items.1.text'),
      rating: 5,
    },
    {
      name: t('testimonials.items.2.name'),
      position: t('testimonials.items.2.position'),
      company: t('testimonials.items.2.company'),
      text: t('testimonials.items.2.text'),
      rating: 5,
    },
    {
      name: t('testimonials.items.3.name'),
      position: t('testimonials.items.3.position'),
      company: t('testimonials.items.3.company'),
      text: t('testimonials.items.3.text'),
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
      id="testimonials"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">{t('testimonials.title')}</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            key={`${currentIndex}-${direction}`}
            className={`rounded-3xl bg-gradient-to-br from-[#004aad] to-[#0066cc] p-12 text-white shadow-[0_20px_60px_rgba(0,74,173,0.25)] ${direction === 'next' ? 'testimonial-slide-next' : 'testimonial-slide-prev'
              }`}
          >
            <div className="mb-6 flex gap-1">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={24} fill="currentColor" />
              ))}
            </div>
            <p className="mb-8 text-xl leading-relaxed text-white/90 md:text-2xl">
              "{testimonials[currentIndex].text}"
            </p>
            <div>
              <div className="mb-1 text-xl">{testimonials[currentIndex].name}</div>
              <div className="text-white/80">
                {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prevTestimonial}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-white/90"
            >
              <ChevronLeft size={36} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'next' : 'prev');
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${index === currentIndex
                    ? 'w-12 bg-[#004aad]'
                    : 'w-2 bg-gray-300/70 hover:bg-gray-400/90'
                    }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-white/90"
            >
              <ChevronRight size={36} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
