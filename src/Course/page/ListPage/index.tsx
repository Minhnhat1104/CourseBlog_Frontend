import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseCard from "../../component/CourseCard";
import useCourses from "../../hooks/useCourses";
import _ from "lodash";

const ListPage = () => {
  const [items, setItems] = useState<any>();
  const theme = useTheme();
  console.log("🚀 ~ file: index.tsx:9 ~ items:", items);
  const { data } = useCourses();
  console.log("🚀 ~ file: index.tsx:11 ~ data:", data);

  useEffect(() => {
    if (data?.data?.data) {
      const newItems = data?.data?.data;
      if (!_.isEqual(newItems, items)) {
        setItems(newItems);
      }
    } else {
      setItems([]);
    }
  }, [data]);

  const handleOnLearn = () => {
    // /courses/{{this.slug}}
  };
  return (
    <Box sx={{ background: theme.palette.common.white }} p={2}>
      <Grid container spacing={2}>
        {items &&
          items?.map((v: any, i: number) => (
            <Grid key={i} xs={3} item>
              <CourseCard data={v} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ListPage;
