import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useInView from '../hooks/useInView.js';

export default function Testimonials() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
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

  // Group testimonials into pairs
  const testimonialsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const getCurrentTestimonials = () => {
    const start = currentPage * testimonialsPerPage;
    return testimonials.slice(start, start + testimonialsPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
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

        <div className="relative mx-auto max-w-6xl">
          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {getCurrentTestimonials().map((testimonial, index) => (
              <div
                key={`${currentPage}-${index}`}
                className="rounded-3xl bg-gradient-to-br from-[#004aad] to-[#0066cc] p-8 md:p-10 text-white shadow-[0_20px_60px_rgba(0,74,173,0.25)] transition-all duration-300 hover:shadow-[0_25px_70px_rgba(0,74,173,0.35)]"
              >
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-8 text-lg leading-relaxed text-white/90">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="mb-1 text-lg font-medium">{testimonial.name}</div>
                  <div className="text-sm text-white/70">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prevPage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#004aad] shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-gray-50"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentPage
                      ? 'w-12 bg-[#004aad]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#004aad] shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-gray-50"
              aria-label="Next testimonials"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
