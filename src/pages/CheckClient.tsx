const CheckClient = () => {
  const adminPhoneNumber = "+998 90 766 1770";
  const adminEmail = "diyorbekjuraev777@gmail.com"; 

  const callAdmin = () => {
    window.location.href = `tel:${adminPhoneNumber}`;
  };

  const messageAdmin = () => {
    const subject = "Message from User";
    const body = "Hello Admin,\n\nI have a question regarding the project.";
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  return (
    <div className="modal-overlay">
      <div className="modal client_checking" style={{ maxWidth: "700px" }}>
        <h2>Welcome to Our Portfolio Project</h2>
        <h3>Dear User! Your Path in Our Project:</h3>
        <p>
          <span>Portfolio Owners:</span> If you're looking to showcase your
          work, skills, and accomplishments, you're in the right place! Our
          platform empowers you to create a stunning portfolio that reflects
          your expertise. The possibilities are endless, and your portfolio will
          be a true reflection of your unique talents.
        </p>
        <p>
          <span>Clients and Visitors:</span> For clients seeking top-notch
          professionals or anyone visiting our platform, we invite you to
          explore the incredible portfolios our users have created. You'll find
          a diverse range of skills, styles, and experiences to choose from,
          making it easy to find the perfect match for your needs.
        </p>
        <p>
          If you're not a client but are eager to explore portfolios and
          experience the potential of our project, we kindly ask you to reach
          out to our admin team for more information. Our team is here to guide
          you and help you make the most of your journey with us. Feel free to
          contact us at <span>abdulaziz_programmer@gmail.com</span> Thank you
          for embarking on this exciting journey with us! We're dedicated to
          providing a platform that serves every user's portfolio needs and
          creates connections that lead to success.
        </p>
        <div className="modal-actions">
          <button onClick={callAdmin} className="cancel_confirm">
            Call Admin
          </button>
          <button onClick={messageAdmin}>Message Admin</button>
        </div>
      </div>
    </div>
  );
};

export default CheckClient;
