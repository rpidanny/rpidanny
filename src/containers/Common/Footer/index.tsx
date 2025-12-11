import "./styles.css";

import React from "react";

interface FooterProps {
  quote: {
    quote: string;
    author: string;
  };
}

const Footer: React.FC<FooterProps> = ({ quote: quoteData }) => {
  const { quote, author } = quoteData;
  return (
    <footer className="footer">
      <div className="quotes">
        <div className="quote-body">
          <blockquote> {quote} </blockquote>
        </div>
        <div className="quote-by"> - {author} </div>
      </div>
    </footer>
  );
};

export default Footer;
