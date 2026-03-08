/**
 * Copyright Detector - Host JSX
 * Mózg pluginu - logika Premiere Pro
 * Wykonuje się po stronie aplikacji Premiere Pro
 */

// ==================== SKANOWANIE CLIPÓW ====================

/**
 * Skanuje wszystkie audio clipy w Timeline
 */
function scanAudioClips() {
  if (!app.project.activeSequence) {
    return "BŁĄD: Brak aktywnego Timeline";
  }

  let sequence = app.project.activeSequence;
  let audioClips = [];
  let clipIndex = 0;

  // Iteracja po wszystkich V1-V10 trackach (wideo)
  for (let v = 0; v < sequence.videoTracks.numTracks; v++) {
    let track = sequence.videoTracks[v];
    for (let c = 0; c < track.clips.numClips; c++) {
      let clip = track.clips[c];
      audioClips.push({
        id: "clip_" + clipIndex++,
        name: clip.name,
        startTime: clip.start.seconds,
        duration: clip.duration.seconds,
        enabled: clip.enabled
      });
    }
  }

  // Iteracja po wszystkich A1-A10 audio trackach
  for (let a = 0; a < sequence.audioTracks.numTracks; a++) {
    let track = sequence.audioTracks[a];
    for (let c = 0; c < track.clips.numClips; c++) {
      let clip = track.clips[c];
      audioClips.push({
        id: "clip_" + clipIndex++,
        name: clip.name,
        startTime: clip.start.seconds,
        duration: clip.duration.seconds,
        trackIndex: a,
        enabled: clip.enabled
      });
    }
  }

  return audioClips.length + " clipów znalezionych";
}

// ==================== PODŚWIETLANIE CLIPÓW ====================

/**
 * Podświetla clip na czerwono (marker)
 */
function highlightClipRed(clipId) {
  if (!app.project.activeSequence) {
    return "BŁĄD: Brak aktywnego Timeline";
  }

  let sequence = app.project.activeSequence;
  let foundClip = null;
  let clipCounter = 0;

  // Szukamy clipu po ID
  for (let a = 0; a < sequence.audioTracks.numTracks; a++) {
    let track = sequence.audioTracks[a];
    for (let c = 0; c < track.clips.numClips; c++) {
      let clip = track.clips[c];
      if ("clip_" + clipCounter == clipId) {
        foundClip = clip;
        break;
      }
      clipCounter++;
    }
    if (foundClip) break;
  }

  if (foundClip) {
    // Dodaj marker do clipu
    let marker = foundClip.setMarker(0, "COPYRIGHT", "⚠️ Copyright Detected", 1, 1, 0, 0);
    // Marker czerwony (RGB: 255, 0, 0)
    return "Clip podświetlony";
  }

  return "Clip nie znaleziony";
}

// ==================== USUWANIE AUDIO ====================

/**
 * Usuwa audio z clipu (zamienia na wyciszenie)
 */
function removeAudioFromClip(clipIndex) {
  if (!app.project.activeSequence) {
    return "BŁĄD: Brak aktywnego Timeline";
  }

  let sequence = app.project.activeSequence;
  let currentClip = 0;

  for (let a = 0; a < sequence.audioTracks.numTracks; a++) {
    let track = sequence.audioTracks[a];
    for (let c = 0; c < track.clips.numClips; c++) {
      if (currentClip == clipIndex) {
        let clip = track.clips[c];
        clip.enabled = false; // Wycisza clip zamiast usuwać
        return "Audio wyłączone";
      }
      currentClip++;
    }
  }

  return "Clip nie znaleziony";
}

// ==================== ZAMIANA MUZYKI ====================

/**
 * Znajduje alternatywną muzykę i zastępuje clip
 */
function findAlternativeMusic(folderPath, clipIndex) {
  if (!app.project.activeSequence) {
    return "BŁĄD: Brak aktywnego Timeline";
  }

  // W rzeczywistości bylibyśmy potrzebować dostępu do systemu plików
  // Premiere Pro ogranicza to ze względów bezpieczeństwa
  // Ale możemy spróbować importować media

  return "Funkcja wymagająca dostępu do plików (ograniczone w Premiere Pro)";
}

// ==================== INFORMACJE ====================

/**
 * Pobiera info o aktywnym projekcie
 */
function getProjectInfo() {
  let info = "Projekt: " + app.project.name + "\n";
  if (app.project.activeSequence) {
    info += "Timeline: " + app.project.activeSequence.name + "\n";
    info += "Audio tracki: " + app.project.activeSequence.audioTracks.numTracks + "\n";
  }
  return info;
}