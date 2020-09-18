import * as React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Typography } from "@material-ui/core";

type ChartProps = {
  width: number;
  height: number;

  self: Data;
  spouse: Data;
};

class Chart extends React.Component<ChartProps> {
  private data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  } = {
    labels: [],
    datasets: [],
  };

  serialize(data: Data) {
      return [
        data.mental,
        data.sexual,
        data.spritual,
        data.hobby,
        data.intellectual,
      ]
  }

  render() {
    this.data = {
      labels: [
        "정서적 친밀감",
        "성적 친밀감",
        "영적 친밀감",
        "취미/여가",
        "지적 친밀감",
      ],

      datasets: [
        // These two will be in the same stack.
        {
          label: "자신",
          data: this.serialize(this.props.self),
          backgroundColor: "rgb(0, 143, 251)",
        },
        {
          label: "배우자",
          data: this.serialize(this.props.spouse),
          backgroundColor: "rgb(254, 176, 25)",
        },
      ],
    };

    return (
      <div style={{ width: this.props.width, height: this.props.height }}>
        <Bar
          data={this.data}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 18,
                  },
                  
                },
              ],
            },
            plugins: {
              datalabels: {
                display: true,
                color: "black",
                anchor: "end",
                align: "top",
                font: {
                  weight: "bold",
                },
              },
            },
          }}
          width={this.props.width}
          height={this.props.height}
        ></Bar>
      </div>
    );
  }
}

type res = {
  page_number: number;
  problem_number: number;
  answer: number;
};

type Props = {
  pkgId: string;
  content: {
    page_list: {
      page_title: string;
      question_list: {
        question_title: string;
        string_list: string[];
      }[];
    }[];
  };
  result: res[];
  spouseResult: res[];
};

type Data = {
  mental: number;
  sexual: number;
  spritual: number;
  hobby: number;
  intellectual: number;
};

type State = {
  width: number;
  height: number;

  self: Data;
  spouse: Data;
};

export default class Affinity extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      self: {
        mental: 0,
        sexual: 0,
        spritual: 0,
        hobby: 0,
        intellectual: 0,
      },
      spouse: {
        mental: 0,
        sexual: 0,
        spritual: 0,
        hobby: 0,
        intellectual: 0,
      },
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    let result: res[] = [];
    let spouseResult: res[] = [];

    result = props.result ?? [];
    spouseResult = props.spouseResult ?? [];

    /* test result */
    {
      for (var i = 1; i <= 20; i++) {
        for (var j = 1; j <= 1; j++) {
          result.push({
            page_number: i,
            problem_number: j,
            answer: Math.round(Math.random() * 4 + 0.5),
          });
        }
      }
      for (var i = 1; i <= 20; i++) {
        for (var j = 1; j <= 1; j++) {
          spouseResult.push({
            page_number: i,
            problem_number: j,
            answer: Math.round(Math.random() * 4 + 0.5),
          });
        }
      }
    }

    const resultOnlyAnswer = result.filter((res) => res.problem_number === 1);
    const spouseResultOnlyAnswer = spouseResult.filter(
      (res) => res.problem_number === 1
    );

    const weight = [4, 3, 2, 1, 0];

    let self: Data = {
      mental: 0,
      sexual: 0,
      spritual: 0,
      hobby: 0,
      intellectual: 0,
    };
    resultOnlyAnswer.forEach((choice: res, index: number) => {
      if (index < 4) {
        self.mental += weight[choice.answer - 1];
      } else if (index < 8) {
        self.sexual += weight[choice.answer - 1];
      } else if (index < 12) {
        self.spritual += weight[choice.answer - 1];
      } else if (index < 16) {
        self.hobby += weight[choice.answer - 1];
      } else if (index < 20) {
        self.intellectual += weight[choice.answer - 1];
      }
    });

    let spouse: Data = {
      mental: 0,
      sexual: 0,
      spritual: 0,
      hobby: 0,
      intellectual: 0,
    };
    spouseResultOnlyAnswer.forEach((choice: res, index: number) => {
      if (index < 4) {
        spouse.mental += weight[choice.answer - 1];
      } else if (index < 8) {
        spouse.sexual += weight[choice.answer - 1];
      } else if (index < 12) {
        spouse.spritual += weight[choice.answer - 1];
      } else if (index < 16) {
        spouse.hobby += weight[choice.answer - 1];
      } else if (index < 20) {
        spouse.intellectual += weight[choice.answer - 1];
      }
    });

    return {
      ...state,
      self: self,
      spouse: spouse,
    };
  }

  render() {
    return (
      <div style={{ width: "100%", fontSize: "11px" }}>
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          부부 의사소통 검사 결과
        </Typography>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">[부부 친밀감 막대 그래프]</Typography>
        </div>
        <p>각 영역의 최고 점수는 16점입니다.</p>

        <div style={{ marginTop: "10px", marginBottom: "30px" }}>
          <Chart
            width={this.state.width * 0.9}
            height={this.state.width * 0.7}
            self={this.state.self}
            spouse={this.state.spouse}
          ></Chart>
        </div>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">[나눔]</Typography>
        </div>
        <p>
          1) 우리 부부가 모두 가장 친밀감을 많이 느끼고 있는 부분은 무엇인가?
        </p>
        <p>
          2) 우리 부부가 모두 가장 친밀감을 적게 느끼고 있는 부분은 무엇인가?
        </p>
        <p>3) 우리 부부에게 친밀감의 간격이 가장 큰 부분은 어디인가?</p>
        <p>위의 내용을 가지고 이야기를 나누어 보세요.</p>
      </div>
    );
  }
}
