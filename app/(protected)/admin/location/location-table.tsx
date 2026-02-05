"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteLocation, getLocation } from '@/lib/actions/location';
import { Location } from '@/types'
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const LocationTable = ({ data }: { data: Location[] }) => {

    const [locations, setLocations] = useState<Location[]>(data)

    const deleteLocationHandler = async (id: any) => {
        let res = await deleteLocation(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const response = await getLocation()
            setLocations(response as Location[])
        }
    }

    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Street Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Postal Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {locations && locations.length > 0 && locations.map((location) => (
                    <TableRow key={location.id}>
                        <TableCell>{location.name}</TableCell>
                        <TableCell>{location.streetAddress}</TableCell>
                        <TableCell>{location.city}</TableCell>
                        <TableCell>{location.country}</TableCell>
                        <TableCell>{location.postalCode}</TableCell>
                        <TableCell>{location.status === "ACTIVE" ? <Badge variant="default" className='bg-green-500' >{location.status}</Badge> : <Badge variant="destructive" >{location.status}</Badge>}</TableCell>
                        <TableCell>{location.createdAt?.toLocaleString()}</TableCell>
                        <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/location/edit/${location.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => deleteLocationHandler(location.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default LocationTable