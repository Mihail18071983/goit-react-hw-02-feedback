import { Component } from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';
import styled from 'styled-components';


const AppWrapperStyled = styled.div`
  margin-left: 30px;
`;

export class App extends Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  statePropNames = Object.keys(this.state);

  onLeaveFeedback = feedback => {
    this.setState(prevState => ({
      [feedback]: prevState[feedback] + 1,
    }));
  };

  countTotalFeedback () {
    let total = 0;
    for (const statePropName of this.statePropNames) {
      total += this.state[statePropName];
    }
    return total;
  };

  countPositiveFeedbackPercentage() {
    const total = this.countTotalFeedback();
    if (!total) {
      return 0;
    }
    const positiveFidback = Math.round(
      (this.state.good * 100) / total
    );
    return positiveFidback;
  };

  render() {
    return (
      <AppWrapperStyled>
        <Section title="Please leave the feedback">
          <FeedbackOptions
            options={this.statePropNames}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>

        {this.countTotalFeedback() !== 0 && (
          <Section title="Statistics">
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          </Section>
        )}

        {this.countTotalFeedback() === 0 && (
          <Notification message="There is no feedback" />
        )}
      </AppWrapperStyled>
    );
  }
}
