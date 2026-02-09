"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteEmployee, getEmployee } from '@/lib/actions/employee';
import { Employee } from '@/types'
import { format } from 'date-fns';
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const EmployeeTable = ({ data }: { data: Employee[] }) => {

    const [employees, setEmployees] = useState<Employee[]>(data)

    const deleteEmployeeHandler = async (id: any) => {
        let res = await deleteEmployee(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const response = await getEmployee()
            setEmployees(response as Employee[])
        }
    }

    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Date Of Birth</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees && employees.length > 0 && employees.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell>{employee.first_name}</TableCell>
                        <TableCell>{employee.last_name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phoneNumber}</TableCell>
                        <TableCell>{employee.dateOfBirth && format(employee.dateOfBirth, "PPP")}</TableCell>
                        <TableCell>{employee.status === "ACTIVE" ? <Badge variant="default" className='bg-green-500' >{employee.status}</Badge> : <Badge variant="destructive" >{employee.status}</Badge>}</TableCell>
                        <TableCell>{employee.createdAt && format(employee.createdAt, "PPP")}</TableCell>
                        <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/employee/edit/${employee.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => deleteEmployeeHandler(employee.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default EmployeeTable