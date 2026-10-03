# Kartenverzeichnis

Übersicht aller Karten-Bilder in `assets/decks/`. Bei einer Erweiterung zuerst hier nachsehen, welche Motive es schon gibt – die Bilder müssen dafür nicht erneut angeschaut oder per KI ausgewertet werden.

**Pflege:** Wer eine Karte hinzufügt, entfernt oder umbenennt, trägt das hier ein. Ein Test (`src/decks/catalog.test.ts`) prüft bei `npm test`/`npm run build`, dass jede PNG-Datei in dieser Liste steht und umgekehrt.

**Herkunft:**
- *PDF* – aus den Original-PDFs extrahiert (`scripts/extract_cards.py`).
- *SVG* – von Hand als SVG gezeichnet und mit `node scripts/svg-cards/render.mjs` gerendert. Die Quellen liegen in `scripts/svg-cards/`; dort lassen sich Motive ändern oder neue im gleichen Stil ergänzen.

**Nächste freie Nummern:** Kinder `109`, Erwachsene `073`.

## Kinder (`kids`) – 108 Karten

Stil: kräftige schwarze Strichzeichnung auf Weiß, ein einzelnes Motiv, leichter grauer Schatten.

### cards/

| Datei | Motiv | Stichworte | Herkunft |
|---|---|---|---|
| 001.png | Segelboot auf dem Meer |  | PDF |
| 002.png | Leuchtturm |  | PDF |
| 003.png | Palmeninsel mit Sonne |  | PDF |
| 004.png | Flaschenpost |  | PDF |
| 005.png | Obstkiste mit Äpfeln |  | PDF |
| 006.png | Burg auf einem Felsen |  | PDF |
| 007.png | See mit Ruderboot und Schilf |  | PDF |
| 008.png | Löwe |  | PDF |
| 009.png | Steinbrücke über einem Fluss |  | PDF |
| 010.png | Zelt unter dem Sternenhimmel |  | PDF |
| 011.png | Gewitterwolke mit Blitz |  | PDF |
| 012.png | Zirkuszelt |  | PDF |
| 013.png | Tintenfass mit Feder |  | PDF |
| 014.png | Brief mit Siegel und Stempel |  | PDF |
| 015.png | Lupe |  | PDF |
| 016.png | Schraubenzieher und Taschenmesser |  | PDF |
| 017.png | Kaugummiautomat |  | PDF |
| 018.png | Offenes Buch |  | PDF |
| 019.png | Klavier und Geige |  | PDF |
| 020.png | Puzzleteile |  | PDF |
| 021.png | Geburtstagstorte |  | PDF |
| 022.png | Eistüte |  | PDF |
| 023.png | Heißluftballon |  | PDF |
| 024.png | Schatzkarte |  | PDF |
| 025.png | Schlüssel |  | PDF |
| 026.png | Laterne |  | PDF |
| 027.png | Regenschirm |  | PDF |
| 028.png | Taschenuhr |  | PDF |
| 029.png | Krone |  | PDF |
| 030.png | Rakete |  | PDF |
| 031.png | Mond mit Sternen |  | PDF |
| 032.png | Fliegenpilze |  | PDF |
| 033.png | Drachen (Spielzeug) |  | PDF |
| 034.png | Fernrohr |  | PDF |
| 035.png | Teekanne |  | PDF |
| 036.png | Windmühle |  | PDF |
| 037.png | Fahrrad |  | PDF |
| 038.png | Rettungsring |  | PDF |
| 039.png | Gartenzwerg |  | PDF |
| 040.png | Nashorn |  | PDF |
| 041.png | Delfin |  | PDF |
| 042.png | Brotlaib mit Brotscheibe |  | PDF |
| 043.png | Getränkedose |  | PDF |
| 044.png | Elefant |  | PDF |
| 045.png | Giraffe |  | PDF |
| 046.png | Schildkröte |  | PDF |
| 047.png | Fisch |  | PDF |
| 048.png | Eule |  | PDF |
| 049.png | Katze |  | PDF |
| 050.png | Hase |  | PDF |
| 051.png | Schnecke |  | PDF |
| 052.png | Schmetterling |  | PDF |
| 053.png | Igel |  | PDF |
| 054.png | Krake |  | PDF |
| 055.png | Pinguin |  | PDF |
| 056.png | Wal |  | PDF |
| 057.png | Fuchs |  | PDF |
| 058.png | Frosch |  | PDF |
| 059.png | Anker |  | PDF |
| 060.png | Schatztruhe |  | PDF |
| 061.png | Haus |  | PDF |
| 062.png | Apfelbaum |  | PDF |
| 063.png | Blume |  | PDF |
| 064.png | Sonne |  | PDF |
| 065.png | Regenbogen |  | PDF |
| 066.png | Auto |  | PDF |
| 067.png | Dampflok |  | PDF |
| 068.png | Flugzeug |  | PDF |
| 069.png | Trommel |  | PDF |
| 070.png | Gitarre |  | PDF |
| 071.png | Glocke |  | PDF |
| 072.png | Kerze |  | PDF |
| 073.png | Erdbeere |  | PDF |
| 074.png | Dampfende Tasse |  | PDF |
| 075.png | Brille |  | PDF |
| 076.png | Zauberhut mit Zauberstab |  | PDF |
| 077.png | Gummistiefel |  | PDF |
| 078.png | Geschenk |  | PDF |
| 079.png | Sanduhr |  | PDF |
| 080.png | Schere |  | PDF |
| 081.png | Lagerfeuer |  | PDF |
| 082.png | Muschel |  | PDF |
| 083.png | Kaktus |  | PDF |
| 084.png | Wasserball |  | PDF |
| 085.png | Astronaut auf dem Mond | Weltraum, Mond, Erde, Flagge, Sterne | SVG (`scripts/svg-cards/kids.mjs`) |
| 086.png | Große Spinne | Spinne, Netz, gruselig, Faden | SVG (`scripts/svg-cards/kids.mjs`) |
| 087.png | Eiskristall | Schneeflocke, Eis, Winter, Kälte | SVG (`scripts/svg-cards/kids.mjs`) |
| 088.png | T-Rex | Dinosaurier, Urzeit, Zähne, gefährlich | SVG (`scripts/svg-cards/kids.mjs`) |
| 089.png | Böser Tiger | Tiger, Raubkatze, wütend, Zähne, Dschungel | SVG (`scripts/svg-cards/kids.mjs`) |
| 090.png | Wildschwein | Wildschwein, Wald, Hauer, rennt, Angriff | SVG (`scripts/svg-cards/kids.mjs`) |
| 091.png | Brennendes Haus | Feuer, Haus, Rauch, Notfall, Feuerwehr | SVG (`scripts/svg-cards/kids.mjs`) |
| 092.png | Kirche | Kirche, Turm, Glocke, Uhr, Dorf | SVG (`scripts/svg-cards/kids.mjs`) |
| 093.png | Sportwagen | Auto, schnell, Rennen, Geschwindigkeit | SVG (`scripts/svg-cards/kids.mjs`) |
| 094.png | Käse mit Maus | Käse, Löcher, Maus, angeschnitten, Essen | SVG (`scripts/svg-cards/kids.mjs`) |
| 095.png | Geist | Gespenst, Spuk, Nacht, Mond, Buh | SVG (`scripts/svg-cards/kids.mjs`) |
| 096.png | Feuerdrache | Drache, Feuer, Fantasie, Hörner, gefährlich | SVG (`scripts/svg-cards/kids.mjs`) |
| 097.png | Vulkanausbruch | Vulkan, Lava, Ausbruch, Berg, Rauch | SVG (`scripts/svg-cards/kids.mjs`) |
| 098.png | Piratenschiff | Piraten, Schiff, Meer, Totenkopf, Kanonen | SVG (`scripts/svg-cards/kids.mjs`) |
| 099.png | Hai | Hai, Meer, Zähne, gefährlich, Fisch flieht | SVG (`scripts/svg-cards/kids.mjs`) |
| 100.png | UFO entführt Kuh | UFO, Außerirdische, Lichtstrahl, Kuh, Nacht | SVG (`scripts/svg-cards/kids.mjs`) |
| 101.png | Höhle mit leuchtenden Augen | Höhle, Augen, Dunkelheit, unheimlich, Fledermäuse | SVG (`scripts/svg-cards/kids.mjs`) |
| 102.png | Hexenkessel | Zaubertrank, Kessel, Feuer, Blasen, Magie | SVG (`scripts/svg-cards/kids.mjs`) |
| 103.png | Schlange | Schlange, Zunge, gefährlich, Wüste | SVG (`scripts/svg-cards/kids.mjs`) |
| 104.png | Krokodil | Krokodil, Wasser, Zähne, Fluss, Gefahr | SVG (`scripts/svg-cards/kids.mjs`) |
| 105.png | Hexe auf dem Besen | Hexe, Besen, Vollmond, Nacht, fliegen | SVG (`scripts/svg-cards/kids.mjs`) |
| 106.png | Roboter | Roboter, Maschine, Technik, Funken | SVG (`scripts/svg-cards/kids.mjs`) |
| 107.png | Fledermaus | Fledermaus, Nacht, Mond, Vampir, fliegen | SVG (`scripts/svg-cards/kids.mjs`) |
| 108.png | Hängebrücke über der Schlucht | Brücke, Schlucht, Abgrund, Mut, Abenteuer | SVG (`scripts/svg-cards/kids.mjs`) |

