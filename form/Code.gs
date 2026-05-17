/**
 * FTC Robotics Hack Day — Interest Form generator
 *
 * COME USARLO:
 *  1. Vai su https://script.google.com
 *  2. New project
 *  3. Cancella il contenuto di default, incolla TUTTO questo file
 *  4. Salva (icona floppy o Ctrl+S)
 *  5. Premi Run (Esegui) sulla funzione createForm
 *  6. Autorizza l'accesso al tuo account Google (prima volta)
 *  7. Apri View → Logs (o Esecuzioni → ultimo log) per vedere i link
 *
 * Il form viene creato sul tuo Google Drive personale.
 */

function createForm() {
  var form = FormApp.create('FTC Robotics Hack Day — Interest Form')
    .setDescription(
      "Ciao! Questo modulo serve a raccogliere il tuo interesse per l'Hack Day FTC e per le future attività di robotica. " +
      "Non è una selezione: vogliamo solo capire chi sei e cosa ti incuriosisce. Richiede meno di 2 minuti."
    )
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true)
    .setConfirmationMessage(
      'Grazie! Ti contatteremo presto con le informazioni sull\'Hack Day e sulle prossime attività FTC.'
    );

  // ---- SEZIONE 1 — Le tue informazioni ----
  form.addPageBreakItem()
    .setTitle('Le tue informazioni')
    .setHelpText('Iniziamo con qualche dato di base sullo studente.');

  form.addTextItem().setTitle('Nome e cognome').setRequired(true);
  form.addTextItem().setTitle('Età').setRequired(true);
  form.addTextItem().setTitle('Scuola').setRequired(true);
  form.addTextItem().setTitle('Classe').setRequired(true);

  var emailStudente = form.addTextItem().setTitle('Email').setRequired(true);
  var emailValidation = FormApp.createTextValidation()
    .setHelpText('Inserisci un indirizzo email valido')
    .requireTextIsEmail()
    .build();
  emailStudente.setValidation(emailValidation);

  // ---- SEZIONE 2 — Contatto genitore ----
  form.addPageBreakItem()
    .setTitle('Contatto genitore')
    .setHelpText('Per essere sicuri di poter aggiornare la famiglia.');

  form.addTextItem().setTitle('Nome del genitore').setRequired(true);

  var emailGenitore = form.addTextItem().setTitle('Email del genitore').setRequired(true);
  emailGenitore.setValidation(emailValidation);

  form.addTextItem().setTitle('Telefono del genitore').setRequired(true);

  // ---- SEZIONE 3 — Cosa ti interessa ----
  form.addPageBreakItem().setTitle('Cosa ti interessa');

  form.addCheckboxItem()
    .setTitle('Quali di queste cose ti incuriosiscono di più?')
    .setHelpText('Puoi scegliere quante vuoi.')
    .setChoiceValues([
      'Robotica',
      'Coding',
      'AI / intelligenza artificiale',
      'Elettronica',
      'CAD / progettazione 3D',
      'Stampa 3D',
      'Meccanica',
      'Video e media',
      'Grafica',
      'Lavoro di squadra',
      'Strategia e game design',
      'Public speaking'
    ])
    .setRequired(false);

  // ---- SEZIONE 4 — Esperienze precedenti ----
  form.addPageBreakItem()
    .setTitle('Esperienze precedenti')
    .setHelpText('Hai già provato qualcosa di questo? Nessun problema se non hai esperienza, è solo per capirci meglio.');

  form.addCheckboxItem()
    .setTitle('Hai già fatto qualcosa di simile?')
    .setChoiceValues([
      'LEGO / costruzioni',
      'Scratch',
      'Arduino',
      'Python',
      'Gaming',
      'Video editing',
      'Disegno 3D',
      'Costruire / smontare cose',
      'Non ancora niente di tutto questo'
    ])
    .setRequired(false);

  // ---- SEZIONE 5 — Disponibilità ----
  form.addPageBreakItem().setTitle('Disponibilità');

  form.addCheckboxItem()
    .setTitle('Quando saresti disponibile per le attività FTC?')
    .setChoiceValues([
      'Weekend',
      'Attività estive',
      'Possibili competizioni e trasferte in futuro',
      'Riunioni online'
    ])
    .setRequired(false);

  // ---- SEZIONE 6 — Collaborazione genitori ----
  form.addPageBreakItem()
    .setTitle('Collaborazione genitori')
    .setHelpText('Ai genitori: se ti va di dare una mano in qualche modo, in quale area ti senti più a tuo agio? (facoltativo)');

  form.addCheckboxItem()
    .setTitle('Aree in cui un genitore può contribuire')
    .setChoiceValues([
      'Organizzazione',
      'Trasporti',
      'Eventi',
      'Foto e video',
      'Sponsor e networking',
      'Workshop e attrezzature',
      'Mentoring STEM'
    ])
    .setRequired(false);

  // ---- SEZIONE 7 — Una domanda libera ----
  form.addPageBreakItem().setTitle('Una domanda libera');

  form.addParagraphTextItem()
    .setTitle('Cosa ti piacerebbe di più costruire, imparare o provare?')
    .setRequired(false);

  // ---- Crea anche il foglio risposte collegato ----
  var ss = SpreadsheetApp.create('FTC Hack Day — Risposte');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ---- Output ----
  var publishedUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();
  var sheetUrl = ss.getUrl();

  Logger.log('============================================');
  Logger.log('FORM CREATO CON SUCCESSO');
  Logger.log('============================================');
  Logger.log('Link compilazione (da mettere nel sito):');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('Link modifica (per editare il form):');
  Logger.log(editUrl);
  Logger.log('');
  Logger.log('Foglio risposte (Google Sheet):');
  Logger.log(sheetUrl);
  Logger.log('============================================');
}
