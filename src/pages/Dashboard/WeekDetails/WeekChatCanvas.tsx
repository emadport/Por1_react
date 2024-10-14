import React, { useRef, useEffect } from 'react';
import moment from 'moment-timezone';

import { CombinedDayData } from 'generated/graphql';

const WeekChartCanvas = ({ weeklyData, currentWeek }:{weeklyData:CombinedDayData[],currentWeek:moment.Moment}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if(!canvasRef.current) return;
    const canvas:HTMLCanvasElement = canvasRef.current;

    const ctx = canvas.getContext('2d');
    const cellWidth = 40; // width of each time slot cell
    const cellHeight = 60; // height of each time slot cell
    const startHour = 8; // starting hour for the chart
    const endHour = 20; // ending hour for the chart

    const drawChart = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
        currentWeek.clone().startOf('isoWeek').add(index, 'days')
      );

      daysOfWeek.forEach((day, dayIndex) => {
        weeklyData.forEach((dayInfo) => {
            console.log(dayInfo)
          if (moment(day).isSame(dayInfo.day)) {
            dayInfo.subTimes?.forEach((subTime) => {
              const beginHour = moment(subTime?.beginDate as Date).hour();
              const duration = subTime?.timeSpend
                ? parseInt(subTime.timeSpend.split(':')[0])
                : 0;
              const startX = dayIndex * cellWidth;
              const startY = (beginHour - startHour) * cellHeight;
              const height = duration * cellHeight;

              // Draw work cell
              ctx!.fillStyle = '#49b8b8';
              ctx!.fillRect(startX, startY, cellWidth, height);

              // Apply rounded corners to the first and last cells
              if (beginHour === startHour || beginHour + duration === endHour) {
                ctx!.lineJoin = 'round';
                ctx!.lineWidth = 10;
                ctx!.strokeStyle = '#49b8b8';
                ctx!.strokeRect(startX, startY, cellWidth, height);
              }
            });

            
         if(dayInfo.leaveBeginDate){
        const leaveBeginHour = moment(dayInfo.leaveBeginDate).hour();
              const leaveDuration = dayInfo?.leaveSpended
                ? parseInt(dayInfo?.leaveSpended.split(':')[0])
                : 0;
              const leaveColor =
                dayInfo?.leaveType === 'Sjuk'
                  ? '#f44a69'
                  : dayInfo?.leaveType === 'Semester'
                  ? 'tomato'
                  : 'orange';

              const startX = dayIndex * cellWidth;
              const startY = (leaveBeginHour - startHour) * cellHeight;
              const height = leaveDuration * cellHeight;

              // Draw leave cell
              ctx!.fillStyle = leaveColor;
              ctx!.fillRect(startX, startY, cellWidth, height);

              // Apply rounded corners to the first and last cells
              if (leaveBeginHour === startHour || leaveBeginHour + leaveDuration === endHour) {
                ctx!.lineJoin = 'round';
                ctx!.lineWidth = 10;
                ctx!.strokeStyle = leaveColor;
                ctx!.strokeRect(startX, startY, cellWidth, height);
              }
         }
      
      
          }
        });
      });
    };

    drawChart();
  }, [weeklyData, currentWeek]);

  return <canvas ref={canvasRef} width={200} height={500} />;
};

export default WeekChartCanvas;
