import DeviceForm from '@/components/device/device-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDeviceCategory } from '@/lib/actions/device-category-action'
import Link from 'next/link'
import React from 'react'

const DeviceCreate = async () => {
    const categories = await getDeviceCategory()

    
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Add Device</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/device">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DeviceForm update={false} categories={categories} />
            </CardContent>
        </Card>
    )
}

export default DeviceCreate