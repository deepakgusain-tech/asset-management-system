"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteDepartment, getDepartment } from '@/lib/actions/department';
import { Department } from '@/types'
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const DepartmentTable = ({ data }: { data: Department[] }) => {

    const [departments, setDepartments] = useState<Department[]>(data)

    const deleteDepartmentHandler = async (id: any) => {
        let res = await deleteDepartment(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const response = await getDepartment()
            setDepartments(response)
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
                {departments && departments.length > 0 && departments.map((department) => (
                    <TableRow key={department.id}>
                        <TableCell>{department.name}</TableCell>
                        <TableCell>{department.status === "ACTIVE" ? <Badge variant="default" className='bg-green-500' >{department.status}</Badge> : <Badge variant="destructive" >{department.status}</Badge>}</TableCell>
                        <TableCell>{department.createdAt?.toLocaleString()}</TableCell>
                        <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/department/edit/${department.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => deleteDepartmentHandler(department.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DepartmentTable