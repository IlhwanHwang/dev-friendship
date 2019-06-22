import * as React from 'react';
import { render } from 'react-dom';

import Selector from './Selector';

render(<Selector qnas={[
      {
        id: "",
        question: "What is the correct answer?",
        choices: [
          {
            id: "1",
            text: "1st choice"
          },
          {
            id: "2",
            text: "2nd choice"
          }
        ],
        answer: "1"
      },
      {
        id: "",
        question: "asdf",
        choices: [
          {
            id: "1",
            text: "1st asdf"
          },
          {
            id: "2",
            text: "2nd asdf"
          }
        ],
        answer: "1"
      }
    ]
  } make={true}/>, document.getElementById('main'));