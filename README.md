# 📦 LogiFix — B2B Portál pre manažment logistických incidentov

> **Semestrálny projekt v rámci predmetu Návrh a tvorba webových stránok**  
> **Univerzita:** Žilinská univerzita v Žiline (UNIZA)  
> **Fakulta:** FPEDAS (Distribučné technológie a služby)  
> **Vyučujúci:** Ing. Juraj Fabuš, PhD.  
> **Autor:** Artem Shapovalov  

---

## 📋 O projekte

**LogiFix** je B2B webový portál navrhnutý pre centralizáciu, evidenciu a rýchle riešenie logistických incidentov (poškodené zásielky, meškanie doručenia, nesprávny tovar) medzi distribútormi a odberateľmi. 

Systém nahrádza neprehľadnú e-mailovú komunikáciu a telefonáty, čím skracuje čas riešenia požiadaviek a zabraňuje prekročeniu SLA limitov.

---

## 🚀 Kľúčové funkcie (MVP)

- **Dashboard s KPI kartami:** Okamžitý prehľad o počte kritických incidentov, požiadaviek po SLA, čakajúcich a doručených zásielok.
- **Tabuľka incidentov:** Prehľadný zoznam s farebným odlíšením priorít a živým SLA časovačom.
- **Modálne okno pre nový incident:** Rýchle nahlásenie problému s možnosťou priloženia fotodokumentácie poškodeného tovaru.
- **Responzívny dizajn:** Plná podpora pre desktop aj mobilné zariadenia.

---

## 🎨 Vizuálna identita a Style Guide (Blok 6)

- **Primárna farba:** Tmavomodrá (`#0F172A` / `#1E293B`) — korporátny B2B vzhľad.
- **Akcentová farba:** Modrá (`#2563EB`) — tlačidlá a aktívne prvky.
- **Semaforový systém pre SLA:**
  - 🔴 **Kritický stav / Po SLA:** `#EF4444` / `#F97316`
  - 🟡 **Čakajúci stav:** `#F59E0B`
  - 🟢 **Vyriešené / Doručené:** `#10B981`
- **Typografia:** Inter / System UI, optimalizované pre čitateľnosť dát.
s
---

## 📁 Štruktúra repozitára

```text
logifix-b2b/
├── index.html        # Hlavná stránka / Dashboard LogiFix
├── styles.css        # Štýly a CSS premenné (Style Guide)
├── script.js        # Interaktivita (modálne okno, SLA časovač)
├── docs/             # Dokumentácia a Design brief (Blok 1 – 5)
├── img/              # Náhľady a fotky papierových prototypov
└── README.md         # Dokumentácia repozitára