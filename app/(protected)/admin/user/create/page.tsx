import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import UserForm from '@/components/user/user-form'
import { getRoles } from '@/lib/actions/role-action'
import Link from 'next/link'
import React from 'react'

const UserCreatePage = async() => {
    const roles = await getRoles()

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Add Role</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/role">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <UserForm update={false} roles={roles} />
            </CardContent>
        </Card>
    )
}

export default UserCreatePage