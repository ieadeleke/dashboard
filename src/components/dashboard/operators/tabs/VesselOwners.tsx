import { useFetchOperators } from "@/utils/apiHooks/operators/useFetchOperators";
import {
  useEffect,
  useState,
} from "react";
import { OperatorTableList } from "../OperatorTableList";

type VesselOwnersProps = {
  addOperator?: () => void;
  updateSize?: (size: number) => void;
};

export const VesselOwners = (props: VesselOwnersProps) => {
  const {
    isLoading: isFetchLoading,
    count,
    error: isFetchError,
    data: _data,
    fetchOperators,
  } = useFetchOperators();
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.updateSize?.(_data.length)
  }, [_data.length])

  useEffect(() => {
    fetchOperators({ page, profileType: "vesselOwner" });
  }, [page]);

  function onPageChange(selectedItem: { selected: number }) {
    setPage(selectedItem.selected);
  }

  return (
    <div className="flex flex-col">
      <OperatorTableList
        isFetchError={isFetchError}
        isFetchLoading={isFetchLoading}
        data={_data}
        onPageChange={onPageChange}
        onRetry={fetchOperators}
        count={count}
        page={page}
      />
    </div>
  );
};
