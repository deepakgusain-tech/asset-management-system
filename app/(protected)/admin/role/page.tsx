import { Card,CardContent, CardHeader,CardTitle,} from "@/components/ui/card";
import { getRoles } from "@/lib/actions/role-action";
import RoleTable from "./role-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const RolePage = async () => {
  const roles = await getRoles();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
             <h1>Role</h1>
            <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
              <Link href="/admin/role/create">Create Role</Link>
            </Button>
            </div>
      </CardHeader>

      <CardContent>
        <RoleTable data={roles} />
      </CardContent>
    </Card>
  );
};

export default RolePage;




