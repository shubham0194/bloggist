// Extract only serializable data from Appwrite user object
export const serializeUser = (user) => {
    if (!user) return null;
    
    return {
        $id: user.$id,
        name: user.name,
        email: user.email,
        emailVerification: user.emailVerification,
        phoneVerification: user.phoneVerification,
        status: user.status,
        labels: user.labels,
        prefs: user.prefs,
        registration: user.registration,
        lastActivity: user.lastActivity,
        mfa: user.mfa,
        accessedAt: user.accessedAt
    };
};
