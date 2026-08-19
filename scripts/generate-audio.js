const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

function generateWavFile(filename, bpm, chordProgression, styleType) {
  const sampleRate = 44100;
  const beatsPerBar = 4;
  const totalBars = chordProgression.length;
  const secondsPerBeat = 60 / bpm;
  const durationSeconds = totalBars * beatsPerBar * secondsPerBeat;
  const totalSamples = Math.floor(sampleRate * durationSeconds);

  const numChannels = 2;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = totalSamples * blockAlign;
  const headerSize = 44;

  const buffer = Buffer.alloc(headerSize + dataSize);

  // Write WAV Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  const barDuration = beatsPerBar * secondsPerBeat;
  const events = [];

  for (let b = 0; b < totalBars; b++) {
    const chord = chordProgression[b];
    const barStart = b * barDuration;

    // Strum pattern
    for (let s = 0; s < 8; s++) {
      const time = barStart + (s * 0.5) * secondsPerBeat;
      chord.uke.forEach((noteFreq, stringIdx) => {
        const strumTime = time + stringIdx * 0.008;
        const gain = (s === 0 || s === 4) ? 0.14 : 0.08;
        events.push({
          type: styleType === 'bells' ? 'bell' : 'uke',
          time: strumTime,
          freq: noteFreq,
          duration: styleType === 'bells' ? 1.2 : 0.65,
          gain,
          pan: -0.3 + stringIdx * 0.2,
        });
      });
    }

    // Bassline
    events.push({
      type: 'bass',
      time: barStart,
      freq: chord.bass,
      duration: barDuration * 0.45,
      gain: 0.22,
      pan: 0.0,
    });
    events.push({
      type: 'bass',
      time: barStart + 2 * secondsPerBeat,
      freq: chord.bass * 1.5,
      duration: barDuration * 0.45,
      gain: 0.16,
      pan: 0.0,
    });

    // Lead melody note
    for (let m = 0; m < 4; m++) {
      const leadFreq = chord.lead[m % chord.lead.length];
      const leadTime = barStart + m * secondsPerBeat;
      events.push({
        type: styleType === 'bells' ? 'bell' : 'marimba',
        time: leadTime,
        freq: leadFreq,
        duration: styleType === 'bells' ? 1.4 : 0.85,
        gain: 0.18,
        pan: 0.25 * (m % 2 === 0 ? 1 : -1),
      });
    }
  }

  const leftChannel = new Float32Array(totalSamples);
  const rightChannel = new Float32Array(totalSamples);

  events.forEach((ev) => {
    const startSample = Math.floor(ev.time * sampleRate);
    const numEventSamples = Math.floor(ev.duration * sampleRate);

    for (let i = 0; i < numEventSamples; i++) {
      const idx = startSample + i;
      if (idx >= totalSamples) break;

      const t = i / sampleRate;
      let sampleVal = 0;

      if (ev.type === 'uke') {
        const decay = Math.exp(-t * 6.5);
        const f = ev.freq;
        sampleVal = (
          Math.sin(2 * Math.PI * f * t) * 0.6 +
          Math.sin(2 * Math.PI * f * 2 * t) * 0.25 +
          Math.sin(2 * Math.PI * f * 3 * t) * 0.15
        ) * decay * ev.gain;
      } else if (ev.type === 'bell') {
        const decay = Math.exp(-t * 3.5);
        const f = ev.freq;
        sampleVal = (
          Math.sin(2 * Math.PI * f * t) * 0.7 +
          Math.sin(2 * Math.PI * f * 2.76 * t) * 0.2 +
          Math.sin(2 * Math.PI * f * 5.4 * t) * 0.1
        ) * decay * ev.gain;
      } else if (ev.type === 'marimba') {
        const decay = Math.exp(-t * 4.8);
        const f = ev.freq;
        sampleVal = (
          Math.sin(2 * Math.PI * f * t) * 0.75 +
          Math.sin(2 * Math.PI * f * 3.0 * t) * 0.2 +
          Math.sin(2 * Math.PI * f * 5.0 * t) * 0.05
        ) * decay * ev.gain;
      } else if (ev.type === 'bass') {
        const decay = Math.exp(-t * 2.8);
        const f = ev.freq;
        sampleVal = (
          Math.sin(2 * Math.PI * f * t) * 0.8 +
          Math.sin(2 * Math.PI * f * 2 * t) * 0.2
        ) * decay * ev.gain;
      }

      const leftPan = 0.5 - ev.pan * 0.5;
      const rightPan = 0.5 + ev.pan * 0.5;
      leftChannel[idx] += sampleVal * leftPan;
      rightChannel[idx] += sampleVal * rightPan;
    }
  });

  // Write to buffer
  for (let i = 0; i < totalSamples; i++) {
    const left = Math.max(-1, Math.min(1, leftChannel[i]));
    const right = Math.max(-1, Math.min(1, rightChannel[i]));
    const intLeft = Math.floor(left < 0 ? left * 32768 : left * 32767);
    const intRight = Math.floor(right < 0 ? right * 32768 : right * 32767);

    const offset = headerSize + i * blockAlign;
    buffer.writeInt16LE(intLeft, offset);
    buffer.writeInt16LE(intRight, offset + 2);
  }

  const filePath = path.join(audioDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filePath}`);
}

const chordsTrack1 = [
  { bass: 130.81, uke: [261.63, 329.63, 392.00, 523.25], lead: [523.25, 587.33, 659.25, 783.99] },
  { bass: 98.00, uke: [246.94, 293.66, 392.00, 587.33], lead: [587.33, 659.25, 783.99, 880.00] },
  { bass: 110.00, uke: [220.00, 261.63, 329.63, 440.00], lead: [659.25, 587.33, 523.25, 440.00] },
  { bass: 87.31, uke: [174.61, 220.00, 261.63, 349.23], lead: [523.25, 659.25, 783.99, 880.00] },
  { bass: 130.81, uke: [261.63, 329.63, 392.00, 523.25], lead: [1046.50, 987.77, 783.99, 659.25] },
  { bass: 82.41, uke: [164.81, 196.00, 246.94, 329.63], lead: [659.25, 783.99, 880.00, 987.77] },
  { bass: 87.31, uke: [174.61, 220.00, 261.63, 349.23], lead: [880.00, 783.99, 659.25, 587.33] },
  { bass: 98.00, uke: [196.00, 246.94, 293.66, 392.00], lead: [783.99, 880.00, 987.77, 1046.50] },
];

const chordsTrack2 = [
  { bass: 146.83, uke: [293.66, 369.99, 440.00, 587.33], lead: [587.33, 739.99, 880.00, 1174.66] },
  { bass: 110.00, uke: [220.00, 277.18, 329.63, 440.00], lead: [880.00, 739.99, 659.25, 587.33] },
  { bass: 123.47, uke: [246.94, 293.66, 369.99, 493.88], lead: [739.99, 880.00, 987.77, 739.99] },
  { bass: 98.00, uke: [196.00, 246.94, 293.66, 392.00], lead: [587.33, 739.99, 880.00, 987.77] },
];

const chordsTrack3 = [
  { bass: 174.61, uke: [349.23, 440.00, 523.25, 698.46], lead: [698.46, 880.00, 1046.50, 1396.91] },
  { bass: 130.81, uke: [261.63, 329.63, 392.00, 523.25], lead: [1046.50, 880.00, 783.99, 698.46] },
  { bass: 116.54, uke: [233.08, 293.66, 349.23, 466.16], lead: [698.46, 783.99, 932.33, 1046.50] },
  { bass: 130.81, uke: [261.63, 329.63, 392.00, 523.25], lead: [1046.50, 932.33, 880.00, 783.99] },
];

// Track 1: Joyful Atelier (Default 110 BPM)
generateWavFile('calm-melody.wav', 110, chordsTrack1, 'marimba');
generateWavFile('joyful-atelier.wav', 110, chordsTrack1, 'marimba');

// Track 2: Storybook Music Box (94 BPM)
generateWavFile('storybook-bells.wav', 94, chordsTrack2, 'bells');

// Track 3: Sunny Classroom Waltz (118 BPM)
generateWavFile('sunny-waltz.wav', 118, chordsTrack3, 'uke');
