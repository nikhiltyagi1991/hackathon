import { Component } from '@angular/core';
import { DataFetchService } from './services/data-fetch.service';
import * as d3 from 'd3';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private dataFetch: DataFetchService) {
        console.log(d3);
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.dataFetch.getJSONData().subscribe((data: any) => {
            let filteredData = data['items'].map(d => {
                return {
                    optimization_view: d['optimization_view'],
                    objectives: d['objectives']
                };
            });
            console.log(filteredData);
            this.scatterPlot(filteredData, '1 in 50', 'Return');
        });
    }

    scatterPlot(data: any, axisX, axisY) {
        // Print scatter plot.
        let height = 500,
            width = 700;

        let margin = {
            left: 100,
            right: 30,
            bottom: 30,
            top: 30
        };

        let svg = d3.select('svg')
            .attr('height', height)
            .attr('width', width)
            .style('border', '1px solid black');
        let axisXVals = data.map(d => d['objectives'][axisX]);

        let axisYVals = data.map(d => d['objectives'][axisY]);

        // x axis
        console.log(d3.extent(axisXVals));
        let scaleX = d3.scaleLinear()
            .domain(d3.extent(axisXVals))
            .range([margin.left, width - margin.right - margin.left]);

        let xAxis = d3.axisBottom()
            .scale(scaleX);

        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.top})`)
            .call(xAxis);

        // y axis
        let scaleY = d3.scaleLinear()
            .domain(d3.extent(axisYVals))
            .range([margin.top, height - margin.top - margin.bottom]);

        let yAxis = d3.axisLeft()
            .scale(scaleY);

        let yAxisG = svg.append('g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(yAxis);


        let points = svg.append('g')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cx', d => scaleX(d['objectives'][axisX]))
            .attr('cy', d => scaleY(d['objectives'][axisY]));
    }
}
