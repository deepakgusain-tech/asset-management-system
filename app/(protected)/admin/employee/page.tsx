import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import EmployeeTable from './employee-table'
import { getEmployee } from '@/lib/actions/employee'
import { Employee } from '@/types'

const EmployeePage = async () => {
    const employees = await getEmployee()
    return (
        <Card className="mt-2">
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Employee</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="employee/create">Add Employee</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <EmployeeTable data={employees as Employee[]} />
            </CardContent>
        </Card>
    )
}

export default EmployeePage