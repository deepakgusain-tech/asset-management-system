import DeviceCategoryForm from '@/components/device/device-category-form'
import Roleform from '@/components/USer/role-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const RoleCreate = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Add Role</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/role">Back</Link>
                    </Button>
                </div> 
            </CardHeader>
            <CardContent>
                <Roleform update={false} />
            </CardContent>
        </Card>
    )
}

export default RoleCreate 