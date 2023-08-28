import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { useCallback, useEffect, useState } from "react";
import { request } from "../../../request";
import { toast } from "react-toastify";
import { useAuth } from "../../../states/auth";
import { allMessages } from "../../../types";
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal";

import delete_icon from "../../../assets/delete.png";
import avatar from "../../../assets/avatar-svgrepo-com.svg";
import message from "../../../assets/messages.svg";

import "./usermessage.scss";
import DataLoading from "../../../components/dataLoading/Loading";

const Message = () => {
  const [allMessages, setAllMessages] = useState<allMessages[]>([]);
  const [unansweredMessages, setUnansweredMessages] = useState<allMessages[]>(
    []
  );
  const [answeredMessages, setAnsweredMessages] = useState<allMessages[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userWindow, setUserWindow] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyMessage, setReplyMessages] = useState({
    _id: "",
    user: "",
    message: "",
    title: "",
  });
  const { userId } = useAuth();

  const getAllMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await request(
        `messages?whom=${userId}&page=${currentPage}&limit=${5}`
      );
      const { data, pagination } = res.data;
      const messagesWithShow = data.map((res: allMessages) => ({
        ...res,
        show: true,
      }));
      setAllMessages(messagesWithShow);
      setTotalPages(Math.ceil(pagination.total / 5));
    } catch (err) {
      toast.error("Failed to get all messages");
    } finally {
      setLoading(false);
    }
  }, [userId, currentPage]);

  const unresponseMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await request(
        `messages?answer&whom=${userId}&page=${currentPage}&limit=${5}`
      );
      const { data, pagination } = res.data;

      setUnansweredMessages(data);
      setTotalPages(Math.ceil(pagination.total / 5));
    } catch (err) {
      toast.error("Failed to get unanswered messages");
    } finally {
      setLoading(false);
    }
  }, [userId, currentPage]);

  const getAnsweredMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await request(
        `messages?answer[gt]&whom=${userId}&page=${currentPage}&limit=${5}`
      );
      const { data, pagination } = res.data;
      setAnsweredMessages(data);
      setTotalPages(Math.ceil(pagination.total / 5));
    } catch (err) {
      toast.error("Failed to get answered messages");
    } finally {
      setLoading(false);
    }
  }, [currentPage, userId]);

  const toggleMessageShow = (messageId: string) => {
    setAllMessages((prevMessages) =>
      prevMessages.map((message) =>
        message._id === messageId
          ? { ...message, show: !message.show }
          : message
      )
    );
    const updatedMessages = allMessages.map((message) =>
      message._id === messageId ? { ...message, show: !message.show } : message
    );
    localStorage.setItem("messagesVisibility", JSON.stringify(updatedMessages));
  };

  useEffect(() => {
    getAllMessages();
    unresponseMessages();
    getAnsweredMessages();
  }, [getAllMessages, unresponseMessages, getAnsweredMessages]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deletePortfolio = (id: string) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await request.delete(`messages/${deleteItemId}`);
      setAllMessages(allMessages.filter((res) => res._id !== deleteItemId));
      getAllMessages();
      toast.success("Deleted successfully!");
    } catch (error) {
      toast.error("Delete item failed");
    } finally {
      setDeleteItemId("");
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteItemId("");
    setIsModalOpen(false);
  };
  const isOpen = () => {
    setUserWindow(!userWindow);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put(`messages/${replyMessage._id}`, {
        answer: replyContent,
      });
      toast.success("Success!");
      getAnsweredMessages();
      setUserWindow(false);
      setReplyContent("");
    } catch (err) {
      toast.error("Error sending message");
    }
  };
  const sendAnswer = async (id: string) => {
    try {
      const res = await request(`messages/${id}`);
      const { data } = res;
      setReplyMessages(data);
    } catch (err) {
      toast.error("Failed to send");
    }
  };

  return (
    <div className="message">
      <div className="messages__banner">
        <h1>User's Messages</h1>
        <div className="bg-overlay"></div>
      </div>
      <div className="message__wrapper">
        <div className="messages_row">
          <Tabs>
            <TabList className="custom-tab-list">
              <Tab className="custom-tab">All messages</Tab>
              <Tab className="custom-tab">Unanswered</Tab>
              <Tab className="custom-tab">Answered</Tab>
            </TabList>
            <TabPanel className="custom-tab-panel">
              <div className="users_row">
                {loading ? (
                  <div className="loading_container">
                    <DataLoading />
                  </div>
                ) : (
                  allMessages.map((res) => (
                    <div
                      className="user"
                      key={res._id}
                      onClick={() => sendAnswer(res._id)}
                    >
                      <img className="user_avatar" src={avatar} alt="" />
                      <div className="user_message_info">
                        <h1>
                          {res.user.split(",")[0] +
                            " " +
                            res.user.split(",")[1]}
                        </h1>
                        <div className="user_message">
                          <p>{res.message}</p>
                        </div>
                        <div className="main_container">
                          <p className="title">{res.title}</p>
                          <button className="reply" onClick={isOpen}>
                            Reply
                          </button>
                        </div>
                      </div>
                      <button
                        className="m-delete"
                        onClick={() => deletePortfolio(res._id)}
                      >
                        <img src={delete_icon} alt="" />
                      </button>
                      <label>
                        <input
                          type="checkbox"
                          checked={res.show}
                          onChange={() => toggleMessageShow(res._id)}
                        />
                        <div className="representshow">Message show</div>{" "}
                        <span>{JSON.stringify(res.show)}</span>
                      </label>
                    </div>
                  ))
                )}
                <div className="pagination_container">
                  {allMessages.length === 0 ? (
                    ""
                  ) : (
                    <div className="pagination">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      <span className="representer">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel className="custom-tab-panel">
              <div className="users_row">
                {loading ? (
                  <div className="loading_container">
                    <DataLoading />
                  </div>
                ) : (
                  unansweredMessages.map((res) => (
                    <div className="user" key={res._id}>
                      <img className="user_avatar" src={avatar} alt="" />
                      <div className="user_message_info">
                        <h1>
                          {res.user.split(",")[0] +
                            " " +
                            res.user.split(",")[1]}
                        </h1>
                        <div className="user_message">
                          <p>{res.message}</p>
                        </div>
                        <p className="title">{res.title}</p>
                      </div>
                      <button
                        className="m-delete"
                        onClick={() => deletePortfolio(res._id)}
                      >
                        <img src={delete_icon} alt="" />
                      </button>
                    </div>
                  ))
                )}
                <div className="pagination_container">
                  {allMessages.length === 0 ? (
                    ""
                  ) : (
                    <div className="pagination">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      <span className="representer">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel className="custom-tab-panel">
              <div className="users_row">
                {loading ? (
                  <div className="loading_container">
                    <DataLoading />
                  </div>
                ) : (
                  answeredMessages.map((res) => (
                    <div className="user" key={res._id}>
                      <img className="user_avatar" src={avatar} alt="" />
                      <div className="user_message_info">
                        <h1>
                          {res.user.split(",")[0] +
                            " " +
                            res.user.split(",")[1]}
                        </h1>
                        <div className="user_message">
                          <p>{res.message}</p>
                        </div>
                        <p className="title">{res.title}</p>
                      </div>
                      <button
                        className="m-delete"
                        onClick={() => deletePortfolio(res._id)}
                      >
                        <img src={delete_icon} alt="" />
                      </button>
                    </div>
                  ))
                )}
                <div className="pagination_container">
                  {allMessages.length === 0 ? (
                    ""
                  ) : (
                    <div className="pagination">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <ConfirmationModal
        deleteTitle="Confirmation Deletation"
        deleteMessage="Are you sure do you wanna delete this message?"
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
      {isModalOpen && <div className="backdrop" />}
      <div className={`user_message_window ${isModalOpen ? "blur" : ""}`}>
        <div className={`message_window ${userWindow ? "show" : ""}`}>
          <div className="user_message_info">
            <div className="message_header">
              <img src={message} alt="" />
              <p>Send Message</p>
              <button onClick={isOpen}>X</button>
            </div>
            <div className="line"></div>
            <h1>
              User:
              <span>
                {replyMessage.user.split(",")[0] +
                  " " +
                  replyMessage.user.split(",")[1]}
              </span>
            </h1>
            <div className="user_message">
              <p className="title">{replyMessage.title}</p>
              <p>{replyMessage.message}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="reply-message">
                <textarea
                  placeholder="Type your reply message..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                ></textarea>
                <button className="send_btn" type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
