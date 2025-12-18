import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const EmployeePage = () => {
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
            </CardContent>
        </Card>
    )
}

export default EmployeePage