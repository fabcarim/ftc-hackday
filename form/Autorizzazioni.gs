/**
 * FIRST® Tech Challenge @ Kandinsky — Modulo autorizzazioni genitori
 *
 * COME USARLO:
 *  1. Vai su https://script.google.com
 *  2. New project
 *  3. Cancella il contenuto di default, incolla TUTTO questo file
 *  4. PRIMA DI ESEGUIRE: completa i dati in CONFIG qui sotto
 *  5. Salva (Ctrl+S), poi Run sulla funzione createAuthForm
 *  6. Autorizza l'accesso al tuo account Google (prima volta)
 *  7. Apri Esecuzioni → ultimo log per vedere il link da mandare ai genitori
 *
 * UNA COSA SOLA PRIMA DI ESEGUIRLO:
 *  esegui lo script mentre sei loggato con l'account ARTÙ (fabio.carimati@artuonlus.org).
 *  Il form e il foglio delle risposte nascono sul Drive di quell'account: sono dati di minori
 *  e non devono stare su un Drive personale.
 *
 *  Resta da completare solo C.F. / RUNTS di ARTÙ in CONFIG (li ha Sandra): il form funziona
 *  anche senza, ma quella riga va riempita prima di mandarlo ai genitori.
 *
 * NOTA SULL'EMAIL DEL GENITORE (scelta consapevole):
 *  la raccolta automatica dell'email di Google è DISATTIVATA. Quell'opzione corrisponde a
 *  "Verificato" e obbliga chi compila ad avere un account Google e a essere loggato: un
 *  genitore senza account non riuscirebbe proprio a compilare. Al suo posto c'è un campo
 *  email obbligatorio con validazione di formato. Il consenso resta tracciabile da nome del
 *  genitore, nome dello studente, telefono, data e ora e dichiarazione finale.
 */

var CONFIG = {
  ente: 'ARTÙ APS',                                  // titolare del trattamento
  enteDati: 'C.F. / RUNTS: [DA COMPLETARE]',
  mailRiferimento: 'fabio.carimati@artuonlus.org',   // riferimento unico per tutto: domande, modifiche, revoche
  referenti: 'Fabio Carimati (coach, ARTÙ APS) e prof.ssa Nives Vasta (referente d\'istituto)',
  sede: 'Spazio Baroni, Milano — lunedì pomeriggio',
  stagione: '2026/2027',
  cartella: 'FTC Kandinsky — Autorizzazioni (dati di minori)'
};

