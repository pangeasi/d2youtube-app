import { Audio, AVPlaybackStatus } from 'expo-av'
import * as FS from 'expo-file-system'
import { useState } from 'react'

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [soundObject, setSoundObject] = useState<{
    sound: Audio.Sound
    status: AVPlaybackStatus
  } | null>(null)

  const { sound, status } = soundObject || {}

  const loadSound = async (id: string) => {
    await soundObject?.sound.unloadAsync()
    const uriStored = await FS.getInfoAsync(FS.documentDirectory + id)
    const { uri } = uriStored.exists
      ? { ...uriStored }
      : await FS.downloadAsync(
          `https://media.d2youtube.com/download/${id}/251`,
          FS.documentDirectory + id
        )
    const audio = await Audio.Sound.createAsync(
      {
        uri,
      },
      {},
      (status) => {
        let curr = status as { positionMillis: number; durationMillis: number }
        setDuration(curr.durationMillis)
        setCurrentTime(curr.positionMillis)
      }
    )
    setSoundObject(audio)
    if (isPlaying) {
      audio.sound.playAsync()
    }
  }

  const unloadAudio = () => {
    if (sound) {
      sound.unloadAsync()
    }
  }
  const play = async () => {
    if (sound) {
      await sound.playAsync()
      setIsPlaying(true)
    }
  }

  const stop = async () => {
    if (sound) {
      await sound.stopAsync()
      setIsPlaying(false)
    }
  }

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync()
      setIsPlaying(false)
    }
  }

  return {
    loadSound,
    unloadAudio,
    play,
    stop,
    pause,
    sound,
    currentTime,
    duration,
    isPlaying,
    setPosition: async (position: number) => {
      await sound?.setPositionAsync(position)
    },
  }
}
