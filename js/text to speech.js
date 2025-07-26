let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  console.log("Available voices:", voices);
  

  const voiceSelect = document.getElementById("language");
  voiceSelect.innerHTML = '';
  
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}


speechSynthesis.onvoiceschanged = loadVoices;

if (speechSynthesis.getVoices().length > 0) {
  loadVoices();
}

var ttsBtn = document.getElementById("tts-btn");

ttsBtn.addEventListener("click", () => {
  const text = document.getElementById("text-input").value.trim();
  const selectedVoiceIndex = document.getElementById("language").value;

  if (!text) {
    alert("Please enter some text.");
    return;
  }


  const selectedVoice = voices[selectedVoiceIndex];
  
  if (!selectedVoice) {
    alert("Selected voice not found.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;

  speechSynthesis.speak(utterance);
});