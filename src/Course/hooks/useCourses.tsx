import React from "react";
import axios from "../../base/components/axios";
import { useQuery } from "@tanstack/react-query";

const useCourses = () => {
  const mPost = useQuery({
    queryKey: ["courses"],
    queryFn: () => axios.get("/"),
  });
  return mPost;
};

export default useCourses;
