import React, { useEffect, useState } from "react";
import "./TimeCheck.scss";
import useAuth from "hooks/Auth.hook";
import useTime from "hooks/Time.hook";
import WeekCalendar2 from "components/WeekCalendar";

interface SelectionType {
  startDate: Date;
  endDate: Date;
  key: string;
  autoFocus?: boolean;
  fromHome?: boolean;
}

interface StateType {
  [key: string]: SelectionType;
}

const WeekCheck = () => {
  const { user, userLoading } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    userTimesData: [getTimes, { data: userTimesData, loading, error, refetch }],

  } = useTime();
  const [range, setRange] = useState<StateType>({});

  useEffect(() => {
    if (user?.currentUser?.id && !userLoading) {
      getTimes({
        variables: { userId: user!.currentUser.id},
        onError: (error) =>
          error.graphQLErrors.map((e) => console.log(e.extensions)),
      });
    }
  }, [user?.currentUser]);

  useEffect(() => {
    if (userTimesData?.getUserTimes) {
      const newRanges: StateType = {};

      userTimesData.getUserTimes.forEach((res, index) => {
        if (res?.beginDate && res?.finishDate)
          newRanges[`selection${res?._id}`] = {
            startDate: new Date(res?.beginDate),
            endDate: new Date(res?.finishDate),

            key: `selection${res?._id}`,
          };
      });
      setRange({ ...range, ...newRanges });
    }
  }, [userTimesData?.getUserTimes]);

  return <WeekCalendar2 theme="dark" date={new Date().toISOString()}/>;
};

export default WeekCheck;
