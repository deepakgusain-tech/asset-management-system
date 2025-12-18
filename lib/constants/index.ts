import { DeviceStatus, Status } from "../generated/prisma/enums"

export const APP_NAME = process.env.NEXT_APP_APP_NAME ?? "Asset Management System"
export const APP_DESCRIPTION = process.env.NEXT_APP_DESCRIPTION ?? "Asset Management System"
export const SERVER_URL = process.env.NEXT_APP_SERVER_URL ?? "http://localhost:3000"


export const roleDefaultValues = {
    name: "",
    description: "",
    status: false
}

export const userDefaultValues = {
    name: "",
    email: "",
    image: "",
    password: "",
    role: 0,
    status: false
}

export const moduleDefaultValues = {
    name: "",
    description: "",
    role: "",
    status: false
}

export const deviceCategoryDefaultValues = {
    name: "",
    description: "",
    status: Status.ACTIVE
}

export const departmentDefaultValues = {
    name: "",
    description: "",
    status: Status.ACTIVE
}


export const deviceDefaultValues = {
    name: "",
    serialNumber: "",
    description: "",
    status: DeviceStatus.ACTIVE,
    categoryId: "",
    manufacturer: "",
    model: "",
    purchaseDate: null,
    warrantyEnd: null
}

export const employeeDefaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: null,
    hireDate: null,
    salary: "",
    status: Status.ACTIVE,
    departmentId: "",
}