/**
 * FTC @ Kandinsky — Form FEEDBACK giornata Hackathon
 *
 * COME USARLO (60 secondi):
 *  1. Vai su https://script.google.com
 *  2. New project
 *  3. Cancella il codice di default, incolla TUTTO questo file
 *  4. Salva (Ctrl+S)
 *  5. Premi Run sulla funzione createFeedbackForm
 *  6. Autorizza l'accesso (prima volta)
 *  7. Apri View → Logs: trovi 3 link (compilazione, modifica, foglio risposte)
 *
 * Poi mandami il "Link compilazione" e lo incorporo nella pagina dell'evento.
 */

function createFeedbackForm() {
  var form = FormApp.create('FTC Hackathon — Il tuo feedback')
    .setDescription(
      "Grazie per aver partecipato alla giornata! Raccontaci com'è andata: " +
      "bastano 1-2 minuti e ci aiuti a migliorare. Le risposte sono anonime."
    )
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true)
    .setConfirmationMessage('Grazie per il tuo feedback! Ci aiuta tantissimo. 🦈');

  // 1 — Voto complessivo
  form.addScaleItem()
    .setTitle('Quanto ti è piaciuta la giornata?')
    .setBounds(1, 5)
    .setLabels('Per niente', 'Tantissimo')
    .setRequired(true);

  // 2 — Interesse per la robotica
  form.addScaleItem()
    .setTitle("Quanto è cresciuto il tuo interesse per la robotica dopo oggi?")
    .setBounds(1, 5)
    .setLabels('Per niente', 'Moltissimo')
    .setRequired(true);

  // 3 — Cosa è piaciuto di più
  form.addCheckboxItem()
    .setTitle('Cosa ti è piaciuto di più?')
    .setChoiceValues([
      'I robot in azione',
      'Le sfide / mini-challenge',
      'Costruire qualcosa con le mani',
      'La parte di coding',
      'Il lavoro di squadra',
      'Conoscere il team',
      'L\'atmosfera della giornata'
    ])
    .showOtherOption(true)
    .setRequired(false);

  // 4 — Testo libero: piaciuto
  form.addParagraphTextItem()
    .setTitle('Cosa ti porti a casa da questa giornata?')
    .setRequired(false);

  // 5 — Testo libero: da migliorare
  form.addParagraphTextItem()
    .setTitle('Cosa miglioreresti?')
    .setRequired(false);

  // 6 — Vorrebbe partecipare
  form.addMultipleChoiceItem()
    .setTitle('Ti piacerebbe entrare in un team FTC al Kandinsky?')
    .setChoiceValues([
      'Sì, decisamente',
      'Forse, vorrei saperne di più',
      'Per ora no'
    ])
    .setRequired(false);

  // 7 — Contatto facoltativo (per chi vuole essere ricontattato)
  form.addTextItem()
    .setTitle('Se vuoi essere ricontattato, lascia nome ed email (facoltativo)')
    .setRequired(false);

  // Foglio risposte collegato
  var ss = SpreadsheetApp.create('FTC Hackathon — Feedback (risposte)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('============================================');
  Logger.log('FORM FEEDBACK CREATO');
  Logger.log('============================================');
  Logger.log('Link compilazione (mandami questo):');
  Logger.log(form.getPublishedUrl());
  Logger.log('');
  Logger.log('Link modifica:');
  Logger.log(form.getEditUrl());
  Logger.log('');
  Logger.log('Foglio risposte:');
  Logger.log(ss.getUrl());
  Logger.log('============================================');
}
