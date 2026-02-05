import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import UserForm from '@/components/user/user-form'
import { getUserById } from '@/lib/actions/user-action'
import { User } from '@/types'
import Link from 'next/link'
import React from 'react'
import { getRoles } from '@/lib/actions/role-action'
import { promises } from 'dns'

type Props = {
  params: Promise <{ id: string }>
};

const UserEditPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await getUserById(id)
  const roles = await getRoles()

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit User</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/user">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <UserForm
          data={res.data as User}
          update={true}
          roles={roles}
        />
      </CardContent>
    </Card>
  )
}

export default UserEditPage
  



