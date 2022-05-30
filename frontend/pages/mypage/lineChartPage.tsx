import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import {
  getLineGraphValue,
  getBudget,
  getPieChartValue,
} from "../../api/mypage";
import {
  //   Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useRouter } from "next/router";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartPage = () => {
  const [date, setDate] = useState(new Date());
  const year = Number(dayjs(date).format("YYYY"));
  const month = Number(dayjs(date).format("M"));
  const dateForm = dayjs(date).format("YYYY-MM-DD");
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [dailyExpenditure, setDailyExpenditure] = useState(0);
  const [estimatedExpenditure, setEstimatedExpenditure] = useState(0);
  const [categories, setCategories] = useState([]);

  const [budget, setBudget] = useState(0);
  const [expenditurePercent, setExpenditurePercent] = useState("0");
  const [remainingBudgetPercent, setRemainingBudgetPercent] = useState(0);
  const [fixedExpenditure, setFixedExpenditure] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [xdays, setXdays] = useState([]);

  const xdaysName = Object.keys(xdays);
  const xdaysValue = Object.values(xdays);

  useEffect(() => {
    getPieChartValue(year, month)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getLineGraphValue(year, month)
      .then((res) => {
        setXdays(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getBudget(dateForm)
      .then((res) => {
        setRemainingBudget(res.data.data.remainingBudget);
        setDailyExpenditure(res.data.data.dailyExpenditure);
        setEstimatedExpenditure(res.data.data.estimatedExpenditure);
        setBudget(res.data.data.budget);
        setExpenditurePercent(res.data.data.expenditurePercent);
        setRemainingBudgetPercent(res.data.data.remainingBudgetPercent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month, year]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };
  const data2 = {
    labels: xdaysName,
    datasets: [
      {
        label: "일 별 지출 추이",
        data: xdaysValue,
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // data: [65, 59, 80, 81, 56, 55, 40],
        // data: xdaysValue.map(() => xdaysValue),
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        // borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        // pointBackgroundColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        pointHoverBorderWidth: 0,
        pointRadius: 0,
        pointHitRadius: 0,
      },
    ],
  };

  return (
    <div>
      <h2>Line Example</h2>
      <Line options={options} data={data2} width={400} height={400} />
    </div>
  );
};

export default LineChartPage;
