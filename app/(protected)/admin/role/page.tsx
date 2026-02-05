import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

import { Role } from '@/types'
import RoleTable from './role-table'
import { getRoles } from '@/lib/actions/role-action'

const RolePage = async () => {
    const roles = await getRoles();
  
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Role</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="role/create">Add Role</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <RoleTable data={roles as Role[]} />
            </CardContent>
        </Card>
    )
}

export default RolePage