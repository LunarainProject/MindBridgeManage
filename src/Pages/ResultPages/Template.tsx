import * as React from "react";

export default class Template extends React.Component<Props> {
  constructor(props: Props ) {
    super(props);
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
      question_list: {
        string_list: string[]
      }[]
    }[];
  };
  result: res[];
};