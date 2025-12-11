import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import useInView from '../hooks/useInView.js';

const testimonials = [
  {
    name: 'Александр Петров',
    position: 'Директор по информационной безопасности',
    company: 'ФинТехБанк',
    text: 'Zeus GRC позволил нам централизовать управление рисками и значительно ускорить процесс подготовки отчетности для регуляторов. Интеграция заняла всего 10 дней.',
    rating: 5,
  },
  {
    name: 'Мария Соколова',
    position: 'Руководитель отдела комплаенс',
    company: 'РосТелеком',
    text: 'Удобный интерфейс и мощная аналитика. Теперь мы видим полную картину рисков в реальном времени и можем оперативно принимать решения.',
    rating: 5,
  },
  {
    name: 'Дмитрий Иванов',
    position: 'CIO',
    company: 'Энергопром',
    text: 'Отличное решение для крупных компаний. Масштабируемость и возможность кастомизации под наши процессы — именно то, что нам было нужно.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [sectionRef, isVisible] = useInView();

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
      id="отзывы"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">Отзывы клиентов</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Что говорят о нас компании, которые уже используют Zeus GRC
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            key={`${currentIndex}-${direction}`}
            className={`rounded-3xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF] p-12 text-white shadow-[0_20px_60px_rgba(0,102,255,0.25)] ${
              direction === 'next' ? 'testimonial-slide-next' : 'testimonial-slide-prev'
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
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    index === currentIndex
                      ? 'w-12 bg-[#0066FF]'
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
