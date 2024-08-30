import { Button, Row } from "antd";
import React from "react";
import NTechFrom from "../components/form/NTechFrom";
import NTechInput from "../components/form/NTechInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PasswordChange: React.FC = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const res = await changePassword(data);
    if (res?.data?.success) {
      toast.success("Password changed successfully", { id: toastId });
      dispatch(logout());
      navigate("/login");
    } else {
      toast.error(res?.error?.data?.message, { id: toastId });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <NTechFrom onSubmit={onSubmit}>
        <NTechInput type="text" name="oldPassword" label="Old Password" />

        <NTechInput type="text" name="newPassword" label="New Password:" />

        <Button htmlType="submit">Submit</Button>
      </NTechFrom>
    </Row>
  );
};

export default PasswordChange;
