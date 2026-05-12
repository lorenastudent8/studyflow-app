# Projektdokumentation - [Projekttitel]

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage
Kurz beschreiben, welches Problem adressiert wird und welches Ergebnis angestrebt ist. Wem nützt die Lösung, wer ist beteiligt oder betroffen?
- **Problem:** Studierende haben oft mehrere Lernaufgaben gleichzeitig und verlieren den Überblick. Zudem fällt es vielen schwer, fokussiert zu lernen und Aufgaben konsequent abzuschliessen.  
- **Ziele:** _
- Übersicht über Aufgaben schaffen  
- Fokus beim Lernen unterstützen  
- Aufgaben einfach erstellen und verwalten können  
- Fortschritt sichtbar machen  
- Motivation durch visuelles Feedback erhöhen 
- **Primäre Zielgruppe:** Studierende, die ihre Lernaufgaben strukturieren und fokussierter arbeiten möchten
- **Weitere Stakeholder [Optional]:** _[z. B. Verwaltung, Geschäftsleitung]_  


## 2. Lösungsidee
Beschreibt die Lösungsidee.
- **Kernfunktionalität:** _[Workflows kurz nennen und optional illustrieren]_  
- Aufgaben erstellen  
- Aufgaben bearbeiten  
- Aufgaben als erledigt markieren  
- Aufgaben filtern (offen / erledigt)  
- Fortschritt anzeigen 
- **Annahmen [Optional]:** _[welche Hypothesen werden geprüft?]_
- Nutzer möchten einfache und schnelle Eingabe  
- Visuelles Feedback motiviert  
- **Abgrenzung [Optional]:** _[Was gehört explizit nicht zum Umfang?]_
- Keine Benutzeraccounts  
- Kein komplexes Zeittracking  

## 3. Vorgehen & Artefakte
Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 3.1 Understand & Define
- **Zielgruppenverständnis:** _[Problemraumanalyse, Recherche, (Proto-)Personas]_
Studierende arbeiten oft unter Zeitdruck und benötigen einfache Tools ohne Komplexität.
- **Wesentliche Erkenntnisse:** _[Stichpunkte]_
- Einfachheit ist wichtiger als viele Features  
- Schnelle Eingabe von Aufgaben ist entscheidend  
- Sichtbarer Fortschritt motiviert  

### 3.2 Sketch
- **Variantenüberblick:** _[kurz]_
Es wurden verschiedene Layouts für die Aufgabenübersicht entworfen, darunter eine einfache Liste und eine Kartenansicht.
- **Skizzen:** _[Mehrere Varianten; Unterschiede kurz dokumentieren.]_
Variante 1: Klassische Liste mit Text  
Variante 2: Kartenbasierte Darstellung mit Buttons  
Variante 3: Dashboard mit Statistik  

Die Kartenansicht wurde gewählt, da sie übersichtlicher und moderner wirkt.

### 3.3 Decide
- **Gewählte Variante & Begründung:** _[Entscheidkriterien nennen]_  
Eine einfache Aufgabenübersicht mit Fokus auf Kernfunktionen wurde gewählt, um Überforderung zu vermeiden.
- **End-to-End-Ablauf:** _[Beschreibung inkl. User Journey Map]_  
User öffnet Aufgabenübersicht → erstellt Aufgabe → sieht Aufgabe → markiert sie als erledigt → sieht Fortschritt
- **Mockup:** _[URL, z. B. Figma; Screenshots mit kurzen Beschreibungen]_  

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die technische Umsetzung]_
- Startseite (Dashboard)  
- Aufgabenübersicht (/tasks)  
- Neue Aufgabe erstellen (/tasks/new)  
- Aufgabe bearbeiten (/tasks/[id]/edit) 

- **User Interface Design:** _[wichtige Screens: Screenshots mit kurzen Erläuterungen]_  
Die Anwendung verwendet ein klares, minimalistisches Design mit Karten (Cards), Buttons und einer Navigationsleiste.

- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_
- Fokus auf Einfachheit  
- Klare Call-to-Action Buttons  
- Verwendung von Farben für Statusanzeigen 

#### 3.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie-Stack:** _[SvelteKit, Bibliotheken falls genutzt]_
- SvelteKit  
- MongoDB Atlas  
- Netlify  

- **Tooling:** _[IDE/Erweiterungen, lokale/Cloud-Tools; den Einsatz von KI beschreiben Sie im Kapitel **KI-Deklaration**]_  
- Visual Studio Code  
- Git & GitHub

