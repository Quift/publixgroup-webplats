/* PubliX Group — marketing hero. */
const { Button: HeroButton } = window.PubliXGroupDesignSystem_c7bc72;

function WebHero({ onNav }) {
  return (
    <section className="web-hero" id="top">
      <div className="web-hero__grid">
        <div className="web-hero__copy">
          <span className="web-eyebrow">A Nordic GovTech group</span>
          <h1 className="web-hero__title">Building better public services through digital innovation</h1>
          <p className="web-hero__sub">Modernizing essential services, alongside purpose-driven entrepreneurs.</p>
          <div className="web-hero__actions">
            <HeroButton variant="primary" size="lg" iconRight="ph-arrow-right" onClick={()=>onNav("about")}>How we work</HeroButton>
            <HeroButton variant="secondary" size="lg" onClick={()=>onNav("companies")}>Our companies</HeroButton>
          </div>
        </div>
        <div className="web-hero__media">
          <img src="../../assets/imagery/hero-eye.jpg" alt="" />
          <div className="web-hero__media-wash" />
          <div className="web-hero__badge">
            <span className="web-hero__badge-k">Backed by</span>
            <span className="web-hero__badge-v">Aspira Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
}
window.WebHero = WebHero;
