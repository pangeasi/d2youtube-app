import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { QueryClientProvider, QueryClient } from 'react-query'
export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <Dripsy>{children}</Dripsy>
      </NavigationProvider>
    </QueryClientProvider>
  )
}
