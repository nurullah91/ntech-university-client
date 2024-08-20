import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";
import { TFaculty } from "./userManagement.types";
export type TDays = "Sat" | "San" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TCourse = {
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: { course: TCourse; isDeleted: boolean }[];
  prefix: string;
  title: string;
  _id: string;
};

export type TSemesterRegistration = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  cratedAt: string;
  updatedAt: string;
};

export type TOfferedCourse = {
  semesterRegistration: TSemesterRegistration;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  course: TCourse;
  faculty: TFaculty;
  section: number;
  maxCapacity: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};
