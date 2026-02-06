import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import { getDeviceCategory } from '@/lib/actions/device-category-action'
import DeviceCategoryTable from './device-category-table'
import { DeviceCategory } from '@/types'

const CateoryPage = async () => {
    const categories = await getDeviceCategory()

    return (
        <Card>
            <CardHeader >
                <div className='flex justify-between items-center'>
                    <h1>Device Category</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="device-category/create">Add Device Category</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <DeviceCategoryTable data={categories as DeviceCategory[]} />
            </CardContent>
        </Card>
    )
}

export default CateoryPage