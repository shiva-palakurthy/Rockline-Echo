// ==========================
// Global variable to store user's spoken text
// ==========================
let spokenText = "";

// ==========================
// Function: Get emoji based on selected mood
// ==========================
function getMoodEmoji() {
  const mood = document.getElementById("mood").value;
  if (mood === "funny") return "😂";
  if (mood === "sad") return "😢";
  if (mood === "robot") return "🤖";
  if (mood === "excited") return "🤩";
  return "😐"; // Normal mood
}

// ==========================
// Listen button functionality
// ==========================
document.getElementById("listenBtn").onclick = () => {
  const recognition = new webkitSpeechRecognition(); // Create speech recognition object
  recognition.lang = "en-US"; // Language
  recognition.interimResults = false; // Only final result

  // Triggered when speech is detected
  recognition.onresult = (event) => {
    spokenText = event.results[0][0].transcript; // Save the spoken text
    document.getElementById("result").innerText =
      spokenText + " " + getMoodEmoji(); // Display text with mood emoji
  };

  // Handle errors in recognition
  recognition.onerror = (event) => {
    alert("Error: " + event.error);
  };

  recognition.start(); // Start listening
};

// ==========================
// Repeat / Speak button functionality
// ==========================
document.getElementById("repeatBtn").onclick = () => {
  if (!spokenText) return alert("Please speak first!"); // Check if there is text

  speechSynthesis.cancel(); // Stop previous speech if any
  const utterance = new SpeechSynthesisUtterance(spokenText); // Create speech object

  // Get pitch value from slider
  const pitch = parseFloat(document.getElementById("pitch").value);
  utterance.pitch = pitch;

  // Adjust pitch based on mood
  const mood = document.getElementById("mood").value;
  switch (mood) {
    case "funny": utterance.pitch *= 1.3; break;
    case "sad": utterance.pitch *= 0.7; break;
    case "robot": utterance.pitch *= 0.5; break;
    case "excited": utterance.pitch *= 1.5; break;
  }

  // Animate text while speaking
  const resultPara = document.getElementById("result");
  resultPara.classList.add("speaking");

  speechSynthesis.speak(utterance); // Speak the text

  // Remove animation when done
  utterance.onend = () => { resultPara.classList.remove("speaking"); };
};

// ==========================
// Stop button functionality
// ==========================
document.getElementById("stopBtn").onclick = () => {
  speechSynthesis.cancel(); // Stop speech
  document.getElementById("result").classList.remove("speaking"); // Remove animation
};

// Get the selected mood value from the dropdown
const mood = document.getElementById("mood").value;

/*
  IMPORTANT NOTE:
  ----------------
  Browsers use the SAME voice for speech synthesis.
  We cannot change male/female voices without APIs.
  So we simulate moods by changing:
  - pitch (voice height)
  - rate (speech speed)
*/

// Apply different pitch and rate values based on mood
switch (mood) {

  case "funny":
    utterance.pitch = 1.6;   // Higher pitch sounds playful/funny
    utterance.rate = 1.2;    // Slightly faster speech
    break;

  case "sad":
    utterance.pitch = 0.6;   // Lower pitch sounds sad
    utterance.rate = 0.8;    // Slower speech
    break;

  case "robot":
    utterance.pitch = 0.4;   // Very low pitch = robotic tone
    utterance.rate = 0.9;    // Flat, steady speed
    break;

  case "excited":
    utterance.pitch = 1.8;   // Very high pitch
    utterance.rate = 1.4;    // Fast speech = excitement
    break;

  default: // Normal mood
    utterance.pitch = 1.0;   // Natural pitch
    utterance.rate = 1.0;    // Normal speaking speed
}