import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { prisma } from './prisma'
import { cookies } from 'next/headers'


const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie : {
        name : 'lucia-auth',
        expires : false,
        attributes : {
            secure : process.env.NODE_ENV === "production"
        }
    }
}) 

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if(!sessionId){
        return null
    }

    const { session , user } = await lucia.validateSession(sessionId)

    try {
		if (session && session.fresh) {
			const sessionCookie =  lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie =  lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}

    if(!session){
        return null
    }

    const dbUser = await prisma.user.findUnique({
        where : {
            id : user?.id
        },
        select : {
            name : true,
            email : true,
        }
    })

    return dbUser


}

