let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  console.log("Available voices:", voices);
  
  // Populate the dropdown with available voices
  const voiceSelect = document.getElementById("language");
  voiceSelect.innerHTML = ''; // Clear existing options
  
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Load voices when the page loads
speechSynthesis.onvoiceschanged = loadVoices;

// Also try to load voices immediately in case they're already available
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

  if (voices.length === 0) {
    alert("No voices available. Please wait for voices to load.");
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