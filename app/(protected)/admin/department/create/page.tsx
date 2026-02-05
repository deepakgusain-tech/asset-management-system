import DeviceCategoryForm from '@/components/device/device-category-form'
import DepartmentForm from '@/components/employee/department-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const DepartmentCreate = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Add Department</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/department">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DepartmentForm update={false} />
            </CardContent>
        </Card>
    )
}

export default DepartmentCreate