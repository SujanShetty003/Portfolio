import React, { useState } from "react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [whatsAppMessage, setWhatsAppMessage] = useState("");

  const toggleView = () => {
    setShowForm((prev) => !prev);
    setIsWhatsApp(false); // Reset WhatsApp toggle on view change
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const formattedNumber = whatsAppNumber.replace(/[^0-9]/g, ""); // Ensure only numbers are used
    const whatsappURL = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodeURIComponent(
      whatsAppMessage
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>

      <button className={styles.toggleButton} onClick={toggleView} style={{ fontSize: '20px' }}>
        {showForm ? "View Contact Links" : "Send a Message"}
      </button>

      {showForm ? (
        <div className={styles.formContainer}>
          <h3>{isWhatsApp ? "Send a WhatsApp Message" : "Send a Message"}</h3>
          {!isWhatsApp ? (
            <form
              className={styles.contactForm}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent!");
              }}
            >
              <label>
                To (Email):
                <input
                  type="email"
                  placeholder="Enter recipient email (eg: +9145869..)"
                  required
                  className={styles.input}
                />
              </label>
              <label>
                Message:
                <textarea
                  placeholder="Type your message here"
                  required
                  className={styles.textarea}
                ></textarea>
              </label>
              <button type="submit" className={styles.sendButton}>
                Send Email
              </button>
            </form>
          ) : (
            <form className={styles.contactForm} onSubmit={handleWhatsAppSubmit}>
              <label>
                Mobile Number:
                <input
                  type="text"
                  placeholder="Enter recipient's WhatsApp number"
                  required
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label>
                Message:
                <textarea
                  placeholder="Type your message here"
                  required
                  value={whatsAppMessage}
                  onChange={(e) => setWhatsAppMessage(e.target.value)}
                  className={styles.textarea}
                ></textarea>
              </label>
              <button type="submit" className={styles.whatsappButton}>
                Send on WhatsApp
              </button>
            </form>
          )}

          <div className={styles.toggleOption}>
            {!isWhatsApp ? (
              <button
                className={styles.toggleOptionButton}
                onClick={() => setIsWhatsApp(true)}
              >
                Or Send a Message to WhatsApp
              </button>
            ) : (
              <button
                className={styles.toggleOptionButton}
                onClick={() => setIsWhatsApp(false)}
              >
                Back to Email Form
              </button>
            )}
          </div>
        </div>
      ) : (
        <ul className={styles.links}>
          <li className={styles.link}>
            <img
              src={getImageUrl("contact/emailIcon.png")}
              alt="Email icon"
            />
            <a href="mailto:myemail@email.com">myemail@email.com</a>
          </li>
          <li className={styles.link}>
            <img
              src={getImageUrl("contact/linkedinIcon.png")}
              alt="LinkedIn icon"
            />
            <a href="https://www.linkedin.com/myname">linkedin.com/myname</a>
          </li>
          <li className={styles.link}>
            <img
              src={getImageUrl("contact/githubIcon.png")}
              alt="Github icon"
            />
            <a href="https://www.github.com/myname">github.com/myname</a>
          </li>
        </ul>
      )}
    </footer>
  );
};
