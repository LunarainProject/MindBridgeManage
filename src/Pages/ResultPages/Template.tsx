import * as React from "react";

export default class Template extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
  }

  render() {
    return (
    <div>

    </div>
    );
  }
}

type res = {
  page_number: number;
  problem_number: number;
  answer: number;
}

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

type State = {

}