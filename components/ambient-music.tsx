'use client'

import { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react'
import { Music, Volume2, VolumeX, Sparkles, Disc3, Play, Pause, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Track = {
  id: string
  name: string
  description: string
  tempo: string
  icon: string
  src: string
}

export const MUSIC_TRACKS: Track[] = [
  {
    id: 'joyful-atelier',
    name: 'Joyful Atelier',
    description: 'Upbeat marimba, ukulele & bells',
    tempo: '110 BPM',
    icon: '🌸',
    src: '/audio/joyful-atelier.wav',
  },
  {
    id: 'storybook-bells',
    name: 'Storybook Music Box',
    description: 'Sweet chime bells & acoustic dream',
    tempo: '94 BPM',
    icon: '✨',
    src: '/audio/storybook-bells.wav',
  },
  {
    id: 'sunny-waltz',
    name: 'Sunny Classroom Waltz',
    description: 'Bouncy ukulele & happy kalimba',
    tempo: '118 BPM',
    icon: '☀️',
    src: '/audio/sunny-waltz.wav',
  },
]

type MusicContextType = {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  currentTrack: Track
  tracks: Track[]
  togglePlay: () => void
  toggleMute: () => void
  setVolume: (v: number) => void
  selectTrack: (track: Track) => void
}

const MusicContext = createContext<MusicContextType | null>(null)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(0.6)
  const [currentTrack, setCurrentTrack] = useState<Track>(MUSIC_TRACKS[0])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playAudio = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
    const p = audioRef.current.play()
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true)
        try {
          localStorage.setItem('farah_music_pref', 'playing')
        } catch {}
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [volume, isMuted])

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
    try {
      localStorage.setItem('farah_music_pref', 'paused')
    } catch {}
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }, [isPlaying, pauseAudio, playAudio])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume
      }
      return next
    })
  }, [volume])

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol)
    setIsMuted(false)
    if (audioRef.current) {
      audioRef.current.volume = newVol
    }
  }, [])

  const selectTrack = useCallback((track: Track) => {
    setCurrentTrack(track)
    setIsMuted(false)
    setIsPlaying(true)
    try {
      localStorage.setItem('farah_music_pref', 'playing')
      localStorage.setItem('farah_music_track', track.id)
    } catch {}

    if (audioRef.current) {
      audioRef.current.src = track.src
      audioRef.current.volume = volume
      audioRef.current.play().catch(() => {
        // Handle browser autoplay policy if needed
      })
    }
  }, [volume])

  useEffect(() => {
    let savedTrackId = 'joyful-atelier'
    let pref = 'playing'
    try {
      savedTrackId = localStorage.getItem('farah_music_track') || 'joyful-atelier'
      pref = localStorage.getItem('farah_music_pref') || 'playing'
    } catch {}

    const found = MUSIC_TRACKS.find((t) => t.id === savedTrackId)
    const initialTrack = found || MUSIC_TRACKS[0]
    setCurrentTrack(initialTrack)

    if (audioRef.current) {
      audioRef.current.src = initialTrack.src
      audioRef.current.volume = volume
    }

    if (pref === 'paused') {
      setIsPlaying(false)
      return
    }

    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      }
      window.removeEventListener('click', tryPlay)
      window.removeEventListener('keydown', tryPlay)
      window.removeEventListener('touchstart', tryPlay)
      window.removeEventListener('scroll', tryPlay)
    }

    playAudio()

    window.addEventListener('click', tryPlay, { once: true })
    window.addEventListener('keydown', tryPlay, { once: true })
    window.addEventListener('touchstart', tryPlay, { once: true })
    window.addEventListener('scroll', tryPlay, { once: true })

    return () => {
      window.removeEventListener('click', tryPlay)
      window.removeEventListener('keydown', tryPlay)
      window.removeEventListener('touchstart', tryPlay)
      window.removeEventListener('scroll', tryPlay)
    }
  }, [playAudio, volume, isMuted])

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTrack,
        tracks: MUSIC_TRACKS,
        togglePlay,
        toggleMute,
        setVolume,
        selectTrack,
      }}
    >
      <audio
        ref={audioRef}
        loop
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}

/**
 * Clean, interactive music toggle button and track selector for the Header
 */
