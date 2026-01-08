"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteModule, getModules } from '@/lib/actions/module-action';
<<<<<<< HEAD
import { Device, DeviceAssigned, Employee, AppModule } from '@/types'
=======
import { Module } from '@/types'
>>>>>>> 64a8abe3216cae2d3c9025285e19fac63e51c88b
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

<<<<<<< HEAD
const ModuleTable = ({ data }: { data: AppModule[]}) => {

    const [modules, setModules] = useState<AppModule[]>(data)
=======
const ModuleTable = ({ data }: { data: Module[] }) => {

    const [modules, setModules] = useState<Module[]>(data)
>>>>>>> 64a8abe3216cae2d3c9025285e19fac63e51c88b

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
<<<<<<< HEAD
=======
                    <TableHead>Description</TableHead>
>>>>>>> 64a8abe3216cae2d3c9025285e19fac63e51c88b
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {modules && modules.length > 0 && modules.map((module) => (
                    <TableRow key={module.id}>
<<<<<<< HEAD
                         <TableCell>{module.name}</TableCell> 
                          <TableCell>{"fhg"}</TableCell>
=======
                        <TableCell>{module.name}</TableCell>
                        <TableCell>{module.description}</TableCell>
>>>>>>> 64a8abe3216cae2d3c9025285e19fac63e51c88b
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