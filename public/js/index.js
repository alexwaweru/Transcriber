  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let p = document.createElement('span');
  const words = document.querySelector('.words');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      p.textContent = poopScript;


      if (e.results[0].isFinal) {
        p = document.createElement('span');
        words.appendChild(p);
      }
  });
  recognition.addEventListener('end', recognition.start);
  recognition.addEventListener('end', recognition.stop);

  //recognition.start();

  document.getElementById('btnStop').addEventListener('click', stopRecognition);
  function stopRecognition(){
    // Make the Recognition stop working
    recognition.stop();
  }

  document.getElementById('btnStart').addEventListener('click', startRecognition);
  function startRecognition(){
    // Make the Recognition start working
    recognition.start();
  }

  const save = document.getElementById('btnSave');
  save.addEventListener('click', saveWork);

  function saveWork(){   
    text = document.getElementById("text").textContent;
  
    const doc = new Document();

    const paragraph = new Paragraph(text);

    doc.addParagraph(paragraph);

    const packer = new Packer();

    packer.toBlob(doc).then(blob => {
      saveAs(blob, "oranote.docx");
      console.log("Document created successfully");
    });
  }
