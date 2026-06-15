/* PubliX Group — mission section + impact stats strip. */
const { Button: MissionBtn, StatCard: PXStatCard } = window.PubliXGroupDesignSystem_c7bc72;

function MissionSection({ onNav }) {
  return (
    <section className="web-mission" id="about">
      <div className="web-section">
        <div className="web-mission__grid">
          <div>
            <span className="web-eyebrow web-eyebrow--azure">How we work</span>
            <h2 className="web-h2">Public services deserve better digital tools</h2>
          </div>
          <div className="web-mission__body">
            <p>Public services in the Northern European market are under-digitized and often inefficient. PubliX Group exists to change that — we believe the future of public services lies in agile, digital innovation, developed by people who care deeply about their area of expertise.</p>
            <p>Rather than acting as a holding company, we function as an <strong>accelerator</strong> — helping our companies scale faster through shared resources, joint knowledge, and operational support.</p>
            <MissionBtn variant="ghost" iconRight="ph-arrow-right" onClick={()=>onNav("companies")}>Meet the companies</MissionBtn>
          </div>
        </div>

        <div className="web-stats">
          <PXStatCard label="Portfolio companies" value="5" icon="ph-buildings" footnote="Sweden & Finland" />
          <PXStatCard label="Initial capital" value="SEK 300M+" icon="ph-vault" footnote="+ 500M–1bn to invest" />
          <PXStatCard label="Annual savings" value="€7.0M" icon="ph-coins" footnote="Ostrobothnia, via Sotender" />
          <PXStatCard label="Founded" value="2024" icon="ph-flag-banner" footnote="HQ Kungsgatan 37, Stockholm" />
        </div>
      </div>
    </section>
  );
}
window.MissionSection = MissionSection;
