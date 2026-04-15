import { prisma } from "../../lib/prisma";
const createProviderProfile = async (data, user) => {
    // Implementation for creating provider profile
    const result = await prisma.providerProfile.create({
        data: {
            ...data,
            providerId: user.id,
        },
    });
    return result;
};
const getProviderProfile = async (user) => {
    const profile = await prisma.providerProfile.findFirst({
        where: {
            providerId: user.id,
        },
    });
    return profile;
};
const updateProviderProfile = async (data, user) => {
    const profile = await prisma.providerProfile.update({
        where: {
            providerId: user.id,
        },
        data: {
            ...data,
        },
    });
    return profile;
};
export const providerProfileService = {
    createProviderProfile,
    getProviderProfile,
    updateProviderProfile,
};
//# sourceMappingURL=provider.service.js.map