import { Divider } from "@/components/Divider";
import Button from "@/components/buttons";
import { IconButton } from "@/components/buttons/IconButton";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { TextField } from "../input/InputText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetRoles } from "@/utils/apiHooks/admin/useGetRoles";
import { isEmail, isValidPhoneNumber } from "@/utils/validation";
import { useAddStaff } from "@/utils/apiHooks/admin/useAddStaff";
import { Staff } from "@/models/profile";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import NetworkStateComponent from "../network/NetworkStateComponent";

export type AddAdminRef = {
  open: () => void;
  close: () => void;
};

type AddAdminProps = {
  onStaffCreated?: (staff: Staff) => void;
};

export const AddAdmin = forwardRef<AddAdminRef, AddAdminProps>((props, ref) => {
  const [isOppen, setIsOpen] = useState(false);
  const {
    isLoading: isFetchLoading,
    error: isFetchError,
    getRoles,
    data: roles,
  } = useGetRoles();
  const [selectedRole, setSelectedRole] = useState<string>();
  const [revealPassword, setRevealPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { isLoading, error, data, addStaff } = useAddStaff();
  const [email, setEmail] = useState("");
  const { showSnackBar } = useContext(GlobalActionContext);
  const [phoneNumber, setPhoneNumber] = useState("");

  function toggleRevealPassword() {
    setRevealPassword((value) => !value);
  }

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      handleClose();
    },
  }));

  useEffect(() => {
    if (error) {
      showErrorMessage(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      showSnackBar({
        severity: "success",
        message: "Staff created successfully",
      });
      props.onStaffCreated?.({
        firstName: firstName,
        email,
        lastName,
        phoneNumber,
        roleId: selectedRole!!,
      });
      setTimeout(handleClose, 1000);
    }
  }, [data]);

  function handleClose() {
    setIsOpen(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
  }

  function onOpenChanged(value: boolean) {
    if (!value) {
      handleClose();
    }
  }

  function updateSelectedPermissions(role: string) {
    setSelectedRole(role);
  }

  function showErrorMessage(message: string) {
    showSnackBar({
      severity: "error",
      message,
    });
  }

  function save() {
    if (firstName.trim().length <= 0) {
      return showErrorMessage("First name cannot be empty");
    } else if (lastName.trim().length <= 0) {
      return showErrorMessage("Last name cannot be empty");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      return showErrorMessage("Invalid Phone number");
    } else if (!isEmail(email)) {
      return showErrorMessage("Invalid Email");
    } else if (!selectedRole) {
      return showErrorMessage("You must select a role");
    }
    addStaff({
      email,
      firstName,
      lastName,
      phoneNumber,
      roleId: selectedRole,
    });
  }

  const getRole = (id: string) =>
    roles.find((item) => item._id === id)?.roleName ?? "";

  useEffect(() => {
    if (isOppen) {
      getRoles();
    }
  }, [isOppen]);

  return (
    <Dialog open={isOppen} onOpenChange={onOpenChanged}>
      <DialogContent className="min-w-[600px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="flex flex-row items-center">
          <h1>Add Admin</h1>
          <div className="flex-1" />
          <IconButton>
            <XIcon className="text-gray-500" />
          </IconButton>
        </DialogHeader>

        <Divider />

        <div className="flex flex-col bg-[#F9F9F9] px-4 py-4 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-light">First Name</p>
                  <TextField.Input
                    value={firstName}
                    onChange={(evt) => setFirstName(evt.target.value)}
                    className="bg-white px-2 rounded-md"
                    placeholder=""
                  />
                </div>

                <div>
                  <p className="font-light">Last Name</p>
                  <TextField.Input
                    value={lastName}
                    onChange={(evt) => setLastName(evt.target.value)}
                    className="bg-white px-2 rounded-md"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-light">Email Address</p>
                  <TextField.Input
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    className="bg-white px-2 rounded-md"
                    placeholder=""
                  />
                </div>

                <div>
                  <p className="font-light">Phone Number</p>
                  <TextField.Input
                    value={phoneNumber}
                    onChange={(evt) => setPhoneNumber(evt.target.value)}
                    className="bg-white px-2 rounded-md"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="col-span-2">
                <Select onValueChange={updateSelectedPermissions}>
                  <SelectTrigger className="outline-none border-none text-gray-500 text-sm">
                    <p>
                      {selectedRole ? getRole(selectedRole) : "Select Role"}
                    </p>
                  </SelectTrigger>
                  <SelectContent>
                    <NetworkStateComponent
                      isLoading={isFetchLoading}
                      error={isFetchError}
                      fetchMore={getRoles}
                    >
                      {roles.map((role) => (
                        <SelectItem key={role._id} value={role._id}>
                          {role.roleName}
                        </SelectItem>
                      ))}
                    </NetworkStateComponent>
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-light">Password</p>
                  <TextField.Container className="bg-white px-2 rounded-md">
                    <LockIcon className="text-gray-500 w-4 h-4" />
                    <TextField.Input
                      type={revealPassword ? "text" : "password"}
                    />
                    <IconButton onClick={toggleRevealPassword}>
                      {revealPassword ? (
                        <EyeOffIcon className="text-gray-500 w-5 h-5" />
                      ) : (
                        <EyeIcon className="text-gray-500 w-5 h-5" />
                      )}
                    </IconButton>
                  </TextField.Container>
                </div>

                <div>
                  <p className="font-light">Confirm Password</p>
                  <TextField.Container className="bg-white px-2 rounded-md">
                    <LockIcon className="text-gray-500 w-4 h-4" />
                    <TextField.Input
                      type={revealPassword ? "text" : "password"}
                    />
                    <IconButton onClick={toggleRevealPassword}>
                      {revealPassword ? (
                        <EyeOffIcon className="text-gray-500 w-5 h-5" />
                      ) : (
                        <EyeIcon className="text-gray-500 w-5 h-5" />
                      )}
                    </IconButton>
                  </TextField.Container>
                </div>

                <div className="col-span-2">
                  <p className="font-light">Select an image</p>

                  <div className="flex flex-col h-24 bg-white justify-center items-center">
                    <UploadCloudIcon />
                    <p>
                      Drag and Drop or{" "}
                      <span className="text-[#0081FF]">Browse</span> upload
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Button
                onClick={handleClose}
                isLoading={isLoading}
                disabled={isLoading}
                className="flex-1 bg-[#F2F2F2] text-primary hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={save}
                isLoading={isLoading}
                disabled={isLoading}
                className="flex-1 bg-primary"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

AddAdmin.displayName = "AddAdmin";
