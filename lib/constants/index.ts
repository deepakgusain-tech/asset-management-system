import { AssignedDeviceStatus, DeviceStatus, Status } from "../generated/prisma/enums"

export const APP_NAME = process.env.NEXT_APP_APP_NAME ?? "Asset Management System"
export const APP_DESCRIPTION = process.env.NEXT_APP_DESCRIPTION ?? "Asset Management System"
export const SERVER_URL = process.env.NEXT_APP_SERVER_URL ?? "http://localhost:3000"

export const roleDefaultValues = {
    name: "",
    description: "",
    status: Status.INACTIVE
}

export const userDefaultValues = {
    name: "",
    email: "",
    image: "",
    password: "",
    role: 0,
    status: Status.ACTIVE
}

export const moduleDefaultValues = {
    name: "",
    description: "",
    role: "",
    status: Status.ACTIVE
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
    departmentId: "",
    locationId: "",
    status: Status.ACTIVE,
}

export const locationDefaultValues = {
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latitude: "",
    longitude: "",
    status: Status.ACTIVE,
}

export const assignedDeviceDefaultValues = {
    deviceId: "",
    employeeId: "",
    remarks: "",
    status: AssignedDeviceStatus.NOTASSIGNED,
    assignedDate: new Date(),
    returnedDate: new Date(),
<<<<<<< Updated upstream
}
=======
}


export const vendorDefaultValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  status: Status.ACTIVE,
};



// new changes 
export const requestQuotationDefaultValues = {
  title: "",
  requirement: "", // textarea content
  status: "DRAFT", // default status
};

export const vendorQuotationAttachmentDefaultValues = {
  fileName: "",
  fileUrl: "",
  fileType: "PDF", // default type,  IMAGE or DOC
  mimeType: null,
  fileSize: null,
}

export const vendorQuotationItemDefaultValues = {
  configuration: "",
  unitPrice: 0,
  quantity: 1,
  discount: 0,
  totalPrice: 0,
  model: "",
  serialNumber: "",
  version: "",
  attachments: [vendorQuotationAttachmentDefaultValues], // empty array if you want
}

export const vendorQuotationDefaultValues = {
  vendorId: "",
  rfqId: null,
  status: "SUBMITTED", 
  totalAmount: 0,
  items: [vendorQuotationItemDefaultValues],
}


>>>>>>> Stashed changes
