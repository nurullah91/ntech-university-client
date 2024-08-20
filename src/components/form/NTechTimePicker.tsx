import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";
// import dayjs from "dayjs";

type TInputProps = {
  name: string;
  label?: string;
};

const NTechTimePicker = ({ label, name }: TInputProps) => {
  const format = "HH:mm";

  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              style={{ width: "100%" }}
              format={format}
              {...field}
              id={name}
              size="large"
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default NTechTimePicker;
