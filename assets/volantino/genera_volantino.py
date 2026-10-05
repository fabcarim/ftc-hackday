# -*- coding: utf-8 -*-
"""
Volantino A4 di reclutamento, versione a immagini.

Nives, 05/10/2026: per i ragazzi di un professionale il testo da solo non
basta, le immagini spiegano l'attivita' meglio delle parole. Quindi: foto
grandi, testo ridotto all'osso, e in chiaro quando e dove ci si trova.

Rigenerarlo:  python assets/volantino/genera_volantino.py
Il QR viene ricalcolato qui dentro dall'URL: non va mai cambiato a mano.
"""
import os

import segno
from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

URL = "https://fabcarim.github.io/ftc-hackday/entra/"
URL_VISIBILE = "fabcarim.github.io/ftc-hackday/entra"
OUT = "assets/volantino/volantino-reclutamento-A4.pdf"
LOGO = "assets/logo-kandinsky.png"
FOTO = "assets/foto"

INK = HexColor("#0b1220")
ACCENT = HexColor("#e2660a")     # arancio scurito: regge la fotocopia in grigio
GRIGIO = HexColor("#5b6b82")
LINEA = HexColor("#c8d2e0")

W, H = A4
M = 14 * mm
COL = W - 2 * M


def a_capo(c, testo, x, y, larghezza, font, dim, interlinea, colore=black):
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


def foto(c, nome, x, y, larghezza, altezza, didascalia=None):
    """Immagine riempita nel riquadro, con didascalia sotto."""
    c.drawImage(ImageReader(os.path.join(FOTO, nome)), x, y, larghezza, altezza,
                preserveAspectRatio=False, mask=None)
    if didascalia:
        c.setFont("Helvetica-Bold", 7.6)
        c.setFillColor(GRIGIO)
        c.drawString(x, y - 4.6 * mm, didascalia)


def disegna_qr(c, x, y, lato_mm):
    """QR vettoriale: un rettangolo pieno per modulo."""
    qr = segno.make_qr(URL, error="h")
    matrice = [list(r) for r in qr.matrix]
    n = len(matrice)
    passo = (lato_mm * mm) / n
    c.setFillColor(black)
    for r, riga in enumerate(matrice):
        for col, modulo in enumerate(riga):
            if modulo:
                c.rect(x + col * passo, y + (n - 1 - r) * passo,
                       passo + 0.25, passo + 0.25, stroke=0, fill=1)
    return n


c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Entra in squadra - FIRST Tech Challenge @ Kandinsky")
c.setAuthor("Carcadonti - Istituto Kandinsky")

y = H - M

# ---- testata -------------------------------------------------------------
logo_l = 19 * mm
logo_a = logo_l * 333 / 361
c.drawImage(LOGO, W - M - logo_l, y - logo_a, logo_l, logo_a, mask=None)
c.setFillColor(ACCENT)
c.setFont("Helvetica-Bold", 9)
c.drawString(M, y - 4 * mm, "ISTITUTO W. KANDINSKY   ·   DUE SQUADRE DI ROBOTICA")
y -= 17 * mm

# ---- titolo --------------------------------------------------------------
c.setFillColor(INK)
c.setFont("Helvetica-Bold", 30)
c.drawString(M, y, "Questo lo costruiscono")
c.setFillColor(ACCENT)
c.drawString(M, y - 11 * mm, "ragazzi come te.")
y -= 11 * mm + 7 * mm

# ---- apertura ------------------------------------------------------------
h_apertura = COL / 2.45
foto(c, "arena-match.jpg", M, y - h_apertura, COL, h_apertura)
y -= h_apertura + 5 * mm

c.setFont("Helvetica", 7.6)
c.setFillColor(GRIGIO)
c.drawString(M, y, "Un match di FIRST® Tech Challenge: due robot in campo, il tempo che scorre, "
                   "la squadra che guarda. FIRST Championship, Detroit.")
y -= 8 * mm

y = a_capo(c, "Una stagione, una squadra, un robot costruito da zero e portato in gara "
              "contro squadre di tutta Italia. Quest'anno la sfida si chiama BIOBUZZ™.",
           M, y, COL, "Helvetica-Bold", 12, 5.8 * mm, INK)

