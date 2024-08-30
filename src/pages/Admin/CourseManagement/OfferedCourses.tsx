import { Button, Modal, Table, TableColumnsType } from "antd";
import { TCourse, TOfferedCourse, TSemesterRegistration } from "../../../types";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
  useGetAllOfferedCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import NTechSelect from "../../../components/form/NTechSelect";
import NTechFrom from "../../../components/form/NTechFrom";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

// Types for table data
export type TTableData = Pick<
  TOfferedCourse,
  "startTime" | "endTime" | "maxCapacity" | "section"
>;

const OfferedCourses: React.FC = () => {
  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useGetAllOfferedCoursesQuery(undefined);
  console.log(coursesData);
  const tableData = coursesData?.data?.map(
    ({
      _id,
      startTime,
      endTime,
      maxCapacity,
      section,
    }: Partial<TOfferedCourse>) => ({
      key: _id,
      startTime,
      endTime,
      maxCapacity,
      section,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Section",
      key: "section",
      dataIndex: "section",
    },
    {
      title: "Capacity",
      key: "maxCapacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
    },
  ];

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        All Offered Courses
      </h1>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default OfferedCourses;
