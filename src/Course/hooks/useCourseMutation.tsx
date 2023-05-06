import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "../../base/components/axios";

const useCourseMutation = () => {
  const mUpdate = useMutation({
    mutationFn: (course: any) => {
      const param = {
        name: course?.name,
        description: course?.description,
        videoid: course?.videoid,
        level: course?.level,
      };

      return axios.put(`/courses/${course?._id}`, param);
    },
    onSuccess: () => {
      alert("Update course successfully");
    },
  });

  const mAdd = useMutation({
    mutationFn: (course: any) => {
      const param = {
        name: course?.name,
        description: course?.description,
        videoid: course?.videoid,
        level: course?.level,
      };

      return axios.post(`/courses/store`, param);
    },
    onSuccess: () => {
      alert("Create new course successfully!");
    },
  });

  const mDelete = useMutation({
    mutationFn: (_id: number) => {
      return axios.delete(`/courses/${_id}`);
    },
    onSuccess: () => {
      alert("Delete course successfully!");
    },
  });

  const mRestore = useMutation({
    mutationFn: (_id: number) => {
      return axios.patch(`/courses/${_id}/restore`);
    },
    onSuccess: () => {
      // alert("Restore course successfully!");
    },
  });

  const mForeceDelete = useMutation({
    mutationFn: (_id: number) => {
      return axios.delete(`/courses/${_id}/force`);
    },
    onSuccess: () => {
      alert("Permanent delete course successfully!");
    },
  });

  return { mUpdate, mAdd, mDelete, mRestore, mForeceDelete };
};

export default useCourseMutation;