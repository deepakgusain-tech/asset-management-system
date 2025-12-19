"use server";

import { Location } from "@/types";
import { prisma } from "../db/prisma-helper";
import { locationSchema } from "../validators";
import { formatError } from "../utils";

// get device categories
export async function getLocation() {
    return await prisma.location.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
}

// create location
export async function createLocation(data: Location) {

    try {
        const location = locationSchema.parse(data)

        await prisma.location.create({
            data: {
                name: location.name,
                streetAddress: location.streetAddress,
                city: location.city,
                state: location.state,
                postalCode: location.postalCode,
                country: location.country,
                latitude: location.latitude,
                longitude: location.longitude,
                status: location.status,
            }
        })

        return {
            success: true,
            message: "Department created successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// get Location by id
export async function getLocationById(id: string) {
    try {

        let location = await prisma.location.findFirst({
            where: { id }
        })

        if (location) {
            return {
                success: true,
                data: location,
                message: "Location get successfully"
            }
        }

        return {
            success: false,
            message: "Location not found"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// update location
export async function updateLocation(data: Location, id: string) {
    try {

        const location = locationSchema.parse(data)

        await prisma.location.update({
            where: { id },
            data: {
                name: location.name,
                streetAddress: location.streetAddress,
                city: location.city,
                state: location.state,
                postalCode: location.postalCode,
                country: location.country,
                latitude: location.latitude,
                longitude: location.longitude,
                status: location.status,
            }
        })

        return {
            success: true,
            message: "Location updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// delete Location
export async function deleteLocation(id: any) {
    try {
        await prisma.location.delete({
            where: { id }
        })

        return {
            success: true,
            message: "Location deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}