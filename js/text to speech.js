// Loading the available languages of the browser
let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  console.log("Available voices:", voices);
}

speechSynthesis.onvoiceschanged = loadVoices;


// Setting the behavior of "conver to speech" button
var ttsBtn = document.getElementById("tts-btn");

ttsBtn.addEventListener("click", () => {
  const text = document.getElementById("text-input").value.trim();
  const selectedLang = document.getElementById("language").value;

  if (!text) {
    alert("Please enter some text.");
    return;
  }

  const matchingVoices = voices.filter(voice =>
    voice.lang.toLowerCase().startsWith(selectedLang)
  );

  if (matchingVoices.length === 0) {
    alert("No voice found for the selected language.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = matchingVoices[0]; // pick the first matching voice

  speechSynthesis.speak(utterance);
});

