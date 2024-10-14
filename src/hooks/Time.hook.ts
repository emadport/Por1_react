import { useEffect } from "react";
import {
  useAddLeaveMutation,
  useAddTimeMutation,
  useCompareTimeToMaxBudgetLazyQuery,
  useDeleteUserLeaveMutation,
  useDeleteUserTimeMutation,
  useEditUserLeaveMutation,
  useEditUserTimeMutation,
  useGetLeavesLazyQuery,
  useGetUserLeavesByAdminLazyQuery,
  useGetUserLeavesLazyQuery,
  useGetUserTimesLazyQuery,
  useSetLeaveStatusMutation,
} from "../generated/graphql";
import useAuth from "./Auth.hook";

export default function useTime() {
  const { user, userLoading } = useAuth()

  const [addTime, addTimeData] = useAddTimeMutation({
    fetchPolicy: "network-only",
  });
  const compareTimeToMaxBudget = useCompareTimeToMaxBudgetLazyQuery()
  const getUserTime = useGetUserTimesLazyQuery({
    fetchPolicy: "network-only",
  });
  const userLeavesQuery = useGetUserLeavesLazyQuery({
    fetchPolicy: "network-only",
  });
  const userLeavesByAdmin = useGetUserLeavesByAdminLazyQuery({ fetchPolicy: "network-only" });
  const setLeaveStatusMutation = useSetLeaveStatusMutation();
  const deleteWorkTime = useDeleteUserTimeMutation({
    fetchPolicy: "network-only",
  });
  const deleteLeaveTime = useDeleteUserLeaveMutation({
    fetchPolicy: "network-only",
  });
  const editWorkTime = useEditUserTimeMutation({ fetchPolicy: "network-only" });
  const editLeave = useEditUserLeaveMutation({ fetchPolicy: "network-only" });
  const [addLeave, addLeaveData] = useAddLeaveMutation({ fetchPolicy: "network-only" });
  const leaves = useGetLeavesLazyQuery({ fetchPolicy: "network-only" });

  const setLeaveStatus = useSetLeaveStatusMutation({ fetchPolicy: "network-only" });
  useEffect(() => {
    if (!user?.currentUser && !userLoading) {
      window.location.href = '/'
    }
  }, [user, userLoading])

  return {
    addTime,
    addTimeData,
    userTimesData: getUserTime,
    deleteWorkTime,
    deleteLeaveTime,
    editWorkTime,
    editLeave,
    addLeave,
    addLeaveData,
    userLeavesQuery: userLeavesQuery,
    setLeaveStatusMutation: setLeaveStatusMutation,
    leaves,
    setLeaveStatus,
    userLeavesByAdmin,
    compareTimeToMaxBudget
  };
}
