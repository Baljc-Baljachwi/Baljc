import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import styles from "../styles/Home.module.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

//data for line chart
const data = {
  labels: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  datasets: [
    {
      label: "지출 / 월",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [65, 59, 80, 81, 56, 55, 47, 57, 40, 48, 59, 62],
    },
  ],
};

//doughnut chart data set

const data1 = {
  labels: [
    "식비",
    "교통비",
    "쇼핑",
    "주거/통신",
    "교육/학습",
    "문화/여가",
    "의료/건강",
    "경조사비",
    "육아/반려",
    "미분류",
  ],
  datasets: [
    {
      data: [120, 50, 30, 10, 6, 4, 0, 0, 0, 34],
      backgroundColor: [
        "#ff9aa2",
        "#abbeec",
        "#ffdf6f",
        "#8cc084",
        "#968e85",
        "#e5e1e0",
        "#90d2d8",
        "#ffc988",
        "#e79796",
        "#8cc1d3",
      ],
      hoverBackgroundColor: [
        "#8cc1d3",
        "#e79796",
        "#ffc988",
        "#90d2d8",
        "#e5e1e0",
        "#ffdf6f",
        "#abbeec",
        "#ff9aa2",
      ],
    },
  ],
};

const contents = () => {
  return (
    <div className={styles.contentcontainer}>
      <div className={styles.contentwrapper}>
        <div className={styles.tabs}>
          <div className={styles.categories}>
            <h2>월별</h2>
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={styles.categories}>
            <h2>카테고리별</h2>
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={styles.categories}>
            <h2>고정지출</h2>
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={styles.categories}>
            <h2>고정수입</h2>
          </div>
        </div>
      </div>
      {/* chart started  */}
      {/* <div className={styles.charts}> */}
      {/* bar chart */}
      {/* <div className={styles.bar}> */}
      {/* <h2>월 별 지출 통계</h2> */}
      {/* <Line data={data} width={400} height={400} /> */}
      {/* </div> */}
      {/* 도넛 chart */}
      {/* <div className={styles.circle}> */}
      {/* <h2>카테고리별 지출 통계</h2> */}
      {/* <Doughnut data={data1} width={400} height={400} /> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default contents;
