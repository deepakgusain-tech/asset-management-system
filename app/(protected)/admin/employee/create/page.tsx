import EmployeeForm from '@/components/employee/employee-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDepartment } from '@/lib/actions/department'
import { getLocation } from '@/lib/actions/location'
import Link from 'next/link'
import React from 'react'

const LocationCreatePage = async () => {
    const departments = await getDepartment()
    const locations = await getLocation()    

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Add Employee</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/employee">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <EmployeeForm update={false} departments={departments} locations={locations as any[]} />
            </CardContent>
        </Card>
    )
}

export default LocationCreatePage