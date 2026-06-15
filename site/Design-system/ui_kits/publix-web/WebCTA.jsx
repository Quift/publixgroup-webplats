/* PubliX Group — CTA + footer (navy, dot-skyline pattern). */
const { Button: CtaBtn } = window.PubliXGroupDesignSystem_c7bc72;

function WebCTA({ onNav }) {
  return (
    <section className="web-cta" id="contact">
      <img className="web-cta__pattern" src="../../assets/patterns/dot-skyline.svg" alt="" />
      <div className="web-section web-cta__inner">
        <h2 className="web-cta__title">Let's talk about the future of public services</h2>
        <p className="web-cta__sub">Whether you're building digital solutions for the public sector or just curious about how we work — we'd love to hear from you.</p>
        <CtaBtn variant="accent" size="lg" iconRight="ph-arrow-right">Get in touch</CtaBtn>
      </div>
    </section>
  );
}

function WebFooter({ onNav }) {
  return (
    <footer className="web-footer">
      <div className="web-section web-footer__inner">
        <div className="web-footer__brand">
          <img src="../../assets/logo/publix-logo-white.svg" alt="PubliX Group" />
          <p>Uniting founder-led SaaS companies to modernize public services across Northern Europe.</p>
          <span className="web-footer__org">Org. 559485-5487</span>
        </div>
        <div className="web-footer__col">
          <h4>About us</h4>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav("companies");}}>Our companies</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav("news");}}>News</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav("contact");}}>Contact</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Career</a>
        </div>
        <div className="web-footer__col">
          <h4>Stockholm office</h4>
          <span>Kungsgatan 37, 8tr</span>
          <span>111 56 Stockholm, Sweden</span>
          <a href="#" onClick={(e)=>e.preventDefault()}>Privacy policy</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Cookie policy</a>
        </div>
      </div>
      <div className="web-footer__base">
        <span>© 2026 PubliX Group AB</span>
        <span>Backed by Aspira Partners</span>
      </div>
    </footer>
  );
}
window.WebCTA = WebCTA;
window.WebFooter = WebFooter;
