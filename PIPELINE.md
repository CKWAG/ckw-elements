# Token Pipeline — Wie Design-Tokens von Figma in den Code kommen

Dieses Dokument erklärt wie unser Token-System funktioniert — ohne technischen Jargon.
Für die technische Dokumentation siehe `ARCHITECTURE.md`.

---

## Was sind Design Tokens?

Design Tokens sind **Design-Entscheidungen in einer Datei** — Farben, Abstände,
Schriftgrössen, Schatten und mehr. Sie werden einmal in Figma definiert und dann
automatisch in Code-Dateien übersetzt, die Entwickler direkt verwenden können.

Statt dass ein Entwickler manuell `#86bc46` als Farbe eintippt, verwendet er
den Token `interactive-primary` — und der Token weiss, welche Farbe gemeint ist.

**282 Tokens** sind aktuell definiert: 155 Farben, 15 Abstände, 11 Rahmen,
48 Schrift-Einstellungen (Desktop + Mobile), 3 Schatten, 1 Verlauf und 1 Schriftart.

---

## Das grosse Bild

```
  ┌──────────────┐
  │    Figma      │  Hier definierst du alle Tokens (Farben, Abstände, Schriften …)
  │  (Variables)  │
  └──────┬───────┘
         │
         │  Export via Tokens Studio Plugin
         ▼
  ┌──────────────┐
  │  token-drop/  │  Du speicherst den Export einfach in diesen Ordner
  │  (Drop-Ordner)│
  └──────┬───────┘
         │
         │  Doppelklick auf "Start Token Sync"
         │  (alles danach passiert automatisch)
         ▼
  ┌──────────────┐
  │  Aufbereitung │  Die Rohdaten werden in ein sauberes Format gebracht
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  Code-Dateien │  Zwei fertige Dateien: tokens.css und tokens.js
  └──────┬───────┘
         │
         │  Werden verwendet von …
         │
    ┌────┴────────────────┐
    ▼                     ▼
  ┌──────────┐     ┌───────────┐
  │ Storybook │     │  Produkte  │
  │ (Doku)    │     │  (MyCKW …) │
  └──────────┘     └───────────┘
```

---

## Die Pipeline — Schritt für Schritt

### Schritt 1 — Figma Export (manuell, du als Designer)

Du öffnest das Tokens Studio Plugin in Figma und exportierst alle Token Sets
als eine einzelne JSON-Datei. Diese Datei speicherst du im Ordner `token-drop/`.

> **Input:** Figma Variables
> **Output:** Eine JSON-Datei im `token-drop/`-Ordner

### Schritt 2 — Doppelklick (das Script macht den Rest)

Du machst Doppelklick auf **"Start Token Sync.command"** im CKW-Ordner.
Das Script erledigt alles automatisch:

1. Es nimmt die neueste JSON-Datei aus `token-drop/`
2. Es bereitet die Rohdaten auf (bringt sie in ein standardisiertes Format)
3. Es generiert die fertigen Code-Dateien (`tokens.css` + `tokens.js`)
4. Es räumt den `token-drop/`-Ordner auf (löscht die verarbeitete Datei)
5. Es startet Storybook (falls es nicht schon läuft) und öffnet den Browser

> **Input:** JSON-Datei im `token-drop/`
> **Output:** `tokens.css` + `tokens.js` — fertig für Entwickler und Storybook

---

## Wer nutzt die Tokens?

### Storybook (unsere Dokumentation)

Storybook ist unsere **Nachschlage-Seite** für das Design System. Es zeigt alle Tokens
visuell an — Farbpaletten, Schriftmuster, Abstandsskala, Schatten, Rahmen.

Designer und Entwickler finden hier:
- Wie heisst welcher Token?
- Welche Farbe steckt dahinter?
- Wie sieht eine Schriftgrösse auf Desktop vs. Mobile aus?

Storybook aktualisiert sich automatisch wenn die Pipeline gelaufen ist.

### Produkte (z.B. MyCKW)

Entwickler binden die `tokens.css` in ihr Projekt ein. Danach können sie Tokens
als CSS-Variablen verwenden, z.B. `var(--interactive-primary)` für die Buttonfarbe.

Wenn sich eine Farbe in Figma ändert → Pipeline läuft → CSS wird aktualisiert →
alle Produkte die sie verwenden bekommen die Änderung automatisch.

---

## Zwei Ebenen: Primitiv und Semantisch

Unser Token-System hat zwei Ebenen. Das ist der Schlüssel zu einem flexiblen Design System.

### Primitive Tokens — die Rohmaterialien

Primitive Tokens sind die **direkten Werte** — die Farbtöpfe im Lager.

| Token | Wert | Beschreibung |
|-------|------|--------------|
| Grün/300 | `#86bc46` | Unser Markengrün |
| Grün/600 | `#365f10` | Dunkles Grün |
| Grau/800 | `#232623` | Fast Schwarz |
| Neutrals/White | `#ffffff` | Reines Weiss |

