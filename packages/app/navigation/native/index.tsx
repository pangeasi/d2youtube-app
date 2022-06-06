import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Playlists } from '../../features/Playlists'
import { Playlist } from '../../features/Playlist'

const Stack = createNativeStackNavigator<{
  playlists: undefined
  playlist: { id: string }
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="playlists"
        component={Playlists}
        options={{
          title: 'Playlists',
        }}
      />
      <Stack.Screen
        name="playlist"
        component={Playlist}
        options={{
          title: 'Playlist',
        }}
      />
    </Stack.Navigator>
  )
}
