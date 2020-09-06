import * as React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

export default class Chart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        this.data = {
            labels: ['D(주도형)', 'I(사교형)', 'S(안정형)', 'C(신중형)'],
            
            datasets: [
                // These two will be in the same stack.
                {
                label: '자신',
                data: Object.keys(this.props.discMyData).map(key =>this.props.discMyData[key]),
                backgroundColor: 'rgb(0, 143, 251)',   
                },
                {
                label: '배우자',
                data: Object.keys(this.props.discSpouseData).map(key => this.props.discSpouseData[key]),
                backgroundColor: 'rgb(254, 176, 25)',
                }
            ]
            }

        return (
            <div style={{width: this.props.width, height: this.props.height }}>
                <HorizontalBar
                    data={this.data}
                    options={{
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        plugins: {
                            datalabels: {
                                display: true,
                                color: 'black',
                                anchor: 'end',
                                align: 'right',
                                font: {
                                  weight: 'bold'
                                }
                            }
                        }   
                    }}
                    width={this.props.width}
                    height={this.props.height}
                ></HorizontalBar>
            </div>
        )
    }
}