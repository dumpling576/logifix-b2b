# Design Brief — LogiFix (B2B Incident Management)

> **Predmet:** Návrh a tvorba webových stránok (UNIZA, FPEDAS)  
> **Odbor:** Distribučné technológie a služby  
> **Vyučujúci:** Ing. Juraj Fabuš, PhD.  
> **Autor:** Anna Hubarenko  

---

## BLOK 1: Definícia projektu a produktová stratégia

### Cieľ webstránky
Produktová webstránka (Landing Page) s interaktívnou demo ukážkou pre B2B segment v oblasti logistiky a dopravy. Cieľom je presvedčiť potenciálneho B2B klienta alebo manažéra, aby si vyskúšal interaktívne Demo priamo na webe bez nutnosti inštalácie.

### Merateľný prínos (KPI)
- Zníženie priemerného času na vyriešenie logistického incidentu o **40 %**.
- Zníženie počtu telefonátov na zákaznícku podporu o **50 %**.

### Cieľová skupina
1. **Manažéri logistiky a distribúcie:** Hľadajú riešenie na zníženie chybovosti, úsporu času a prehľad nad KPI tímu.
2. **Dispečeri a logisti:** Potrebujú jednoduchý pracovný nástroj, kde okamžite vidia kritické incidenty a SLA limity.
3. **B2B klienti (E-shopy, odberatelia):** Chcú mať transparentný prehľad o stave svojich reklamácií a meškajúcich zásielok.

### Problém vs. Riešenie
- **Problém:** Chaotická e-mailová komunikácia a telefonáty, pomalá reakcia na kritické incidenty po termíne (SLA) a netransparentnosť stavu reklamácií.
- **Riešenie (LogiFix):** Centralizovaný B2B portál, vizuálny SLA časovač (semafor: červená / oranžová / zelená) a okamžité interaktívne Demo.

### Rozsah MVP (Scope Down)
Web funguje ako prezentačná Landing Page B2B produktu, ktorej súčasťou je interaktívny Dashboard logistu naprogramovaný v čistom HTML, CSS a Vanilla JavaScripte (bez komplexného backendu).

---

## BLOK 2: Persóny a používateľské scenáre

1. **Elena (29 rokov) — E-shop manažérka / B2B odberateľ:** Nie je IT expertka, potrebuje rýchlo nahlásiť poškodenú alebo meškajúcu zásielku bez zdĺhavých telefonátov a sledovať stav jej riešenia.
2. **Martin (24 rokov) — Dispečer / Logistik prepravy:** Pracuje pod časovým tlakom, potrebuje centralizovaný Dashboard s KPI kartami, farebné odlíšenie priorít podľa SLA a rýchlu úpravu stavu incidentu.
3. **Peter (45 rokov) — Manažér distribučnej firmy:** Zameriava sa na efektivitu a KPI ukazovatele, otestuje interaktívne Demo a vyhodnocuje prínos systému pre firmu.

---

## BLOK 3: Informačná architektúra a štruktúra webu

Informačná architektúra vychádza z centrálneho uzla **LogiFix — B2B Web** a pokrýva kľúčové moduly:
- **O nás / O systéme:** Prezentácia hodnoty systému a riešenie problémov v logistike.
- **Funkcie:** Hlavné výhody systému (živý SLA časovač, fotodokumentácia poškodenia, KPI Dashboard, centralizovaná B2B komunikácia).
- **Demo Dashboard (Incidenty & Zásielky):** 4 KPI karty (*Kritické*, *Po SLA*, *Čakajúce*, *Doručené / Vyriešené*), tabuľka incidentov so živým SLA časovačom, detail incidentu a modálne okno pre nahlásenie/úpravu problému vrátane nahratia fotky.
- **Kontakt:** Kontaktné údaje podpory a prepojenie na sociálne siete.

---

## BLOK 4: Papierový prototyp a používateľské testovanie

- **Navrhnuté obrazovky:** Hlavný Desktop Dashboard, modálne okno pre nahlásenie incidentu a mobilná responzívna verzia s hamburger menu.
- **Výsledky testovania (Think-Aloud Protocol):**
  - Tlačidlo `+ Nový incident` bolo presunuté do pravej hornej časti nad KPI karty pre rýchlejší prístup dispečera.
  - Do tabuľky bol pridaný samostatný stĺpec so živým SLA časovačom a farebnými odznakmi priorít.
  - Do modálneho okna bolo doplnené vyhradené pole pre nahratie fotodokumentácie poškodeného tovaru.

---

## BLOK 5: Interaktívny prototyp (Figma)

Na základe informačnej architektúry a papierových skíc bol vo Figme vytvorený digitálny prototyp s tmavomodrou B2B farebnou paletou a semaforovým značením SLA priorít, ktorý prepája hlavný Dashboard s modálnym oknom pre tvorbu incidentu.

---

## Výsledná realizácia (Nasadenie projektu)

- **Živá verzia webu (GitHub Pages):** [https://dumpling576.github.io/logifix-b2b/](https://dumpling576.github.io/logifix-b2b/)
- **GitHub repozitár:** [https://github.com/dumpling576/logifix-b2b](https://github.com/dumpling576/logifix-b2b)