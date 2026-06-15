/* PubliX Group — marketing site nav. Uses DS Button. */
const { Button: PXButton } = window.PubliXGroupDesignSystem_c7bc72;

function WebNav({ onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.querySelector(".pxweb");
    const el = root || window;
    const onScroll = () => {
      const y = root ? root.scrollTop : window.scrollY;
      setScrolled(y > 12);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "about", label: "About us" },
    { id: "companies", label: "Our companies" },
    { id: "news", label: "News" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className={"web-nav" + (scrolled ? " web-nav--scrolled" : "")}>
      <div className="web-nav__inner">
        <a className="web-nav__logo" href="#" onClick={(e)=>{e.preventDefault(); onNav("top");}}>
          <img src="../../assets/logo/publix-logo.svg" alt="PubliX Group" />
        </a>
        <nav className="web-nav__links">
          {links.map((l) => (
            <a key={l.id} href={"#" + l.id} onClick={(e)=>{e.preventDefault(); onNav(l.id);}}>{l.label}</a>
          ))}
          <a className="web-nav__career" href="#" onClick={(e)=>e.preventDefault()}>Career</a>
        </nav>
        <PXButton variant="primary" size="sm" iconRight="ph-arrow-right" onClick={()=>onNav("contact")}>Get in touch</PXButton>
      </div>
    </header>
  );
}
window.WebNav = WebNav;
