import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import NTechFrom from "../../../components/form/NTechFrom";
import NTechInput from "../../../components/form/NTechInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import NTechSelect from "../../../components/form/NTechSelect";
import { bloodGroupsOptions, genderOptions } from "../../../constants/global";
import NTechDatePicker from "../../../components/form/NTechDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

// export const studentDummyData = {
//   password: "student123",
//   student: {
//     name: {
//       firstName: "I am ",
//       middleName: "Student",
//       lastName: "Number 1",
//     },
//     gender: "male",
//     dateOfBirth: "1990-01-01",
//     bloogGroup: "A+",

//     email: "student2@gmail.com",
//     contactNo: "1235678",
//     emergencyContactNo: "987-654-3210",
//     presentAddress: "123 Main St, Cityville",
//     permanentAddress: "456 Oak St, Townsville",

//     guardian: {
//       fatherName: "James Doe",
//       fatherOccupation: "Engineer",
//       fatherContactNo: "111-222-3333",
//       motherName: "Mary Doe",
//       motherOccupation: "Teacher",
//       motherContactNo: "444-555-6666",
//     },
//     localGuardian: {
//       name: "Alice Johnson",
//       occupation: "Doctor",
//       contactNo: "777-888-9999",
//       address: "789 Pine St, Villageton",
//     },

//     admissionSemester: "65b0104110b74fcbd7a25d92",
//     academicDepartment: "65b00fb010b74fcbd7a25d8e",
//   },
// };

const CreateStudent: React.FC = () => {
  // student create api
  const [addStudent, { data: studentResponseData, error: sError }] =
    useAddStudentMutation();

  const { data: semesters, isLoading: sLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: academicDepartment, isLoading: aDLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = semesters?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // Default values for testing purpose. After testing it should be removed
  const defaultValues = {
    name: {
      firstName: "Md",
      middleName: "Nurullah",
      lastName: "Bhuiyan",
    },
    gender: "male",

    bloogGroup: "B+",

    email: "nurullahbhuiyan91@gmail.com",
    contactNo: "1235678",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",

    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },
    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },

    // admissionSemester: "65b0104110b74fcbd7a25d92",
    // academicDepartment: "65b00fb010b74fcbd7a25d8e",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();

    formData.append("data", JSON.stringify(studentData));

    // TODO: file add after file upload learning
    // formData.append("file", data.image);

    try {
      await addStudent(formData);
      if (sError) {
        toast.error("Something went wrong");
      } else {
        toast.success(studentResponseData.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a new Student
      </h1>
      <Row>
        <Col span={24}>
          <NTechFrom onSubmit={onSubmit} defaultValues={defaultValues}>
            <Divider>Personal info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="name.firstName"
                  label="First Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="name.middleName"
                  label="Middle Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="name.lastName"
                  label="Last Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechDatePicker name="dateOfBirth" label="Date of Birth" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechSelect
                  label="Blood Group"
                  name="bloogGroup"
                  options={bloodGroupsOptions}
                />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Picture">
                      <Input
                        type="file"
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </Form.Item>
                  )}
                />
              </Col>

              <Divider>Contact Info</Divider>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput name="email" label="Email" type="email" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput name="contactNo" label="Contact No." type="text" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="emergencyContactNo"
                  label="Emergency Contact No"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="presentAddress"
                  label="Present Address"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="permanentAddress"
                  label="Permanent Address"
                  type="text"
                />
              </Col>

              <Divider>Guardian Info</Divider>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="guardian.fatherName"
                  label="Father Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="guardian.fatherContactNo"
                  label="Father Contact No"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="guardian.motherName"
                  label="Mother Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="guardian.motherContactNo"
                  label="Mother Contact No"
                  type="text"
                />
              </Col>

              <Divider>Local Guardian info</Divider>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="localGuardian.name"
                  label="Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="localGuardian.occupation"
                  label="Occupation"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="localGuardian.contactNo"
                  label="Contact No"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechInput
                  name="localGuardian.address"
                  label="Address"
                  type="text"
                />
              </Col>

              <Divider>Admission info</Divider>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechSelect
                  label="Academic Semester"
                  name="admissionSemester"
                  disabled={sLoading}
                  options={semesterOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <NTechSelect
                  name="academicDepartment"
                  label="Academic Department"
                  options={academicDepartmentOptions}
                  disabled={aDLoading}
                />
              </Col>
            </Row>
            <Button htmlType="submit">Submit</Button>
          </NTechFrom>
        </Col>
      </Row>
    </div>
  );
};

export default CreateStudent;
