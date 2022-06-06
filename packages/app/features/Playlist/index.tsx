import { Item } from 'app/interfaces/PlaylistInfo'
import { useGetPlaylist } from 'app/queries/videos'
import { Image, Text, View, FlatList, Pressable } from 'dripsy'
import { createParam } from 'solito'
import { useAudio } from 'app/utils/useAudio'
import { PlayerController } from 'app/components/PlayerController'
import { useAtom } from 'jotai'
import { indexAtom } from 'app/store/playerController'
import { useEffect } from 'react'

const { useParam } = createParam()
export const Playlist = () => {
  const [id] = useParam('id')
  const [index, indexSet] = useAtom(indexAtom)
  const { data } = useGetPlaylist(id!)
  const {
    loadSound,
    isPlaying,
    pause,
    play,
    duration,
    currentTime,
    setPosition,
  } = useAudio()
  useEffect(() => {
    if (data?.items) {
      loadSound(data.items[index]?.snippet.resourceId.videoId!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.items, index])

  return (
    <View sx={{ flex: 1 }}>
      <FlatList
        data={data?.items}
        renderItem={({ item, index: i }) => {
          const video = item as Item
          return (
            <Pressable onPress={() => indexSet(i)}>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  py: 2,
                  pl: 2,
                  backgroundColor: index === i ? 'grey' : 'transparent',
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  source={{
                    uri: video.snippet.thumbnails.default.url,
                    width: video.snippet.thumbnails.default.width,
                    height: video.snippet.thumbnails.default.height,
                  }}
                />
                <Text
                  sx={{
                    ml: 2,
                  }}
                >
                  {video.snippet.title}
                </Text>
              </View>
            </Pressable>
          )
        }}
      />
      <PlayerController
        setPosition={setPosition}
        duration={duration}
        currentTime={currentTime}
        isPlaying={isPlaying}
        pause={pause}
        play={play}
      />
    </View>
  )
}
