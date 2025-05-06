import React, { useEffect, useState } from "react";
import RequestForm from "../components/RequestForm";
import RequestList from "../components/RequestList";
import AnnouncementList from "../components/AnnouncementList";

const API_URL = "http://localhost:8080/api";

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/requests`).then(res => res.json()).then(setRequests);
    fetch(`${API_URL}/announcements`).then(res => res.json()).then(setAnnouncements);
  }, []);

  const addRequest = (newRequest) => {
    setRequests(prev => [...prev, newRequest]);
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CampusHelp – Student Helpdesk</h1>
      <RequestForm onAddRequest={addRequest} />
      <RequestList requests={requests} />
      <AnnouncementList announcements={announcements} />
    </main>
  );
}
