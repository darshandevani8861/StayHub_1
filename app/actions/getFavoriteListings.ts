import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings(){
    try{
        const currentUser = await  getCurrentUser();

        if(!currentUser){
            return [];
        }

        const favotites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const SafeFavorites = favotites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return SafeFavorites;
    }catch(error: any){
        throw new Error(error);
    }
} 