- **Struktur & Komponenten:** _[Seiten, Routen, State/Stores, wichtige Komponenten]_
- Seiten: +page.svelte, /tasks, /tasks/new, /tasks/[id]/edit  
- Komponenten: TaskCard.svelte 

- **Daten & Schnittstellen:** _[Wie werden Daten gespeichert, verwaltet, abgerufen?]_
Aufgaben werden in MongoDB gespeichert und über Server-Routes geladen und bearbeitet.

- **Deployment:** _[URL]_  
https://studyflow-app-pt.netlify.app/

- **Besondere Entscheidungen:** _[z. B. Trade-offs, Vereinfachungen]_  
- Verwendung von Komponenten zur Wiederverwendbarkeit  
- Fokus auf einfache und verständliche Architektur 

### 3.5 Validate
- **URL der getesteten Version** (separat deployt)
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
- Ist der Workflow verständlich?  
- Können Nutzer Aufgaben problemlos erstellen und bearbeiten?  

- **Vorgehen:** _[moderiert/unmoderiert; remote/on-site]_  
Moderierter Test mit 2 Testpersonen vor Ort  

- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
2 Studierende 

- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_  
- Neue Aufgabe erstellen  
- Aufgabe als erledigt markieren  
- Aufgabe bearbeiten 

- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2-4 Sätze]_  
- **Abgeleitete Verbesserungen:** _[Anforderungen, die als nächstes umgesetzt werden sollten, priorisiert, kurz begründet; falls Verbesserungen im Prototyp konkret umgesetzt wurden: In Kap. 4 dokumentieren]_  

## 4. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### _[4.x Kurzbeschreibung / Titel]_  
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Wo umgesetzt:** _[Wie und wo wurde es gemacht? Frontend, Backend, Datenbank?]_  
- **Referenz:** _[Wo wird die Erweiterung auch noch beschrieben, z.B. Screenshot oder Beschreibung in einem anderen Kapitel]_  
- **Aus Evaluation abgeleitet?:** _[Wurde diese Erweiterung als Folge eines in der Evaluation identifizierten Issues implementiert?]_  

> Das folgende **Beispiel** wurde bewusst kurz gehalten. Erweiterungen dürfen auch ausführlicher beschrieben werden.

### 4.1 Tabelle nach Kategorien filtern
- **Beschreibung & Nutzen:** Tabelle X kann nach Kategorie gefiltert werden, weil User typischerweise nur an einer bestimmten Kategorie interessiert sind.  
- **Wo umgesetzt:** 
  - **Frontend:** Tabelle mit Dropdown in Datei ...
  - **Backend:** Form Action ... in Datei ...
  - **Datenbank:** MongoDB-Query in Datei ...
- **Referenz:** Screenshot in Kap. x.y
- **Aus Evaluation abgeleitet?:** Ja, Issue x.y

## 5. Projektorganisation [Optional]
Beispiele:
- **Repository & Struktur:** _[Link; kurze Strukturübersicht]_  
- **Issue-Management:** _[Vorgehen kurz beschreiben]_  
- **Commit-Praxis:** _[z. B. sprechende Commits]_

## 6. KI-Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools
- **Eingesetzte Tools**: _[z. B. Copilot, ChatGPT, Claude, lokale Modelle; Version/Variante wenn bekannt]_
- ChatGPT wurde zur Unterstützung verwendet  

- **Zweck & Umfang**: _[wie, wofür und in welchem Ausmass wurde KI eingesetzt (z. B. Textentwürfe, Codevorschläge, Tests, Refactoring); welche Teile stammen (ganz/teilweise) aus KI-Unterstützung?]_
- Hilfe bei Code  
- Debugging  
- Struktur 

- **Eigene Leistung (Abgrenzung):** _[was ist eigenständig erarbeitet/überarbeitet worden?]_
- Anpassung und Verständnis des Codes  
- eigenständige Umsetzung 

### 6.2 Prompt-Vorgehen
_[Überlegungen zu Prompt-Vorgehen, Qualität und Urheberrecht/Quellen. Wie wurde beim Prompting vorgegangen? Zu beschreiben ist die grundlegende Vorgehensweise. Einzelne, konkrete Prompts sollten höchstens als Beispiele aufgeführt werden. ]_

### 6.3 Reflexion
_[Nutzen, Grenzen, Risiken/Qualitätssicherung, ...]_

## 7. Anhang [Optional]
Beispiele:
- **Quellen:** _[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; ...]_
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_  

