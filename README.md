# Carcadonti — Sito team FTC

Sito statico del team Carcadonti (FTC Robotics) dell'Istituto Professionale W. Kandinsky di Milano (dipartimenti: Grafica, Moda, Audiovisivo e multimediale, Servizi socio-sanitari).
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

## Pagina del QR del volantino (`entra/`)

**Indirizzo stampato sul volantino: https://fabcarim.github.io/ftc-hackday/entra/**

⚠️ Questo indirizzo è su carta: **non va mai cambiato né rinominato**. Non contiene anno né
stagione proprio perché il volantino non scada.

QR pronto per la stampa in `assets/qr/`:
- `qr-entra.svg` e `qr-entra.pdf` — vettoriali, da usare per impaginare il volantino
- `qr-entra-trasparente.svg` — stesso QR senza sfondo bianco
- `qr-entra.png` — solo per bozze a schermo

Correzione errori livello H: regge fotocopie, stampa scadente e un logo sovrapposto al centro
(purché copra al massimo ~25% dell'area). Stampalo almeno **2 cm di lato**, meglio 3.

### Cambiare il video della pagina

Apri `entra/index.html`, cerca l'unica riga che contiene `<iframe`, e sostituisci **solo** il
codice subito dopo `/embed/` con quello del nuovo video. Il codice di un video YouTube è la parte
del suo indirizzo che viene dopo `watch?v=`.

Esempio — video attuale:

    .../embed/gO98TkgY0kI?autoplay=1&mute=1...

Se il nuovo video fosse `https://www.youtube.com/watch?v=ABC123xyz99`, diventa:

    .../embed/ABC123xyz99?autoplay=1&mute=1...

Non toccare nient'altro della riga. Poi commit + push come per le altre pagine. L'indirizzo del
volantino resta lo stesso: il QR continua a funzionare.
