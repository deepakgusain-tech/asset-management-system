import DepartmentForm from '@/components/employee/department-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDepartmentById } from '@/lib/actions/department'
import Link from 'next/link'
import React from 'react'

const DepartmentEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await getDepartmentById(id)

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Edit Department</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/department">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DepartmentForm data={res.data} update={true} />
            </CardContent>
        </Card>
    )
}

export default DepartmentEditPage