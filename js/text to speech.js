let voices = [];
let filteredVoices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  updateVoiceList();
}

function updateVoiceList() {
  const languageSelect = document.getElementById("language-select");
  const voiceSelect = document.getElementById("voice-select");
  const selectedLang = languageSelect.value;

  // Filter voices by selected language
  filteredVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith(selectedLang));

  voiceSelect.innerHTML = '';
  if (filteredVoices.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No voices available';
    voiceSelect.appendChild(option);
  } else {
    filteredVoices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
  }
}

speechSynthesis.onvoiceschanged = loadVoices;

if (speechSynthesis.getVoices().length > 0) {
  loadVoices();
}

document.getElementById("language-select").addEventListener("change", updateVoiceList);

var ttsBtn = document.getElementById("tts-btn");

ttsBtn.addEventListener("click", () => {
  const text = document.getElementById("text-input").value.trim();
  const selectedVoiceIndex = document.getElementById("voice-select").value;

  if (!text) {
    alert("Please enter some text.");
    return;
  }

  const selectedVoice = filteredVoices[selectedVoiceIndex];
  
  if (!selectedVoice) {
    alert("Selected voice not found.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;

  speechSynthesis.speak(utterance);
});