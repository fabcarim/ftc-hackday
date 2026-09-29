# -*- coding: utf-8 -*-
"""
Genera il volantino A4 di reclutamento con il QR della pagina /entra/.

Rigenerarlo:  python assets/volantino/genera_volantino.py
Il QR viene ricalcolato qui dentro dall'URL: non va mai cambiato a mano.
"""
import segno
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

URL = "https://fabcarim.github.io/ftc-hackday/entra/"
URL_VISIBILE = "fabcarim.github.io/ftc-hackday/entra"
OUT = "assets/volantino/volantino-reclutamento-A4.pdf"

INK = HexColor("#0b1220")
ACCENT = HexColor("#e2660a")   # arancio leggermente scurito: regge la fotocopia in grigio
GRIGIO = HexColor("#5b6b82")
LINEA = HexColor("#c8d2e0")

W, H = A4
M = 16 * mm                    # margine


def testo_a_capo(c, testo, x, y, larghezza, font, dim, interlinea, colore=black):
    """Scrive un paragrafo mandando a capo. Restituisce la y finale."""
    c.setFont(font, dim)
    c.setFillColor(colore)
    riga = ""
    for parola in testo.split():
        prova = (riga + " " + parola).strip()
        if stringWidth(prova, font, dim) <= larghezza:
            riga = prova
        else:
            c.drawString(x, y, riga)
            y -= interlinea
            riga = parola
    if riga:
        c.drawString(x, y, riga)
        y -= interlinea
    return y


