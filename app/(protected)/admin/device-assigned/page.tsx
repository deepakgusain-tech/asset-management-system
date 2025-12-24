import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import DepartmentTable from './department-table'
import { getDepartment } from '@/lib/actions/department'

const DepartmentPage = async () => {
    const department = await getDepartment()
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Department</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="department/create">Add Department</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <DepartmentTable data={department} />
            </CardContent>
        </Card>
    )
}

export default DepartmentPage