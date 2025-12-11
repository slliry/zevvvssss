import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView.js';

const integrations = [
  { name: 'Microsoft Azure', logo: '🔷' },
  { name: 'Jira', logo: '🔵' },
  { name: 'ServiceNow', logo: '🟢' },
  { name: '1C', logo: '🟡' },
  { name: 'Slack', logo: '💬' },
  { name: 'SAP', logo: '🔶' },
];

const carouselItems = [...integrations, ...integrations];

export default function Integrations() {
  const [sectionRef, isVisible] = useInView();

  return (
    <section
      ref={sectionRef}
      className={`fade-section ${isVisible ? 'fade-section--visible' : ''} py-20 md:py-32`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl md:text-5xl">Интеграции</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Легко интегрируется с вашими существующими системами
          </p>
        </div>

        <div className="integrations-carousel">
          <div className="integrations-carousel-track">
            {carouselItems.map((integration, index) => (
              <article
                key={`${integration.name}-${index}`}
                className="integrations-card group"
                aria-hidden={index >= integrations.length}
              >
                <div className="integrations-card-logo">{integration.logo}</div>
                <p className="integrations-card-name">{integration.name}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">Не нашли нужную интеграцию?</p>
          <Link
            to="/request"
            className="rounded-3xl border-2 border-[#0066FF] bg-white px-6 py-3 text-[#0066FF] transition-colors hover:bg-[#0066FF] hover:text-white"
          >
            Обсудить кастомную интеграцию
          </Link>
        </div>
      </div>
    </section>
  );
}
