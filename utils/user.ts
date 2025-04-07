
import { auth } from '@clerk/nextjs/server'

export const userInfo = async () => {
    const user = await auth();
  
    if (!user) {
      return (await auth()).redirectToSignIn();
    }
  
    return user
  }