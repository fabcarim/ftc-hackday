# Carcadonti — Sito team FTC

Sito statico del team Carcadonti (FTC Robotics) del Liceo Kandinsky.
Evento di Robotica: 29 maggio 2026, Aula Magna, 8:40-14:00.

Pubblicato su GitHub Pages: https://fabcarim.github.io/ftc-hackday/

## Immagini da salvare in `assets/`

Per far comparire le locandine e il logo, salva nella cartella `assets/` questi 3 file (i nomi devono essere esatti):

- `logo-carcadonti.png` — il logo del team (squalo robotico in cerchio rosso/oro)
- `locandina-evento.jpg` — la locandina principale "Evento di Robotica" (verticale)
- `locandina-hackathon.jpg` — la locandina "Competizione di Innovazione - Edizione Speciale Classe 2S" (verticale)

Finché non li carichi, al loro posto compaiono dei placeholder grigi.

## Aggiornare i testi

1. Apri il file `.html` della pagina che vuoi modificare (es. `index.html` per la home).
2. Modifica il testo tra i tag HTML.
3. Commit + push: `git add . && git commit -m "Aggiorna testo home" && git push`
4. Dopo ~1 minuto il sito è aggiornato online.

## Sostituire le immagini placeholder

Le sezioni con `[foto placeholder]` o `[foto dell'evento]` sono `<div>` da sostituire con `<img>`:

```html
<img src="assets/foto-evento.jpg" alt="Descrizione" class="w-full rounded-2xl">
```

Metti le immagini in `assets/` e referenziale via `assets/nome-file.jpg`.

## Cambiare il link del form

Il link del Google Form è nel pulsante "Compila il modulo" in `join.html`. Cerca `href=` nella pagina.

## Struttura

- `index.html` — home
- `ftc.html` — cos'è FTC
- `hackday.html` — evento 28-29 maggio
- `parents.html` — per i genitori
- `join.html` — iscrizione (linka Google Form)
- `resources.html` — video e link
- `assets/` — CSS, JS, immagini
- `form/Code.gs` — Apps Script per generare il Google Form
