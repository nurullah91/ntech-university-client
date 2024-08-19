import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TSemesterRegistration } from "../../../types";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

// Types for table data
export type TTableData = Pick<
  TSemesterRegistration,
  "startDate" | "endDate" | "status"
>;

// Items for And Dropdown
const items = [
  { label: "Upcoming", key: "UPCOMING" },
  { label: "Ongoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];

const RegisteredSemester = () => {
  const [registeredSemesterId, setRegisteredSemesterId] = useState("");

  const {
    data: RegisteredSemester,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemesterQuery(undefined);
  const [updateRegisteredSemester] = useUpdateSemesterRegistrationMutation();

  const handleStatusUpdate = async (data: { key: string }) => {
    const toastId = toast.loading("Loading");

    const semesterRegistrationData = {
      id: registeredSemesterId,
      data: {
        status: data.key,
      },
    };
    // update status
    const updateStatus = await updateRegisteredSemester(
      semesterRegistrationData
    );
    toast.success(updateStatus?.data?.message, { id: toastId });
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const tableData = RegisteredSemester?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("Do MMMM"),
      endDate: moment(new Date(endDate)).format("Do MMMM"),
      status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setRegisteredSemesterId(item.key)}>
              Update
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];

  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //   }
  // };
  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Registered Semester
      </h1>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default RegisteredSemester;