Es gibt **8 Farbgruppen** (Grün, Grau, Khaki, Blau, Gelb, Orange, Violett, Neutrals)
mit jeweils 11 Abstufungen (50 bis 900) — insgesamt 79 Farbwerte.

Dazu kommen Abstände, Rahmen-Radien, Rahmen-Stärken, Schatten, ein Verlauf
und die Schriftart Gotham.

### Semantische Tokens — die Bedeutung

Semantische Tokens beschreiben den **Zweck**, nicht den Wert.
Sie sind die Etiketten auf den Farbtöpfen: "Diese Farbe ist für Buttons."

| Token | Verweist auf | Zweck |
|-------|-------------|-------|
| `interactive-primary` | Grün/600 | Primäre Interaktionsfarbe (Buttons, Links) |
| `text-primary` | Grau/800 | Haupttext-Farbe |
| `background-default` | Neutrals/White | Standard-Hintergrund |
| `status-error-text` | Orange/600 | Fehler-Text |

Es gibt **76 semantische Farb-Tokens** in 7 Kategorien:
Text, Interaktiv, Hintergrund, Rahmen, Status, Chart und Dekorativ.

### Die Verbindung

```
  Primitiv:     Grün/600 = #365f10
                    ▲
                    │  verweist auf
                    │
  Semantisch:   interactive-primary = Grün/600
                    ▲
                    │  verwendet
                    │
  Komponente:   [ Button ]  Hintergrundfarbe = interactive-primary
```

### Warum zwei Ebenen?

**Flexibilität:** Wenn sich das Branding ändert (z.B. Button-Farbe soll neu Blau sein),
muss nur eine einzige Zuweisung geändert werden — nicht hunderte Stellen im Code:

```
  Vorher:   interactive-primary → Grün/600
  Nachher:  interactive-primary → Blau/600
```

Alle Buttons, Links und andere interaktive Elemente ändern sich automatisch mit.

**Konsistenz:** Entwickler verwenden immer `interactive-primary` und müssen nicht
wissen, welcher genaue Grünton gemeint ist. Das entscheidet das Design System.

---

## Dark Mode — von Anfang an vorbereitet

Unser System ist technisch für Dark Mode vorbereitet, **auch wenn es noch keinen gibt**.

### Wie funktioniert das?

Die semantischen Tokens haben aktuell nur einen Satz Werte — den Light Mode.
Sobald in Figma ein Dark Mode definiert wird, kommt ein zweiter Satz dazu:

| Token | Light Mode | Dark Mode (Zukunft) |
|-------|-----------|-------------------|
| `text-primary` | Grau/800 (dunkel) | z.B. Grau/100 (hell) |
| `background-default` | Weiss | z.B. Grau/900 (fast schwarz) |
| `interactive-primary` | Grün/600 | z.B. Grün/300 |

Das Schöne daran: **Die Produkte und Komponenten müssen dafür nicht angepasst werden.**
Sie verwenden weiterhin `text-primary` — nur der Wert dahinter ändert sich je nach Modus.

> Stell dir einen Lichtschalter vor: Die Etiketten auf den Farbtöpfen bleiben gleich,
> aber die Farbtöpfe selbst werden ausgetauscht.

### Was muss passieren damit Dark Mode kommt?

1. Dark Mode-Werte in Figma definieren (in den Figma Variables)
2. Export via Tokens Studio (wie gewohnt)
3. Pipeline laufen lassen (wie gewohnt)
4. Fertig — die Code-Dateien enthalten dann automatisch beide Modi

---

## Zusammenfassung

| Frage | Antwort |
|-------|---------|
| **Wo werden Tokens definiert?** | In Figma (Variables) |
| **Wie kommen sie in den Code?** | Export via Tokens Studio → `token-drop/` → Doppelklick → fertig |
| **Wo kann ich sie nachschlagen?** | In Storybook (Foundations-Seiten) |
| **Was wenn sich eine Farbe ändert?** | Neuer Export → Doppelklick → Storybook zeigt die Änderung |
| **Warum zwei Ebenen?** | Primitiv = Rohmaterial, Semantisch = Bedeutung. Flexibel und konsistent. |
| **Ist Dark Mode möglich?** | Ja, vorbereitet. Nur Figma-Werte definieren → Pipeline → fertig. |
| **Wie viele Tokens gibt es?** | 282 (79 Primitiv-Farben, 76 Semantisch, Rest: Abstände, Schriften etc.) |

---

## Dein Workflow als Designer

```
1.  Figma öffnen → Tokens ändern/hinzufügen
2.  Tokens Studio Plugin → Export als JSON
3.  JSON-Datei in den Ordner  ckw-elements/token-drop/  speichern
4.  Doppelklick auf "Start Token Sync.command"
5.  Lehne dich zurück — Pipeline läuft, Storybook öffnet sich, Änderungen sind sichtbar ✓
```
