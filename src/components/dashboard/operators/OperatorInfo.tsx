import { IconButton } from "@/components/buttons/IconButton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { Fleet } from "@/models/fleets";
import { useAddFleet } from "@/utils/apiHooks/fleets/useAddFleet";
import {
  GalleryThumbnailsIcon,
  HistoryIcon,
  MoreHorizontal,
} from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BlockIcon from "@/assets/icons/ic_block.svg";
import { useRef } from "react";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { useSuspendFleet } from "@/utils/apiHooks/fleets/useSuspendFleet";
import {
  ConfirmationAlertDialog,
  ConfirmationAlertDialogRef,
} from "@/components/dialogs/ConfirmationAlertDialog";
import { useVerifyFleet } from "@/utils/apiHooks/fleets/useVerifyFleet";
import { fleetActions } from "@/redux/reducers/fleets";
import { useActivateFleet } from "@/utils/apiHooks/fleets/useActivateFleet";
import { FleetStatusChip } from "../fleet/FleetStatusChip";
import { Operator } from "@/models/operators";
import {
  FleetGalleryModal,
  FleetGalleryModalRef,
} from "../fleet/FleetGalleryModal";

type OperatorInfoModalProps = {};

type OperatorInfoOpenPayload = {
  data: Operator;
  isForApproval?: boolean;
};

export type OperatorInfoModalRef = {
  open: (payload: OperatorInfoOpenPayload) => void;
  close: () => void;
};

type OperatorInfoChipProps = {
  title: string;
  value: string;
};

const OperatorInfoChip = (props: OperatorInfoChipProps) => {
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

export const OperatorInfoModal = forwardRef<
  OperatorInfoModalRef,
  OperatorInfoModalProps
>((props, ref) => {
  const { showSnackBar } = useContext(GlobalActionContext);
  const [data, setData] = useState<Operator>();
  const [isForApproval, setIsForApproval] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fleetGalleryModalRef = useRef<FleetGalleryModalRef>(null);

  const {
    isLoading: isSuspendLoading,
    data: suspendData,
    suspendFleet,
    error: suspendError,
  } = useSuspendFleet();
  const {
    isLoading: isUnSuspendLoading,
    data: unSuspendData,
    activateFleet,
    error: unsuspendError,
  } = useActivateFleet();
  const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null);

  const isLoading = useMemo(
    () => isUnSuspendLoading || isSuspendLoading,
    [isUnSuspendLoading, isSuspendLoading]
  );

  const error = useMemo(
    () => suspendError || unsuspendError,
    [suspendError, unsuspendError]
  );

  useEffect(() => {
    if (suspendData) {
      showSnackBar({ severity: "success", message: "Vessel suspended" });
      setData((prevData) => {
        return Object.assign({}, prevData, { status: "suspended" });
      });
      if (data) {
        fleetActions.updateFleet({
          fleet_id: data._id,
          data: { status: "suspended" },
        });
      }
    }
  }, [suspendData]);

  useEffect(() => {
    if (unSuspendData) {
      showSnackBar({ severity: "success", message: "Vessel approved" });
      setData((prevData) => {
        return Object.assign({}, prevData, { status: "active" });
      });
      if (data) {
        fleetActions.updateFleet({
          fleet_id: data._id,
          data: { status: "active" },
        });
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
      setIsForApproval(payload.isForApproval ?? false);
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

  function handleSuspendVessel() {
    if (data) {
      confirmationDialogRef.current?.show({
        data: {
          title: `Are you sure you want to suspend this vessel?`,
          description: "",
        },
        onCancel: () => confirmationDialogRef.current?.dismiss(),
        onConfirm: () => {
          confirmationDialogRef.current?.dismiss();
          suspendFleet({ boatId: data._id });
        },
      });
    }
  }

  function handleUnsuspendVessel() {
    if (data) {
      confirmationDialogRef.current?.show({
        data: {
          title: `Are you sure you want to approve this vessel?`,
          description: "",
        },
        onCancel: () => confirmationDialogRef.current?.dismiss(),
        onConfirm: () => {
          confirmationDialogRef.current?.dismiss();
          activateFleet({ boatId: data._id });
        },
      });
    }
  }

  function openGallery() {
    if (data) {
      const urls = [];
      if (data.BusinessProfile?.businessOwner) {
        urls.push(data.BusinessProfile.businessOwner.url);
      }
      if (data.BusinessProfile?.CAC) {
        urls.push(data.BusinessProfile.CAC.url);
      }
      if (data.BusinessProfile?.CACForm2) {
        urls.push(data.BusinessProfile.CACForm2.url);
      }
      if (data.BusinessProfile?.CACForm) {
        urls.push(data.BusinessProfile.CACForm.url);
      }
      if (data.BusinessProfile?.OperationalLicense) {
        urls.push(data.BusinessProfile.OperationalLicense.url);
      }

      if (urls.length > 0) {
        fleetGalleryModalRef.current?.open({
          data: urls,
        });
      }
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[60vw] overflow-y-scroll no-scrollbar px-0 py-0">
        <ConfirmationAlertDialog ref={confirmationDialogRef} />
        <FleetGalleryModal ref={fleetGalleryModalRef} />
        {data && (
          <div className="flex flex-col">
            <div className="h-28 bg-primary" />
            <div className="px-8 flex flex-col gap-4 pb-8">
              <div className="-mt-14 flex items-baseline">
                <div className="flex flex-col">
                  <Avatar src={data.image} className="w-28 h-28 bg-gray-500" />
                  <p className="text-2xl font-bold">
                    {data.firstName} {data.lastName}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1" />
                  <FleetStatusChip status={"active"} />

                  <Select>
                    <SelectTrigger className="w-auto border-none">
                      <IconButton>
                        <MoreHorizontal className="text-gray-500" />
                      </IconButton>
                    </SelectTrigger>

                    <SelectContent className="w-auto px-0 py-1">
                      <div
                        className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => openGallery()}
                      >
                        <GalleryThumbnailsIcon className="text-gray-400" />
                        <p className="text-sm">View Documents</p>
                      </div>

                      {true ? (
                        <div
                          className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleUnsuspendVessel()}
                        >
                          <BlockIcon className="text-gray-400" />
                          <p className="text-sm">Unsuspend Vessel</p>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuspendVessel()}
                        >
                          <BlockIcon className="text-gray-400" />
                          <p className="text-sm">Suspend Vessel</p>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <OperatorInfoChip
                  title="Phone Number"
                  value={data.phoneNumber}
                />

                <OperatorInfoChip title="Phone Number" value={data.email} />

                <OperatorInfoChip
                  title="Residential Address"
                  value={data.residentialAddress}
                />
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-bold">Business Profile</h1>

                <div className="flex items-center flex-wrap gap-4">
                  <OperatorInfoChip
                    title="Local Govermenent"
                    value={data.BusinessProfile?.localGovt ?? ""}
                  />

                  <OperatorInfoChip
                    title="Postal Code"
                    value={data.BusinessProfile?.postalCode ?? ""}
                  />

                  <OperatorInfoChip
                    title="Area of Operation"
                    value={data.BusinessProfile?.areaOfOperation ?? ""}
                  />

                  <OperatorInfoChip
                    title="Company Name"
                    value={data.BusinessProfile?.companyName ?? ""}
                  />

                  <OperatorInfoChip
                    title="Company Address"
                    value={data.BusinessProfile?.companyAddress ?? ""}
                  />

                  <OperatorInfoChip
                    title="NIN"
                    value={data.BusinessProfile?.NIN ?? ""}
                  />
                </div>
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

OperatorInfoModal.displayName = "OperatorInfoModal";
