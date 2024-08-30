import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import NTechFrom from "../components/form/NTechFrom";
import NTechInput from "../components/form/NTechInput";

const Login = () => {
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: "0001",
  //     password: "admin12345",
  //   },
  // });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();

  if (error) {
    toast.error("Something went wrong");
  }

  const defaultValues = {
    userId: "2024010001",
    password: "student123",
  };
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("Logged in", { id: toastId, duration: 1000 });
      console.log(res);
      if (res.data.needsPasswordChange) {
        toast.info("Change your password first", {
          duration: 1000,
        });
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 1000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <NTechFrom onSubmit={onSubmit} defaultValues={defaultValues}>
        <NTechInput type="text" name="userId" label="ID:" />

        <NTechInput type="text" name="password" label="Password:" />

        <Button htmlType="submit">Login</Button>
      </NTechFrom>
    </Row>
  );
};

export default Login;
