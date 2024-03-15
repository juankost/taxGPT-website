import { Sidebar } from '@/components/sidebar'
// import { auth } from '@/auth'
import { ChatHistory } from '@/components/chat-history'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'

export async function SidebarDesktop() {
  const tokens = await getTokens(cookies(), authConfig)
  if (!tokens?.decodedToken.user_id) {
    return null
  }

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <ChatHistory userId={tokens.decodedToken.user_id} />
    </Sidebar>
  )
}
