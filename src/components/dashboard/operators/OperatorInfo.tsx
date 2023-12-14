import { IconButton } from "@/components/buttons/IconButton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import {
  GalleryThumbnailsIcon,
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
import BlockIcon from "@/assets/icons/ic_block.svg";
import { useRef } from "react";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import {
  ConfirmationAlertDialog,
  ConfirmationAlertDialogRef,
} from "@/components/dialogs/ConfirmationAlertDialog";
import { fleetActions } from "@/redux/reducers/fleets";
import { FleetStatusChip } from "../fleet/FleetStatusChip";
import { Operator } from "@/models/operators";
import {
  FleetGalleryModal,
  FleetGalleryModalRef,
} from "../fleet/FleetGalleryModal";
import { useUnSuspendOperator } from "@/utils/apiHooks/operators/useUnSuspendOperator";
import { useSuspendOperator } from "@/utils/apiHooks/operators/useSuspendOperator";

type OperatorInfoModalProps = {
    onOperatorDataChanged?: (operator: Operator) => void
};

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
  const [isVisible, setIsVisible] = useState(false);
  const fleetGalleryModalRef = useRef<FleetGalleryModalRef>(null);

  const {
    isLoading: isSuspendLoading,
    data: suspendData,
    suspendOperator,
    error: suspendError,
  } = useSuspendOperator();
  const {
    isLoading: isUnSuspendLoading,
    data: unSuspendData,
    unSuspendOperator,
    error: unsuspendError,
  } = useUnSuspendOperator();
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
      showSnackBar({ severity: "success", message: "User suspended" });
      setData((prevData) => {
        return Object.assign({}, prevData, suspendData);
      });
      props.onOperatorDataChanged?.(suspendData)
    }
  }, [suspendData]);

  useEffect(() => {
    if (unSuspendData) {
      showSnackBar({ severity: "success", message: "User approved" });
      setData((prevData) => {
        return Object.assign({}, prevData, unSuspendData);
      });
      props.onOperatorDataChanged?.(unSuspendData)
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

  function handleSuspendUser() {
    if (data) {
      confirmationDialogRef.current?.show({
        data: {
          title: `Are you sure you want to suspend this user?`,
          description: "",
        },
        onCancel: () => confirmationDialogRef.current?.dismiss(),
        onConfirm: () => {
          confirmationDialogRef.current?.dismiss();
          suspendOperator({ userId: data._id });
        },
      });
    }
  }

  function handleUnsuspendUser() {
    if (data) {
      confirmationDialogRef.current?.show({
        data: {
          title: `Are you sure you want to unsuspend this user?`,
          description: "",
        },
        onCancel: () => confirmationDialogRef.current?.dismiss(),
        onConfirm: () => {
          confirmationDialogRef.current?.dismiss();
          unSuspendOperator({ userId: data._id });
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
                  <FleetStatusChip
                    status={data.isActive ? "active" : "suspended"}
                  />

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

                      {!data.isActive ? (
                        <div
                          className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleUnsuspendUser()}
                        >
                          <BlockIcon className="text-gray-400" />
                          <p className="text-sm">Unsuspend User</p>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-4 px-4 pr-16 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuspendUser()}
                        >
                          <BlockIcon className="text-gray-400" />
                          <p className="text-sm">Suspend User</p>
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
