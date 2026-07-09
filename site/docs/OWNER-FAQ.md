# Owner FAQ — PubliX Group / publixgroup.io

**Agent:** Läs vid oklara frågor. Följ `agent_action` om tier ≤ M2 och inga architecture restrictions bryts.

**Skill:** `/publix-site-edit` · **Uppdaterad:** 2026-07-09

---

## Hur gör jag…?

### Q: Hur ändrar jag text på en sida?
**Tier:** M2  
**Kort svar:** `/publix-site-edit` + beskriv ändringen. Agenten fixar EN först, sedan SV, DA, NO, FI, DE.  
**Agent_action:** M2 → architecture nod → EN → 5 språk → seo/keywords changelog → M2 check.

### Q: Hur publicerar jag en nyhet?
**Tier:** M2  
**Kort svar:** Ge rubrik, datum, fakta och källa (pressrelease). Agenten skapar `news/<slug>.html` i alla språk.  
**Agent_action:** PI-post om ny fakta → kopiera mall → 6 språk → architecture slug-lista.

### Q: Hur fixar jag favicon eller en liten bugg?
**Tier:** M1  
**Kort svar:** Beskriv problemet — agenten fixar och deployar.  
**Agent_action:** M1 → minimal diff → deploy → be ägare verifiera root favicon-länkar.

### Q: Hur går ändringar live?
**Tier:** M1  
**Kort svar:** Commit + push `main` → Netlify auto-deploy ~2 min.  
**Agent_action:** Commit `site([lang]): … [M1|M2]` → push → påminn verifiera URL.

---

## Får jag…?

### Q: Får jag rikta siten mot Tidvis-kunder eller kommuner som köpare?
**Tier:** U1 — stopp  
**Kort svar:** Nej — moderbolagssiten är M&A mot founders, inte OpCo-försäljning.  
**Agent_action:** Stopp. Förklara jtbd. Eskalera Alexander om affärsändring avsiktlig.

### Q: Får jag lägga till en sida i navigationen?
**Tier:** M3 — stopp  
**Kort svar:** Ja med godkännande från Alexander Hübel + PE först.  
**Agent_action:** Stopp M3. Lista: purpose, conversion_goal, 6 språk, nav, SEO.

### Q: Får jag skriva nya omsättningssiffror eller förvärv?
**Tier:** M2 (evidens krävs)  
**Kort svar:** Endast med verifierbar källa — agenten lägger till PI-post.  
**Agent_action:** Grep proof-inventory → skapa PI om saknas → sedan copy.

### Q: Får jag ta bort "Discover your growth potential"?
**Tier:** M3 — stopp  
**Kort svar:** Nej — det är huvud-CTA på index.  
**Agent_action:** Stopp. Visa architecture index conversion_goal.

---

## Vad händer om / vem…?

### Q: Agenten vägrar — är den trasig?
**Tier:** —  
**Kort svar:** Den skyddar strategin. Läs varför, kontakta PE eller Alexander om du vill gå vidare.  
**Agent_action:** Förklara restriction. Ingen commit.

### Q: Sidan ser fel ut live efter deploy?
**Tier:** M1 akut  
**Kort svar:** Kontakta PE eller be agenten revert senaste commit.  
**Agent_action:** `git revert` → push → rapportera.

### Q: Jag vill pivotera — ny målgrupp helt?
**Tier:** U1  
**Kort svar:** Det är omproduktion, inte underhåll. Kontakta PE.  
**Agent_action:** Stopp. site-produktion V5 intake.

### Q: Vem äger Netlify och domänen?
**Tier:** —  
**Kort svar:** Teknisk setup via PE / Stockholm Code — ändra inte utan dem.  
**Agent_action:** Ingen DNS/Netlify-config utan explicit eskalering.

---

## PubliX-specifikt

### Q: Får jag skriva om portföljbolagens produkter på moderbolagssidan?
**Tier:** M2 begränsat  
**Kort svar:** Kort portföljöversikt ja; produktsälj/copy nej — peka till companies/news.  
**Agent_action:** Håll companies.html som översikt; inga OpCo-prislistor eller demos.

### Q: Måste alla språk uppdateras varje gång?
**Tier:** M2 regel  
**Kort svar:** Ja — EN, SV, DA, NO, FI, DE. Undantag dokumenteras i seo/keywords changelog.  
**Agent_action:** Propagera alla 6 om inte ägare uttryckligen undantar ett språk med motivering.

---

## Changelog

| Datum | Ändring |
|-------|---------|
| 2026-07-09 | Skapad Fas 9 v2 |