import { ProviderProfile } from "../../../generated/prisma/client";
import { UpdateProviderProfile, User } from "../../type/user.type";
export declare const providerProfileService: {
    createProviderProfile: (data: ProviderProfile, user: User) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        description: string | null;
        isActive: boolean;
        logo: string | null;
        coverImage: string | null;
        phone: string;
        address: string | null;
        workingHours: string | null;
        rating: number;
        reviewCount: number;
    }>;
    getProviderProfile: (user: User) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        description: string | null;
        isActive: boolean;
        logo: string | null;
        coverImage: string | null;
        phone: string;
        address: string | null;
        workingHours: string | null;
        rating: number;
        reviewCount: number;
    } | null>;
    updateProviderProfile: (data: UpdateProviderProfile, user: User) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        description: string | null;
        isActive: boolean;
        logo: string | null;
        coverImage: string | null;
        phone: string;
        address: string | null;
        workingHours: string | null;
        rating: number;
        reviewCount: number;
    }>;
};
//# sourceMappingURL=provider.service.d.ts.map