import EmptyState from "../../common/EmptyState";
import { FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <EmptyState
      icon={FiSearch}
      title="No products found"
      message="Try adjusting your filters or search for something else."
    />
  );
};

export default NotFound;
