import { Button, Modal, Table, TableColumnsType } from "antd";
import { TCourse, TSemesterRegistration } from "../../../types";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import NTechSelect from "../../../components/form/NTechSelect";
import NTechFrom from "../../../components/form/NTechFrom";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

// Types for table data
export type TTableData = Pick<
  TSemesterRegistration,
  "startDate" | "endDate" | "status"
>;

const Courses = () => {
  // const [registeredSemesterId, setRegisteredSemesterId] = useState("");

  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);
  console.log(coursesData);
  const tableData = coursesData?.data?.map(
    ({ _id, title, code, prefix }: Partial<TCourse>) => ({
      key: _id,
      title: title,
      prefix: prefix,
      code: code,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Prefix",
      key: "prefix",
      dataIndex: "prefix",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AssignFacultyModal facultyInfo={item} />;
      },
    },
  ];

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>All Courses</h1>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

// Modal related code
const AssignFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignFaculties] = useAssignFacultiesMutation();
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  console.log(facultiesData);

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  // Submit handler
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    try {
      const res = await assignFaculties(facultyData);
      toast.success(res?.data?.message, { id: toastId });
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign Faculty
      </Button>
      <Modal
        title="Assign a Faculty"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <NTechFrom onSubmit={handleSubmit}>
          <NTechSelect
            options={facultiesOptions}
            name="faculties"
            label="Faculty"
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </NTechFrom>
      </Modal>
    </>
  );
};

export default Courses;
