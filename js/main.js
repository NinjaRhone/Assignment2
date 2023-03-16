const data = [
    {campus: "UT KNOXVILLE", enrollment: 29460, color: '#fd8105' },
    {campus: "UT CHATTANOOGA", enrollment:11590, color:'#ecaa1f'},
    {campus: "MARTIN", enrollment: 7280, color: '#0e223f'},
    {campus: "HEALTH SCIENCE CENTER", enrollment: 2815, color: '#036646'}
];

const margin = {top: 15, right: 5, bottom: 20, left: 40};

const width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const scaleX = d3.scaleBand()
    .domain(["UT KNOXVILLE", "UT CHATTANOOGA", "MARTIN", "HEALTH SCIENCE CENTER"])
    .range([0, width])
    .paddingInner(0.10)
    .paddingOuter(0.10);

const scaleY = d3.scaleLinear()
    .domain([0, d3.max(data, data=>data.enrollment) ])
    .range([0, height -margin.bottom ]);

const xAxis = d3.axisBottom().scale(scaleX);
const yAxis = d3.axisLeft().scale(scaleY)
    .ticks(5);

const xAxisGroup = svg.append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

const yAxisGroup = svg.append('g')
    .attr('class', 'axis y-axis')
    .attr('transform', `translate(0, ${margin.top})`)
    .call(yAxis);

const bars = svg.append('g')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', data => data.color)
    .attr('width', data=> scaleX.bandwidth())
    .attr('height', data => scaleY(data.enrollment))
    .attr('y', 0)
    .attr('x', data => scaleX(data.campus));