export function HeaderMusicButton() {
  const { isPlaying, isMuted, volume, currentTrack, tracks, togglePlay, toggleMute, setVolume, selectTrack } = useMusic()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      window.addEventListener('mousedown', onOutside)
      return () => window.removeEventListener('mousedown', onOutside)
    }
  }, [isOpen])

  return (
    <div ref={menuRef} className="relative">
      <div className="flex items-center">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause peaceful background music' : 'Play peaceful background music'}
          className={cn(
            'group relative flex h-9 sm:h-10 items-center gap-1.5 rounded-full border-2 border-[#2D1F1D] px-2.5 sm:px-3 text-xs font-black transition-all duration-150 shadow-[2px_2px_0px_#2D1F1D] hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer',
            isPlaying
              ? 'bg-[#FFE68C] text-[#2D1F1D] hover:bg-[#FFC837]'
              : 'bg-[#FAF5EC] text-[#6B5550] hover:bg-white hover:text-[#2D1F1D]',
          )}
        >
          {isPlaying ? (
            <Disc3 className="size-4 text-[#FF7D6B] animate-spin shrink-0" style={{ animationDuration: '3s' }} />
          ) : (
            <Music className="size-4 text-[#6B5550] group-hover:text-[#FF7D6B] shrink-0" />
          )}

          <span className="hidden sm:inline font-bold">
            {isPlaying ? currentTrack.name.split(' ')[0] : 'Play 🎵'}
          </span>

          {/* Equalizer wave bars when music is active */}
          {isPlaying && !isMuted && (
            <div className="flex items-end gap-0.5 h-3 px-0.5" aria-hidden="true">
              <span className="w-0.5 rounded-full bg-[#FF7D6B] animate-pulse" style={{ height: '70%', animationDuration: '0.6s' }} />
              <span className="w-0.5 rounded-full bg-[#2D1F1D] animate-pulse" style={{ height: '100%', animationDuration: '0.9s' }} />
              <span className="w-0.5 rounded-full bg-[#10B981] animate-pulse" style={{ height: '80%', animationDuration: '0.7s' }} />
            </div>
          )}
        </button>

        {/* Quick Settings & Playlist Dropdown Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Audio settings and tracks"
          className="ml-1 flex size-6 sm:size-7 items-center justify-center rounded-full text-[#6B5550] hover:bg-black/10 transition-colors cursor-pointer"
        >
          <Volume2 className="size-3.5" />
        </button>
      </div>

      {/* Settings Popover & Playlist Selector */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border-3 border-[#2D1F1D] bg-white p-3.5 shadow-[5px_5px_0px_#2D1F1D] animate-pop-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2D1F1D]/10 pb-2">
            <span className="text-xs font-black text-[#2D1F1D] flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-[#FF7D6B] fill-[#FF7D6B]" />
              <span>Atelier Playlist</span>
            </span>
            <button
              type="button"
              onClick={toggleMute}
              className="text-[0.68rem] font-bold text-[#FF7D6B] hover:underline cursor-pointer"
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>

          {/* Track Selection List */}
          <div className="my-2.5 flex flex-col gap-1.5">
            <p className="text-[0.62rem] font-black uppercase tracking-wider text-[#6B5550]">Choose Music Track</p>
            {tracks.map((track) => {
              const isSelected = track.id === currentTrack.id
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => {
                    selectTrack(track)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'flex items-center justify-between rounded-xl border-2 p-2.5 text-left transition-all cursor-pointer group',
                    isSelected
                      ? 'border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]'
                      : 'border-transparent bg-[#FAF5EC] text-[#2D1F1D] hover:border-[#2D1F1D]/30 hover:bg-white hover:shadow-xs',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base group-hover:scale-110 transition-transform">{track.icon}</span>
                    <div>
                      <p className="text-xs font-black leading-tight">{track.name}</p>
                      <p className="text-[0.62rem] font-bold text-[#6B5550]">{track.tempo} • {track.description}</p>
                    </div>
                  </div>
                  {isSelected ? (
                    <span className="flex size-5 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#10B981] text-white shadow-xs">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="text-[0.65rem] font-black text-[#FF7D6B] opacity-0 group-hover:opacity-100 transition-opacity">
                      Play ▶
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Volume Slider */}
          <div className="border-t border-[#2D1F1D]/10 pt-2.5">
            <div className="flex justify-between text-[0.65rem] font-bold text-[#6B5550]">
              <span>Volume</span>
              <span>{isMuted ? '0%' : `${Math.round(volume * 100)}%`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="mt-1 w-full accent-[#FFC837] cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  )
}