function createAuthForm() {
  var form = FormApp.create('FIRST® Tech Challenge @ Kandinsky — Autorizzazioni dei genitori ' + CONFIG.stagione)
    .setDescription(
      'Gentili genitori,\n\n' +
      'vostro figlio o vostra figlia partecipa al gruppo di robotica che prende parte al programma ' +
      'internazionale FIRST® Tech Challenge, con le squadre Carcadonti e Nova, seguite da ' + CONFIG.referenti + '. ' +
      'Gli incontri si tengono presso ' + CONFIG.sede + ', sempre alla presenza di adulti.\n\n' +
      'Per poter lavorare servono alcune autorizzazioni. Sono separate: potete dire sì ad alcune e no ad altre, ' +
      'e ogni scelta si può cambiare in qualsiasi momento scrivendo a ' + CONFIG.mailRiferimento + '.\n\n' +
      'Compila un modulo per ciascun figlio. Servono due minuti. ' +
      'Non serve avere un account Google.'
    )
    .setCollectEmail(false)            // vedi NOTA in testa al file: l'email la chiediamo a mano
    .setLimitOneResponsePerUser(false) // un genitore può avere più figli
    .setProgressBar(true)
    .setConfirmationMessage(
      'Grazie! Il consenso è registrato. Per modificarlo o revocarlo in qualsiasi momento scrivete a ' +
      CONFIG.mailRiferimento + '.'
    );

  var validaEmail = FormApp.createTextValidation()
    .setHelpText('Inserisci un indirizzo email valido.')
    .requireTextIsEmail()
    .build();

  // ---------- SEZIONE 1 — Chi siete ----------
  // Intestazione e non interruzione di pagina: così la prima pagina non resta vuota.
  form.addSectionHeaderItem()
    .setTitle('Chi compila')
    .setHelpText('Il modulo va compilato da un genitore o da chi esercita la responsabilità genitoriale.');

  form.addTextItem().setTitle('Nome e cognome dello studente / della studentessa').setRequired(true);
  form.addTextItem().setTitle('Classe').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Squadra')
    .setHelpText('Se non lo sapete, scegliete l\'ultima opzione: ve lo diciamo noi.')
    .setChoiceValues(['Carcadonti (#33480)', 'Nova (#34692)', 'Non ancora assegnata / non so'])
    .setRequired(true);

  form.addTextItem().setTitle('Nome e cognome del genitore che compila').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('In qualità di')
    .setChoiceValues(['Genitore', 'Tutore / esercente la responsabilità genitoriale'])
    .setRequired(true);

  var emailGenitore = form.addTextItem().setTitle('Email del genitore').setRequired(true);
  emailGenitore.setHelpText(
    'È l\'indirizzo a cui vi scriviamo e dal quale potete chiedere in qualsiasi momento di ' +
    'modificare o revocare il consenso. Controllatelo bene.'
  );
  emailGenitore.setValidation(validaEmail);

  var telefono = form.addTextItem().setTitle('Telefono del genitore (per le emergenze)').setRequired(true);
  telefono.setHelpText('Usato solo per contattarvi durante le attività.');

  // ---------- SEZIONE 2 — Foto e video ----------
  form.addPageBreakItem()
    .setTitle('Foto e video')
    .setHelpText(
      'Durante le attività scattiamo foto e giriamo video. Servono a due cose diverse, ' +
      'e per questo le chiediamo separatamente.'
    );

  form.addMultipleChoiceItem()
    .setTitle('1) Riprese per uso interno alla squadra')
    .setHelpText(
      'Foto e video usati solo dentro la squadra e nel portfolio tecnico che viene presentato ai giudici ' +
      'durante le gare. Non vengono pubblicati online.'
    )
    .setChoiceValues(['Autorizzo', 'Non autorizzo'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('2) Pubblicazione sui canali della squadra')
    .setHelpText(
      'Pubblicazione su Instagram, TikTok, YouTube e sul sito della squadra. ' +
      'Regola che applichiamo sempre: gli studenti si indicano con il nome e l\'iniziale del cognome, ' +
      'mai con cognome intero, classe o contatti. Nessun uso commerciale, nessuna cessione a terzi.\n\n' +
      'Se non autorizzate: prima di pubblicare controlliamo le immagini una per una ed escludiamo ' +
      'quelle in cui vostro figlio o vostra figlia è riconoscibile.'
    )
    .setChoiceValues(['Autorizzo', 'Non autorizzo'])
    .setRequired(true);

  // ---------- SEZIONE 3 — Il diario di squadra ----------
  form.addPageBreakItem()
    .setTitle('Il diario della stagione')
    .setHelpText(
      'La squadra lavora su un gruppo WhatsApp. Quello che i ragazzi scrivono durante l\'anno ' +
      '(messaggi, foto, note vocali) è la memoria del lavoro e viene riassunto nel diario di bordo, ' +
      'che è parte del portfolio valutato dai giudici.'
    );

  form.addMultipleChoiceItem()
    .setTitle('3) Uso dei contenuti della chat per il diario di squadra')
    .setHelpText(
      'Una volta a settimana i coach esportano la conversazione del gruppo e la fanno riassumere ' +
      'da un assistente di intelligenza artificiale, per ricostruire il lavoro fatto e scrivere il diario ' +
      'di bordo. Prima di passare i contenuti all\'assistente vengono rimossi i numeri di telefono: ' +
      'restano solo i nomi di battesimo. Il risultato lo leggono soltanto i coach e confluisce nel ' +
      'portfolio tecnico della squadra. I contenuti non vengono pubblicati né ceduti a terzi, e non ' +
      'vengono usati per nessuna altra finalità.\n\n' +
      'Se non autorizzate: l\'esportazione riguarda per forza tutta la conversazione del gruppo, ' +
      'quindi prima di passarla all\'assistente i coach cancellano a mano tutti i messaggi inviati da ' +
      'vostro figlio o vostra figlia. I suoi contenuti non entrano né nell\'assistente né nel diario.'
    )
    .setChoiceValues(['Autorizzo', 'Non autorizzo'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4) Uso degli stessi strumenti insieme ai ragazzi durante le attività')
    .setHelpText(
      'Durante gli incontri i coach usano assistenti di intelligenza artificiale insieme ai ragazzi, ' +
      'per esempio per tradurre e spiegare la documentazione tecnica, che è tutta in inglese, o per capire ' +
      'un errore di programmazione. Gli account sono intestati agli adulti e i ragazzi non ne hanno uno ' +
      'proprio: lavorano sempre insieme a un coach. Nessun dato personale dei ragazzi viene inserito ' +
      'in questi strumenti.\n\n' +
      'Se non autorizzate: vostro figlio o vostra figlia lavora sugli stessi materiali con l\'aiuto ' +
      'diretto di un coach, senza passare da questi strumenti.'
    )
    .setChoiceValues(['Autorizzo', 'Non autorizzo'])
    .setRequired(true);

  // ---------- SEZIONE 4 — Partecipazione ----------
  form.addPageBreakItem()
    .setTitle('Partecipazione alle attività')
    .setHelpText('Se la scuola ha già raccolto questa autorizzazione, saltate pure questa sezione.');

  form.addMultipleChoiceItem()
    .setTitle('5) Partecipazione agli incontri settimanali')
    .setHelpText('Incontri presso ' + CONFIG.sede + ', sempre con adulti presenti.')
    .setChoiceValues(['Autorizzo', 'Non autorizzo'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Segnalazioni utili (allergie, esigenze particolari, altro)')
    .setRequired(false);

  // ---------- SEZIONE 5 — Informativa ----------
  form.addPageBreakItem()
    .setTitle('Informativa e conferma');

  form.addSectionHeaderItem()
    .setTitle('Informativa sul trattamento dei dati')
    .setHelpText(
      'Titolare del trattamento: ' + CONFIG.ente + ' (' + CONFIG.enteDati + ').\n' +
      'Finalità: organizzazione delle attività di robotica, documentazione tecnica del lavoro della squadra (compresa la sintesi dei contenuti della chat tramite un assistente di intelligenza artificiale usato dai soli coach), ' +
      'comunicazione delle attività sui canali della squadra.\n' +
      'Base giuridica: il consenso che esprimete con questo modulo.\n' +
      'Dati trattati: dati anagrafici e di contatto, immagini e video, contenuti prodotti durante le attività.\n' +
      'Conservazione: per la durata della stagione sportiva ' + CONFIG.stagione + ' e per il tempo necessario ' +
      'alla rendicontazione delle attività.\n' +
      'Comunicazione a terzi: nessuna, salvo gli obblighi verso FIRST® per la partecipazione alle gare.\n' +
      'Diritti: potete in ogni momento accedere, rettificare, limitare o cancellare i dati e revocare il consenso ' +
      'scrivendo a ' + CONFIG.mailRiferimento + '. La revoca non pregiudica la liceità del trattamento già effettuato.\n' +
      'Reclamo: avete inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali ' +
      '(Piazza Venezia 11, 00187 Roma — www.garanteprivacy.it).'
    );

  form.addCheckboxItem()
    .setTitle('Conferma')
    .setChoiceValues([
      'Dichiaro di essere il genitore o il tutore dello studente indicato e di aver letto l\'informativa'
    ])
    .setRequired(true);

  // ---------- Foglio delle risposte, dentro una cartella dedicata ----------
  var ss = SpreadsheetApp.create('Autorizzazioni genitori — FTC Kandinsky ' + CONFIG.stagione);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // Form e foglio contengono dati di minori: non devono restare nella radice del Drive.
  var cartella = creaCartella(CONFIG.cartella);
  spostaInCartella(ss.getId(), cartella);
  spostaInCartella(form.getId(), cartella);

  Logger.log('--------------------------------------------------');
  Logger.log('Link da mandare ai genitori: ' + form.getPublishedUrl());
  Logger.log('Link per modificare il form:  ' + form.getEditUrl());
  Logger.log('Foglio delle risposte:        ' + ss.getUrl());
  Logger.log('Cartella (accesso ristretto): ' + cartella.getUrl());
  Logger.log('--------------------------------------------------');
  Logger.log('RICORDA: completa CONFIG (dati ARTÙ) prima di distribuirlo.');
  Logger.log('RICORDA: la cartella non va condivisa con "chiunque abbia il link".');
}

/** Riusa la cartella se esiste gia', altrimenti la crea. */
function creaCartella(nome) {
  var esistenti = DriveApp.getFoldersByName(nome);
  return esistenti.hasNext() ? esistenti.next() : DriveApp.createFolder(nome);
}

function spostaInCartella(idFile, cartella) {
  try {
    DriveApp.getFileById(idFile).moveTo(cartella);
  } catch (e) {
    Logger.log('Non sono riuscito a spostare ' + idFile + ': spostalo a mano in "' +
               cartella.getName() + '". Dettaglio: ' + e);
  }
}
