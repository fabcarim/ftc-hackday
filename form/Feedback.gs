/**
 * FTC @ Kandinsky — Backend del form FEEDBACK (Google Apps Script Web App)
 *
 * Questo script riceve le risposte del form che è DENTRO il sito
 * (pagina "Evento 29 maggio") e le salva in un Google Sheet sul tuo Drive.
 *
 * ============================================================
 * COME PUBBLICARLO (una volta sola, ~1 minuto):
 * ============================================================
 *  1. Vai su https://script.google.com  →  New project
 *  2. Cancella il codice di default e incolla TUTTO questo file
 *  3. Salva (Ctrl+S)
 *  4. In alto a destra: Deploy  →  New deployment
 *  5. Clicca l'ingranaggio ⚙ accanto a "Select type"  →  Web app
 *  6. Imposta:
 *        - Description:    Feedback FTC
 *        - Execute as:     Me (il tuo account)
 *        - Who has access: Anyone        ← IMPORTANTE: "Chiunque"
 *  7. Deploy  →  autorizza l'accesso (come per l'altro form)
 *  8. Copia il "Web app URL" (finisce con /exec)  →  mandamelo
 *
 * Io lo inserisco nel sito e il form inizia a salvare le risposte.
 * Per vedere le risposte: esegui una volta la funzione apriFoglio()
 * (oppure te lo dà il log al primo invio) — è un Google Sheet.
 * ============================================================
 */

var SHEET_NAME = 'FTC Hackathon — Feedback (risposte)';
var HEADERS = ['Timestamp', 'Voto giornata', 'Interesse robotica',
               'Piaciuto di più', 'Si porta a casa', 'Da migliorare',
               'Vuole entrare', 'Contatto'];

function doPost(e) {
  try {
    var sheet = getSheet();
    var p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      p.voto || '',
      p.interesse || '',
      p.piaciuto || '',
      p.porto_a_casa || '',
      p.miglioreresti || '',
      p.entrare || '',
      p.contatto || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permette di verificare che il Web App sia online aprendo l'URL nel browser.
function doGet() {
  return ContentService.createTextOutput('FTC Feedback endpoint attivo.');
}

function getSheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  var ss;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_NAME);
    props.setProperty('SHEET_ID', ss.getId());
    var sh = ss.getSheets()[0];
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    Logger.log('Foglio risposte creato: ' + ss.getUrl());
  }
  return ss.getSheets()[0];
}

// Esegui questa funzione per stampare il link del foglio risposte.
function apriFoglio() {
  var sheet = getSheet();
  Logger.log('Foglio risposte: ' + sheet.getParent().getUrl());
}
