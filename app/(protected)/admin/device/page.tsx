import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import DeviceTable from './device-table'
import { getDevice } from '@/lib/actions/device-action'
import { Device } from '@/types'

const DevicePage = async () => {
  const device = await getDevice()

  return (
    <Card>
      <CardHeader >
        <div className='flex justify-between items-center'>
          <h1>Device</h1>
          <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
            <Link href="device/create">Add Device</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>

        <DeviceTable data={device as Device[]} />

      </CardContent>
    </Card>
  )
}

export default DevicePage