# ---- tre momenti ---------------------------------------------------------
gap = 4 * mm
larg = (COL - 2 * gap) / 3
alt = larg * 2 / 3
blocchi = [("arena-pubblico.jpg", "L'ARENA, NEL GIORNO DI GARA"),
           ("box-squadra.jpg", "AI BOX, PRIMA DEL MATCH"),
           ("meccanica.jpg", "MOTORI, CINGHIE, SENSORI")]
for i, (nome, didascalia) in enumerate(blocchi):
    foto(c, nome, M + i * (larg + gap), y - alt, larg, alt, didascalia)
y -= alt + 12 * mm

# ---- i ruoli, in una riga sola -------------------------------------------
c.setFillColor(ACCENT)
c.setFont("Helvetica-Bold", 10.5)
c.drawString(M, y, "LO COSTRUISCI  ·  LO PROGRAMMI  ·  GLI DAI UN VOLTO  ·  "
                   "RACCONTI LA STAGIONE  ·  LO PORTI FUORI")
y -= 5 * mm
c.setFillColor(GRIGIO)
c.setFont("Helvetica", 9.5)
c.drawString(M, y, "Si entra da dove sei già bravo: tutti cominciano da zero e imparano in squadra.")
y -= 8 * mm

# ---- quando e dove + QR --------------------------------------------------
h_banda = 58 * mm
c.setFillColor(INK)
c.roundRect(M, y - h_banda, COL, h_banda, 4 * mm, stroke=0, fill=1)

lato_qr = 47
qr_x = W - M - 7 * mm - lato_qr * mm
qr_y = y - h_banda + (h_banda - lato_qr * mm) / 2
c.setFillColor(white)
c.rect(qr_x - 3.5 * mm, qr_y - 3.5 * mm,
       lato_qr * mm + 7 * mm, lato_qr * mm + 7 * mm, stroke=0, fill=1)
moduli = disegna_qr(c, qr_x, qr_y, lato_qr)

tx = M + 8 * mm
c.setFillColor(ACCENT)
c.setFont("Helvetica-Bold", 11)
c.drawString(tx, y - 10 * mm, "SI COMINCIA DA QUI")
c.setFillColor(white)
c.setFont("Helvetica-Bold", 19)
c.drawString(tx, y - 19.5 * mm, "Lunedì pomeriggio,")
c.drawString(tx, y - 28 * mm, "allo Spazio Baroni.")
a_capo(c, "Dopo la scuola. Ci si ferma a pranzo insieme, se vuoi, e si comincia da lì.",
       tx, y - 35 * mm, qr_x - tx - 8 * mm, "Helvetica", 9.5, 4.4 * mm, HexColor("#9fb0c9"))
c.setFont("Helvetica-Bold", 8)
c.setFillColor(HexColor("#7b8ba5"))
c.drawString(tx, y - h_banda + 6 * mm, "Inquadra il codice:  " + URL_VISIBILE)
y -= h_banda + 7 * mm

# ---- piede ---------------------------------------------------------------
c.setFont("Helvetica", 6.8)
c.setFillColor(GRIGIO)
c.drawString(M, y,
             "FIRST®, FIRST® Tech Challenge e BIOBUZZ™ sono marchi di FIRST® "
             "(For Inspiration and Recognition of Science and Technology).")
c.drawString(M, y - 3.6 * mm,
             "Foto dell'arena: Stilfehler, FIRST Championship Detroit 2019, CC BY-SA 4.0 via Wikimedia "
             "Commons. Foto dei box e della meccanica: team Carcadonti, Istanbul 2026.")
c.drawString(M, y - 7.2 * mm,
             "Squadre Carcadonti #33480 e #34692 · Istituto Professionale per i Servizi "
             "Commerciali W. Kandinsky, via Saponaro 20 Milano · con Artù Onlus")

c.showPage()
c.save()
print(f"scritto {OUT}")
print(f"margine in fondo: {(y - 7.2*mm - 6*mm)/mm:.1f} mm  (se e' negativo, la pagina trabocca)")
print(f"QR: {moduli} moduli su {lato_qr} mm -> modulo da {lato_qr/moduli:.2f} mm "
      f"(soglia di sicurezza per la stampa: 0,4 mm)")
