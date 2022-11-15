import React, { useContext, useRef, useState } from "react";

import "./styles.scss";

import { Input, Form } from "antd";
import Countdown from "react-countdown";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import { EssayContext } from "../../layout";

import { AIScoreAPI } from "../../config/api/AI/AIScoreAPI";

const { TextArea } = Input;
const deadline = Date.now() + 1000 * 60 * 40;

const { checkEssayAPI } = AIScoreAPI;

const Essay = () => {
  const [form] = Form.useForm();
  const [answerValue, setAnswerValue] = useState("");

  const timerRef = useRef();
  const botRef = useRef();

  const { setScoreContent, setEssayContent } = useContext(EssayContext);

  // On Form Finish
  const onFinish = (values) => {
    toast.loading("Submitting...", {
      position: "top-center",
    });
    // Call AI score
    checkEssayAPI(values)
      .then((res) => {
        toast.dismiss();
        if (!res.scores) {
          toast.error(res.message);
          setScoreContent();
          setEssayContent();
        } else {
          botRef.current.scrollIntoView();
          toast.success(
            "Your score: " + res?.scores.overall.toFixed(1) + "/9.0"
          );
          timerRef.current.api.pause();
          setScoreContent(res);
          setEssayContent(values["question_respond"]);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Sorry, we failed to score your answer.");
      });
  };

  const onTimeComplete = () => {
    form.submit();
  };

  // Start time
  const startTimer = () => {
    timerRef.current.api.start();
  };

  const handleAnswerChange = (e) => {
    setAnswerValue(e.target.value);
  };

  const countWord = (text) => {
    if (text.trim()) {
      const length = text.trim().split(" ").length;

      return length + (length > 1 ? " words" : " word");
    } else {
      return "0 word";
    }
  };

  return (
    <div className="essay">
      <div className="essay-timer">
        <Countdown
          ref={timerRef}
          onComplete={onTimeComplete}
          date={deadline}
          autoStart={false}
          renderer={(props) => {
            const { formatted, total } = props;
            return (
              <>
                <span>
                  {total >= 0 ? null : "-"}
                  {formatted.minutes}:{formatted.seconds}
                </span>
              </>
            );
          }}
        />
      </div>
      <Form form={form} onFinish={onFinish}>
        <div className="essay-question">
          <Form.Item
            name="question"
            rules={[
              {
                required: true,
                message: "Please input the question!",
              },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 1 }}
              placeholder="Type or paste an essay question (topic)"
            />
          </Form.Item>
        </div>
        <div className="essay-respond">
          <Form.Item
            name="question_respond"
            rules={[
              {
                required: true,
                message: "Please input your essay!",
              },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 12 }}
              placeholder="Type or paste your essay"
              onChange={handleAnswerChange}
            />
          </Form.Item>
          <div className="essay-count">
            <span>{countWord(answerValue)}</span>
          </div>
        </div>
        <div className="essay-btns">
          <div className="essay-start" onClick={startTimer}>
            <Button>
              <img
                alt=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADVElEQVRoge2ZzUtUURjG3+sMkRMZBFkZopL0sUiFahFZEfRhSa3a+LFpm3+Bf0HQXyAipgmuQy1ondqH0UpNKcgKrKg2SUSR/lrcm17fOffOnHuPTZAPzOKd+573eZ4z556vEdlEaeG5KgRgRex5TrjLXBQpJTYNbASAKmBnqXUkApADngKvgEOl1mMFoAy4yxq+AGf/Fnk90AUMA88D8p/B53Pw3TBwA9gfUaOLfPwArm+U6CzQCTwyEBfCJNABZEP1tgC3I/JvAu7eWeAy8DKBcI15oEXV7gZWDLm3XAjPAf0OhGv0AbkQzzXgW+j5R6Aurfjd+GPZhGX8odQNnAYOANuCz0HgTPDscZBrwjOgMsR3HFgEvgMnXIifjxA+ANRY1KoFBiOMzCsT1UBrWvG5iJ6fBo6kqNsAzET8EuWpRCsi05gfBbY7qF0BjBnq97rQLsAlQ/ERCkxpukGB3EzQIRoX0orPkj9VThfT8zYGgvwK8ofTHJBJY6BTFfxFkWPe1kDQppH8F7s9jQG9wvZbtLU2ELQbVE0nkoqvV4WWsZsqkxqoY/0qvELMAhb3Il5U8RPP894UKyQpPM97LSJT4a9EJPJljjNwUsWjKXTZYkTFp6IS4wwcVvFkYjn20ONea1lFnIFqFS8mlmMPzaW1rCLOgJ7r3yeWYw9toCIq8Z881IuFrrjEJRXvTaYlEfao+GtUYpyBtyquslHgKdi0FZF9BbSsIs7AnIr1tLqR0FwvohLjDIyr+EpiOfa4qmKtpTCCrUR4SV8Gat3oi+U1bSWS8eJffYQx4FiviXNIcdr3fqhYh2FD1+BQr+ZrIn873ZamYJb8g/wMELmwpODaAcwqrlnSHGiCwi3kYzR14fUcGeCegeecK4I+Q/ExF79E0PMm8T0utP8hyeFfdWjMAI0p6jYZhg341+tbnRkIyCqJvti6g8W1H/5UOYT5YmsO2FVsLaslHv/G7L6IHDU9Fv8kNSL+fv6DiLwLnlWLv79pFn+ROhbBPSUirZ7nfbLRZQWgHOg19Fxa9DgfNgWMnA9+7rSYxdVsk8BEBmgHJjDf50dhBRgH2kg5Hbv8o7tO/JuMZvHPsDWydqpbEpEF8Xe4D0Xkged5C664N7GJ/xm/AaFHxMJ0Y17KAAAAAElFTkSuQmCC"
              />
              Start Timer
            </Button>
          </div>
          <Form.Item>
            <Button type="secondary" isSubmit={true}>
              Check the Essay
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div id="essay-bot" ref={botRef}></div>
    </div>
  );
};

export default Essay;
