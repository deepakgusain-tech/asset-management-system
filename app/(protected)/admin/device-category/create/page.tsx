import DeviceCategoryForm from '@/components/device/device-category-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const DeviceCategoryCreate = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Add Device Category</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/device-category">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DeviceCategoryForm update={false} />
            </CardContent>
        </Card>
    )
}

export default DeviceCategoryCreate