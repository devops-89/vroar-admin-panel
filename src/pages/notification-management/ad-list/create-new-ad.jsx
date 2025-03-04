import AddEvent from "@/components/event/add-new-event";
import withAuth from "@/utils/withAuth";

const CreateNewAd = () => {
  return (
    <div>
      <AddEvent />
    </div>
  );
};

export default withAuth(CreateNewAd);
