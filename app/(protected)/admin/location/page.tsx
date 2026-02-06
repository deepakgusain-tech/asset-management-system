import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getLocation } from '@/lib/actions/location'
import Link from 'next/link'
import React from 'react'
import LocationTable from './location-table'
import { Location } from '@/types'

const LocationPage = async () => {
    const locations = await getLocation()

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Location</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="location/create">Add Location</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <LocationTable data={locations as Location[]} />
            </CardContent>
        </Card>
    )
}

export default LocationPage