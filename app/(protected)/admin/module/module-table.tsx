"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteModule, getModules } from '@/lib/actions/module-action';
import { Module } from '@/types'
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const ModuleTable = ({ data }: { data: Module[] }) => {

    const [modules, setModules] = useState<Module[]>(data)

    const deleteModuleHandler = async (id: any) => {
        let res = await deleteModule(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const response = await getModules()
            setModules(response)
        }
    }

    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {modules && modules.length > 0 && modules.map((module) => (
                    <TableRow key={module.id}>
                        <TableCell>{module.name}</TableCell>
                        <TableCell>{module.description}</TableCell>
                        <TableCell>{module.status === "ACTIVE" ? <Badge variant="default" className='bg-green-500' >{module.status}</Badge> : <Badge variant="destructive" >{module.status}</Badge>}</TableCell>
                        <TableCell>{module.createdAt?.toLocaleString()}</TableCell>
                        <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/module/edit/${module.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => deleteModuleHandler(module.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ModuleTable