def porta(c, x, y, larghezza, altezza, titolo, descrizione):
    """Una delle quattro porte d'ingresso."""
    c.setStrokeColor(LINEA)
    c.setLineWidth(0.8)
    c.roundRect(x, y, larghezza, altezza, 3 * mm, stroke=1, fill=0)
    # barretta arancione di richiamo
    c.setFillColor(ACCENT)
    c.rect(x + 5 * mm, y + altezza - 5.5 * mm, 9 * mm, 1.2 * mm, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(INK)
    c.drawString(x + 5 * mm, y + altezza - 12 * mm, titolo)
    testo_a_capo(c, descrizione, x + 5 * mm, y + altezza - 17.5 * mm,
                 larghezza - 10 * mm, "Helvetica", 8.6, 4.4 * mm, GRIGIO)


def disegna_qr(c, x, y, lato_mm):
    """QR vettoriale: un rettangolo pieno per modulo, nessuna immagine."""
    qr = segno.make_qr(URL, error="h")
    matrice = [list(riga) for riga in qr.matrix]
    n = len(matrice)
    passo = (lato_mm * mm) / n
    c.setFillColor(black)
    for r, riga in enumerate(matrice):
        for col, modulo in enumerate(riga):
            if modulo:
                # +0.25 di sovrapposizione: evita le righine bianche di antialiasing
                c.rect(x + col * passo, y + (n - 1 - r) * passo,
                       passo + 0.25, passo + 0.25, stroke=0, fill=1)
    return n


c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Entra in squadra - FIRST Tech Challenge @ Kandinsky")
c.setAuthor("Carcadonti - Istituto Kandinsky")

y = H - M

# ---- occhiello -------------------------------------------------------------
c.setFillColor(ACCENT)
c.setFont("Helvetica-Bold", 9.5)
c.drawString(M, y - 4 * mm, "ISTITUTO KANDINSKY   ·   DUE SQUADRE DI ROBOTICA")
y -= 13 * mm

# ---- titolo ----------------------------------------------------------------
c.setFillColor(INK)
c.setFont("Helvetica-Bold", 37)
c.drawString(M, y - 10 * mm, "Costruiamo un robot.")
c.setFillColor(ACCENT)
c.drawString(M, y - 23 * mm, "Ci serve gente.")
y -= 32 * mm

c.setStrokeColor(LINEA)
c.setLineWidth(1)
c.line(M, y, W - M, y)
y -= 9 * mm

# ---- cos'e' ----------------------------------------------------------------
y = testo_a_capo(
    c,
    "Questo è FIRST® Tech Challenge: una squadra, una stagione, un robot costruito "
    "da zero per gareggiare. Il gioco di quest'anno si chiama BIOBUZZ™. Al Kandinsky "
    "ci sono due squadre, e stanno cercando nuovi membri.",
    M, y, W - 2 * M, "Helvetica", 11.5, 6 * mm, INK)
y -= 6 * mm

# ---- il messaggio ----------------------------------------------------------
c.setFillColor(INK)
c.setFont("Helvetica-Bold", 20)
c.drawString(M, y, "Non devi saperne niente di robotica.")
y -= 8 * mm
y = testo_a_capo(
    c, "Nessuno qui parte sapendo: si impara in squadra. Tu entra da dove sei già forte.",
    M, y, W - 2 * M, "Helvetica", 11, 5.6 * mm, GRIGIO)
y -= 5 * mm

# ---- le quattro porte ------------------------------------------------------
larghezza_box = (W - 2 * M - 6 * mm) / 2
altezza_box = 29 * mm
porte = [
    ("Costruire e programmare", "Progetti il robot, lo monti, scrivi il codice, lo guidi in gara."),
    ("Grafica e identità", "Logo, volantini, il quaderno di progetto che i giudici valutano."),
    ("Video e racconto", "Riprese, montaggio, social. Il video che presenta la squadra."),
    ("Persone e comunità", "Laboratori di robotica per bambini e anziani: portano punti e premi."),
]
for i, (titolo, descrizione) in enumerate(porte):
    col, rig = i % 2, i // 2
    porta(c,
          M + col * (larghezza_box + 6 * mm),
          y - altezza_box - rig * (altezza_box + 6 * mm),
          larghezza_box, altezza_box, titolo, descrizione)
y -= 2 * altezza_box + 6 * mm

# ---- blocco QR -------------------------------------------------------------
y -= 19 * mm
altezza_blocco = 67 * mm
c.setFillColor(INK)
c.roundRect(M, y - altezza_blocco, W - 2 * M, altezza_blocco, 4 * mm, stroke=0, fill=1)

lato_qr = 47
qr_x = W - M - 9 * mm - lato_qr * mm
qr_y = y - altezza_blocco + (altezza_blocco - lato_qr * mm) / 2
# riquadro bianco sotto il QR: la zona di quiete deve restare chiara
c.setFillColor(white)
c.rect(qr_x - 4 * mm, qr_y - 4 * mm, lato_qr * mm + 8 * mm, lato_qr * mm + 8 * mm,
       stroke=0, fill=1)
moduli = disegna_qr(c, qr_x, qr_y, lato_qr)

tx = M + 10 * mm
ty = y - 17 * mm
c.setFillColor(ACCENT)
c.setFont("Helvetica-Bold", 13)
c.drawString(tx, ty, "INQUADRA COL TELEFONO")
c.setFillColor(white)
c.setFont("Helvetica-Bold", 15)
c.drawString(tx, ty - 9 * mm, "Guarda cos'è, in 30 secondi.")
testo_a_capo(c, "Poi, se ti va, lasci i tuoi contatti. Due minuti, non ti impegna a niente.",
             tx, ty - 17 * mm, qr_x - tx - 10 * mm, "Helvetica", 9.5, 4.6 * mm,
             HexColor("#9fb0c9"))
c.setFont("Helvetica", 8.5)
c.setFillColor(HexColor("#7b8ba5"))
c.drawString(tx, y - altezza_blocco + 7 * mm, URL_VISIBILE)
y -= altezza_blocco

# ---- note marchi -----------------------------------------------------------
c.setFont("Helvetica", 7)
c.setFillColor(GRIGIO)
c.drawString(M, M + 4 * mm,
             "FIRST®, FIRST® Tech Challenge e BIOBUZZ™ sono marchi di FIRST® "
             "(For Inspiration and Recognition of Science and Technology).")
c.drawString(M, M, "Squadre Carcadonti #33480 e #34692 · Istituto Kandinsky, Milano "
                   "· in collaborazione con Artù Onlus")

c.showPage()
c.save()
print(f"scritto {OUT}")
print(f"QR: {moduli} moduli su {lato_qr} mm  ->  modulo da {lato_qr/moduli:.2f} mm "
      f"(la soglia di sicurezza per la stampa e' 0,4 mm)")
