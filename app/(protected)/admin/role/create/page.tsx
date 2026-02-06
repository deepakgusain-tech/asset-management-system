import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import RoleForm from '@/components/user/role-form'
import Link from 'next/link'
import React from 'react'

const RoleCreatePage = async() => {

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
                <RoleForm update={false} />
            </CardContent>
        </Card>
    )
}

export default RoleCreatePage