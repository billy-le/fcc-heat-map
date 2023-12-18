import * as d3 from "d3";

type MonthYearVariance = {
  month: number;
  year: number;
  variance: number;
};

const height = 800;
const width = 800;
const margin = {
  top: 40,
  left: 40,
  right: 40,
  bottom: 40,
};

document.addEventListener("DOMContentLoaded", async () => {
  const data = await d3
    .json<{
      baseTemperature: number;
      monthlyVariance: Array<MonthYearVariance>;
    }>(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    )
    .then((res) => res?.monthlyVariance ?? []);

  const yearMax = d3.max(data, (d) => d.year) ?? 0;
  const yearMin = d3.min(data, (d) => d.year) ?? 0;

  const months = Array(12)
    .fill(null)
    .map((_, index) => {
      const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
        new Date(0, index)
      );
      return month;
    })
    .reverse();

  const x = d3
    .scaleLinear()
    .domain([yearMin, yearMax])
    .range([margin.left, width - margin.right])
    .nice();

  const y = d3
    .scaleBand()
    .domain(months)
    .range([height - margin.bottom, margin.top]);

  const svg = d3
    .select("#app")
    .append("svg")
    .attr("height", height)
    .attr("width", width);
});
