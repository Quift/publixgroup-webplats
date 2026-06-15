/* PubliX Group — "Our companies" interactive carousel. */
const { Badge: CoBadge, IconButton: CoIconBtn, Avatar: CoAvatar, Button: CoButton } = window.PubliXGroupDesignSystem_c7bc72;

const COMPANIES = [
  {
    id: "tidvis", name: "Tidvis", category: "Social care", tone: "brand",
    logo: "../../assets/portfolio/tidvis.jpg",
    person: "Mattias Lind", role: "Founder & CEO", location: "Åskloster, Sweden",
    url: "tidvis.se",
    desc: "A leading software platform for the Swedish personal-care sector — scheduling, reporting, communication and payroll in one secure system.",
  },
  {
    id: "digiplant", name: "digiPlant", category: "Associations / NGOs", tone: "info",
    logo: "../../assets/portfolio/digiplant.png",
    person: "Alexander Törnqvist", role: "Co-Founder & CEO", location: "Örebro, Sweden",
    url: "digiplant.se",
    desc: "SBS Manager — a complete application-management system for grants and sponsorships from foundations, funds and grant providers.",
  },
  {
    id: "aspicore", name: "Aspicore", category: "Associations / NGOs", tone: "info",
    logo: "../../assets/portfolio/aspicore.png",
    person: "Juha Tanner", role: "Co-Founder & CEO", location: "Espoo, Finland",
    url: "aspicore.com",
    desc: "Apuraha4 automates the full grant lifecycle — applications, decisions, payments, reporting — saving time and improving transparency.",
  },
  {
    id: "koivu", name: "Koivu Solutions", category: "Healthcare", tone: "success",
    logo: "../../assets/portfolio/sotender.png",
    person: "Janne Salmi", role: "Co-Founder & CEO", location: "Pori, Finland",
    url: "sotender.io",
    desc: "Sotender — an easy-to-use mobile app connecting healthcare workers with open shifts, with measurable impact for providers and staff.",
  },
  {
    id: "embrace", name: "Embrace Safety", category: "Municipalities", tone: "warning",
    logo: "../../assets/portfolio/embrace.png",
    person: "Johan Rydberg", role: "CEO & Head of Sales", location: "Örebro, Sweden",
    url: "embrace-safety.se",
    desc: "EMBRACE — a powerful, easy-to-use platform for municipalities and police authorities in daily crime-prevention and safety work.",
  },
];

function CompaniesSection() {
  const [i, setI] = React.useState(0);
  const c = COMPANIES[i];
  const go = (d) => setI((p) => (p + d + COMPANIES.length) % COMPANIES.length);
  return (
    <section className="web-companies" id="companies">
      <div className="web-section">
        <div className="web-companies__head">
          <div>
            <span className="web-eyebrow web-eyebrow--azure">Our companies</span>
            <h2 className="web-h2">Founder-led, mission-driven</h2>
          </div>
          <div className="web-companies__nav">
            <CoIconBtn icon="ph-caret-left" variant="outline" label="Previous" onClick={()=>go(-1)} />
            <CoIconBtn icon="ph-caret-right" variant="outline" label="Next" onClick={()=>go(1)} />
          </div>
        </div>

        <div className="web-co-card">
          <div className="web-co-card__media">
            <div className="web-co-logo"><img src={c.logo} alt={c.name} /></div>
            <CoBadge tone={c.tone}>{c.category}</CoBadge>
          </div>
          <div className="web-co-card__body">
            <h3 className="web-co-card__name">{c.name}</h3>
            <p className="web-co-card__desc">{c.desc}</p>
            <div className="web-co-card__foot">
              <div className="web-co-person">
                <CoAvatar name={c.person} tone="navy" />
                <div>
                  <div className="web-co-person__name">{c.person}</div>
                  <div className="web-co-person__role">{c.role} · {c.location}</div>
                </div>
              </div>
              <CoButton as="a" href="#" variant="secondary" iconRight="ph-arrow-up-right" onClick={(e)=>e.preventDefault()}>{c.url}</CoButton>
            </div>
          </div>
        </div>

        <div className="web-co-dots">
          {COMPANIES.map((co, idx) => (
            <button key={co.id} aria-label={co.name}
              className={"web-co-dot" + (idx === i ? " web-co-dot--active" : "")}
              onClick={()=>setI(idx)}>{co.name}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
window.CompaniesSection = CompaniesSection;
