import "chart.js/auto";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Statistic.css";

const Statistics = () => {
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "test",
        data: Array.from({ length: 12 }, () => Math.random() * 12),
        backgroundColor: "#008c99",
      },
    ],
  };
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "test",
        data: Array.from({ length: 12 }, () => Math.random() * 12),
        backgroundColor: "#7e3af2",
      },
    ],
  };
  // const lineOpitons = {
  //     plugins: {
  //         title: {

  //         }
  //     },
  //     animations: {
  //         tension: {
  //             duration: 1000,
  //             easing: 'linear',
  //             from: 1,
  //             to: 0,
  //         },
  //     },
  //     maintainAspectRatio: false,
  // }

  return (
    <>
      <h1>Statistics</h1>
      <div className={styles.barWrapper}>
        <div className={styles.bar}>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className={styles.bar}>
          <Line
            data={lineData}
            options={{
              plugins: {
                title: {
                  text: "Orders",
                  align: "start",
                  display: "true",
                  font: {
                    size: 16,
                    weight: "600",
                  },
                },
                legend: {
                  position: "bottom",
                  labels: {
                    usePointStyle: true,
                  },
                },
              },
              animations: {
                tension: {
                  duration: 1000,
                  easing: "linear",
                  from: 1,
                  to: 0,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
