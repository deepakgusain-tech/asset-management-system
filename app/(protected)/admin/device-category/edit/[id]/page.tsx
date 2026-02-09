import DeviceCategoryForm from '@/components/device/device-category-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDeviceCategoryById } from '@/lib/actions/device-category-action'
import Link from 'next/link'
import React from 'react'

const EditDeviceCategory = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await getDeviceCategoryById(id)

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Edit Device Category</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/device-category">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DeviceCategoryForm data={res.data} update={true} />
            </CardContent>
        </Card>
    )
}

export default EditDeviceCategory