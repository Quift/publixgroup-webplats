/* PubliX Group — News teaser. */
const { Badge: NewsBadge, Button: NewsBtn } = window.PubliXGroupDesignSystem_c7bc72;

const ARTICLES = [
  { tag: "Leadership", date: "Mar 2026", title: "PubliX Group appoints Alexander Hübel as CEO",
    excerpt: "The group builds and develops vertical SaaS companies serving the Nordic public sector, and is backed by Aspira Partners." },
  { tag: "Acquisition", date: "Aug 2025", title: "PubliX Group partners with digiPlant",
    excerpt: "Our second partnership brings SBS Manager — the leading application-management system for foundations — into the group." },
  { tag: "Acquisition", date: "2025", title: "Embrace Safety joins the portfolio",
    excerpt: "EMBRACE strengthens our portfolio of vertical, mission-driven SaaS serving the public sector in the Nordics." },
];

function NewsSection() {
  return (
    <section className="web-news" id="news">
      <div className="web-section">
        <div className="web-companies__head">
          <div>
            <span className="web-eyebrow web-eyebrow--azure">News</span>
            <h2 className="web-h2">From the group</h2>
          </div>
          <NewsBtn variant="ghost" iconRight="ph-arrow-right">View all news</NewsBtn>
        </div>
        <div className="web-news__grid">
          {ARTICLES.map((a, idx) => (
            <a key={idx} className="web-article" href="#" onClick={(e)=>e.preventDefault()}>
              <div className="web-article__top">
                <NewsBadge tone="neutral">{a.tag}</NewsBadge>
                <span className="web-article__date">{a.date}</span>
              </div>
              <h3 className="web-article__title">{a.title}</h3>
              <p className="web-article__excerpt">{a.excerpt}</p>
              <span className="web-article__more">Read full story <i className="ph ph-arrow-right" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
window.NewsSection = NewsSection;
