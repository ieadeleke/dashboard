import { IconButton } from "@/components/buttons/IconButton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { MoreHorizontal } from "lucide-react";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import FleetIcon from "@/assets/icons/ic_fleet_on_water.svg";
import Button from "@/components/buttons";
import { Avatar } from "@/components/image/Avatar";
import BlockIcon from "@/assets/icons/ic_block.svg";
import { useRef } from "react";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import {
  ConfirmationAlertDialog,
  ConfirmationAlertDialogRef,
} from "@/components/dialogs/ConfirmationAlertDialog";
import { FleetStatusChip } from "../fleet/FleetStatusChip";
import { FleetGalleryModalRef } from "../fleet/FleetGalleryModal";
import { useUnSuspendOperator } from "@/utils/apiHooks/operators/useUnSuspendOperator";
import { useSuspendOperator } from "@/utils/apiHooks/operators/useSuspendOperator";
import { Incident } from "@/models/incidents";
import {
  IncidentAlertDialog,
  IncidentAlertDialogRef,
} from "@/components/dialogs/AlertDialog";
import { useApproveIncident } from "@/utils/apiHooks/incidents/useApproveIncident";

type IncidentInfoModalProps = {
  onIncidentDataChanged?: (incident: Incident) => void;
};

type IncidentInfoOpenPayload = {
  data: Incident;
  isForApproval?: boolean;
};

export type IncidentInfoModalRef = {
  open: (payload: IncidentInfoOpenPayload) => void;
  close: () => void;
};

type IncidentInfoChipProps = {
  title: string;
  value: string;
};

const IncidentInfoChip = (props: IncidentInfoChipProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-400 p-2 rounded-sm">
        <FleetIcon className="text-primary" />
      </div>

      <p className="text-sm">{props.title}</p>

      <p className="text-sm font-bold">{props.value}</p>
    </div>
  );
};

export const IncidentInfoModal = forwardRef<
  IncidentInfoModalRef,
  IncidentInfoModalProps
>((props, ref) => {
  const { showSnackBar } = useContext(GlobalActionContext);
  const [data, setData] = useState<Incident>();
  const [isVisible, setIsVisible] = useState(false);
  const fleetGalleryModalRef = useRef<FleetGalleryModalRef>(null);

  const {
    isLoading: isApproveLoading,
    isComplete: isApproveComplete,
    approveIncident,
    error: approveError,
  } = useApproveIncident();
  const {
    isLoading: isUnSuspendLoading,
    data: unSuspendData,
    unSuspendOperator,
    error: unsuspendError,
  } = useUnSuspendOperator();
  const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null);
  const incidentAlertDialogRef = useRef<IncidentAlertDialogRef>(null);

  const isLoading = useMemo(
    () => isUnSuspendLoading || isApproveLoading,
    [isUnSuspendLoading, isApproveLoading]
  );

  const error = useMemo(
    () => approveError || unsuspendError,
    [approveError, unsuspendError]
  );

  useEffect(() => {
    if (isApproveComplete) {
      showSnackBar({ severity: "success", message: "Incident approved" });
      closeModal();
      // setData((prevData) => {
      //   return Object.assign({}, prevData, { confirmStatus: true });
      // });
      if (data) {
        props.onIncidentDataChanged?.({ ...data, ConfirmStatus: true });
      }
    }
  }, [isApproveComplete]);

  useEffect(() => {
    if (unSuspendData) {
      showSnackBar({ severity: "success", message: "User approved" });
      // setData((prevData) => {
      //   return Object.assign({}, prevData, { ConfirmStatus: false });
      // });
      if (data) {
        props.onIncidentDataChanged?.({ ...data, ConfirmStatus: false });
      }
    }
  }, [unSuspendData]);

  useEffect(() => {
    if (error) {
      showSnackBar({ severity: "error", message: error });
    }
  }, [error]);

  function closeModal() {
    setIsVisible(false);
    setData(undefined);
  }

  useImperativeHandle(ref, () => ({
    open(payload) {
      setData(payload.data);
      setIsVisible(true);
    },
    close() {
      closeModal();
    },
  }));

  function onOpenChange(value: boolean) {
    if (!value) {
      closeModal();
    }
  }

  function handleApproveIncident() {
    if (data) {
      incidentAlertDialogRef.current?.show({
        data: {
          title: `Are you sure you want to approve this incident on ${data.BoatName}`,
        },
        variant: "regular",
        onCancel: () => incidentAlertDialogRef.current?.dismiss(),
        onConfirm: () => {
          incidentAlertDialogRef.current?.dismiss();
          approveIncident({ incidentId: data._id });
        },
      });
    }
  }

  function handleDisapproveIncident() {
    // if (data) {
    //   confirmationDialogRef.current?.show({
    //     data: {
    //       title: `Are you sure you want to unsuspend this user?`,
    //       description: "",
    //     },
    //     onCancel: () => confirmationDialogRef.current?.dismiss(),
    //     onConfirm: () => {
    //       confirmationDialogRef.current?.dismiss();
    //       unSuspendOperator({ userId: data._id });
    //     },
    //   });
    // }
  }

  return (
    <Dialog open={isVisible} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[60vw] overflow-y-scroll no-scrollbar px-0 py-0">
        <ConfirmationAlertDialog ref={confirmationDialogRef} />
        <IncidentAlertDialog ref={incidentAlertDialogRef} />
        {data && (
          <div className="flex flex-col">
            <div className="h-28 bg-primary" />
            <div className="px-8 flex flex-col gap-4 pb-8">
              <div className="-mt-14 flex items-baseline">
                <div className="flex flex-col">
                  <Avatar className="w-28 h-28 bg-gray-500" />
                  <p className="text-2xl font-bold">{data.BoatName}</p>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1" />
                  <FleetStatusChip
                    status={data.ConfirmStatus ? "active" : "pending"}
                  />

                  <Select>
                    <SelectTrigger className="w-auto border-none">
                      <IconButton>
                        <MoreHorizontal className="text-gray-500" />
                      </IconButton>
                    </SelectTrigger>

                    <SelectContent className="w-auto px-0 py-1">
                      {!data.ConfirmStatus ? (
                        <div
                          className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleApproveIncident()}
                        >
                          <BlockIcon className="text-gray-400" />
                          <p className="text-sm">Approve Incident</p>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleDisapproveIncident()}
                        >
                          <BlockIcon className="text-gray-400" />
                          <p className="text-sm">Disapprove Incident</p>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <IncidentInfoChip title="Number of Deaths" value={"0"} />

                <IncidentInfoChip
                  title="Number of missing persons"
                  value={data.MissingPerson?.toString()}
                />

                <IncidentInfoChip
                  title="Incident Location"
                  value={data.IncidentLocation.toString()}
                />

                <IncidentInfoChip
                  title="Boat Capacity"
                  value={data.BoatCapacity.toString()}
                />

                <IncidentInfoChip
                  title="Boat Type"
                  value={data.BoatType ?? ""}
                />

                <IncidentInfoChip
                  title="Incident Type"
                  value={data.IncidentType}
                />

                <IncidentInfoChip
                  title="Rescued Number"
                  value={data.RescuedNumber.toString()}
                />
              </div>

              <Button
                onClick={closeModal}
                isLoading={isLoading}
                disabled={isLoading}
                variant="contained"
                className="flex-1 rounded-lg min-h-[50px]"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
});

IncidentInfoModal.displayName = "IncidentInfoModal";
