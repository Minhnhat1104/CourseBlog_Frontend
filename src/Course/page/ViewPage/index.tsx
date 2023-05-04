import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCourse from "../../hooks/useCourse";
import { Box, Stack, Typography } from "@mui/material";
import _ from "lodash";

const ViewPage = () => {
  const param = useParams();
  const [course, setCourse] = useState<any>(undefined);
  const slug = param?.slug;

  const { data } = useCourse(slug || "");

  useEffect(() => {
    if (data?.data?.data) {
      const newcourses = data?.data?.data;
      if (!_.isEqual(newcourses, course)) {
        setCourse(newcourses);
      }
    } else {
      setCourse(undefined);
    }
  }, [data]);

  console.log("🚀 ~ file: index.tsx:10 ~ data:", data);

  return (
    <>
      {course && (
        <Box display={"flex"} width={"100%"}>
          <Stack spacing={1} width={"fit-content"} margin={"auto"}>
            <Typography fontWeight={600} fontSize={"1.2rem"}>
              {course?.name}
            </Typography>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${course?.videoid}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <Typography>{course?.description}</Typography>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ViewPage;