## Erwachsene (`erwachsene`) – 72 Karten + 12 offene Aktionskarten

Stil: körnige Bleistift-Linien, Schraffuren und hellgraue Flächen, meist eine ganze Szene (Ort oder Situation).

### cards/

| Datei | Motiv | Stichworte | Herkunft |
|---|---|---|---|
| 001.png | Wohnzimmer mit Kamin |  | PDF |
| 002.png | Sofa mit schlafendem Hund |  | PDF |
| 003.png | Zoo-Eingang |  | PDF |
| 004.png | Parkplatz (Einparken) |  | PDF |
| 005.png | Supermarkt mit Einkaufswagen |  | PDF |
| 006.png | Taucher unter Wasser |  | PDF |
| 007.png | Theaterbühne mit Publikum |  | PDF |
| 008.png | Bahnsteig mit Zug |  | PDF |
| 009.png | Fenster bei Regen (Tee, Buch) |  | PDF |
| 010.png | Bibliothek mit Leiter |  | PDF |
| 011.png | Strand mit Sonnenschirm und Liegestuhl |  | PDF |
| 012.png | Berge mit Wegweiser |  | PDF |
| 013.png | Küche mit Herd |  | PDF |
| 014.png | Wartezimmer |  | PDF |
| 015.png | Flughafen-Terminal |  | PDF |
| 016.png | Marktstand |  | PDF |
| 017.png | Picknick unter einem Baum |  | PDF |
| 018.png | Zelten am See bei Nacht |  | PDF |
| 019.png | Schreibtisch mit Computer |  | PDF |
| 020.png | Person mit Schirm im Regen |  | PDF |
| 021.png | Bootshaus am Steg mit Boot |  | PDF |
| 022.png | Bauernhof mit Scheune und Silo |  | PDF |
| 023.png | Badezimmer mit Badewanne |  | PDF |
| 024.png | Schlafzimmer bei Sonnenaufgang |  | PDF |
| 025.png | Kino |  | PDF |
| 026.png | Museum mit Gemälde |  | PDF |
| 027.png | Konzertbühne |  | PDF |
| 028.png | Aufzug |  | PDF |
| 029.png | Tankstelle |  | PDF |
| 030.png | Werkstatt mit Werkbank |  | PDF |
| 031.png | Gemüsebeet am Gartenzaun |  | PDF |
| 032.png | Spielplatz mit Schaukel und Rutsche |  | PDF |
| 033.png | Gedeckter Tisch (Restaurant) |  | PDF |
| 034.png | Dachboden |  | PDF |
| 035.png | Keller mit Vorratsregal und Fass |  | PDF |
| 036.png | Hotelrezeption |  | PDF |
| 037.png | Berghütte im Winter |  | PDF |
| 038.png | Straße mit Ampel |  | PDF |
| 039.png | Wüste mit Kamel und Oase |  | PDF |
| 040.png | Baumhaus |  | PDF |
| 041.png | Geburtstagsfeier |  | PDF |
| 042.png | Umzug mit Kartons und Lkw |  | PDF |
| 043.png | Friseursalon |  | PDF |
| 044.png | Briefkasten an der Straße |  | PDF |
| 045.png | Balkon mit Fernrohr bei Nacht |  | PDF |
| 046.png | Höhle mit Fackel |  | PDF |
| 047.png | Steuerrad auf einem Schiff |  | PDF |
| 048.png | Zugabteil mit Fenster |  | PDF |
| 049.png | Raketenstart | Rakete, Start, Weltraum, Rauch, Countdown | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 050.png | Arbeit am Computer | Büro, Computer, Arbeit, Nachtschicht, Deadline | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 051.png | Familienausflug | Familie, Wandern, Natur, Ausflug, Kinder | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 052.png | Streit | Streit, Konflikt, Wut, Paar, Diskussion | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 053.png | Zerbrochenes Geschirr | Scherben, Geschirr, Küche, Unfall, kaputt | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 054.png | Party | Party, Feier, Tanzen, Musik, Diskokugel | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 055.png | Segeln | Segelboot, Meer, Wind, Wellen, Urlaub | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 056.png | Krankenhauszimmer | Krankenhaus, Bett, Patient, Infusion, Herzmonitor | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 057.png | Gerichtssaal | Gericht, Richter, Urteil, Hammer, Prozess | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 058.png | Hochzeit | Hochzeit, Paar, Feier, Liebe, Zeremonie | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 059.png | Unfall mit Blaulicht | Unfall, Polizei, Blaulicht, Nacht, Straße | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 060.png | Leuchtturm im Sturm | Leuchtturm, Sturm, Wellen, Blitz, Meer | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 061.png | Labor | Labor, Experiment, Wissenschaft, Reagenzglas, Mikroskop | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 062.png | Verlassenes Haus bei Nacht | Spukhaus, verlassen, Nacht, Mond, unheimlich | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 063.png | Offener Tresor | Tresor, Bank, Gold, Einbruch, Laser | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 064.png | Baustelle mit Kran | Baustelle, Kran, Bau, Last, Arbeiter | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 065.png | Fußballstadion | Stadion, Fußball, Spiel, Zuschauer, Flutlicht | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 066.png | Friedhof im Nebel | Friedhof, Nebel, Gräber, Nacht, Rabe | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 067.png | Vorstellungsgespräch | Bewerbung, Gespräch, Büro, Job, Nervosität | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 068.png | Im Schneesturm stecken geblieben | Schnee, Sturm, Auto, Winter, Panne | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 069.png | Fitnessstudio | Sport, Fitness, Training, Hanteln, Laufband | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 070.png | Beim Zahnarzt | Zahnarzt, Behandlung, Angst, Bohrer, Praxis | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 071.png | Riesenrad auf der Kirmes | Riesenrad, Kirmes, Jahrmarkt, Nacht, Lichter | SVG (`scripts/svg-cards/erwachsene.mjs`) |
| 072.png | Gefängniszelle | Gefängnis, Zelle, Gitter, Flucht, Schlüssel | SVG (`scripts/svg-cards/erwachsene.mjs`) |

### open/ (immer offen liegende Aktionskarten)

| Datei | Aufschrift |
|---|---|
| 01-nimm.png | Nimm |
| 02-geh.png | Geh |
| 03-benutze.png | Benutze |
| 04-oeffne.png | Öffne |
| 05-schliesse.png | Schließe |
| 06-gib.png | Gib |
| 07-sprich-mit.png | Sprich mit |
| 08-schau-an.png | Schau an |
| 09-druecke.png | Drücke |
| 10-ziehe.png | Ziehe |
| 11-hoer-zu.png | Hör zu |
| 12-denk-nach.png | Denk nach |
