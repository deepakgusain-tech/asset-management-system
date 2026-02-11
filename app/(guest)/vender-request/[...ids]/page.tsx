import { getRequirementById } from "@/lib/actions/requirements";
import VendorForm from "./vendor-form";
import { Requirement } from "@/types";


const VendorRequestPage = async ({
  params
}: {
  params: { ids: string[] };
}) => {
  
  const { ids } = await params;

  const requirement = await getRequirementById(ids[0]);

  console.log(requirement);
  
  return (
    <>
     <VendorForm requirement={requirement.data as Requirement} vendorId={ids[1]} />
    </>
  );
};

export default VendorRequestPage;


