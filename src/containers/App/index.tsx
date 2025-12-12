import "./index.css";

import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";

import resumeData from "../../data/resume.json";
import Footer from "../Common/Footer";
import Contact from "../Contact";
import Dashboard from "../DashboardV2";
import Interests from "../Interests";
import Resume from "../Resume";
import { quotesAPI } from "./URLs";

ReactGA.initialize("UA-76263604-1", {
  testMode: process.env.NODE_ENV === "test",
});

interface Quote {
  quote: string;
  author: string;
}

const App: React.FC = () => {
  const [quote, setQuote] = useState<Quote>({
    quote:
      "People who are really serious about software should make their own hardware",
    author: "Alan Kay",
  });

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });

    const fetchQuote = async () => {
      try {
        const response = await fetch(quotesAPI);
        const data = await response.json();
        if (data && data.quote && data.author) {
          setQuote(data);
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuote();
  }, []);

  const { basics, education, work, interests, certifications, projects } =
    resumeData;

  return (
    <div className="App">
      <Dashboard data={basics} />
      <Resume
        education={education}
        work={work}
        certifications={certifications}
        projects={projects}
      />
      <Interests data={interests} />
      <Contact email={basics.email} />
      <Footer quote={quote} />
    </div>
  );
};

export default App;
