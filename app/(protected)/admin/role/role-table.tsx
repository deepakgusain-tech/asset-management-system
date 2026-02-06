"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteRole, getRoles } from '@/lib/actions/role-action';
import { Role } from '@/types'
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const RoleTable = ({ data }: { data: Role[]}) => {

    const [roles, setRoles] = useState<Role[]>(data)

    const deleteRoleHandler = async (id: any) => {
        let res = await deleteRole(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const response = await getRoles()
            setRoles(response as Role[])
        }
    }

    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {roles && roles.length > 0 && roles.map((role) => (
                    <TableRow key={role.id}>
                        <TableCell>{role.name}</TableCell>
                          <TableCell>{role.status === "ACTIVE" ? <Badge variant="default" className='bg-green-500' >{role.status}</Badge> : <Badge variant="destructive" >{role.status}</Badge>}</TableCell>
                        <TableCell>{role.createdAt?.toLocaleString()}</TableCell>
                        <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/role/edit/${role.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => deleteRoleHandler(role.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RoleTable