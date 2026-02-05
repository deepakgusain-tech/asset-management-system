import DeviceForm from '@/components/device/device-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDeviceById } from '@/lib/actions/device-action'
import { getDeviceCategory } from '@/lib/actions/device-category-action'
import { Device } from '@/types'
import Link from 'next/link'
import React from 'react'

const DeviceEditPage = async ({params} : {params: Promise<{id: string}>}) => {
    const { id } = await params;

    const res = await getDeviceById(id)

    const categories = await getDeviceCategory()

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Edit Device</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/device">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DeviceForm data={res.data as Device} update={true} categories={categories} />
            </CardContent>
        </Card>
    )
}

export default DeviceEditPage