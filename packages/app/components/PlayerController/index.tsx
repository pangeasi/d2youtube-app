import { Text, View } from 'dripsy'
import { Pressable } from 'dripsy'
import { FontAwesome5 } from '@expo/vector-icons/'
import { useUpdateAtom } from 'jotai/utils'
import { indexAtom } from 'app/store/playerController'
import Slider from '@react-native-community/slider'
import { Audio } from 'expo-av'
import { millisToMinutesAndSeconds } from 'app/utils/mediaPlayer'

type PlayerControllerProps = {
  isPlaying: boolean
  play: () => void
  pause: () => void
  setPosition: (position: number) => void
  duration: number
  currentTime: number
}

export const PlayerController = ({
  isPlaying,
  play,
  pause,
  duration,
  currentTime,
  setPosition,
}: PlayerControllerProps) => {
  const indexSet = useUpdateAtom(indexAtom)
  const handlePlayer = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }
  const stepBackward = () => {
    indexSet((index) => index - 1)
  }

  const stepForward = () => {
    indexSet((index) => index + 1)
  }
  const handlePositionChange = async (value: number) => {
    await setPosition(value)
  }

  return (
    <View
      sx={{
        height: 118,
        backgroundColor: 'black',
      }}
    >
      <View
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          pt: 2,
          justifyContent: 'space-around',
        }}
      >
        <Pressable onPress={stepBackward}>
          <FontAwesome5 name="step-backward" size={28} color="white" />
        </Pressable>
        <Pressable onPress={handlePlayer}>
          {isPlaying ? (
            <FontAwesome5 name="pause" size={50} color="white" />
          ) : (
            <FontAwesome5 name="play" size={50} color="white" />
          )}
        </Pressable>
        <Pressable onPress={stepForward}>
          <FontAwesome5 name="step-forward" size={28} color="white" />
        </Pressable>
      </View>
      <View>
        <Slider
          style={{ height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={handlePositionChange}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FFFFFF"
        />
        <Text sx={{ color: 'white', textAlign: 'center' }}>
          {millisToMinutesAndSeconds(currentTime || 0)} /{' '}
          {millisToMinutesAndSeconds(duration || 0)}
        </Text>
      </View>
    </View>
  )
}
