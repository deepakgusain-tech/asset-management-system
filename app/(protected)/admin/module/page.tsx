import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import DeviceAssignedTable from './module-table'

import { getModules } from '@/lib/actions/module-action'
import Module from 'module'

const ModulePage = async () => {
    const module = await getModules();

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Module</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="module/create">Add Module</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <DeviceAssignedTable data={module} />
            </CardContent>
        </Card>
    )
}

export default ModulePage