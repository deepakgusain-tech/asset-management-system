import EmployeeForm from '@/components/employee/employee-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDepartment } from '@/lib/actions/department'
import { getEmployeeById } from '@/lib/actions/employee'
import { getLocation } from '@/lib/actions/location'
import { Employee } from '@/types'
import Link from 'next/link'
import React from 'react'

const EmployeeEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await getEmployeeById(id)

    const departments = await getDepartment()
    const locations = await getLocation()

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
                <EmployeeForm data={res.data as Employee} update={true} departments={departments} locations={locations as any} />
            </CardContent>
        </Card>
    )
}

export default EmployeeEditPage