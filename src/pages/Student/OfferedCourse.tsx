import { Button, Col, Row } from "antd";
import { useGetMyOfferedCourseQuery } from "../../redux/features/student/studentCourse.api";

type TCourseObject = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: myOfferedCourseData } = useGetMyOfferedCourseQuery(undefined);

  const courseObject = myOfferedCourseData?.data?.reduce(
    (acc: TCourseObject, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });

      return acc;
    },
    {}
  );

  const modifiedData = Object.values(courseObject ? courseObject : {});

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div>
              <h2>{item.courseTitle}</h2>
            </div>

            <div>
              {item.sections.map((section) => {
                return (
                  <Row
                    justify={"space-between"}
                    style={{ border: "solid #d4d4d4 2px" }}
                    align={"middle"}
                  >
                    <Col span={5}>Section: {section.section}</Col>
                    <Col span={5}>
                      Days:{" "}
                      {section.days.map((day: string) => (
                        <span>{day}</span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime}</Col>
                    <Col span={5}>End Time: {section.endTime}</Col>
                    <Button>Enroll</Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
