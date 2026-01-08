import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

import { Role, User } from '@/types'
import RoleTable from './user-table'
import { getUsers } from '@/lib/actions/user-action'

const UserPage = async () => {
    const users = await getUsers();
  
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>User</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="user/create">Add User</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <RoleTable data={users as User[]} />
            </CardContent>
        </Card>
    )
}

export default UserPage